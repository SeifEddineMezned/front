# XowME Visual Experience

A jaw-dropping, futuristic marketing site for the XowME AI Visual Assistant.
Built with Next.js, Three.js, and a "Deep Navy + Neon Cyan" aesthetic.

## 🚀 Key Features
- **Immersive 3D Scroll**: The camera orbits a procedural 3D device as you scroll.
- **Cinematic Transitions**: Sections morph and react (See -> Understand -> Do).
- **Control Room Aesthetic**: Glassmorphism, blurred HUDs, and glowing indicators.
- **Performance First**: 60FPS target using efficient R3F primitives and optimized post-processing.

## 🛠 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **3D Engine**: Three.js + @react-three/fiber + @react-three/drei
- **Styling**: TailwindCSS 4 (Dark Mode, Custom Tokens)
- **Effects**: @react-three/postprocessing (Bloom, Vignette, Noise)
- **Icons**: Lucide React

## 📂 Project Structure
- `src/components/canvas/`: Contains all 3D logic.
  - `Scene.tsx`: Main canvas setup + Lighting + ScrollControls.
  - `CameraRig.tsx`: Handles scroll-driven camera movement (zooms, pans).
  - `DeviceModel.tsx`: Procedurally generated 3D phone that reacts to scroll states.
- `src/app/page.tsx`: The main "Screenplay". Defines the HTML sections (Hero, See, Understand...) that overlay the 3D world.
- `src/app/globals.css`: Global design tokens, neon gradients, and glassmorphism utilities.

## ⚡ Running the Project
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000`

## 🎨 Customization
- **Colors**: Edit variables in `src/app/globals.css` (e.g., `--primary`, `--secondary`).
- **3D Motion**: Adjust waypoints in `src/components/canvas/CameraRig.tsx`.
- **Content**: Update text in `src/app/page.tsx`.
