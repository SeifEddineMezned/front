"use client"
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, Stars } from '@react-three/drei'
import { DeviceModel } from './DeviceModel'
import { CameraRig } from './CameraRig'
import { CameraFeedSimulation } from './CameraFeedSimulation'
import { NeuralNetwork } from './NeuralNetwork'
import { StepByStepGuide } from './StepByStepGuide'
import { DataParticles } from './DataParticles'
import { Suspense } from 'react'
import { FloatingHUD } from './FloatingHUD'

export default function Scene({ children }: { children: React.ReactNode }) {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#020617] -z-10">
            <Canvas
                gl={{ antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                camera={{ position: [3, 1, 5], fov: 60 }}
            >
                <color attach="background" args={['#020617']} />

                {/* Dynamic Lighting */}
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#22d3ee" />
                <spotLight position={[-10, 15, 10]} angle={0.3} penumbra={1} intensity={2} color="#a855f7" />
                <pointLight position={[0, -2, 2]} intensity={1} color="#06b6d4" />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#22d3ee" />

                {/* Environment */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <ScrollControls pages={7} damping={0.2}>
                    <CameraRig />

                    <Suspense fallback={null}>
                        {/* Main device (hero object) */}
                        <group position={[0, 0, 0]}>
                            <DeviceModel />
                            <FloatingHUD />
                        </group>

                        {/* Camera feed simulation with detection */}
                        <CameraFeedSimulation />

                        {/* Neural network visualization */}
                        <group position={[0, 0, -3]}>
                            <NeuralNetwork />
                        </group>

                        {/* Step-by-step guide */}
                        <StepByStepGuide />

                        {/* Data particles */}
                        <DataParticles />

                        {/* Holographic grid floor */}
                        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[50, 50, 50, 50]} />
                            <meshBasicMaterial
                                color="#06b6d4"
                                wireframe
                                transparent
                                opacity={0.1}
                            />
                        </mesh>
                    </Suspense>

                    {/* HTML Scroll Content */}
                    <Scroll html style={{ width: '100vw' }}>
                        {children}
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    )
}
