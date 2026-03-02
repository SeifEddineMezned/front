"use client"
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

export function CameraRig() {
    const scroll = useScroll()

    useFrame((state) => {
        if (!scroll) return

        const offset = scroll.offset

        // 0.00 - 0.15: HERO - Outside the device, circling
        // 0.15 - 0.35: DIVE - Zoom INTO the screen
        // 0.35 - 0.55: VISION - Inside, seeing camera feed + detection
        // 0.55 - 0.75: BRAIN - Neural network visualization
        // 0.75 - 0.90: ACTION - Step-by-step guide
        // 0.90 - 1.00: COSMIC - Pull back to see the ecosystem

        // Camera positions for each phase
        const heroPos = new THREE.Vector3(3, 1, 5)
        const divePos = new THREE.Vector3(0, 0, 2)
        const visionPos = new THREE.Vector3(2, 0, 4)
        const brainPos = new THREE.Vector3(0, 2, 6)
        const actionPos = new THREE.Vector3(0, 1, 5)
        const cosmicPos = new THREE.Vector3(0, 3, 10)

        let targetPos = heroPos
        let lookAt = new THREE.Vector3(0, 0, 0)

        if (offset < 0.15) {
            // HERO: Circle around the device
            const angle = offset * Math.PI * 2
            const radius = 5
            targetPos.set(
                Math.cos(angle) * radius,
                1 + Math.sin(offset * 10) * 0.3,
                Math.sin(angle) * radius
            )
            lookAt.set(0, 0, 0)
        } else if (offset < 0.35) {
            // DIVE: Zoom into screen
            const t = (offset - 0.15) / 0.2
            targetPos.lerpVectors(divePos, new THREE.Vector3(0, 0, 0.5), t)
            lookAt.set(0, 0, -1)
        } else if (offset < 0.55) {
            // VISION: Look at camera feed simulation
            const t = (offset - 0.35) / 0.2
            targetPos.lerpVectors(visionPos, new THREE.Vector3(3, 0, 3), t)
            lookAt.set(0, 0, 0)
        } else if (offset < 0.75) {
            // BRAIN: Navigate through neural network
            const t = (offset - 0.55) / 0.2
            targetPos.lerpVectors(brainPos, new THREE.Vector3(-2, 0, 4), t)
            lookAt.set(0, 0, 0)
        } else if (offset < 0.90) {
            // ACTION: Focus on step-by-step
            const t = (offset - 0.75) / 0.15
            targetPos.lerpVectors(actionPos, new THREE.Vector3(0, 0, 6), t)
            lookAt.set(0, 0, 0)
        } else {
            // COSMIC: Epic pull back
            const t = (offset - 0.90) / 0.1
            targetPos.lerpVectors(cosmicPos, new THREE.Vector3(0, 5, 15), t)
            lookAt.set(0, 0, 0)
        }

        // Smooth camera movement
        state.camera.position.lerp(targetPos, 0.05)

        // Look at target
        const currentLookAt = new THREE.Vector3()
        state.camera.getWorldDirection(currentLookAt)
        currentLookAt.multiplyScalar(10).add(state.camera.position)
        currentLookAt.lerp(lookAt, 0.05)
        state.camera.lookAt(currentLookAt)

        // Add subtle mouse parallax in hero
        if (offset < 0.15) {
            const mouseX = state.pointer.x * 0.3
            const mouseY = state.pointer.y * 0.3
            state.camera.position.x += mouseX
            state.camera.position.y += mouseY
        }
    })

    return null
}
