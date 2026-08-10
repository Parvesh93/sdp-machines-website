# SDP Machines — Next.js Interactive Foundation

Foundation derived from the client Website Revamp Brief v2.4.

## Architecture
- Next.js App Router + TypeScript
- Semantic HTML/content remains outside WebGL for SEO/accessibility
- React Three Fiber for assembly-level interactive 3D
- GSAP ScrollTrigger for pinned/scrubbed storytelling
- Machine data is content-driven (`content/machines.ts`)
- Reduced-motion fallback is built into the motion boundary
- WebGL DPR is capped as a first mobile-performance safeguard

## Current routes
- `/` — hero, machine gallery, placeholder service/installations/about/contact blocks
- `/machines/[slug]` — product hero, scroll-driven 3D chapter scaffold, technical-details handoff

## Asset pipeline still required
1. SDP engineering supplies assembly-level CAD/reference.
2. Optimize in Blender: remove hidden geometry, merge static meshes, set pivots, simplify materials.
3. Export named GLB assemblies per machine family.
4. Compress geometry/textures (Meshopt/Draco + KTX2 where appropriate).
5. Replace `PlaceholderMachine` with a loader mapping chapter IDs to GLB node names.

## Hero recommendation
Keep the metal-fabrication -> SDP-logo -> real-nameplate sequence as authored video/VFX, then transition into semantic page UI. Do not make this entire sequence realtime 3D.

## Run
`npm install`
`npm run dev`

Dependency installation could not be executed in the supplied environment because its npm registry does not expose Next.js. The project files are ready for a normal npm/pnpm environment.
