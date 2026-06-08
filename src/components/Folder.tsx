import React, { useState } from 'react';
import Image from 'next/image';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  images?: string[];
  className?: string;
  cardWidth?: string;
  cardHeight?: string;
  spread?: number;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({
  color = '#5227FF',
  size = 1,
  items = [],
  images,
  className = '',
  cardWidth,
  cardHeight,
  spread = 1.0,
}) => {
  const maxItems = 3;

  const DEFAULT_ITEMS = [
    <div key="d1" className="relative w-full h-full" style={{ position: 'relative' }}>
      <Image
        src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515383/ChatGPT_Image_Jun_3_2026_05_42_51_PM_zd154a.png"
        alt="Tribute 1"
        fill
        sizes="(max-width: 768px) 150px, 300px"
        className="object-cover"
        priority
      />
    </div>,
    <div key="d2" className="relative w-full h-full" style={{ position: 'relative' }}>
      <Image
        src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515073/ChatGPT_Image_Jun_4_2026_12_39_54_AM_cfreb3.png"
        alt="Tribute 2"
        fill
        sizes="(max-width: 768px) 150px, 300px"
        className="object-cover"
        priority
      />
    </div>,
    <div key="d3" className="relative w-full h-full" style={{ position: 'relative' }}>
      <Image
        src="https://res.cloudinary.com/dtslaveid/image/upload/v1780515483/ChatGPT_Image_Jun_4_2026_12_35_41_AM_f2lrps.png"
        alt="Tribute 3"
        fill
        sizes="(max-width: 768px) 150px, 300px"
        className="object-cover"
        priority
      />
    </div>
  ];

  const displayItems = images && images.length > 0
    ? images.map((src, idx) => (
        <div key={idx} className="relative w-full h-full" style={{ position: 'relative' }}>
          <Image
            src={src}
            alt={`Folder image ${idx + 1}`}
            fill
            sizes="(max-width: 768px) 150px, 300px"
            className="object-cover"
            priority
          />
        </div>
      ))
    : (items.length > 0 ? items : DEFAULT_ITEMS);

  const papers: React.ReactNode[] = [...displayItems.slice(0, maxItems)];
  while (papers.length < maxItems) {
    papers.push(<React.Fragment key={`empty-${papers.length}`} />);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  const getOpenTransform = (index: number) => {
    if (index === 0) return `translate(${-120 * spread}%, ${-70 * spread}%) rotate(-15deg)`;
    if (index === 1) return `translate(${10 * spread}%, ${-70 * spread}%) rotate(15deg)`;
    if (index === 2) return `translate(-50%, ${-100 * spread}%) rotate(5deg)`;
    return '';
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer ${!open ? 'hover:-translate-y-2' : ''
          }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-8px)' : undefined
        }}
        onClick={handleClick}
      >
        <div
          className="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {papers.map((item, i) => {
            const customWidth = cardWidth ? cardWidth : (i === 0 ? '70%' : i === 1 ? '80%' : '90%');
            const customHeight = cardHeight ? cardHeight : (open ? '80%' : i === 0 ? '80%' : i === 1 ? '70%' : '60%');

            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${!open ? 'transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0' : 'hover:scale-110'
                  }`}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  width: customWidth,
                  height: customHeight,
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${!open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
              }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${!open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
              }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
