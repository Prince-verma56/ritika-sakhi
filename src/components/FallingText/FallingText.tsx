import { useRef, useState, useEffect } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  mouseConstraintStiffness?: number;
  fontSize?: string;
  highlightClass?: string;
  wordClass?: string;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  trigger = 'scroll',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = '1rem',
  highlightClass = 'text-cyan-500 font-bold',
  wordClass = 'text-black'
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);

  const [effectStarted, setEffectStarted] = useState(trigger === 'auto');
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // FIXED: Standardize array reference checking to prevent infinite layout re-triggers
  const highlightWordsStr = JSON.stringify(highlightWords);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        // Only update if there is a real size change to avoid micro-layout fluctuations
        setDimensions(prev => {
          if (Math.abs(prev.width - width) > 5 || Math.abs(prev.height - height) > 5) {
            return { width, height };
          }
          return prev;
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const words: string[] = [];
    const rawTokens = text.split(/\s+/);

    for (const token of rawTokens) {
      if (token === '') continue;
      if (!/[a-zA-Z0-9]/.test(token) && words.length > 0) {
        words[words.length - 1] += `\u00A0${token}`;
      } else {
        words.push(token);
      }
    }

    const newHTML = words
      .map(word => {
        const cleanWordForCheck = word.replace(/\u00A0/g, ' ');
        const isHighlighted = highlightWords.some(hw =>
          cleanWordForCheck.startsWith(hw) || hw.startsWith(cleanWordForCheck)
        );
        const currentClass = isHighlighted ? highlightClass : wordClass;
        return `<span class="inline-block mx-[4px] my-[2px] select-none ${currentClass}">${word}</span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWordsStr, highlightClass, wordClass]); // FIXED: Safe dependency tracking

  useEffect(() => {
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    const currentContainer = containerRef.current;
    if (!currentContainer || !canvasContainerRef.current || !textRef.current) return;

    // FIXED: Lock inline wrapper sizes before making nodes absolute to prevent height collapse loops
    const originalWidth = textRef.current.offsetWidth;
    const originalHeight = textRef.current.offsetHeight;
    textRef.current.style.width = `${originalWidth}px`;
    textRef.current.style.height = `${originalHeight}px`;
    textRef.current.style.position = 'relative';

    const width = dimensions.width;
    const height = dimensions.height;
    const containerRect = currentContainer.getBoundingClientRect();

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes
      }
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' }
    };
    const floor = Bodies.rectangle(width / 2, height + 25, width, 50, boundaryOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -25, width, 50, boundaryOptions);

    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = [...wordSpans].map(elem => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.6,
        frictionAir: 0.02,
        friction: 0.1
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 2
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02);

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
    });

    const mouse = Mouse.create(currentContainer);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false }
      }
    });
    render.mouse = mouse;

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, mouseConstraint, ...wordBodies.map(wb => wb.body)]);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = currentContainer.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      wordBodies.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const forceMagnitude = (130 - distance) * 0.0004;
          const angle = Math.atan2(dy, dx);

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(angle) * forceMagnitude,
            y: Math.sin(angle) * forceMagnitude
          });
        }
      });
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      const rect = currentContainer.getBoundingClientRect();
      const mouseX = event.touches[0].clientX - rect.left;
      const mouseY = event.touches[0].clientY - rect.top;

      wordBodies.forEach(({ body }) => {
        const dx = body.position.x - mouseX;
        const dy = body.position.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 130) {
          const forceMagnitude = (130 - distance) * 0.0004;
          const angle = Math.atan2(dy, dx);

          Matter.Body.applyForce(body, body.position, {
            x: Math.cos(angle) * forceMagnitude,
            y: Math.sin(angle) * forceMagnitude
          });
        }
      });
    };

    currentContainer.addEventListener('mousemove', handleMouseMove);
    currentContainer.addEventListener('touchmove', handleTouchMove, { passive: true });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    let animationFrameId: number;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      currentContainer.removeEventListener('mousemove', handleMouseMove);
      currentContainer.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, dimensions, gravity, wireframes, backgroundColor, mouseConstraintStiffness]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative font-lirrier z-[1] w-full h-full cursor-pointer text-center pt-24 overflow-hidden"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseEnter={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        className="inline-block px-4 font-lirrier"
        style={{
          fontSize,
          lineHeight: 1.5,
          fontStyle: "font-lirrier"
        }}
      />

      <div className="absolute top-0 left-0 z-0 font-lirrier" ref={canvasContainerRef} />
    </div>
  );
};

export default FallingText;