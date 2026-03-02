"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Text, MeshTransmissionMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useState, useMemo } from 'react'

// --- Types ---
type ExhibitProps = {
    position: readonly [number, number, number]
    color: string
    label: string
    onClick: (position: readonly [number, number, number]) => void
    isActive: boolean
}

// --- Component: Glass Exhibit Box ---
function Exhibit({ position, color, label, onClick, isActive }: ExhibitProps) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        // Subtle rotation
        meshRef.current.rotation.y += delta * 0.2

        // Smooth Scale without maath
        const targetScale = isActive ? 1.2 : (hovered ? 1.1 : 1)
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5)
    })

    return (
        <group position={position as unknown as [number, number, number]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh
                    ref={meshRef}
                    onClick={(e) => {
                        e.stopPropagation()
                        onClick(position)
                    }}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <boxGeometry args={[1.5, 2, 0.2]} />
                    {/* 
                        UPDATED MATERIAL:
                        - roughnes: 0.1 for slightly less perfect glass
                        - transmission: 0.95 to see through but keep mass
                        - envMapIntensity: 2.0 to make sure reflections pop against the dark background
                        - color: slightly lighter tint
                    */}
                    <MeshTransmissionMaterial
                        backside
                        thickness={2}
                        roughness={0.1}
                        transmission={0.95}
                        ior={1.2}
                        chromaticAberration={0.1}
                        anisotropy={0.1}
                        color={color}
                        envMapIntensity={3}
                    />
                </mesh>

                {/* Floating Label */}
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label.toUpperCase()}
                </Text>
            </Float>
        </group>
    )
}

// --- Component: Camera Controller ---
function CameraController({ targetPosition }: { targetPosition: readonly [number, number, number] | null }) {
    // Use refs to store vectors to avoid garbage collection
    const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0))
    const targetVec = useRef(new THREE.Vector3())

    useFrame((state, delta) => {
        const step = 4 * delta

        if (targetPosition) {
            // Target camera position: slightly offset Z
            targetVec.current.set(targetPosition[0], targetPosition[1], targetPosition[2] + 4)
            state.camera.position.lerp(targetVec.current, step)

            // Target lookAt: center of object
            targetVec.current.set(targetPosition[0], targetPosition[1], targetPosition[2])
            lookAtTarget.current.lerp(targetVec.current, step)
        } else {
            // Reset position
            targetVec.current.set(0, 0.5, 6)
            state.camera.position.lerp(targetVec.current, step)

            // Reset lookAt: center of scene
            targetVec.current.set(0, 0, 0)
            lookAtTarget.current.lerp(targetVec.current, step)
        }

        state.camera.lookAt(lookAtTarget.current)
    })
    return null
}

export default function DashboardScene() {
    const [activeTarget, setActiveTarget] = useState<readonly [number, number, number] | null>(null)

    const exhibits = useMemo(() => [
        { id: 1, label: 'Projects', color: '#06b6d4', position: [-2.5, 0.5, 0] },
        { id: 2, label: 'Activity', color: '#a855f7', position: [-0.8, -0.5, -1] },
        { id: 3, label: 'Analytics', color: '#8b5cf6', position: [0.8, 0.5, -0.5] },
        { id: 4, label: 'Settings', color: '#ec4899', position: [2.5, -0.5, 0] },
    ] as const, [])

    return (
        <div className="fixed inset-0 w-full h-full bg-[#020617] -z-10">
            <Canvas
                gl={{ antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0.5, 6], fov: 50 }}
            >
                <color attach="background" args={['#020617']} />

                {/* Ambient & Point Lights - Increased intensity for visibility */}
                <ambientLight intensity={1.5} />
                <pointLight position={[10, 10, 10]} intensity={3} color="#06b6d4" />
                <pointLight position={[-10, -10, -10]} intensity={3} color="#a855f7" />
                <directionalLight position={[0, 5, 5]} intensity={2} color="white" />

                {/* CRITICAL: Environment map for glass reflections */}
                <Environment preset="city" />

                {/* Background */}
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                {/* Interactive Exhibits */}
                {exhibits.map((exhibit) => (
                    <Exhibit
                        key={exhibit.id}
                        {...exhibit}
                        isActive={activeTarget === exhibit.position}
                        onClick={(pos) => setActiveTarget(pos)}
                    />
                ))}

                {/* Global event catcher to reset camera on click empty space */}
                <mesh
                    position={[0, 0, -5]}
                    visible={false}
                    onClick={() => setActiveTarget(null)}
                >
                    <planeGeometry args={[100, 100]} />
                </mesh>

                <CameraController targetPosition={activeTarget} />
            </Canvas>
        </div>
    )
}
