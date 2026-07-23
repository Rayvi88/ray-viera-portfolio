"use client";

import Particles from "@tsparticles/react";

interface InteractiveParticlesProps {
  init: boolean;
}

export default function InteractiveParticles({
  init,
}: InteractiveParticlesProps) {
  if (!init) {
    return null;
  }

  return (
    <Particles
      id="interactive-hero-particles"
      className="absolute inset-0"
      options={{
        fullScreen: {
          enable: false,
        },

        background: {
          color: "#FFFCF6",
        },

        particles: {
          number: {
            value: 55,
            density: {
              enable: true,
              width: 1200,
              height: 800,
            },
          },

          color: {
            value: "#00C3D0",
          },

          links: {
            enable: true,
            color: "#00C3D0",
            distance: 140,
            opacity: 0.25,
            width: 1,
          },

          move: {
            enable: true,
            speed: 0.6,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce",
            },
          },

          size: {
            value: {
              min: 1,
              max: 2.5,
            },
          },

          opacity: {
            value: {
              min: 0.2,
              max: 0.6,
            },

            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
        },

        interactivity: {
          detectsOn: "window",

          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },

            onClick: {
              enable: false,
            },

            resize: {
              enable: true,
            },
          },

          modes: {
            grab: {
              distance: 180,

              links: {
                opacity: 0.7,
              },
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}