"use client"
import { useRef } from 'react'
import { RoundedBox, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DeviceModel(props: any) {
    const group = useRef<THREE.Group>(null)
    const screenRef = useRef<THREE.Mesh>(null)
    const camRef = useRef<THREE.Group>(null)
    const scroll = useScroll()

    useFrame((state, delta) => {
        // Safety check for scroll context
        if (!scroll) return

        const r1 = scroll.range(0, 0.25) // Hero
        const r2 = scroll.range(0.25, 0.25) // See
        const r3 = scroll.range(0.5, 0.25) // Understand
        const r4 = scroll.range(0.75, 0.25) // Do -> End

        if (!group.current) return

        // Idle float
        group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

        // Default Rotation (Hero)
        // "See" section: Face the camera directly
        if (scroll.visible(0, 1)) {
            // simple state machine based on scroll ranges
            if (scroll.offset < 0.25) {
                // Hero: Angled
                group.current.rotation.y = THREE.MathUtils.lerp(-0.5, 0, r1)
                group.current.rotation.x = THREE.MathUtils.lerp(0.2, 0, r1)
            } else if (scroll.offset < 0.5) {
                // See: Flat
                group.current.rotation.y = THREE.MathUtils.lerp(0, 0.5, r2)
                group.current.rotation.x = 0

                // Pulse screen
                if (screenRef.current) {
                    (screenRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.2 + Math.sin(state.clock.elapsedTime * 4) * 0.1
                }

            } else if (scroll.offset < 0.75) {
                // Understand: Spin around to show back (camera)
                group.current.rotation.y = THREE.MathUtils.lerp(0.5, 3.14, r3)
                group.current.rotation.z = THREE.MathUtils.lerp(0, -0.2, r3)
            } else {
                // Do/Future: Reset
                group.current.rotation.y = THREE.MathUtils.lerp(3.14, 0, r4)
                group.current.rotation.z = THREE.MathUtils.lerp(-0.2, 0, r4)
            }
        }
    })

    return (
        <group ref={group} {...props}>
            {/* Frame (Metal/Dark Body) */}
            <RoundedBox args={[1.6, 3.2, 0.15]} radius={0.15} smoothness={4}>
                <meshStandardMaterial
                    color="#1e293b"
                    roughness={0.2}
                    metalness={0.9}
                />
            </RoundedBox>

            {/* Screen (Glass/Display) */}
            <RoundedBox ref={screenRef} args={[1.5, 3.1, 0.02]} radius={0.1} smoothness={4} position={[0, 0, 0.08]}>
                <meshPhysicalMaterial
                    color="#000000"
                    roughness={0.2}
                    metalness={0.5}
                    transmission={0}
                    emissive="#06b6d4"
                    emissiveIntensity={0.1}
                />
            </RoundedBox>

            {/* Camera Module (Back) */}
            <group ref={camRef}>
                <RoundedBox args={[1.4, 0.5, 0.05]} radius={0.05} smoothness={4} position={[0, 1.2, -0.08]}>
                    <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.8} />
                </RoundedBox>

                {/* Visual Sensor Lenses */}
                <group position={[0.4, 1.2, -0.11]}>
                    <mesh>
                        <circleGeometry args={[0.15, 32]} />
                        <meshStandardMaterial color="#111" roughness={0.1} metalness={1} />
                    </mesh>
                    <mesh position={[0, 0, 0.01]}>
                        <circleGeometry args={[0.08, 32]} />
                        <meshBasicMaterial color="#0f172a" />
                    </mesh>
                    {/* Glowing Ring */}
                    <mesh position={[0, 0, 0.005]}>
                        <ringGeometry args={[0.14, 0.16, 32]} />
                        <meshBasicMaterial color="#06b6d4" toneMapped={false} />
                    </mesh>
                </group>
            </group>

        </group>
    )
}
