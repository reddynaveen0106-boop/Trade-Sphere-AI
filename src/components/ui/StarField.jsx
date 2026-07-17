import React, { useMemo } from 'react';

// Generates a stable random star field
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() < 0.7 ? 1 : Math.random() < 0.5 ? 1.5 : 2;
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.6,
    });
  }
  return stars;
};

export default function StarField() {
  const stars = useMemo(() => generateStars(220), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            borderRadius: '50%',
            background: 'white',
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 30}%`,
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'rgba(59,130,246,0.4)' : 'rgba(6,182,212,0.4)',
            filter: 'blur(1px)',
            animation: `float ${6 + i}s ease-in-out ${i * 0.8}s infinite`,
          }}
        />
      ))}

      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '15%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
