import React, { useRef, useState, useCallback } from "react";

/**
 * SpotlightCard — A card wrapper that tracks mouse position and renders a
 * soft radial gradient spotlight that follows the cursor.
 *
 * The spotlight is a 300px-diameter radial gradient at 15% accent opacity,
 * positioned at the mouse coordinates relative to the card.
 *
 * Usage:
 *   <SpotlightCard className="p-6 w-80">
 *     <h3>Card Title</h3>
 *   </SpotlightCard>
 */
const SpotlightCard = ({ children, className = "", style = {} }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return; // throttle to rAF

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setSpotlight({ x, y, opacity: 1 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay — follows cursor with fade transition */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(300px circle at ${spotlight.x}% ${spotlight.y}%, rgba(94, 106, 210, 0.15) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
