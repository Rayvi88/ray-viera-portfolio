import { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

let engineInitialized = false;

export async function initParticles() {
  if (engineInitialized) {
    return;
  }

  await initParticlesEngine(async (engine) => {
    await loadFull(engine);
  });

  engineInitialized = true;
}