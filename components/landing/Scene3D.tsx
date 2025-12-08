'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating Coin Component
function Coin({ position, rotation, scale = 1, color = '#f48b3b' }: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    color?: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
                <cylinderGeometry args={[1, 1, 0.15, 32]} />
                <meshStandardMaterial
                    color={color}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={color}
                    emissiveIntensity={0.1}
                />
            </mesh>
        </Float>
    );
}

// Floating Credit Card Component
function CreditCard({ position, rotation, scale = 1 }: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}) {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh position={position} rotation={rotation} scale={scale}>
                <boxGeometry args={[1.6, 1, 0.05]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>
            {/* Card chip */}
            <mesh position={[position[0] - 0.4, position[1] + 0.2, position[2] + 0.03]} scale={scale}>
                <boxGeometry args={[0.25, 0.2, 0.02]} />
                <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
        </Float>
    );
}

// Floating Document Component
function Document({ position, rotation, scale = 1 }: {
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
}) {
    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <mesh position={position} rotation={rotation} scale={scale}>
                <boxGeometry args={[0.8, 1.1, 0.02]} />
                <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.8} />
            </mesh>
            {/* Lines on document */}
            {[0.3, 0.1, -0.1, -0.3].map((y, i) => (
                <mesh key={i} position={[position[0], position[1] + y, position[2] + 0.015]} scale={scale}>
                    <boxGeometry args={[0.6, 0.04, 0.01]} />
                    <meshStandardMaterial color="#e5e5e5" />
                </mesh>
            ))}
        </Float>
    );
}

// Main 3D Scene
function Scene3DContent() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f48b3b" />

            {/* Floating Coins */}
            <Coin position={[-4, 2, -2]} scale={0.6} color="#f48b3b" />
            <Coin position={[4.5, 1, -3]} scale={0.8} color="#fbbf24" />
            <Coin position={[-3, -2, -1]} scale={0.5} color="#f97316" />
            <Coin position={[3, -1.5, -2]} scale={0.4} color="#f48b3b" />
            <Coin position={[5, 2.5, -4]} scale={0.7} color="#fbbf24" />

            {/* Credit Cards */}
            <CreditCard position={[-5, 0, -2]} rotation={[0.2, 0.5, 0.1]} scale={0.8} />
            <CreditCard position={[5, -2, -3]} rotation={[-0.1, -0.4, 0.1]} scale={0.6} />

            {/* Documents */}
            <Document position={[4, 3, -2]} rotation={[0.1, -0.2, 0.1]} scale={0.7} />
            <Document position={[-4.5, -2.5, -1.5]} rotation={[-0.1, 0.3, -0.1]} scale={0.5} />

            <Environment preset="city" />
        </>
    );
}

export default function Scene3D({ className = '' }: { className?: string }) {
    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas>
                <Suspense fallback={null}>
                    <Scene3DContent />
                </Suspense>
            </Canvas>
        </div>
    );
}
