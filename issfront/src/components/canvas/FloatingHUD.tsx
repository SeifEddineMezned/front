"use client"
import { useRef } from 'react'
import { Text, Float, Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function FloatingHUD() {
    const group = useRef<THREE.Group>(null)
    const ringRef = useRef<THREE.Mesh>(null)
    const ringRef2 = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (!group.current) return
        const t = state.clock.elapsedTime

        // Rotate entire HUD slightly
        group.current.rotation.y = Math.sin(t * 0.2) * 0.1

        // Rotate rings
        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.2
            ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.z = -t * 0.15
        }
    })

    // Tech lines
    const points = [
        new THREE.Vector3(-2, 1, 0),
        new THREE.Vector3(-1.5, 1, 0),
        new THREE.Vector3(-1.2, 1.5, 0),
        new THREE.Vector3(-2, 1.5, 0)
    ]

    return (
        <group ref={group}>
            {/* Floating Data Text */}
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                <Text
                    position={[2.5, 1, 0]}
                    fontSize={0.15}
                    color="#06b6d4"
                    anchorX="left"
                >
                    SYS.MONITOR // ONLINE
                    {'\n'}CPU: 34%
                    {'\n'}NET: CONNECTED
                </Text>
            </Float>

            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
                <Text
                    position={[-2.8, -1, 0.5]}
                    fontSize={0.1}
                    color="#a855f7"
                    anchorX="right"
                >
                    LATENCY: 12ms
                    {'\n'}BUFFER: FLUSHING
                </Text>
            </Float>

            {/* Holographic Rings */}
            <mesh ref={ringRef} position={[0, 0, -0.5]}>
                <ringGeometry args={[2.5, 2.52, 64]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>

            <mesh ref={ringRef2} position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3.0, 3.02, 64]} />
                <meshBasicMaterial color="#a855f7" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Decorative Grid Plane */}
            <gridHelper args={[20, 20, 0x1e293b, 0x1e293b]} position={[0, -4, -5]} rotation={[0, 0, 0]} />

        </group>
    )
}
