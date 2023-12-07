import React, { useState } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
  zoomFactor?: number;
}

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt, zoomFactor = 2 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setHoverPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="image-zoom-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="original-image-container">
        <img src={src} alt={alt} className="original-image" />
      </div>
      {isHovered && (
        <>
          <div
            className="mesh-overlay"
            style={{
              left: `calc(${hoverPosition.x * 100}% - 25px)`, // Adjust 25px according to half the width of the mesh overlay
              top: `calc(${hoverPosition.y * 100}% - 25px)`, // Adjust 25px according to half the height of the mesh overlay
            }}
          />
          <div className="zoomed-image-container">
            <img
              src={src}
              alt={alt}
              className="zoomed-image"
              style={{
              // transform: `scale(${zoomFactor}) translate(-${hoverPosition.x * 100}%, -${hoverPosition.y * 100}%)`,

              transform:`scale(${zoomFactor})translate(-${hoverPosition.x * 100 / zoomFactor}%,-${hoverPosition.y * 100 / zoomFactor}%)`,
                 
              }}
            />
          </div>
        </>
      )}
      <style jsx>{`
        .image-zoom-container {
          position: relative;
          width: 200px; /* Adjust this size according to your needs */
          height: 200px; /* Adjust this size according to your needs */
        }

        .original-image-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .mesh-overlay {
          position: absolute;
          width: 50px; /* Adjust this size according to your needs */
          height: 50px; /* Adjust this size according to your needs */
          left: calc(${hoverPosition.x * 100}% - 25px); // Adjust for centering
          top: calc(${hoverPosition.y * 100}% - 25px); // Adjust for centering
          background-image: repeating-linear-gradient(
            60deg,
            transparent ,
            transparent 1px,
            #000 1px,
            #000 2px
          );
          pointer-events: none;
        }

        .zoomed-image-container {
          position: absolute;
          top: 0;
          left: 100%;
          width: 400px;
          height: 400px;
          overflow: hidden;
          border: 2px solid red;
          background-color: #000;
        }

        .original-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover; /* Preserve aspect ratio and cover the container */
          border: 1px solid blue;
          cursor: crosshair;
        }

        .zoomed-image {
          display: block;
          width: ${zoomFactor * 100}%;
          height: ${zoomFactor * 100}%;
          object-fit: cover; /* Preserve aspect ratio and cover the container */
          transform-origin: top left;
        }
      `}</style>
    </div>
  );
};

export default ImageZoom;
