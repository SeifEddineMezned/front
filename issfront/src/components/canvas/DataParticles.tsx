"use client"
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function DataParticles() {
    const particlesRef = useRef<THREE.Points>(null)
    const scroll = useScroll()

    const particleCount = 1000

    const particles = useMemo(() => {
        const positions = new Float32Array(particleCount * 3)
        const colors = new Float32Array(particleCount * 3)
        const speeds = new Float32Array(particleCount)

        const color1 = new THREE.Color('#06b6d4')
        const color2 = new THREE.Color('#a855f7')

        for (let i = 0; i < particleCount; i++) {
            // Create a stream path from bottom to top
            positions[i * 3] = (Math.random() - 0.5) * 10
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10

            speeds[i] = 0.5 + Math.random() * 1.5

            const mixColor = color1.clone().lerp(color2, Math.random())
            colors[i * 3] = mixColor.r
            colors[i * 3 + 1] = mixColor.g
            colors[i * 3 + 2] = mixColor.b
        }

        return { positions, colors, speeds }
    }, [])

    useFrame((state) => {
        if (!particlesRef.current) return

        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < particleCount; i++) {
            // Move particles upward (data flowing)
            positions[i * 3 + 1] += particles.speeds[i] * 0.01

            // Reset if too high
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10
                positions[i * 3] = (Math.random() - 0.5) * 10
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10
            }

            // Add some wave motion
            positions[i * 3] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.005
            positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime + i * 0.1) * 0.005
        }

        particlesRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={particles.positions}
                    itemSize={3}
                    args={[particles.positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={particleCount}
                    array={particles.colors}
                    itemSize={3}
                    args={[particles.colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
