import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, RoundedBox, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";

const CARD_ITEMS = [
  {
    title: "Aurora Layer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia bibendum nulla sed consectetur. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.",
    image: "https://picsum.photos/id/1015/900/1200",
    accent: "#38bdf8",
  },
  {
    title: "Signal Bloom",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam pellentesque ornare.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu leo quam pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis.",
    image: "https://picsum.photos/id/1025/900/1200",
    accent: "#fb7185",
  },
  {
    title: "Echo Frame",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere consectetur est at lobortis. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Curabitur blandit tempus porttitor. Donec ullamcorper nulla non metus auctor fringilla.",
    image: "https://picsum.photos/id/1035/900/1200",
    accent: "#f59e0b",
  },
  {
    title: "North Drift",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis.",
    image: "https://picsum.photos/id/1043/900/1200",
    accent: "#a3e635",
  },
  {
    title: "Quiet Pulse",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    image: "https://picsum.photos/id/1050/900/1200",
    accent: "#2dd4bf",
  },
  {
    title: "Static Tide",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio dapibus ac facilisis.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec sed odio dui. Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur.",
    image: "https://picsum.photos/id/1062/900/1200",
    accent: "#c084fc",
  },
  {
    title: "Vector Mist",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.",
    image: "https://picsum.photos/id/1074/900/1200",
    accent: "#f97316",
  },
  {
    title: "Solar Thread",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna vel.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Maecenas faucibus mollis interdum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.",
    image: "https://picsum.photos/id/1084/900/1200",
    accent: "#60a5fa",
  },
  {
    title: "Drift Echo",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus mollis interdum. Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.",
    image: "https://picsum.photos/id/1080/900/1200",
    accent: "#22c55e",
  },
  {
    title: "Glass Harbor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper nulla non metus auctor fringilla. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.",
    image: "https://picsum.photos/id/1069/900/1200",
    accent: "#e879f9",
  },
  {
    title: "Night Current",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus porta ac consectetur ac.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Aenean eu leo quam.",
    image: "https://picsum.photos/id/1057/900/1200",
    accent: "#14b8a6",
  },
  {
    title: "Field Static",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Donec id elit non mi porta gravida at eget metus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.",
    image: "https://picsum.photos/id/1041/900/1200",
    accent: "#f43f5e",
  },
  {
    title: "Clear Horizon",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis est non commodo luctus.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Vestibulum id ligula porta felis euismod semper. Cras justo odio, dapibus ac facilisis in.",
    image: "https://picsum.photos/id/1039/900/1200",
    accent: "#facc15",
  },
  {
    title: "Pulse Archive",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis.",
    image: "https://picsum.photos/id/1020/900/1200",
    accent: "#38bdf8",
  },
  {
    title: "Soft Vector",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero a pharetra augue.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.",
    image: "https://picsum.photos/id/1011/900/1200",
    accent: "#fb7185",
  },
  {
    title: "Copper Sky",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Donec sed odio dui. Cras justo odio, dapibus ac facilisis in.",
    image: "https://picsum.photos/id/1003/900/1200",
    accent: "#f97316",
  },
];

const HELIX_SETTINGS = {
  radius: 2.12,
  verticalGap: 0.82,
  angleStep: Math.PI * 0.44,
  travelTurns: Math.PI * 2.6,
};

const CARD_LAYOUT = {
  width: 1.92,
  height: 1.1,
  depth: 0.028,
  radius: 0.055,
  mediaWidth: 1.74,
  mediaHeight: 0.72,
};

const GALAXY_SETTINGS = {
  enabled: true,
  showLegacyAxisSystem: false,
  position: [-0.42, 0.12, -1.45],
  rotation: [0.24, 0.1, -0.18],
  scale: 1,
  starCount: 6200,
  starSize: 0.042,
  radius: 4.8,
  branches: 4,
  spin: 1.2,
  randomness: 0.42,
  randomnessPower: 2.8,
  verticalThickness: 0.34,
  coreRadius: 0.88,
  coreIntensity: 1.35,
  nebulaCount: 18,
  nebulaRadius: 5.6,
  nebulaOpacity: 0.17,
  scrollResponseSpeed: 1.12,
  idleRotationSpeed: 0.028,
  innerColor: "#f8fbff",
  midColor: "#7dd3fc",
  outerColor: "#7c3aed",
  accentColor: "#22d3ee",
  warmCoreColor: "#ffd39e",
};

function useScrollMetrics() {
  const [metrics, setMetrics] = useState({ progress: 0, velocity: 0 });

  useEffect(() => {
    let rafId = 0;
    let decayRafId = 0;
    const state = {
      lastY: window.scrollY,
      lastTime: performance.now(),
      velocity: 0,
    };

    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      const now = performance.now();
      const deltaY = window.scrollY - state.lastY;
      const deltaTime = Math.max((now - state.lastTime) / 1000, 1 / 240);
      const rawVelocity = deltaY / deltaTime;

      state.velocity = THREE.MathUtils.clamp(rawVelocity / 1600, -1, 1);
      state.lastY = window.scrollY;
      state.lastTime = now;

      setMetrics({
        progress: THREE.MathUtils.clamp(nextProgress, 0, 1),
        velocity: state.velocity,
      });
    };

    const decayVelocity = () => {
      state.velocity = THREE.MathUtils.damp(state.velocity, 0, 4.5, 1 / 60);
      setMetrics((current) => {
        if (Math.abs(current.velocity - state.velocity) < 0.0005) {
          return current;
        }

        return { ...current, velocity: state.velocity };
      });
      decayRafId = window.requestAnimationFrame(decayVelocity);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    decayVelocity();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.cancelAnimationFrame(decayRafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return metrics;
}

function useVisibleCardIndex(scrollProgress, itemCount, damping = 7) {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    let frameId = 0;
    let previousTime = performance.now();
    let currentProgress = scrollProgress;

    const updateIndex = (now) => {
      const delta = Math.min((now - previousTime) / 1000, 0.1);
      previousTime = now;
      currentProgress = THREE.MathUtils.damp(currentProgress, scrollProgress, damping, delta);

      const nextIndex = Math.round(currentProgress * (itemCount - 1));
      setVisibleIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));

      if (Math.abs(currentProgress - scrollProgress) > 0.0005) {
        frameId = requestAnimationFrame(updateIndex);
      }
    };

    frameId = requestAnimationFrame(updateIndex);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [scrollProgress, itemCount, damping]);

  return visibleIndex;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, [breakpoint]);

  return isMobile;
}

function AxisGuide({ scrollProgress }) {
  const axisRef = useRef(null);
  const glowTexture = useMemo(() => createNebulaTexture(), []);
  const particleTexture = useMemo(() => createStarTexture(), []);
  const sunSurfaceRef = useRef(null);
  const moonRefs = useRef([]);
  const tempSunWorld = useRef(new THREE.Vector3());
  const tempMoonWorld = useRef(new THREE.Vector3());
  const tempSunCamera = useRef(new THREE.Vector3());
  const tempMoonCamera = useRef(new THREE.Vector3());
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(54 * 3);

    for (let index = 0; index < 54; index += 1) {
      const stride = index * 3;
      const radius = 0.58 + Math.random() * 0.42;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[stride] = Math.sin(phi) * Math.cos(theta) * radius;
      positions[stride + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.82;
      positions[stride + 2] = Math.cos(phi) * radius;
    }

    return positions;
  }, []);

  const moons = useMemo(
    () => [
      {
        orbitRadiusX: 0.3,
        orbitRadiusZ: 0.22,
        orbitHeight: 0.055,
        orbitTilt: [0.48, 0.12, 0.18],
        size: 0.03,
        color: "#b8c4d3",
        phase: 0.15,
        speed: 1,
      },
      {
        orbitRadiusX: 0.4,
        orbitRadiusZ: 0.27,
        orbitHeight: 0.07,
        orbitTilt: [-0.35, -0.18, 0.42],
        size: 0.022,
        color: "#94a3b8",
        phase: 2.15,
        speed: 1.18,
      },
      {
        orbitRadiusX: 0.5,
        orbitRadiusZ: 0.34,
        orbitHeight: 0.08,
        orbitTilt: [0.22, 0.3, -0.34],
        size: 0.026,
        color: "#cbd5e1",
        phase: 4.05,
        speed: 0.86,
      },
    ],
    [],
  );
  const moonBaseColors = useMemo(() => moons.map((moon) => new THREE.Color(moon.color)), [moons]);
  const silhouetteColor = useMemo(() => new THREE.Color("#000000"), []);

  useFrame((state, delta) => {
    if (!sunSurfaceRef.current || !axisRef.current) {
      return;
    }

    const targetRotationY = scrollProgress * HELIX_SETTINGS.travelTurns * 0.9;
    const targetRotationZ = (scrollProgress - 0.5) * 0.18;

    sunSurfaceRef.current.rotation.y = THREE.MathUtils.damp(
      sunSurfaceRef.current.rotation.y,
      targetRotationY,
      4.6,
      delta,
    );
    sunSurfaceRef.current.rotation.z = THREE.MathUtils.damp(
      sunSurfaceRef.current.rotation.z,
      targetRotationZ,
      4,
      delta,
    );

    moons.forEach((moon, index) => {
      const moonRef = moonRefs.current[index];
      if (!moonRef) {
        return;
      }

      const angle = state.clock.elapsedTime * moon.speed + moon.phase;
      moonRef.position.set(
        Math.cos(angle) * moon.orbitRadiusX,
        Math.sin(angle * 2) * moon.orbitHeight,
        Math.sin(angle) * moon.orbitRadiusZ,
      );

      axisRef.current.getWorldPosition(tempSunWorld.current);
      moonRef.getWorldPosition(tempMoonWorld.current);

      tempSunCamera.current.copy(tempSunWorld.current);
      tempMoonCamera.current.copy(tempMoonWorld.current);
      state.camera.worldToLocal(tempSunCamera.current);
      state.camera.worldToLocal(tempMoonCamera.current);

      const deltaX = tempMoonCamera.current.x - tempSunCamera.current.x;
      const deltaY = tempMoonCamera.current.y - tempSunCamera.current.y;
      const screenDistance = Math.hypot(deltaX, deltaY);
      const isInFront = tempMoonCamera.current.z > tempSunCamera.current.z;
      const overlap = 1 - THREE.MathUtils.smoothstep(screenDistance, 0.1, 0.22);
      const silhouetteStrength = isInFront ? overlap : 0;
      const moonMaterial = moonRef.material;

      if (moonMaterial) {
        moonMaterial.color.copy(moonBaseColors[index]).lerp(silhouetteColor, silhouetteStrength);
        moonMaterial.emissiveIntensity = THREE.MathUtils.lerp(0.05, 0, silhouetteStrength);
      }
    });
  });

  return (
    <group ref={axisRef}>
      <pointLight position={[0, 0, 0]} intensity={10} distance={7.5} color="#ffb347" />

      <mesh scale={[1.08, 1.08, 1.08]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTexture ?? undefined}
          color="#ffb347"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={[0.82, 0.82, 0.82]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={glowTexture ?? undefined}
          color="#ffcf75"
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <points scale={[0.58, 0.58, 0.58]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          map={particleTexture ?? undefined}
          color="#ffd27a"
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={sunSurfaceRef}>
        <mesh>
          <sphereGeometry args={[0.155, 40, 40]} />
          <meshStandardMaterial
            color="#f7a53a"
            emissive="#ff8c1a"
            emissiveIntensity={1.15}
            roughness={0.96}
            metalness={0.01}
          />
        </mesh>

        <mesh position={[0.06, 0.025, 0.135]}>
          <sphereGeometry args={[0.026, 18, 18]} />
          <meshStandardMaterial
            color="#050505"
            emissive="#000000"
            emissiveIntensity={0}
            roughness={1}
            metalness={0}
          />
        </mesh>

        <mesh position={[-0.035, -0.03, 0.145]}>
          <sphereGeometry args={[0.014, 14, 14]} />
          <meshStandardMaterial
            color="#0c0c0c"
            emissive="#000000"
            emissiveIntensity={0}
            roughness={1}
            metalness={0}
          />
        </mesh>
      </group>

      <group>
        {moons.map((moon, index) => (
          <group key={index} rotation={moon.orbitTilt}>
            <mesh ref={(node) => (moonRefs.current[index] = node)}>
              <sphereGeometry args={[moon.size, 18, 18]} />
              <meshStandardMaterial
                color={moon.color}
                emissive="#101828"
                emissiveIntensity={0.05}
                roughness={0.95}
                metalness={0.02}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function buildSpiralGalaxy({
  count,
  radius,
  branches,
  spin,
  randomness,
  randomnessPower,
  verticalThickness,
  coreRadius,
  innerColor,
  midColor,
  outerColor,
  accentColor,
}) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const depthFactors = new Float32Array(count);
  const color = new THREE.Color();
  const inner = new THREE.Color(innerColor);
  const mid = new THREE.Color(midColor);
  const outer = new THREE.Color(outerColor);
  const accent = new THREE.Color(accentColor);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const radiusRatio = Math.pow(Math.random(), 1.55);
    const particleRadius = radiusRatio * radius;
    const branchAngle = ((index % branches) / branches) * Math.PI * 2;
    const spinAngle = particleRadius * spin;
    const randomScale = Math.pow(Math.random(), randomnessPower) * randomness * radiusRatio;
    const randomX = (Math.random() < 0.5 ? -1 : 1) * randomScale * radius;
    const randomY = (Math.random() - 0.5) * verticalThickness * radius * (0.3 + radiusRatio * 1.2);
    const randomZ = (Math.random() < 0.5 ? -1 : 1) * randomScale * radius;
    const angle = branchAngle + spinAngle;
    const layerDepth = THREE.MathUtils.clamp((Math.random() - 0.5) * 2.35 + randomZ / Math.max(radius * 0.8, 0.001), -1, 1);

    positions[stride] = Math.cos(angle) * particleRadius + randomX;
    positions[stride + 1] = randomY;
    positions[stride + 2] = Math.sin(angle) * particleRadius + randomZ + layerDepth * 1.45;

    const coreMix = 1 - THREE.MathUtils.smoothstep(particleRadius, 0, coreRadius);
    const midMix = THREE.MathUtils.smoothstep(particleRadius, coreRadius * 0.7, radius * 0.58);
    color.copy(inner).lerp(mid, midMix).lerp(outer, radiusRatio * 0.9);

    if (Math.random() > 0.78) {
      color.lerp(accent, 0.25 + Math.random() * 0.35);
    }

    color.offsetHSL(0, 0, coreMix * 0.12 + Math.random() * 0.04);
    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
    depthFactors[index] = layerDepth;
  }

  return { positions, colors, depthFactors };
}

function splitGalaxyLayers({ positions, colors, depthFactors }) {
  const buckets = {
    near: { positions: [], colors: [] },
    mid: { positions: [], colors: [] },
    far: { positions: [], colors: [] },
  };

  for (let index = 0; index < depthFactors.length; index += 1) {
    const stride = index * 3;
    const depth = depthFactors[index];
    const bucket = depth > 0.2 ? buckets.near : depth < -0.2 ? buckets.far : buckets.mid;

    bucket.positions.push(positions[stride], positions[stride + 1], positions[stride + 2]);
    bucket.colors.push(colors[stride], colors[stride + 1], colors[stride + 2]);
  }

  return {
    near: {
      positions: new Float32Array(buckets.near.positions),
      colors: new Float32Array(buckets.near.colors),
    },
    mid: {
      positions: new Float32Array(buckets.mid.positions),
      colors: new Float32Array(buckets.mid.colors),
    },
    far: {
      positions: new Float32Array(buckets.far.positions),
      colors: new Float32Array(buckets.far.colors),
    },
  };
}

function buildCoreCloud({ count, radius, colorA, colorB }) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  const warm = new THREE.Color(colorA);
  const bright = new THREE.Color(colorB);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const distance = Math.pow(Math.random(), 2.2) * radius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[stride] = Math.sin(phi) * Math.cos(theta) * distance;
    positions[stride + 1] = (Math.random() - 0.5) * radius * 0.42;
    positions[stride + 2] = Math.cos(phi) * distance;

    color.copy(warm).lerp(bright, Math.random() * 0.7);
    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
  }

  return { positions, colors };
}

function createStarTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.02,
    size * 0.5,
    size * 0.5,
    size * 0.5,
  );

  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.16, "rgba(255,255,255,0.98)");
  gradient.addColorStop(0.42, "rgba(255,255,255,0.42)");
  gradient.addColorStop(0.72, "rgba(255,255,255,0.1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createNebulaTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.08,
    size * 0.5,
    size * 0.5,
    size * 0.5,
  );

  gradient.addColorStop(0, "rgba(255,255,255,0.92)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.65)");
  gradient.addColorStop(0.42, "rgba(255,255,255,0.22)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.06)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function buildNebulaClouds({ count, radius }) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 + Math.random() * 0.55;
    const distance = THREE.MathUtils.lerp(radius * 0.24, radius, Math.random());
    const scale = THREE.MathUtils.lerp(1.8, 4.8, Math.random());
    const height = (Math.random() - 0.5) * radius * 0.22;

    return {
      position: [
        Math.cos(angle) * distance,
        height,
        Math.sin(angle) * distance * 0.72,
      ],
      rotation: [Math.PI / 2, Math.random() * Math.PI, Math.random() * Math.PI],
      scale,
      color:
        index % 5 === 0 ? "#f4b37d" : index % 3 === 0 ? "#7c3aed" : index % 2 === 0 ? "#38bdf8" : "#dbeafe",
      opacity: THREE.MathUtils.lerp(0.06, 0.18, Math.random()),
    };
  });
}

function SpiralGalaxy({ scrollProgress, scrollVelocity, isMobile, config = GALAXY_SETTINGS }) {
  const galaxyRef = useRef(null);
  const starsRef = useRef(null);
  const nebulaRef = useRef(null);
  const coreRef = useRef(null);
  const starTexture = useMemo(() => createStarTexture(), []);
  const nebulaTexture = useMemo(() => createNebulaTexture(), []);
  const rotationVelocity = useRef(0);
  const rotationOffset = useRef(0);
  const resolvedConfig = useMemo(
    () => ({
      ...config,
      starCount: Math.floor(config.starCount * (isMobile ? 0.55 : 1)),
      nebulaCount: Math.floor(config.nebulaCount * (isMobile ? 0.75 : 1)),
      starSize: config.starSize * (isMobile ? 0.84 : 1),
      radius: config.radius * (isMobile ? 0.88 : 1),
    }),
    [
      config,
      isMobile,
    ],
  );
  const starLayers = useMemo(() => {
    const base = buildSpiralGalaxy({
      count: resolvedConfig.starCount,
      radius: resolvedConfig.radius,
      branches: resolvedConfig.branches,
      spin: resolvedConfig.spin,
      randomness: resolvedConfig.randomness,
      randomnessPower: resolvedConfig.randomnessPower,
      verticalThickness: resolvedConfig.verticalThickness,
      coreRadius: resolvedConfig.coreRadius,
      innerColor: resolvedConfig.innerColor,
      midColor: resolvedConfig.midColor,
      outerColor: resolvedConfig.outerColor,
      accentColor: resolvedConfig.accentColor,
    });
    const layered = splitGalaxyLayers(base);

    return [
      {
        positions: layered.far.positions,
        colors: layered.far.colors,
        size: resolvedConfig.starSize * 0.5,
        opacity: 0.16,
        rotation: [0, -0.06, -0.015],
      },
      {
        positions: layered.mid.positions,
        colors: layered.mid.colors,
        size: resolvedConfig.starSize * 0.94,
        opacity: 0.5,
        rotation: [0, 0.08, 0.018],
      },
      {
        positions: layered.near.positions,
        colors: layered.near.colors,
        size: resolvedConfig.starSize * 1.92,
        opacity: 1,
        rotation: [0, 0.15, 0.04],
      },
    ];
  }, [
    resolvedConfig.accentColor,
    resolvedConfig.branches,
    resolvedConfig.coreRadius,
    resolvedConfig.innerColor,
    resolvedConfig.midColor,
    resolvedConfig.outerColor,
    resolvedConfig.radius,
    resolvedConfig.randomness,
    resolvedConfig.randomnessPower,
    resolvedConfig.spin,
    resolvedConfig.starCount,
    resolvedConfig.starSize,
    resolvedConfig.verticalThickness,
  ]);
  const coreCloud = useMemo(
    () =>
      buildCoreCloud({
        count: isMobile ? 220 : 380,
        radius: resolvedConfig.coreRadius,
        colorA: resolvedConfig.warmCoreColor,
        colorB: resolvedConfig.innerColor,
      }),
    [isMobile, resolvedConfig.coreRadius, resolvedConfig.innerColor, resolvedConfig.warmCoreColor],
  );
  const nebulaClouds = useMemo(
    () => buildNebulaClouds({ count: resolvedConfig.nebulaCount, radius: resolvedConfig.nebulaRadius }),
    [resolvedConfig.nebulaCount, resolvedConfig.nebulaRadius],
  );

  useEffect(() => {
    return () => {
      starTexture?.dispose();
      nebulaTexture?.dispose();
    };
  }, [nebulaTexture, starTexture]);

  useFrame((state, delta) => {
    if (!galaxyRef.current) {
      return;
    }

    const targetVelocity = scrollVelocity * resolvedConfig.scrollResponseSpeed;
    rotationVelocity.current = THREE.MathUtils.damp(rotationVelocity.current, targetVelocity, 5.2, delta);
    rotationOffset.current += (rotationVelocity.current + resolvedConfig.idleRotationSpeed) * delta;

    galaxyRef.current.rotation.y = rotationOffset.current;
    galaxyRef.current.rotation.x = resolvedConfig.rotation[0] + Math.sin(state.clock.elapsedTime * 0.12) * 0.035;
    galaxyRef.current.rotation.z = resolvedConfig.rotation[2] + Math.cos(state.clock.elapsedTime * 0.08) * 0.018;

    if (starsRef.current) {
      starsRef.current.rotation.z = THREE.MathUtils.damp(
        starsRef.current.rotation.z,
        resolvedConfig.rotation[1] + scrollProgress * 0.08,
        2.8,
        delta,
      );
    }

    if (nebulaRef.current) {
      nebulaRef.current.rotation.y -= delta * 0.016;
      nebulaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.06) * 0.05;
    }

    if (coreRef.current) {
      coreRef.current.scale.setScalar(
        THREE.MathUtils.lerp(1, 1.04, (Math.sin(state.clock.elapsedTime * 1.2) + 1) * 0.5),
      );
    }
  });

  return (
    <group ref={galaxyRef} position={resolvedConfig.position} scale={resolvedConfig.scale}>
      <group ref={nebulaRef}>
        {nebulaClouds.map((cloud, index) => (
          <sprite
            key={index}
            position={cloud.position}
            scale={[cloud.scale * 1.8, cloud.scale, 1]}
            rotation={cloud.rotation[2]}
          >
            <spriteMaterial
              map={nebulaTexture ?? undefined}
              color={cloud.color}
              transparent
              opacity={cloud.opacity * resolvedConfig.nebulaOpacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </sprite>
        ))}
      </group>

      <group ref={starsRef}>
        {starLayers.map((layer, index) => (
          <points key={index} rotation={layer.rotation}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={layer.positions.length / 3}
                array={layer.positions}
                itemSize={3}
              />
              <bufferAttribute
                attach="attributes-color"
                count={layer.colors.length / 3}
                array={layer.colors}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={layer.size}
              sizeAttenuation
              transparent
              opacity={layer.opacity}
              vertexColors
              map={starTexture ?? undefined}
              alphaMap={starTexture ?? undefined}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </points>
        ))}
      </group>

      <group ref={coreRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={coreCloud.positions.length / 3}
              array={coreCloud.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={coreCloud.colors.length / 3}
              array={coreCloud.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={resolvedConfig.starSize * 2.6}
            sizeAttenuation
            transparent
            opacity={resolvedConfig.coreIntensity}
            vertexColors
            map={starTexture ?? undefined}
            alphaMap={starTexture ?? undefined}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        <sprite scale={[1.15, 1.15, 1]}>
          <spriteMaterial
            map={nebulaTexture ?? undefined}
            color={resolvedConfig.warmCoreColor}
            transparent
            opacity={0.52 * resolvedConfig.coreIntensity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
        <sprite scale={[1.55, 1.55, 1]}>
          <spriteMaterial
            map={nebulaTexture ?? undefined}
            color="#ffffff"
            transparent
            opacity={0.3 * resolvedConfig.coreIntensity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
        <sprite scale={[3.1, 3.1, 1]}>
          <spriteMaterial
            map={nebulaTexture ?? undefined}
            color={resolvedConfig.accentColor}
            transparent
            opacity={0.05 * resolvedConfig.coreIntensity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      </group>
    </group>
  );
}

function HelixCards({ items, scrollProgress, onSelect, selectedIndex, isMobile }) {
  return (
    <group>
      {items.map((item, index) => (
        <HelixCard
          key={item.title}
          item={item}
          index={index}
          count={items.length}
          scrollProgress={scrollProgress}
          onSelect={onSelect}
          isSelected={selectedIndex === index}
          detailOpen={selectedIndex !== null}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
}

function HelixCard({ item, index, count, scrollProgress, onSelect, isSelected, detailOpen, isMobile }) {
  const groupRef = useRef(null);
  const shellRef = useRef(null);
  const texture = useTexture(item.image);
  const motion = useRef(scrollProgress);
  const detailProgress = useRef(0);
  const tempForward = useRef(new THREE.Vector3());
  const tempMidPosition = useRef(new THREE.Vector3());
  const tempDetailPosition = useRef(new THREE.Vector3());
  const tempTargetPosition = useRef(new THREE.Vector3());
  const tempCameraSpace = useRef(new THREE.Vector3());
  const [isHovered, setIsHovered] = useState(false);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    motion.current = THREE.MathUtils.damp(motion.current, scrollProgress, 7, delta);

    const focusIndex = motion.current * (count - 1);
    const localOffset = index - focusIndex;
    const angle = localOffset * HELIX_SETTINGS.angleStep;
    const absOffset = Math.abs(localOffset);
    const offsetRatio = THREE.MathUtils.clamp(absOffset / 4.2, 0, 1);
    const depthFalloff = THREE.MathUtils.smootherstep(offsetRatio, 0, 1);
    const y = -localOffset * HELIX_SETTINGS.verticalGap;
    const x =
      Math.sin(angle) * HELIX_SETTINGS.radius * (1 - depthFalloff * 0.14) +
      Math.sign(localOffset || 1) * absOffset * 0.08;
    const z =
      Math.cos(angle) * HELIX_SETTINGS.radius * 0.54 -
      Math.min(absOffset, 4.5) * 0.16;
    const focusStrength = 1 - THREE.MathUtils.clamp(Math.abs(localOffset), 0, 1);
    const centerPull = THREE.MathUtils.smoothstep(focusStrength, 0, 1);
    const depthScale = THREE.MathUtils.lerp(1, 0.58, depthFalloff);

    const basePositionX = THREE.MathUtils.lerp(x, 0, centerPull * 0.9);
    const rightSideSpacingCompensation = basePositionX > 0 ? absOffset * 0.12 : 0;
    const positionX = basePositionX + rightSideSpacingCompensation;
    const positionZ = z + centerPull * 0.9;
    const targetScale = depthScale + centerPull * 0.18;
    const orbitYaw = Math.atan2(positionX, positionZ);
    const visibilityScale = detailOpen ? (isSelected ? 1 : 0.68) : 1;
    detailProgress.current = THREE.MathUtils.damp(
      detailProgress.current,
      isSelected ? 1 : 0,
      5.2,
      delta,
    );
    const routeProgress = THREE.MathUtils.smootherstep(detailProgress.current, 0, 1);

    const orbitPosition = new THREE.Vector3(positionX, y, positionZ);
    const cameraForward = tempForward.current.set(0, 0, -1).applyQuaternion(state.camera.quaternion);
    const orbitDistanceToCamera = orbitPosition.distanceTo(state.camera.position);
    const perspectiveCompensation = THREE.MathUtils.clamp(
      THREE.MathUtils.mapLinear(orbitDistanceToCamera, 7.4, 8.9, 0.97, 1.03),
      0.97,
      1.03,
    );
    const midPosition = tempMidPosition.current
      .set(0, 0.04, -2.22)
      .applyMatrix4(state.camera.matrixWorld);
    const detailPosition = tempDetailPosition.current
      .set(0, isMobile ? 0.05 : 0.08, isMobile ? -3.68 : -3.32)
      .applyMatrix4(state.camera.matrixWorld);
    const targetPosition = tempTargetPosition.current
      .copy(orbitPosition)
      .lerp(midPosition, Math.min(routeProgress / 0.62, 1))
      .lerp(detailPosition, THREE.MathUtils.smoothstep(routeProgress, 0.58, 1))
      .addScaledVector(cameraForward, Math.sin(routeProgress * Math.PI) * 0.05);

    const cameraSpacePosition = tempCameraSpace.current.copy(targetPosition);
    state.camera.worldToLocal(cameraSpacePosition);
    const frontalProximity = 1 - THREE.MathUtils.clamp(Math.abs(cameraSpacePosition.x) / 2.4, 0, 1);
    const depthProximity = THREE.MathUtils.clamp((-cameraSpacePosition.z - 2.05) / 0.95, 0, 1);
    const centerFocus = frontalProximity * 0.72 + depthProximity * 0.28;

    const orbitQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, orbitYaw, Math.sin(angle * 1.12) * 0.03 * (1 - centerPull * 0.35)),
    );
    const detailQuaternion = state.camera.quaternion.clone();
    const targetQuaternion = orbitQuaternion.slerp(detailQuaternion, routeProgress);

    groupRef.current.position.copy(targetPosition);
    groupRef.current.quaternion.copy(targetQuaternion);

    if (shellRef.current) {
      shellRef.current.position.z = THREE.MathUtils.damp(
        shellRef.current.position.z,
        THREE.MathUtils.lerp(centerPull * 0.04, 0.14, detailProgress.current),
        5.5,
        delta,
      );
      shellRef.current.rotation.x = THREE.MathUtils.damp(
        shellRef.current.rotation.x,
        THREE.MathUtils.lerp((isHovered ? -0.045 : 0) + absOffset * -0.012, 0, detailProgress.current),
        5.5,
        delta,
      );
      shellRef.current.scale.setScalar(
        THREE.MathUtils.damp(
          shellRef.current.scale.x,
          THREE.MathUtils.lerp(
            (targetScale + (isHovered ? 0.04 : 0)) * visibilityScale * perspectiveCompensation,
            (isMobile ? 0.82 : 0.94) + centerFocus * (isMobile ? 0.02 : 0.03),
            routeProgress,
          ),
          5.2,
          delta,
        ),
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(event) => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={() => {
        setIsHovered(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(index);
      }}
    >
      <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.12}>
        <group ref={shellRef}>
          <RoundedBox
            args={[CARD_LAYOUT.width, CARD_LAYOUT.height, CARD_LAYOUT.depth]}
            radius={CARD_LAYOUT.radius}
            smoothness={6}
          >
            <meshStandardMaterial
              color="#09131d"
              metalness={0.2}
              roughness={0.24}
            />
          </RoundedBox>

          <mesh position={[0, isSelected ? 0.08 : 0.18, 0.05]}>
            <planeGeometry args={[CARD_LAYOUT.mediaWidth, isSelected ? 0.56 : CARD_LAYOUT.mediaHeight]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>

          <mesh position={[0, isSelected ? 0.08 : 0.18, 0.051]}>
            <planeGeometry args={[CARD_LAYOUT.mediaWidth, isSelected ? 0.56 : CARD_LAYOUT.mediaHeight]} />
            <meshBasicMaterial color="#dbeafe" transparent opacity={0.05} />
          </mesh>

          <mesh position={[0, isSelected ? -0.47 : -0.35, 0.051]}>
            <planeGeometry args={[1.74, isSelected ? 0.5 : 0.34]} />
            <meshBasicMaterial color="#09131d" transparent opacity={0.92} />
          </mesh>

          {isSelected ? (
            <mesh position={[0, 0.48, 0.051]}>
              <planeGeometry args={[1.74, 0.18]} />
              <meshBasicMaterial color="#09131d" transparent opacity={0.96} />
            </mesh>
          ) : null}

          <Text
            position={isSelected ? [-0.76, 0.48, 0.06] : [-0.76, -0.27, 0.06]}
            anchorX="left"
            anchorY="middle"
            maxWidth={1.48}
            fontSize={isSelected ? 0.082 : 0.094}
            color="#f8fafc"
          >
            {item.title}
          </Text>

          {!isSelected ? (
            <Text
              position={[-0.76, -0.39, 0.06]}
              anchorX="left"
              anchorY="top"
              maxWidth={1.48}
              fontSize={0.045}
              lineHeight={1.32}
              color="#b8c4d3"
            >
              {item.description}
            </Text>
          ) : null}

          {isSelected ? (
            <Html
              transform
              position={[0, -0.47, 0.062]}
              distanceFactor={1.34}
              wrapperClass="card-inline-anchor"
            >
              <div className="card-inline-scroll">
                <p>{item.details}</p>
              </div>
            </Html>
          ) : null}

          {!isSelected ? (
            <mesh position={[-0.62, -0.27, 0.06]}>
              <planeGeometry args={[0.18, 0.014]} />
              <meshBasicMaterial color={item.accent} toneMapped={false} />
            </mesh>
          ) : null}
        </group>
      </Float>
    </group>
  );
}

function Scene({ scrollProgress, scrollVelocity, itemCount, onSelect, selectedIndex, isMobile }) {
  const galaxyConfig = useMemo(
    () => ({
      ...GALAXY_SETTINGS,
      scale: isMobile ? 0.92 : 1,
      position: isMobile ? [-0.22, 0.06, -1.7] : GALAXY_SETTINGS.position,
    }),
    [isMobile],
  );

  return (
    <>
      <color attach="background" args={["#04070c"]} />
      <fog attach="fog" args={["#04070c", 9, 25]} />

      <ambientLight intensity={1.05} />
      <directionalLight position={[6, 7, 8]} intensity={1.35} color="#fff4d6" />
      <pointLight position={[-4, 1, 6]} intensity={20} distance={26} color="#38bdf8" />
      <pointLight position={[4, -2, -3]} intensity={15} distance={20} color="#f97316" />
      <pointLight position={[0, 0.6, -2.4]} intensity={18} distance={18} color="#dbeafe" />

      <group position={[0, -0.05, 0]}>
        {GALAXY_SETTINGS.enabled ? (
          <SpiralGalaxy
            scrollProgress={scrollProgress}
            scrollVelocity={scrollVelocity}
            isMobile={isMobile}
            config={galaxyConfig}
          />
        ) : null}
        {GALAXY_SETTINGS.showLegacyAxisSystem ? <AxisGuide scrollProgress={scrollProgress} /> : null}
        <HelixCards
          items={CARD_ITEMS}
          scrollProgress={scrollProgress}
          onSelect={onSelect}
          selectedIndex={selectedIndex}
          isMobile={isMobile}
        />
      </group>
    </>
  );
}

export default function App() {
  const { progress: scrollProgress, velocity: scrollVelocity } = useScrollMetrics();
  const currentIndex = useVisibleCardIndex(scrollProgress, CARD_ITEMS.length, 7);
  const isMobile = useIsMobile();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const activeItem = CARD_ITEMS[selectedIndex ?? currentIndex];

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedIndex]);

  const handleSelectCard = (index) => {
    if (selectedIndex === index) {
      return;
    }

    setSelectedIndex(index);
  };

  const handleCloseDetail = () => {
    setSelectedIndex(null);
  };

  return (
    <div className="page-shell">
      <section className={`scene-shell ${selectedIndex !== null ? "is-detail-open" : ""}`}>
        <div className="canvas-wrap">
          <Canvas
            camera={isMobile ? { position: [5.95, 0.14, 8.4], fov: 31 } : { position: [5.35, 0.08, 7.15], fov: 25 }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Scene
                scrollProgress={scrollProgress}
                scrollVelocity={scrollVelocity}
                itemCount={CARD_ITEMS.length}
                onSelect={handleSelectCard}
                selectedIndex={selectedIndex}
                isMobile={isMobile}
              />
            </Suspense>
          </Canvas>
        </div>

        {selectedIndex !== null ? (
          <div className="detail-controls" aria-label={`Detalle de ${activeItem.title}`}>
            <button type="button" className="detail-back" onClick={handleCloseDetail}>
              Back
            </button>
          </div>
        ) : null}

        <div className="active-footer">
          <img src={activeItem.image} alt={activeItem.title} className="footer-thumb" />
          <div className="footer-copy">
            <span className="active-label">Tarjeta visible</span>
            <strong>{activeItem.title}</strong>
            <p>{activeItem.description}</p>
          </div>
        </div>
      </section>

      <div className="scroll-track" aria-hidden="true" />
    </div>
  );
}
