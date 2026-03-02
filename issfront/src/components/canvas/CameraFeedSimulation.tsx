"use client"
import { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { BoundingBox3D } from './BoundingBox3D'

export function CameraFeedSimulation() {
    const groupRef = useRef<THREE.Group>(null)
    const scroll = useScroll()

    useFrame(() => {
        if (!scroll || !groupRef.current) return

        // Show during "See" section
        const seeProgress = scroll.range(0.15, 0.2)
        groupRef.current.visible = seeProgress > 0.1

        if (seeProgress > 0) {
            groupRef.current.position.z = THREE.MathUtils.lerp(-5, 0, seeProgress)
        }
    })

    return (
        <group ref={groupRef} position={[0, 0, -5]}>
            {/* Simulated scene objects */}

            {/* Table */}
            <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[6, 4]} />
                <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
            </mesh>

            {/* Monitor */}
            <mesh position={[-1, 0, 0]}>
                <boxGeometry args={[1.2, 0.8, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Keyboard */}
            <mesh position={[0, -0.8, 0.5]} rotation={[-0.1, 0, 0]}>
                <boxGeometry args={[1, 0.05, 0.4]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Coffee Cup */}
            <mesh position={[1.5, -0.5, 0.3]}>
                <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Phone */}
            <mesh position={[0.8, -0.7, 0.8]} rotation={[0, 0.3, 0]}>
                <boxGeometry args={[0.15, 0.3, 0.02]} />
                <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>

            {/* Detection Boxes */}
            <BoundingBox3D
                position={[-1, 0, 0]}
                size={[1.3, 0.9, 0.15]}
                label="MONITOR"
                confidence={0.98}
                delay={0}
            />

            <BoundingBox3D
                position={[0, -0.8, 0.5]}
                size={[1.1, 0.1, 0.45]}
                label="KEYBOARD"
                confidence={0.95}
                delay={0.2}
            />

            <BoundingBox3D
                position={[1.5, -0.5, 0.3]}
                size={[0.35, 0.35, 0.35]}
                label="CUP"
                confidence={0.92}
                delay={0.4}
            />

            <BoundingBox3D
                position={[0.8, -0.7, 0.8]}
                size={[0.2, 0.35, 0.08]}
                label="PHONE"
                confidence={0.99}
                delay={0.6}
            />

            {/* Scanning grid overlay */}
            <mesh position={[0, 0, 2]} rotation={[0, 0, 0]}>
                <planeGeometry args={[8, 6]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.05}
                    wireframe
                />
            </mesh>
        </group>
    )
}
