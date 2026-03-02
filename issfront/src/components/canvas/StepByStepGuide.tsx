"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

export function StepByStepGuide() {
    const groupRef = useRef<THREE.Group>(null)
    const scroll = useScroll()

    useFrame(() => {
        if (!scroll || !groupRef.current) return

        // Show during "Do" section
        const doProgress = scroll.range(0.55, 0.2)
        groupRef.current.visible = doProgress > 0.1

        if (doProgress > 0) {
            groupRef.current.position.z = THREE.MathUtils.lerp(-5, 0, doProgress)
            groupRef.current.position.y = THREE.MathUtils.lerp(2, 0, doProgress)
        }
    })

    const steps = [
        { pos: [-2, 1, 0] as [number, number, number], num: "1", text: "Remove battery cover", active: true },
        { pos: [0, 0.5, 0] as [number, number, number], num: "2", text: "Disconnect cable", active: true },
        { pos: [2, 0, 0] as [number, number, number], num: "3", text: "Replace component", active: false },
        { pos: [0, -1, 0] as [number, number, number], num: "4", text: "Reconnect & test", active: false },
    ]

    return (
        <group ref={groupRef} position={[0, 2, -5]}>
            {/* Center device being repaired */}
            <mesh position={[0, 0, 0]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[2, 0.1, 1.5]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </mesh>

            {/* Battery compartment */}
            <mesh position={[-0.5, 0.06, 0]} rotation={[0.3, 0, 0]}>
                <boxGeometry args={[0.8, 0.05, 0.6]} />
                <meshStandardMaterial color="#0f172a" />
            </mesh>

            {/* Step indicators */}
            {steps.map((step, i) => (
                <group key={i} position={step.pos}>
                    {/* Step number badge */}
                    <mesh>
                        <circleGeometry args={[0.3, 32]} />
                        <meshBasicMaterial
                            color={step.active ? "#06b6d4" : "#334155"}
                            transparent
                            opacity={step.active ? 1 : 0.5}
                        />
                    </mesh>

                    {/* Number */}
                    <Text
                        position={[0, 0, 0.01]}
                        fontSize={0.25}
                        color={step.active ? "#000" : "#666"}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {step.num}
                    </Text>

                    {/* Instruction text */}
                    <Text
                        position={[0, -0.5, 0]}
                        fontSize={0.12}
                        color={step.active ? "#06b6d4" : "#64748b"}
                        anchorX="center"
                        anchorY="top"
                        maxWidth={2}
                    >
                        {step.text}
                    </Text>

                    {/* Pointing arrow for active steps */}
                    {step.active && (
                        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI]}>
                            <coneGeometry args={[0.1, 0.3, 4]} />
                            <meshBasicMaterial color="#06b6d4" />
                        </mesh>
                    )}

                    {/* Highlight glow */}
                    {step.active && (
                        <mesh scale={1.5}>
                            <circleGeometry args={[0.3, 32]} />
                            <meshBasicMaterial
                                color="#06b6d4"
                                transparent
                                opacity={0.2}
                            />
                        </mesh>
                    )}
                </group>
            ))}

            {/* Progress indicator */}
            <group position={[0, -2, 0]}>
                <Text
                    fontSize={0.15}
                    color="#22d3ee"
                    anchorX="center"
                >
                    STEP 2 OF 4 IN PROGRESS
                </Text>

                {/* Progress bar */}
                <mesh position={[0, -0.3, 0]}>
                    <planeGeometry args={[3, 0.05]} />
                    <meshBasicMaterial color="#1e293b" />
                </mesh>
                <mesh position={[-0.75, -0.3, 0.01]}>
                    <planeGeometry args={[1.5, 0.05]} />
                    <meshBasicMaterial color="#06b6d4" />
                </mesh>
            </group>

            {/* Completion checkmark animation */}
            <group position={[-2, 1, 0.5]}>
                <mesh rotation={[0, 0, -Math.PI / 4]}>
                    <planeGeometry args={[0.15, 0.4]} />
                    <meshBasicMaterial color="#22c55e" />
                </mesh>
                <mesh position={[0.2, -0.1, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <planeGeometry args={[0.4, 0.15]} />
                    <meshBasicMaterial color="#22c55e" />
                </mesh>
            </group>
        </group>
    )
}
