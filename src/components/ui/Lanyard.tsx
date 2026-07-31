/* eslint-disable react/no-unknown-property */
import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

// Import local assets downloaded from react-bits
// @ts-ignore
import cardGLB from '../../assets/lanyard/card.glb';
// @ts-ignore
import lanyardDefaultPng from '../../assets/lanyard/lanyard.webp';

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

function createBrandedBadgeTextures() {
  const W = 512;
  const H = 768;

  // 1. FRONT FACE CANVAS
  const frontCanvas = document.createElement('canvas');
  frontCanvas.width = W;
  frontCanvas.height = H;
  const fCtx = frontCanvas.getContext('2d')!;

  // Premium dark frosted glass background
  const fBgGrad = fCtx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W);
  fBgGrad.addColorStop(0, '#161620');
  fBgGrad.addColorStop(1, '#08080a');
  fCtx.fillStyle = fBgGrad;
  fCtx.fillRect(0, 0, W, H);

  // Subtle carbon/grid texture
  fCtx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
  fCtx.lineWidth = 1;
  const grid = 20;
  for (let x = 0; x < W; x += grid) {
    fCtx.beginPath(); fCtx.moveTo(x, 0); fCtx.lineTo(x, H); fCtx.stroke();
  }
  for (let y = 0; y < H; y += grid) {
    fCtx.beginPath(); fCtx.moveTo(0, y); fCtx.lineTo(W, y); fCtx.stroke();
  }

  // Double glowing borders (outer and inner)
  const fBorderGrad = fCtx.createLinearGradient(0, 0, W, H);
  fBorderGrad.addColorStop(0, '#5D46D8');
  fBorderGrad.addColorStop(0.5, '#a855f7');
  fBorderGrad.addColorStop(1, '#4b35c2');
  
  fCtx.strokeStyle = fBorderGrad;
  fCtx.lineWidth = 14;
  fCtx.beginPath();
  fCtx.roundRect(10, 10, W - 20, H - 20, 32);
  fCtx.stroke();

  // Subtle inner glowing border
  fCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  fCtx.lineWidth = 2;
  fCtx.beginPath();
  fCtx.roundRect(22, 22, W - 44, H - 44, 22);
  fCtx.stroke();

  // Bottom radial ambient glow overlay (deep brand violet)
  const fBottomGlow = fCtx.createRadialGradient(W / 2, H - 70, 10, W / 2, H - 70, 220);
  fBottomGlow.addColorStop(0, 'rgba(93, 70, 216, 0.32)');
  fBottomGlow.addColorStop(1, 'rgba(0,0,0,0)');
  fCtx.fillStyle = fBottomGlow;
  fCtx.beginPath();
  fCtx.roundRect(10, 10, W - 20, H - 20, 32);
  fCtx.fill();

  // Branded sleek logo mark
  const logoX = W / 2;
  const logoY = 165;
  fCtx.shadowColor = 'rgba(93, 70, 216, 0.7)';
  fCtx.shadowBlur = 18;
  fCtx.strokeStyle = '#5D46D8';
  fCtx.lineWidth = 5;
  fCtx.beginPath();
  fCtx.arc(logoX, logoY, 44, 0, Math.PI * 2);
  fCtx.stroke();

  fCtx.shadowBlur = 0;
  fCtx.fillStyle = '#ffffff';
  fCtx.font = '900 46px sans-serif';
  fCtx.textAlign = 'center';
  fCtx.textBaseline = 'middle';
  fCtx.fillText('U', logoX - 15, logoY - 8);
  fCtx.fillText('S', logoX + 15, logoY + 12);

  fCtx.strokeStyle = '#a855f7';
  fCtx.lineWidth = 4;
  fCtx.beginPath();
  fCtx.moveTo(logoX - 24, logoY + 24);
  fCtx.lineTo(logoX + 24, logoY - 24);
  fCtx.stroke();

  // Typography Content
  fCtx.fillStyle = '#ffffff';
  fCtx.textAlign = 'center';
  fCtx.font = '900 28px sans-serif';
  fCtx.letterSpacing = '1px';
  fCtx.fillText('UNEXPECTED SOLUTIONS', W / 2, 265);

  fCtx.fillStyle = '#a855f7';
  fCtx.font = '800 12px sans-serif';
  fCtx.letterSpacing = '5px';
  fCtx.fillText('CREATIVE DIGITAL AGENCY', W / 2, 305);

  fCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  fCtx.lineWidth = 1.5;
  fCtx.beginPath(); fCtx.moveTo(120, 345); fCtx.lineTo(W - 120, 345); fCtx.stroke();

  fCtx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  fCtx.font = '500 16px sans-serif';
  fCtx.letterSpacing = '2px';
  fCtx.fillText('Strategy  •  Design  •  Build', W / 2, 395);

  fCtx.fillStyle = '#ffffff';
  fCtx.font = '900 18px sans-serif';
  fCtx.letterSpacing = '4px';
  fCtx.fillText('PREMIUM PARTNER PASS', W / 2, 570);

  fCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  fCtx.font = '700 11px sans-serif';
  fCtx.letterSpacing = '7px';
  fCtx.fillText('SINCE 2025', W / 2, 608);


  // 2. BACK FACE CANVAS
  const backCanvas = document.createElement('canvas');
  backCanvas.width = W;
  backCanvas.height = H;
  const bCtx = backCanvas.getContext('2d')!;

  bCtx.fillStyle = fBgGrad;
  bCtx.fillRect(0, 0, W, H);

  // Carbon grid
  bCtx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
  for (let x = 0; x < W; x += grid) {
    bCtx.beginPath(); bCtx.moveTo(x, 0); bCtx.lineTo(x, H); bCtx.stroke();
  }
  for (let y = 0; y < H; y += grid) {
    bCtx.beginPath(); bCtx.moveTo(0, y); bCtx.lineTo(W, y); bCtx.stroke();
  }

  // Glowing borders
  bCtx.strokeStyle = fBorderGrad;
  bCtx.lineWidth = 14;
  bCtx.beginPath();
  bCtx.roundRect(10, 10, W - 20, H - 20, 32);
  bCtx.stroke();

  bCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  bCtx.lineWidth = 2;
  bCtx.beginPath();
  bCtx.roundRect(22, 22, W - 44, H - 44, 22);
  bCtx.stroke();

  // Header Title
  bCtx.fillStyle = '#a855f7';
  bCtx.textAlign = 'center';
  bCtx.font = '800 13px sans-serif';
  bCtx.letterSpacing = '5px';
  bCtx.fillText('CORE CAPABILITIES', W / 2, 120);

  bCtx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  bCtx.beginPath(); bCtx.moveTo(140, 150); bCtx.lineTo(W - 140, 150); bCtx.stroke();

  // Core Services List
  const services = [
    'WEBSITES',
    'WEB APPLICATIONS',
    'AI INTEGRATIONS',
    'BRAND ARCHITECTURE',
    'DIGITAL MARKETING'
  ];
  bCtx.fillStyle = '#ffffff';
  bCtx.font = '900 18px sans-serif';
  bCtx.letterSpacing = '3px';
  services.forEach((s, idx) => {
    bCtx.fillText(s, W / 2, 210 + idx * 48);
  });

  // QR Code Placeholder
  const qrSize = 100;
  const qrX = W / 2 - qrSize / 2;
  const qrY = 480;
  bCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  bCtx.beginPath();
  bCtx.roundRect(qrX, qrY, qrSize, qrSize, 8);
  bCtx.fill();

  // QR corner marks
  bCtx.fillStyle = '#0b0b0d';
  bCtx.fillRect(qrX + 8, qrY + 8, 22, 22);
  bCtx.fillRect(qrX + qrSize - 30, qrY + 8, 22, 22);
  bCtx.fillRect(qrX + 8, qrY + qrSize - 30, 22, 22);

  bCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  bCtx.fillRect(qrX + 14, qrY + 14, 10, 10);
  bCtx.fillRect(qrX + qrSize - 24, qrY + 14, 10, 10);
  bCtx.fillRect(qrX + 14, qrY + qrSize - 24, 10, 10);

  // Tiny random bits
  bCtx.fillStyle = '#0b0b0d';
  bCtx.fillRect(qrX + 38, qrY + 38, 24, 8);
  bCtx.fillRect(qrX + 48, qrY + 12, 10, 14);
  bCtx.fillRect(qrX + 12, qrY + 48, 16, 12);
  bCtx.fillRect(qrX + 68, qrY + 68, 18, 18);

  // Website Url
  bCtx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  bCtx.font = '800 12px sans-serif';
  bCtx.letterSpacing = '3px';
  bCtx.fillText('UNEXPECTEDSOLNS.COM', W / 2, 620);


  // 3. LANYARD BAND TEXTURE CANVAS
  const lWidth = 512;
  const lHeight = 64;
  const lanyardCanvas = document.createElement('canvas');
  lanyardCanvas.width = lWidth;
  lanyardCanvas.height = lHeight;
  const lCtx = lanyardCanvas.getContext('2d')!;

  lCtx.fillStyle = '#3E2DB0'; // deep purple background
  lCtx.fillRect(0, 0, lWidth, lHeight);

  // Band accent line details
  lCtx.fillStyle = '#4c35d9';
  lCtx.fillRect(0, 0, lWidth, 6);
  lCtx.fillRect(0, lHeight - 6, lWidth, 6);

  lCtx.fillStyle = '#ffffff';
  lCtx.font = '900 14px sans-serif';
  lCtx.textAlign = 'center';
  lCtx.textBaseline = 'middle';
  
  lCtx.fillText('UNEXPECTED • SOLUTIONS •', lWidth / 4, lHeight / 2);
  lCtx.fillText('UNEXPECTED • SOLUTIONS •', (3 * lWidth) / 4, lHeight / 2);

  return {
    front: frontCanvas.toDataURL(),
    back: backCanvas.toDataURL(),
    band: lanyardCanvas.toDataURL()
  };
}

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  lanyardWidth?: number;
}

export const Lanyard: React.FC<LanyardProps> = ({
  position = [0, 0, 20],
  fov = 20,
  transparent = true,
  lanyardWidth = 1.2
}) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const textures = useMemo(() => createBrandedBadgeTextures(), []);

  return (
    <div className="lanyard-wrapper w-full h-full min-h-[450px] pointer-events-auto">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.25 : 1.75]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <SwayingBadge
            isMobile={isMobile}
            frontImage={textures.front}
            backImage={textures.back}
            lanyardImage={textures.band}
            lanyardWidth={lanyardWidth}
          />
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
};

interface SwayingBadgeProps {
  isMobile: boolean;
  frontImage: string;
  backImage: string;
  lanyardImage: string;
  lanyardWidth: number;
}

// 3D swaying card component with mouse spring inertia (No Rapier physics WASM dependency)
const SwayingBadge: React.FC<SwayingBadgeProps> = ({
  isMobile,
  frontImage,
  backImage,
  lanyardImage,
  lanyardWidth
}) => {
  const cardGroupRef = useRef<THREE.Group>(null);
  const bandRef = useRef<any>(null);
  
  const { viewport, camera } = useThree();
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyardDefaultPng);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the textures onto the card model
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img: HTMLImageElement, rect: typeof FRONT_UV_RECT) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const scale = Math.max(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) drawFitted(frontTex.image as any, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image as any, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, frontTex, backTex, materials.base.map]);

  // Spring Physics States (Pendulum dynamics)
  // Shifted x to 2.3 so the card rests on the right-hand side of the wide canvas, lowering y to -1.3 (longer strap)
  const pos = useMemo(() => new THREE.Vector3(2.3, -1.1, 0), []);
  const vel = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const rot = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const rotVel = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.3, 4.8, 0),
    new THREE.Vector3(2.4, 2.6, 0),
    new THREE.Vector3(2.35, 1.0, 0),
    new THREE.Vector3(2.3, -1.1, 0)
  ]));

  const pointer = useMemo(() => new THREE.Vector2(), []);
  const [dragged, setDragged] = useState<THREE.Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);
  const rayPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycastIntersection = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);

    // Map pointer coordinates
    pointer.set(state.pointer.x * (viewport.width / 2), state.pointer.y * (viewport.height / 2));

    if (dragged) {
      // Raycast pointer onto the Z=0 plane to drag
      state.raycaster.ray.intersectPlane(rayPlaneRef.current, raycastIntersection);
      const targetPos = raycastIntersection.clone().sub(dragged);
      
      // Interpolate to drag position
      pos.lerp(targetPos, 0.25);
      vel.set(0, 0, 0);

      // Rotate card towards drag speed
      rot.x = THREE.MathUtils.lerp(rot.x, -state.pointer.y * 0.5, 0.2);
      rot.y = THREE.MathUtils.lerp(rot.y, state.pointer.x * 0.9, 0.2);
      rot.z = THREE.MathUtils.lerp(rot.z, -state.pointer.x * 0.35, 0.2);
    } else {
      // Resting position shifted to x = 2.3, y = -1.3 (longer strap)
      const restingPos = new THREE.Vector3(2.3, -1.3, 0);
      
      // Pendulum sway based on mouse pointer hover proximity
      if (hovered) {
        restingPos.x += state.pointer.x * 1.5;
        restingPos.y += state.pointer.y * 0.8;
      } else {
        // Soft ambient idle breathing sway
        restingPos.x += Math.sin(state.clock.getElapsedTime() * 1.5) * 0.35;
        restingPos.y += Math.cos(state.clock.getElapsedTime() * 2.0) * 0.12;
      }

      const force = new THREE.Vector3().subVectors(restingPos, pos);
      // Spring stiffness = 85, Damping = 9.5
      force.multiplyScalar(85).sub(vel.clone().multiplyScalar(9.5));
      vel.addScaledVector(force, dt);
      pos.addScaledVector(vel, dt);

      // Rotational spring physics
      const targetRot = new THREE.Vector3(
        vel.y * 0.12,
        -vel.x * 0.18 + (hovered ? state.pointer.x * 0.6 : 0),
        -vel.x * 0.08
      );
      
      const rotForce = new THREE.Vector3().subVectors(targetRot, rot);
      rotForce.multiplyScalar(120).sub(rotVel.clone().multiplyScalar(11.0));
      rotVel.addScaledVector(rotForce, dt);
      rot.addScaledVector(rotVel, dt);
    }

    // Apply translation to 3D mesh group
    if (cardGroupRef.current) {
      cardGroupRef.current.position.copy(pos);
      cardGroupRef.current.rotation.set(rot.x, rot.y, rot.z);
    }

    // Draw flexible lanyard strap curve connecting anchor [2.3, 4.8, 0] (behind navbar) to card clamp
    if (bandRef.current) {
      curve.points[0].set(2.3, 4.8, 0); // top anchor
      
      // Control points sway lag behind card
      curve.points[1].set(2.3 + (pos.x - 2.3) * 0.24, 2.3 + pos.y * 0.1, pos.z * 0.15);
      curve.points[2].set(2.3 + (pos.x - 2.3) * 0.65, 0.5 + pos.y * 0.3, pos.z * 0.5);
      
      // Connection point (top of card clamp at card group space offset)
      curve.points[3].copy(pos).add(new THREE.Vector3(0, 1.45, 0).applyEuler(new THREE.Euler(rot.x, rot.y, rot.z)));
      
      bandRef.current.geometry.setPoints(curve.getPoints(isMobile ? 18 : 36));
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group
        ref={cardGroupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={e => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          const intersectionPoint = e.point.clone();
          setDragged(intersectionPoint.sub(pos));
          
          rayPlaneRef.current.setFromNormalAndCoplanarPoint(
            new THREE.Vector3(0, 0, 1).applyQuaternion(camera.quaternion),
            e.point
          );
        }}
        onPointerUp={e => {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          setDragged(null);
        }}
      >
        <group scale={2.25} position={[0, -1.2, -0.05]}>
          <mesh geometry={nodes.card.geometry}>
            <meshPhysicalMaterial
              map={cardMap}
              map-anisotropy={16}
              clearcoat={isMobile ? 0 : 1}
              clearcoatRoughness={0.15}
              roughness={0.95}
              metalness={0.85}
            />
          </mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </group>
      
      <mesh ref={bandRef}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="white"
          depthWrite={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
};

useGLTF.preload(cardGLB);
export default Lanyard;
