'use client';

import React, { useRef, useEffect } from 'react';
import {
  Renderer, Camera, Transform, Plane, Mesh, Program, Texture,
  type OGLRenderingContext,
} from 'ogl';

interface GalleryItem {
  image: string;
  text: string;
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== 'constructor' && typeof (instance as Record<string, unknown>)[key] === 'function') {
      (instance as Record<string, unknown>)[key] = ((instance as Record<string, unknown>)[key] as (...a: unknown[]) => unknown).bind(instance);
    }
  });
}

function createTextTexture(gl: OGLRenderingContext, text: string, font = 'bold 30px monospace', color = 'red') {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontMatch = font.match(/(\d+)px/);
  const fontSize = fontMatch ? parseInt(fontMatch[1], 10) : 30;
  const textHeight = Math.ceil(fontSize * 1.2);
  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;
  context.font = font;
  context.fillStyle = color;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  gl: OGLRenderingContext;
  plane: Mesh;
  renderer: Renderer;
  text: string;
  textColor: string;
  font: string;
  mesh!: Mesh;
  canvasWidth!: number;
  canvasHeight!: number;

  constructor({ gl, plane, renderer, text, textColor = '#545050', font = '30px sans-serif' }: {
    gl: OGLRenderingContext; plane: Mesh; renderer: Renderer;
    text: string; textColor?: string; font?: string;
  }) {
    autoBind(this);
    this.gl = gl; this.plane = plane; this.renderer = renderer;
    this.text = text; this.textColor = textColor; this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    this.canvasWidth = width;
    this.canvasHeight = height;
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;void main(){vec4 color=texture2D(tMap,vUv);if(color.a<0.1)discard;gl_FragColor=color;}`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    this.mesh.setParent(this.plane);
  }

  onResize() {
    const aspect = this.canvasWidth / this.canvasHeight;
    // We want the text height in world coords to be 15% of the plane's world height.
    const localScaleY = 0.15;
    const localScaleX = (this.plane.scale.y * 0.15 * aspect) / this.plane.scale.x;
    this.mesh.scale.set(localScaleX, localScaleY, 1);
    
    // Position it below the plane (0.5 + half of text height (0.075) + margin)
    const worldMargin = 0.05;
    this.mesh.position.y = -0.5 - 0.075 - worldMargin / this.plane.scale.y;
  }
}

class Media {
  extra = 0;
  geometry!: Plane; gl!: OGLRenderingContext; image!: string; index!: number;
  length!: number; renderer!: Renderer; scene!: Transform;
  screen!: { width: number; height: number };
  text!: string; viewport!: { width: number; height: number };
  bend!: number; textColor!: string; borderRadius!: number; font!: string;
  program!: Program; plane!: Mesh; title!: Title;
  speed = 0; x = 0; width = 0; widthTotal = 0; padding = 0;
  scale = 0; isBefore = false; isAfter = false;

  constructor(opts: {
    geometry: Plane; gl: OGLRenderingContext; image: string; index: number;
    length: number; renderer: Renderer; scene: Transform;
    screen: { width: number; height: number }; text: string;
    viewport: { width: number; height: number }; bend: number;
    textColor: string; borderRadius: number; font: string;
  }) {
    Object.assign(this, opts);
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: false });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;void main(){vUv=uv;vec3 p=position;float slowTime=uTime*0.3;p.z=(sin(p.x*4.0+slowTime)*0.8+cos(p.y*2.0+slowTime)*0.8)*(0.05+uSpeed*0.2);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;float roundedBoxSDF(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}void main(){vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);vec4 color=texture2D(tMap,uv);float d=roundedBoxSDF(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);if(d>0.0){discard;}gl_FragColor=vec4(color.rgb,1.0);}`,
      uniforms: {
        tMap: { value: texture }, uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] }, uSpeed: { value: 0 },
        uTime: { value: 0 }, uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({ gl: this.gl, plane: this.plane, renderer: this.renderer, text: this.text, textColor: this.textColor, font: this.font });
  }

  update(scroll: { current: number; last: number }, direction: string) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;
    if (this.bend === 0) {
      this.plane.position.y = 0; this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize(opts: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } } = {}) {
    if (opts.screen) this.screen = opts.screen;
    if (opts.viewport) this.viewport = opts.viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
    if (this.title) {
      this.title.onResize();
    }
  }
}

class App {
  container: HTMLElement;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  planeGeometry!: Plane;
  medias!: Media[];
  mediasImages!: GalleryItem[];
  raf!: number;
  isDown = false;
  start = 0;
  onCheckDebounce: ReturnType<typeof debounce>;
  boundOnResize!: () => void;
  boundOnWheel!: () => void;
  boundOnTouchDown!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove!: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp!: () => void;

  constructor(container: HTMLElement, { items, bend, textColor = '#003049', borderRadius = 0, font = 'italic bold 32px Poppins' }: {
    items?: GalleryItem[]; bend?: number; textColor?: string; borderRadius?: number; font?: string;
  } = {}) {
    this.container = container;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer(); this.createCamera(); this.createScene();
    this.onResize(); this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update(); this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }
  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }
  createScene() { this.scene = new Transform(); }
  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }
  createMedias(items?: GalleryItem[], bend = 1, textColor = '#003049', borderRadius = 0, font = 'italic bold 32px Poppins') {
    const defaultItems: GalleryItem[] = [
      { image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512277/ChatGPT_Image_Jun_3_2026_06_40_01_PM_clhdnp.png', text: 'Gulabo' },
     
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512397/ChatGPT_Image_Jun_3_2026_06_34_59_PM_aztjma.png',
        text: 'Madhavi',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515074/ChatGPT_Image_Jun_4_2026_12_38_44_AM_zakuji.png',
        text: 'Doll',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_29_59_AM_c2jyby.png',
        text: 'Softie',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png',
        text: 'Vibe Check Passed',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515074/ChatGPT_Image_Jun_4_2026_12_52_12_AM_v4aad3.png',
        text: 'Lehenga Love',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515077/ChatGPT_Image_Jun_4_2026_12_29_45_AM_rp7ljf.png',
        text: 'Santorini',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515078/ChatGPT_Image_Jun_4_2026_12_40_54_AM_szgivv.png',
        text: 'Madam jii',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515483/ChatGPT_Image_Jun_4_2026_12_35_41_AM_f2lrps.png',
        text: 'Shaamli',
      },
      
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780515080/ChatGPT_Image_Jun_4_2026_12_30_04_AM_k1pk4i.png',
        text: 'Shaamli',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512370/ChatGPT_Image_Jun_3_2026_05_46_42_PM_m2k6gm.png',
        text: 'Shaamli',
      },
      {
        image: 'https://res.cloudinary.com/dtslaveid/image/upload/v1780512369/ChatGPT_Image_Jun_3_2026_05_42_51_PM_nagnxg.png',
        text: 'Shaamli',
      },
      
    ];


    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = [...galleryItems, ...galleryItems];
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image,
      index, length: this.mediasImages.length, renderer: this.renderer,
      scene: this.scene, screen: this.screen, text: data.text,
      viewport: this.viewport, bend, textColor, borderRadius, font,
    }));
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
  }
  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.05;
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  }
  onTouchUp() { this.isDown = false; this.onCheck(); }
  onWheel() { this.scroll.target += 1; this.onCheckDebounce(); }
  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }
  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }
  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) this.medias.forEach((m) => m.update(this.scroll, direction));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }
  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchMove = this.onTouchMove.bind(this) as (e: MouseEvent | TouchEvent) => void;
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown as EventListener);
    window.addEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.addEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.addEventListener('touchend', this.boundOnTouchUp);
  }
  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown as EventListener);
    window.removeEventListener('mousemove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown as EventListener);
    window.removeEventListener('touchmove', this.boundOnTouchMove as EventListener);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({ items, bend = 3, textColor = '#000000', borderRadius = 0.05, font = 'bold 40px Figtree' }: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const app = new App(containerRef.current, { items, bend, textColor, borderRadius, font });
    return () => app.destroy();
  }, [items, bend, textColor, borderRadius, font]);
  return <div className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef} />;
}
