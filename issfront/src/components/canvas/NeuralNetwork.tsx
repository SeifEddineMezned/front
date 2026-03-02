"use client"
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function NeuralNetwork() {
    const groupRef = useRef<THREE.Group>(null)
    const linesRef = useRef<THREE.Line[]>([])

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
        }

        // Animate connection pulses
        linesRef.current.forEach((line, i) => {
            if (line && line.material) {
                const mat = line.material as THREE.LineBasicMaterial
                mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.2
            }
        })
    })

    // Neural network structure
    const layers = [
        { count: 8, z: -2, color: '#06b6d4' },
        { count: 12, z: 0, color: '#22d3ee' },
        { count: 12, z: 2, color: '#a855f7' },
        { count: 6, z: 4, color: '#c084fc' },
    ]

    const nodes: { pos: [number, number, number], color: string }[] = []

    layers.forEach(layer => {
        const radius = 2
        const angleStep = (Math.PI * 2) / layer.count

        for (let i = 0; i < layer.count; i++) {
            const angle = i * angleStep
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            nodes.push({ pos: [x, y, layer.z], color: layer.color })
        }
    })

    // Create connections between layers
    const connections: [number, number][] = []
    let nodeIndex = 0

    for (let l = 0; l < layers.length - 1; l++) {
        const currentLayerStart = nodeIndex
        const currentLayerCount = layers[l].count
        const nextLayerStart = nodeIndex + currentLayerCount
        const nextLayerCount = layers[l + 1].count

        // Connect each node in current layer to random nodes in next layer
        for (let i = 0; i < currentLayerCount; i++) {
            const connectionsToMake = Math.min(3, nextLayerCount)
            for (let c = 0; c < connectionsToMake; c++) {
                const targetIndex = nextLayerStart + Math.floor(Math.random() * nextLayerCount)
                connections.push([currentLayerStart + i, targetIndex])
            }
        }

        nodeIndex += currentLayerCount
    }

    return (
        <group ref={groupRef}>
            {/* Nodes */}
            {nodes.map((node, i) => (
                <mesh key={`node-${i}`} position={node.pos}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial
                        color={node.color}
                        emissive={node.color}
                        emissiveIntensity={0.5}
                    />

                    {/* Node glow */}
                    <mesh scale={1.5}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshBasicMaterial
                            color={node.color}
                            transparent
                            opacity={0.2}
                        />
                    </mesh>
                </mesh>
            ))}

            {/* Connections */}
            {connections.map(([from, to], i) => {
                const fromPos = nodes[from].pos
                const toPos = nodes[to].pos

                const points = [
                    new THREE.Vector3(...fromPos),
                    new THREE.Vector3(...toPos)
                ]

                const geometry = new THREE.BufferGeometry().setFromPoints(points)

                return (
                    <line key={`conn-${i}`} geometry={geometry} ref={(el) => {
                        if (el) linesRef.current[i] = el as any
                    }}>
                        <lineBasicMaterial
                            color="#06b6d4"
                            transparent
                            opacity={0.3}
                        />
                    </line>
                )
            })}

            {/* Data pulses */}
            {[...Array(5)].map((_, i) => {
                const randomConnection = connections[Math.floor(Math.random() * connections.length)]
                const fromPos = nodes[randomConnection[0]].pos
                const toPos = nodes[randomConnection[1]].pos
                const midPoint = [
                    (fromPos[0] + toPos[0]) / 2,
                    (fromPos[1] + toPos[1]) / 2,
                    (fromPos[2] + toPos[2]) / 2,
                ] as [number, number, number]

                return (
                    <mesh key={`pulse-${i}`} position={midPoint}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="#22d3ee" />
                    </mesh>
                )
            })}
        </group>
    )
}

