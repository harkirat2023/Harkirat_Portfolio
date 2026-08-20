import { useEffect, useRef } from "react";
import { Camera, Geometry, Mesh, Program, Renderer } from "ogl";
import "./Particles.css";

const DEFAULT_COLORS = ["#3B82F6", "#22D3EE", "#A78BFA"];

function hexToRgb(hex) {
  const normalized = hex.replace(/^#/, "");
  const value = parseInt(normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized, 16);
  return [(value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255];
}

const vertex = `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vRandom = random;
    vColor = color;
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    mPos.x += sin(uTime * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(uTime * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(uTime * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uSizeRandomness == 0.0 ? uBaseSize : (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragment = `
  precision highp float;
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float distanceFromCenter = length(uv - vec2(0.5));
    if (uAlphaParticles < 0.5) {
      if (distanceFromCenter > 0.5) discard;
      gl_FragColor = vec4(vColor + 0.12 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float alpha = smoothstep(0.5, 0.4, distanceFromCenter) * 0.8;
      gl_FragColor = vec4(vColor + 0.12 * sin(uv.yxx + uTime + vRandom.y * 6.28), alpha);
    }
  }
`;

export default function Particles({
  particleCount = 140,
  particleSpread = 10,
  speed = 0.1,
  particleColors = DEFAULT_COLORS,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  pixelRatio = 1,
  className = "",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new Renderer({ dpr: pixelRatio, depth: false, alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 15 });
    camera.position.set(0, 0, cameraDistance);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    if (moveParticlesOnHover) window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount * 4);
    const colors = new Float32Array(particleCount * 3);
    const palette = particleColors?.length ? particleColors : DEFAULT_COLORS;
    for (let index = 0; index < particleCount; index += 1) {
      let x;
      let y;
      let z;
      let length;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        z = Math.random() * 2 - 1;
        length = x * x + y * y + z * z;
      } while (length > 1 || length === 0);
      const radius = Math.cbrt(Math.random());
      positions.set([x * radius, y * radius, z * radius], index * 3);
      randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], index * 4);
      colors.set(hexToRgb(palette[Math.floor(Math.random() * palette.length)]), index * 3);
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      random: { size: 4, data: randoms },
      color: { size: 3, data: colors },
    });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uSpread: { value: particleSpread },
        uBaseSize: { value: particleBaseSize * pixelRatio },
        uSizeRandomness: { value: sizeRandomness },
        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
      },
      transparent: true,
      depthTest: false,
    });
    const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });
    let animationFrame;
    let lastTime = performance.now();
    let elapsed = 0;

    const update = (time) => {
      animationFrame = requestAnimationFrame(update);
      const delta = time - lastTime;
      lastTime = time;
      elapsed += delta * speed;
      program.uniforms.uTime.value = elapsed * 0.001;
      particles.position.x = moveParticlesOnHover ? -mouse.x * particleHoverFactor : 0;
      particles.position.y = moveParticlesOnHover ? -mouse.y * particleHoverFactor : 0;
      if (!disableRotation) {
        particles.rotation.x = Math.sin(elapsed * 0.0002) * 0.1;
        particles.rotation.y = Math.cos(elapsed * 0.0005) * 0.15;
        particles.rotation.z += 0.01 * speed;
      }
      renderer.render({ scene: particles, camera });
    };
    animationFrame = requestAnimationFrame(update);

    return () => {
      resizeObserver.disconnect();
      if (moveParticlesOnHover) window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      geometry.remove();
      program.remove();
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
    };
  }, [alphaParticles, cameraDistance, disableRotation, moveParticlesOnHover, particleBaseSize, particleColors.join("|"), particleCount, particleHoverFactor, particleSpread, pixelRatio, sizeRandomness, speed]);

  return <div ref={containerRef} className={`particles-container ${className}`} aria-hidden="true" />;
}
