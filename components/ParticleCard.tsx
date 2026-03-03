"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import Particles from "@tsparticles/react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
  imageBn: string;
  imageColor: string;
}

interface ParticleCardProps {
  project: Project;
  index: number;
  visible: boolean;
  className?: string;
}

let engineInitialized = false;

export default function ParticleCard({ project, index, visible, className = "" }: ParticleCardProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (engineInitialized) {
      setInit(true);
      return;
    }
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      engineInitialized = true;
      setInit(true);
    });
  }, []);

  return (
    <Link
      href={project.href}
      className={`
        group block rounded-none transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        ${className}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Zona de partículas */}
      <div className="relative w-full h-56 sm:h-64 lg:h-80 bg-[#FFFCF6] overflow-hidden border border-[#E8E4DC] group-hover:border-[#00C3D0] transition-colors duration-300">
        {init && (
          <Particles
            id={`particles-card-${index}`}
            className="absolute inset-0"
            options={{
              fullScreen: { enable: false },
              background: { color: "#FFFCF6" },
              particles: {
                number: { value: 40 },
                color: { value: "#00C3D0" },
                links: {
                  enable: true,
                  color: "#00C3D0",
                  distance: 120,
                  opacity: 0.4,
                  width: 1,
                },
                move: { enable: true, speed: 1 },
                size: { value: 2 },
                opacity: { value: 0.5 },
              },
              interactivity: {
                events: {
                  onHover: { enable: true, mode: "grab" },
                },
                modes: {
                  grab: { distance: 150, links: { opacity: 0.8 } },
                },
              },
            }}
          />
        )}

        <div className="absolute inset-0">
          <Image
            src={project.imageBn}
            alt={project.title}
            fill
            className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={project.imageColor}
            alt={project.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-80"
          />
        </div>
      </div>

      {/* Info */}
      <div className="border border-t-0 border-[#E8E4DC] group-hover:border-[#00C3D0] transition-colors duration-300 px-5 sm:px-6 lg:px-8 py-5 lg:py-6 text-center">
        <h3 className="text-base lg:text-lg font-bold text-black group-hover:text-[#00C3D0] transition-colors duration-300 mb-2 lg:mb-3">
          {project.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 lg:mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full border border-black text-black group-hover:border-[#00C3D0] group-hover:text-[#00C3D0] transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}