import React, { useEffect, useRef } from 'react';

const DeepSeekBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.speed = Math.random() * 0.3 + 0.2; // Slower movement
        this.angle = Math.random() * Math.PI * 2;
        this.va = Math.random() * 0.02 - 0.01; // Slower angular velocity
      }

      update() {
        this.angle += this.va;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Reset position when out of bounds
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x + this.size, this.y);
        for (let i = 0; i < 6; i++) {
          ctx.lineTo(
            this.x + this.size * Math.cos((i * Math.PI) / 3),
            this.y + this.size * Math.sin((i * Math.PI) / 3)
          );
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(100, 150, 255, 0.3)'; // Softer color
        ctx.fill();
      }
    }

    // Create particles
    const particles = [];
    const particleCount = 80; // Fewer particles for a cleaner look
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId;
    const animate = () => {
      if (!ctx) return;

      // Clear canvas with a semi-transparent overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'; // Subtle overlay
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Blur overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(10px)', // Blur effect
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default DeepSeekBackground;