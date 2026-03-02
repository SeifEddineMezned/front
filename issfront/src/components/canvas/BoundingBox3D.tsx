"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface BoundingBox3DProps {
    position: [number, number, number]
    size: [number, number, number]
    label: string
    confidence: number
    delay?: number
}

export function BoundingBox3D({ position, size, label, confidence, delay = 0 }: BoundingBox3DProps) {
    const boxRef = useRef<THREE.LineSegments>(null)
    const textRef = useRef<any>(null)
    const startTime = useRef(Date.now())

    useFrame((state) => {
        const elapsed = (Date.now() - startTime.current) / 1000

        if (elapsed < delay) return

        const progress = Math.min((elapsed - delay) / 0.5, 1)

        if (boxRef.current) {
            boxRef.current.scale.setScalar(progress)

            // Pulse effect
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1
            boxRef.current.scale.multiplyScalar(pulse)

            // Rotate slightly
            boxRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }

        if (textRef.current) {
            textRef.current.material.opacity = progress
        }
    })

    // Create box edges
    const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(...size))

    return (
        <group position={position}>
            {/* Box outline */}
            <lineSegments ref={boxRef} geometry={edges}>
                <lineBasicMaterial color="#06b6d4" linewidth={2} />
            </lineSegments>

            {/* Corner markers */}
            {[
                [-size[0] / 2, size[1] / 2, size[2] / 2],
                [size[0] / 2, size[1] / 2, size[2] / 2],
                [-size[0] / 2, -size[1] / 2, size[2] / 2],
                [size[0] / 2, -size[1] / 2, size[2] / 2],
            ].map((corner, i) => (
                <mesh key={i} position={corner as [number, number, number]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#22d3ee" />
                </mesh>
            ))}

            {/* Label */}
            <Text
                ref={textRef}
                position={[0, size[1] / 2 + 0.3, 0]}
                fontSize={0.2}
                color="#06b6d4"
                anchorX="center"
                anchorY="bottom"
            >
                {label}
                {'\n'}
                <Text fontSize={0.12} color="#22d3ee">
                    {(confidence * 100).toFixed(0)}% CONF
                </Text>
            </Text>

            {/* Scanning line */}
            <mesh position={[0, 0, size[2] / 2 + 0.01]}>
                <planeGeometry args={[size[0], 0.02]} />
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    )
}
