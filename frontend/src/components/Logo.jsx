import React from 'react';

const Logo = ({ className = "", size = "small", position = "top-left" }) => {
  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-24 h-24",
    large: "w-32 h-32"
  };

  const positionClasses = {
    "top-left": "absolute top-4 left-4 z-10",
    "top-right": "absolute top-4 right-4 z-10",
    "top-center": "absolute top-4 left-1/2 transform -translate-x-1/2 z-10",
    "bottom-left": "absolute bottom-4 left-4 z-10",
    "bottom-right": "absolute bottom-4 right-4 z-10",
    "center": "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10",
    "static": "inline-block"
  };

  return (
    <div className={`${positionClasses[position]} ${className}`}>
      <img
        src="/assets/logo.png"
        alt="College Management System Logo"
        className={`${sizeClasses[size]} object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 filter drop-shadow-lg`}
        style={{
          filter: 'brightness(1.1) contrast(1.2) saturate(1.1)',
        }}
      />
    </div>
  );
};

export default Logo;