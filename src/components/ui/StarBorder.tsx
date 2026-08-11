import React from 'react';
import './StarBorder.css';

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
}

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  ...rest
}: StarBorderProps) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px`, ...rest.style }}
      {...rest}
    >
      {/* Wrapper specifically for the animated border gradients, masked to only show the edges */}
      <div 
        className="border-gradient-wrapper"
        style={{ padding: `${thickness}px` }}
      >
        <div
          className="border-gradient-bottom"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 20%)`,
            animationDuration: speed
          }}
        ></div>
        <div
          className="border-gradient-top"
          style={{
            background: `radial-gradient(circle, ${color}, transparent 20%)`,
            animationDuration: speed
          }}
        ></div>
      </div>
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
