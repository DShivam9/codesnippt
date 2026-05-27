"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  // Make the plane exactly cover the screen in orthographic projection
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Convert to screen coordinates (-1 to 1) and apply basic aspect correction
  vec2 screenUv = vUv * 2.0 - 1.0;
  screenUv.x *= 1.5;
  
  vec2 mouse = uMouse;
  mouse.x *= 1.5;
  
  // Calculate distance to mouse for interaction
  float dist = length(screenUv - mouse);
  float mouseGlow = smoothstep(0.6, 0.0, dist);

  // Aspect ratio correction approximation (assuming wide screen)
  uv.x *= 1.5;

  // Add mouse disturbance to the fluid flow
  vec2 uvDisplaced = uv - normalize(screenUv - mouse) * mouseGlow * 0.1;

  // Create slow moving fluid distortion using displaced UVs
  float n1 = snoise(uvDisplaced * 2.0 + uTime * 0.05);
  float n2 = snoise(uvDisplaced * 1.5 - uTime * 0.03 + n1);
  float n3 = snoise(uvDisplaced * 3.0 + uTime * 0.02 + n2);
  
  // Combine noise for a fluid height map
  float fluid = n3 * 0.5 + 0.5; // Map from -1,1 to 0,1
  
  // Add direct mouse lift to the fluid (creates a subtle ambient glow following the cursor)
  fluid += mouseGlow * 0.3;
  
  // Extremely dark color palette
  vec3 color1 = vec3(0.02, 0.02, 0.02); // Deep black #050505
  vec3 color2 = vec3(0.06, 0.06, 0.07); // Dark gray
  vec3 color3 = vec3(0.15, 0.07, 0.00); // Faint hint of #FF9F0A
  
  vec3 finalColor = mix(color1, color2, smoothstep(0.2, 0.8, fluid));
  
  // Add extremely faint orange highlights to the "peaks"
  finalColor = mix(finalColor, color3, smoothstep(0.7, 1.0, fluid) * 0.4);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

function FluidPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  // Track mouse globally so it works even if canvas has pointer-events-none
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Interpolate mouse movement smoothly
      materialRef.current.uniforms.uMouse.value.lerp(
        targetMouse.current,
        0.05
      );
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) }
        }}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function DarkMatter() {
  const canvas = useMemo(() => (
    <Canvas orthographic camera={{ position: [0, 0, 1], left: -1, right: 1, top: 1, bottom: -1 }}>
      <FluidPlane />
    </Canvas>
  ), []);

  return (
    <div className="absolute inset-0 z-0 bg-black">
      {canvas}
    </div>
  );
}
