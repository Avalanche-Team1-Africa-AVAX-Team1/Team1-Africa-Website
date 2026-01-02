/**
 * Three.js Particle Background
 * Creates a subtle, depth-enhancing particle field that responds to scroll
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParticleBackgroundProps {
    className?: string
    particleCount?: number
    color?: string
    scrollContainer?: string
}

export default function ParticleBackground({
    className = '',
    particleCount = 200,
    color = '#E53935',
    scrollContainer
}: ParticleBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        )
        camera.position.z = 50

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.appendChild(renderer.domElement)
        rendererRef.current = renderer

        // Create particles
        const geometry = new THREE.BufferGeometry()
        const positions = new Float32Array(particleCount * 3)
        const velocities = new Float32Array(particleCount * 3)
        const sizes = new Float32Array(particleCount)

        for (let i = 0; i < particleCount; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 100
            positions[i * 3 + 1] = (Math.random() - 0.5) * 100
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50

            // Velocity (for subtle movement)
            velocities[i * 3] = (Math.random() - 0.5) * 0.02
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01

            // Size
            sizes[i] = Math.random() * 2 + 0.5
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

        // Store velocities for animation
        const particleVelocities = velocities

        // Custom shader material for better particles
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(color) },
                uTime: { value: 0 },
                uScrollProgress: { value: 0 },
            },
            vertexShader: `
                attribute float size;
                uniform float uTime;
                uniform float uScrollProgress;
                varying float vAlpha;
                
                void main() {
                    vec3 pos = position;
                    
                    // Add subtle wave motion
                    pos.x += sin(uTime * 0.5 + position.y * 0.1) * 2.0;
                    pos.y += cos(uTime * 0.3 + position.x * 0.1) * 2.0;
                    
                    // Scroll-based Z-depth shift
                    pos.z += uScrollProgress * 30.0;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * (30.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                    
                    // Fade based on depth
                    vAlpha = smoothstep(-50.0, 0.0, mvPosition.z) * 0.6;
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                varying float vAlpha;
                
                void main() {
                    // Circular particle with soft edges
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
                    gl_FragColor = vec4(uColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        })

        const particles = new THREE.Points(geometry, material)
        scene.add(particles)

        // Animation
        let animationId: number
        const clock = new THREE.Clock()

        const animate = () => {
            animationId = requestAnimationFrame(animate)

            const elapsedTime = clock.getElapsedTime()
            material.uniforms.uTime.value = elapsedTime

            // Update particle positions with velocity
            const positions = geometry.attributes.position.array as Float32Array
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] += particleVelocities[i * 3]
                positions[i * 3 + 1] += particleVelocities[i * 3 + 1]
                positions[i * 3 + 2] += particleVelocities[i * 3 + 2]

                // Wrap around boundaries
                if (Math.abs(positions[i * 3]) > 50) positions[i * 3] *= -0.9
                if (Math.abs(positions[i * 3 + 1]) > 50) positions[i * 3 + 1] *= -0.9
                if (Math.abs(positions[i * 3 + 2]) > 25) positions[i * 3 + 2] *= -0.9
            }
            geometry.attributes.position.needsUpdate = true

            // Subtle camera rotation
            camera.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02

            renderer.render(scene, camera)
        }

        animate()

        // Scroll-based animation
        if (scrollContainer) {
            ScrollTrigger.create({
                trigger: scrollContainer,
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    material.uniforms.uScrollProgress.value = self.progress
                }
            })
        }

        // Resize handler
        const handleResize = () => {
            if (!container) return

            camera.aspect = container.clientWidth / container.clientHeight
            camera.updateProjectionMatrix()
            renderer.setSize(container.clientWidth, container.clientHeight)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', handleResize)

            geometry.dispose()
            material.dispose()
            renderer.dispose()

            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement)
            }

            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [particleCount, color, scrollContainer])

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ zIndex: 0 }}
        />
    )
}
