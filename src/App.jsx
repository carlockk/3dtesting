import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line, RoundedBox, Text, useTexture } from "@react-three/drei";
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
  radius: 3.05,
  verticalGap: 1.45,
  angleStep: Math.PI * 0.72,
  travelTurns: Math.PI * 2.6,
};

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;
      setScrollProgress(THREE.MathUtils.clamp(nextProgress, 0, 1));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return scrollProgress;
}

function AxisGuide({ height }) {
  const linePoints = useMemo(
    () => [
      [0, -height / 2 - 1.5, 0],
      [0, height / 2 + 1.5, 0],
    ],
    [height],
  );

  return (
    <group>
      <Line points={linePoints} color="#f5e6b8" lineWidth={2.2} />
    </group>
  );
}

function buildGalaxyLayer({
  count,
  height,
  radiusMin,
  radiusMax,
  depthScale,
  colorRange,
  brightnessRange,
  centerBias = 1,
}) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const progress = index / count;
    const arm = index % 2 === 0 ? 1 : -1;
    const radiusT = Math.pow(Math.random(), centerBias);
    const radius = THREE.MathUtils.lerp(radiusMin, radiusMax, radiusT);
    const angle = progress * Math.PI * 9.5 * arm + radius * 0.55;
    const spread = 0.18 + (1 - radiusT) * 0.5 + Math.random() * 0.25;
    const y = (Math.random() - 0.5) * height * (0.22 + radiusT * 0.78);

    positions[stride] = Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
    positions[stride + 1] = y;
    positions[stride + 2] =
      Math.sin(angle) * radius * depthScale + (Math.random() - 0.5) * spread;

    const hue = THREE.MathUtils.lerp(colorRange[0], colorRange[1], Math.random());
    const lightness = THREE.MathUtils.lerp(brightnessRange[0], brightnessRange[1], Math.random());
    color.setHSL(hue, 0.55 + Math.random() * 0.2, lightness);
    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
  }

  return { positions, colors };
}

function GalaxyStars({ scrollProgress, height = 34 }) {
  const starsRef = useRef(null);
  const starTexture = useMemo(() => createStarTexture(), []);
  const layers = useMemo(
    () => [
      {
        ...buildGalaxyLayer({
          count: 36,
          height,
          radiusMin: 1.2,
          radiusMax: 3.8,
          depthScale: 1.04,
          colorRange: [0.08, 0.15],
          brightnessRange: [0.9, 0.99],
          centerBias: 2.1,
        }),
        size: 0.155,
        opacity: 0.95,
      },
      {
        ...buildGalaxyLayer({
          count: 110,
          height,
          radiusMin: 1.8,
          radiusMax: 5.8,
          depthScale: 0.92,
          colorRange: [0.09, 0.18],
          brightnessRange: [0.72, 0.92],
          centerBias: 1.55,
        }),
        size: 0.1,
        opacity: 0.72,
      },
      {
        ...buildGalaxyLayer({
          count: 220,
          height,
          radiusMin: 2.2,
          radiusMax: 7.4,
          depthScale: 0.78,
          colorRange: [0.54, 0.62],
          brightnessRange: [0.58, 0.8],
          centerBias: 1.2,
        }),
        size: 0.056,
        opacity: 0.46,
      },
      {
        ...buildGalaxyLayer({
          count: 394,
          height,
          radiusMin: 3.6,
          radiusMax: 10.8,
          depthScale: 0.6,
          colorRange: [0.56, 0.66],
          brightnessRange: [0.34, 0.56],
          centerBias: 0.92,
        }),
        size: 0.028,
        opacity: 0.22,
      },
    ],
    [height],
  );

  useFrame((state, delta) => {
    if (!starsRef.current) {
      return;
    }

    const targetRotation = scrollProgress * HELIX_SETTINGS.travelTurns * 0.38;
    starsRef.current.rotation.y = THREE.MathUtils.damp(
      starsRef.current.rotation.y,
      targetRotation,
      4.2,
      delta,
    );
    starsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.05;
    starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.09) * 0.04;
  });

  return (
    <group ref={starsRef} position={[0, 0, -0.8]}>
      {layers.map((layer, index) => (
        <points key={index}>
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
  );
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

function SpiralNebula({ scrollProgress }) {
  const nebulaRef = useRef(null);
  const nebulaTexture = useMemo(() => createNebulaTexture(), []);

  useFrame((state, delta) => {
    if (!nebulaRef.current) {
      return;
    }

    const targetRotation = scrollProgress * HELIX_SETTINGS.travelTurns * 0.32;
    nebulaRef.current.rotation.y = THREE.MathUtils.damp(
      nebulaRef.current.rotation.y,
      targetRotation,
      3.8,
      delta,
    );
    nebulaRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <group ref={nebulaRef} position={[0, 0, -1.8]}>
      <mesh rotation={[Math.PI / 2, 0.28, 0]} position={[0, 1.8, 0]}>
        <planeGeometry args={[18, 8.6, 1, 1]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.08}
          alphaMap={nebulaTexture ?? undefined}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, -0.42, 0]} position={[0, -0.8, -0.3]}>
        <planeGeometry args={[14.8, 6.8, 1, 1]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.07}
          alphaMap={nebulaTexture ?? undefined}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.08, 0]} position={[0, 0.2, 0.2]}>
        <planeGeometry args={[9.4, 4.8, 1, 1]} />
        <meshBasicMaterial
          color="#f8fafc"
          transparent
          opacity={0.1}
          alphaMap={nebulaTexture ?? undefined}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function HelixCards({ items, scrollProgress, onSelect }) {
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
        />
      ))}
    </group>
  );
}

function HelixCard({ item, index, count, scrollProgress, onSelect }) {
  const groupRef = useRef(null);
  const texture = useTexture(item.image);
  const motion = useRef(scrollProgress);
  const lookAtHelper = useRef(new THREE.Object3D());
  const [isHovered, setIsHovered] = useState(false);
  const [isPanelHovered, setIsPanelHovered] = useState(false);
  const isOpen = isHovered || isPanelHovered;

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    motion.current = THREE.MathUtils.damp(motion.current, scrollProgress, 7, delta);

    const focusIndex = motion.current * (count - 1);
    const localOffset = index - focusIndex;
    const angle = localOffset * HELIX_SETTINGS.angleStep;
    const y = -localOffset * HELIX_SETTINGS.verticalGap;
    const x = Math.sin(angle) * HELIX_SETTINGS.radius;
    const z = Math.cos(angle) * HELIX_SETTINGS.radius * 0.92;
    const focusStrength = 1 - THREE.MathUtils.clamp(Math.abs(localOffset), 0, 1);
    const centerPull = THREE.MathUtils.smoothstep(focusStrength, 0, 1);

    const positionX = THREE.MathUtils.lerp(x, 0, centerPull * 0.82);
    const positionZ = z + centerPull * 0.75;

    groupRef.current.position.set(
      positionX,
      y,
      positionZ,
    );

    groupRef.current.rotation.set(
      0,
      -angle * 0.82,
      Math.sin(angle * 1.15) * 0.08 * (1 - centerPull * 0.35),
    );

    lookAtHelper.current.position.set(positionX, y, positionZ);
    lookAtHelper.current.lookAt(state.camera.position);

    groupRef.current.quaternion.slerp(
      lookAtHelper.current.quaternion,
      centerPull * 0.92,
    );
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
      <Float speed={1.8} rotationIntensity={0.18} floatIntensity={0.2}>
        <group>
          <Html
            transform
            position={[0.84, 0, -0.12]}
            distanceFactor={2.1}
            wrapperClass="card-panel-anchor"
          >
            <div
              className={`card-detail-panel ${isOpen ? "is-open" : ""}`}
              onPointerEnter={() => setIsPanelHovered(true)}
              onPointerLeave={() => setIsPanelHovered(false)}
            >
              <div className="card-detail-accent" style={{ backgroundColor: item.accent }} />
              <span className="card-detail-label">Detalle</span>
              <strong>{item.title}</strong>
              <div className="card-detail-scroll">
                <p>{item.details}</p>
              </div>
            </div>
          </Html>

          <RoundedBox args={[1.36, 1.86, 0.08]} radius={0.075} smoothness={6}>
            <meshStandardMaterial
              color="#08111d"
              metalness={0.15}
              roughness={0.3}
            />
          </RoundedBox>

          <mesh position={[0, 0.32, 0.05]}>
            <planeGeometry args={[1.06, 0.73]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>

          <mesh position={[0, 0.32, 0.051]}>
            <planeGeometry args={[1.06, 0.73]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.06} />
          </mesh>

          <Text
            position={[-0.48, -0.21, 0.06]}
            anchorX="left"
            anchorY="middle"
            maxWidth={0.96}
            fontSize={0.118}
            color="#f8fafc"
          >
            {item.title}
          </Text>

          <Text
            position={[-0.48, -0.51, 0.06]}
            anchorX="left"
            anchorY="top"
            maxWidth={0.96}
            fontSize={0.07}
            lineHeight={1.35}
            color="#b8c4d3"
          >
            {item.description}
          </Text>

          <mesh position={[-0.38, -0.735, 0.06]}>
            <planeGeometry args={[0.2, 0.028]} />
            <meshBasicMaterial color={item.accent} toneMapped={false} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scene({ scrollProgress, itemCount, onSelect }) {
  const helixHeight = itemCount * HELIX_SETTINGS.verticalGap + 3;

  return (
    <>
      <color attach="background" args={["#04070c"]} />
      <fog attach="fog" args={["#04070c", 10, 26]} />

      <ambientLight intensity={1.2} />
      <directionalLight position={[6, 7, 8]} intensity={1.7} color="#fff4d6" />
      <pointLight position={[-4, 1, 6]} intensity={28} distance={28} color="#38bdf8" />
      <pointLight position={[4, -2, -3]} intensity={22} distance={22} color="#f97316" />

      <group position={[0, -0.05, 0]}>
        <SpiralNebula scrollProgress={scrollProgress} />
        <GalaxyStars scrollProgress={scrollProgress} height={helixHeight + 8} />
        <AxisGuide height={helixHeight} />
        <HelixCards items={CARD_ITEMS} scrollProgress={scrollProgress} onSelect={onSelect} />
      </group>
    </>
  );
}

export default function App() {
  const scrollProgress = useScrollProgress();
  const currentIndex = Math.round(scrollProgress * (CARD_ITEMS.length - 1));
  const activeItem = CARD_ITEMS[currentIndex];
  const handleSelectCard = (index) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) {
      return;
    }

    const targetProgress = index / (CARD_ITEMS.length - 1);
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-shell">
      <section className="scene-shell">
        <div className="canvas-wrap">
          <Canvas camera={{ position: [5.95, 0.1, 7.7], fov: 29 }} dpr={[1, 2]}>
            <Suspense fallback={null}>
              <Scene
                scrollProgress={scrollProgress}
                itemCount={CARD_ITEMS.length}
                onSelect={handleSelectCard}
              />
            </Suspense>
          </Canvas>
        </div>

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
