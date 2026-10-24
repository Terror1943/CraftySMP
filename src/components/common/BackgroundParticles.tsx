import React, { useEffect, useRef } from 'react';

export const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      hue: number;
      life: number;
      maxLife: number;
    }

    const count = Math.min(35, Math.floor(width / 35));
    const particles: Particle[] = [];

    const createParticle = (initialRandomY = false): Particle => ({
      x: Math.random() * width,
      y: initialRandomY ? Math.random() * height : height + 10,
      size: Math.random() * 2.2 + 0.8,
      speedY: -(Math.random() * 0.7 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      hue: Math.random() < 0.6 ? 38 : Math.random() < 0.8 ? 20 : 48, // Yellow-orange-gold
      life: 0,
      maxLife: Math.random() * 300 + 150,
    });

    for (let i = 0; i < count; i++) {
      particles.push(createParticle(true));
    }

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.life++;

        // Fade in and fade out
        const progress = p.life / p.maxLife;
        const currentOpacity =
          progress < 0.2
            ? (progress / 0.2) * p.opacity
            : (1 - progress) * p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 55%, ${Math.max(0, currentOpacity)})`;
        ctx.shadowBlur = p.size * 2.5;
        ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
        ctx.fill();

        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
};
