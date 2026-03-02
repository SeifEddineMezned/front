"use client"
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { Stars, shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'

// --- Portal Shader Material ---
const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#06b6d4'), // Cyan
        uColorEnd: new THREE.Color('#a855f7'),   // Purple
        uIntensity: 1.0
    },
    // Vertex Shader
    `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
    // Fragment Shader
    `
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  uniform float uIntensity;
  varying vec2 vUv;

  // Simple noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  void main() {
    vec2 center = vec2(0.5, 0.5);
    vec2 uv = vUv - center;
    float dist = length(uv) * 2.0;
    
    // Swirl effect
    float angle = atan(uv.y, uv.x);
    float swirl = angle + dist * 2.0 - uTime * 0.5;
    
    // Radial waves
    float wave = sin(dist * 10.0 - uTime * 2.0);
    
    // Noise texture (approximated)
    float n = random(uv + uTime * 0.1);
    
    // Combine patterns
    float strength = (sin(swirl * 5.0) + wave) * 0.5 + 0.5;
    strength *= (1.0 - dist); // Fade to edges
    strength += n * 0.1;
    
    // Boost intensity
    strength = pow(strength, 2.0) * uIntensity;

    // Mix colors
    vec3 color = mix(uColorStart, uColorEnd, strength + dist);
    
    // Alpha fade
    float alpha = smoothstep(1.0, 0.2, dist);
    
    gl_FragColor = vec4(color, alpha * strength);
  }
  `
)

extend({ PortalMaterial })

// --- Correct Type Definition for R3F v9+ ---
// This module declaration allows 'portalMaterial' to be used as a JSX element
declare module '@react-three/fiber' {
    interface ThreeElements {
        portalMaterial: {
            ref?: React.Ref<any>
            uTime?: number
            uColorStart?: THREE.Color
            uColorEnd?: THREE.Color
            uIntensity?: number
        } & ThreeElements['shaderMaterial']
    }
}

interface PortalPlaneProps {
    intensity: number
}

function PortalPlane({ intensity }: PortalPlaneProps) {
    const materialRef = useRef<any>()

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta
            // Smoothly lerp intensity
            materialRef.current.uIntensity = THREE.MathUtils.lerp(
                materialRef.current.uIntensity,
                intensity,
                delta * 2
            )
        }
    })

    return (
        <mesh position={[0, 0, -2]} rotation={[0, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <portalMaterial
                ref={materialRef}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uColorStart={new THREE.Color('#06b6d4')}
                uColorEnd={new THREE.Color('#a855f7')}
            />
        </mesh>
    )
}

interface LoginSceneProps {
    intensity?: number
}

export default function LoginScene({ intensity = 1 }: LoginSceneProps) {
    return (
        <div className="fixed inset-0 w-full h-full bg-[#020617] -z-10">
            <Canvas
                gl={{ antialias: true, powerPreference: "high-performance" }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 4], fov: 60 }}
            >
                <color attach="background" args={['#020617']} />

                {/* Lights */}
                <ambientLight intensity={0.4} />
                <pointLight position={[-4, 2, 3]} intensity={1} color="#06b6d4" />
                <pointLight position={[4, -2, 3]} intensity={1} color="#a855f7" />

                {/* Background Stars */}
                <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                {/* The Portal */}
                <PortalPlane intensity={intensity} />
            </Canvas>
        </div>
    )
}
