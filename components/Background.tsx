"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Background() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        fullScreen: { enable: false },
        background: { color: "#FFFCF6" },
        particles: {
          number: { value: 80 },
          color: { value: "#00C3D0" },
          links: {
            enable: true,
            color: "#00C3D0",
            distance: 150,
            opacity: 0.4,
            width: 1,
          },
          move: { enable: true, speed: 1 },
          size: { value: 3 },
          opacity: { value: 0.5 },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 200, links: { opacity: 0.7 } },
            push: { quantity: 4 },
          },
        },
      }}
    />
  );
}