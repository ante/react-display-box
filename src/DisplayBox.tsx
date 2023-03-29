import React, { useState, useEffect } from 'react';
import type * as CSS from 'csstype';

export type DisplayBoxProps = {
  height: CSS.Property.Height;
  width: CSS.Property.Width;
  depth: CSS.Property.Height;
  rotationX?: number;
  rotationY?: number;
  flipOnClick?: boolean;
  flipDirection?: 'right' | 'left';
  zoomOnHover?: boolean;
  coverImg?: string;
  glare?: boolean;
  shadow?: boolean;
  front?: string;
  back?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const SHARED_STYLE: CSS.Properties = {
  position: 'absolute',
};

export const DisplayBox = ({
  height,
  width,
  depth,
  rotationX = 0,
  rotationY = 0,
  flipOnClick = false,
  flipDirection = 'right',
  zoomOnHover = false,
  coverImg,
  glare = false,
  shadow = false,
  front = 'rgba(0,0,0,0.8)',
  back = 'rgba(0,0,0,0.8)',
  top = 'rgba(0,0,0,0.6)',
  bottom = 'rgba(0,0,0,0.6)',
  left = 'rgba(0,0,0,0.4)',
  right = 'rgba(0,0,0,0.4)',
  onClick,
  children,
}: DisplayBoxProps) => {
  const [zoom, setZoom] = useState(zoomOnHover ? false : true);
  const [hover, setHover] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!hover) {
      setMousePos({ x: 0, y: 0 });
    }
  }, [hover]);

  const handleClick = () => {
    if (onClick) onClick();
    if (flipOnClick) setFlipped((prevFlipped) => !prevFlipped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - bounds.left;
    let y = e.clientY - bounds.top;
    if (!zoom) {
      x = x / 0.8;
      y = y / 0.8;
    }
    setMousePos({ x: x, y: y });
  };

  const handleMouseEnter = () => {
    setHover(true);
    if (zoomOnHover) setZoom(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
    if (zoomOnHover) setZoom(false);
  };

  const boxStyle: CSS.Properties = {
    height: height,
    width: width,
    position: 'relative',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    transition: 'transform .5s',
    transform: `
      translateZ(calc(-${depth} / 2))
      rotateY(${
        rotationY + (flipped ? (flipDirection === 'right' ? 180 : -180) : 0)
      }deg) 
      rotateX(${rotationX}deg) 
      ${zoom ? ` scale3d(1, 1, 1)` : 'scale3d(.8, .8, .8)'}
    `,
  };

  const frontStyle: CSS.Properties = {
    ...SHARED_STYLE,
    backgroundColor: front,
    backgroundImage: `${
      glare
        ? `radial-gradient(${width} circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 100%), `
        : ''
    }url(${coverImg})`,
    backgroundSize: `${width} ${height}`,
    height: height,
    width: width,
    transform: `rotateY(0deg) translateZ(calc(${depth} / 2))`,
  };

  const backStyle: CSS.Properties = {
    ...SHARED_STYLE,
    background: back,
    backgroundSize: `${width} ${height}`,
    height: height,
    width: width,
    transform: `rotateY(180deg) translateZ(calc(${depth} / 2))`,
  };

  const rightStyle: CSS.Properties = {
    ...SHARED_STYLE,
    background: right,
    backgroundSize: `${depth} ${height}`,
    height: height,
    width: depth,
    left: `calc((${width} / 2) - calc(${depth} / 2))`,
    transform: `rotateY(90deg) translateZ(calc(${width} / 2))`,
  };

  const leftStyle: CSS.Properties = {
    ...SHARED_STYLE,
    background: left,
    backgroundSize: `${depth} ${height}`,
    height: height,
    width: depth,
    left: `calc((${width} / 2) - calc(${depth} / 2))`,
    transform: `rotateY(-90deg) translateZ(calc(${width} / 2))`,
  };

  const topStyle: CSS.Properties = {
    ...SHARED_STYLE,
    background: top,
    backgroundSize: `${width} ${depth}`,
    height: depth,
    width: width,
    top: `calc((${height} / 2) - (${depth} / 2))`,
    transform: `rotateX(90deg) translateZ(calc(${height} / 2))`,
  };

  const bottomStyle: CSS.Properties = {
    ...SHARED_STYLE,
    background: bottom,
    boxShadow: shadow ? '0px 0px 60px black' : undefined,
    backgroundSize: `${width} ${depth}`,
    height: depth,
    width: width,
    top: `calc((${height} / 2) - (${depth} / 2))`,
    transform: `rotateX(-90deg) translateZ(calc(${height} / 2))`,
  };

  return (
    <div
      style={{
        height: height,
        width: width,
        perspective: '500px',
      }}
    >
      <div
        style={boxStyle}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={frontStyle} onMouseMove={handleMouseMove} />
        <div style={backStyle}>{children}</div>
        <div style={rightStyle} />
        <div style={leftStyle} />
        <div style={topStyle} />
        <div style={bottomStyle} />
      </div>
    </div>
  );
};
