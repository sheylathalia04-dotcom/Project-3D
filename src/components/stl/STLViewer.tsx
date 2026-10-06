import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Box, Compass, Layers, Maximize2 } from 'lucide-react';

interface STLViewerProps {
  geometry: THREE.BufferGeometry | null;
  modelColor?: string;
  dimensionsMm?: { x: number; y: number; z: number };
  fileName?: string;
  isInspecting?: boolean;
}

// Map color names to Hex suitable for light background #F1F5F9
function colorNameToHex(colorName?: string): number {
  if (!colorName) return 0x334155; // Default Slate-700
  const lower = colorName.toLowerCase();
  if (lower.includes('negro')) return 0x1e293b;
  if (lower.includes('blanco')) return 0xffffff;
  if (lower.includes('gris')) return 0x64748b;
  if (lower.includes('verde')) return 0x059669;
  if (lower.includes('esmeralda')) return 0x059669;
  if (lower.includes('transl')) return 0xa7f3d0;
  return 0x334155;
}

export const STLViewer: React.FC<STLViewerProps> = ({
  geometry,
  modelColor,
  dimensionsMm,
  fileName,
  isInspecting = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireMeshRef = useRef<THREE.LineSegments | null>(null);
  const gridRef = useRef<THREE.GridHelper | null>(null);
  const isInteractingRef = useRef<boolean>(false);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraAngleRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3,
    radius: 140,
  });
  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  // Initialize Three.js scene once with light clear CAD background #F1F5F9
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 420;

    // 1. Scene with Clear CAD Viewport Background (#F1F5F9)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf1f5f9);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 4. Lights optimized for clear background CAD inspection
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(120, 180, 140);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1024;
    dirLight1.shadow.mapSize.height = 1024;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd1fae5, 0.4); // Subtle emerald tint fill
    dirLight2.position.set(-140, 80, -120);
    scene.add(dirLight2);

    const fillLight = new THREE.DirectionalLight(0xf8fafc, 0.6);
    fillLight.position.set(0, -100, 100);
    scene.add(fillLight);

    // 5. Build Bed Grid (260mm x 260mm with emerald centerlines and clean slate subdivisions)
    const gridHelper = new THREE.GridHelper(260, 26, 0x059669, 0xcbd5e1);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 6. Camera Position update helper
    const updateCamera = () => {
      const { theta, phi, radius } = cameraAngleRef.current;
      const target = cameraTargetRef.current;

      camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = target.y + radius * Math.cos(phi);
      camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(target);
    };

    updateCamera();

    // 7. Mouse/Touch Orbit Controls
    const onMouseDown = (e: MouseEvent) => {
      isInteractingRef.current = true;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isInteractingRef.current) return;
      const dx = e.clientX - mousePosRef.current.x;
      const dy = e.clientY - mousePosRef.current.y;
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (e.buttons === 1) {
        // Left click: Orbit
        cameraAngleRef.current.theta -= dx * 0.008;
        cameraAngleRef.current.phi = Math.max(
          0.08,
          Math.min(Math.PI / 2 + 0.25, cameraAngleRef.current.phi - dy * 0.008)
        );
      } else if (e.buttons === 2) {
        // Right click: Pan
        const panSpeed = cameraAngleRef.current.radius * 0.001;
        const right = new THREE.Vector3();
        camera.getWorldDirection(right);
        right.cross(camera.up).normalize();

        cameraTargetRef.current.addScaledVector(right, -dx * panSpeed);
        cameraTargetRef.current.y += dy * panSpeed;
      }
      updateCamera();
    };

    const onMouseUp = () => {
      isInteractingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.08;
      cameraAngleRef.current.radius = Math.max(
        20,
        Math.min(800, cameraAngleRef.current.radius + zoomFactor)
      );
      updateCamera();
    };

    // Touch support for mobile devices
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isInteractingRef.current = true;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        touchStartDist = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isInteractingRef.current) {
        const dx = e.touches[0].clientX - mousePosRef.current.x;
        const dy = e.touches[0].clientY - mousePosRef.current.y;
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        cameraAngleRef.current.theta -= dx * 0.01;
        cameraAngleRef.current.phi = Math.max(
          0.1,
          Math.min(Math.PI / 2 + 0.2, cameraAngleRef.current.phi - dy * 0.01)
        );
        updateCamera();
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const factor = (touchStartDist - dist) * 0.5;
        touchStartDist = dist;
        cameraAngleRef.current.radius = Math.max(
          20,
          Math.min(800, cameraAngleRef.current.radius + factor)
        );
        updateCamera();
      }
    };

    const onTouchEnd = () => {
      isInteractingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('contextmenu', (e) => e.preventDefault());

    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    dom.addEventListener('touchmove', onTouchMove, { passive: true });
    dom.addEventListener('touchend', onTouchEnd);

    // 8. Render loop
    let animId: number;
    const render = () => {
      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };
    render();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      renderer.dispose();
    };
  }, []);

  // Update Geometry and Color whenever props change
  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!scene || !camera) return;

    // Remove existing mesh and wireframe
    if (meshRef.current) {
      scene.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      (meshRef.current.material as THREE.Material).dispose();
      meshRef.current = null;
    }
    if (wireMeshRef.current) {
      scene.remove(wireMeshRef.current);
      wireMeshRef.current.geometry.dispose();
      (wireMeshRef.current.material as THREE.Material).dispose();
      wireMeshRef.current = null;
    }

    if (!geometry) return;

    // Compute bounds and center the geometry on the build plate
    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox || new THREE.Box3();
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    // Clone geometry to avoid modifying original
    const centeredGeo = geometry.clone();
    centeredGeo.center();
    // Place bottom on the grid (y = 0)
    centeredGeo.translate(0, size.y / 2, 0);
    centeredGeo.computeVertexNormals();

    const hexColor = colorNameToHex(modelColor);

    // Solid technical material for clear CAD viewport
    const material = new THREE.MeshStandardMaterial({
      color: hexColor,
      metalness: 0.15,
      roughness: 0.35,
      flatShading: false,
    });

    const mesh = new THREE.Mesh(centeredGeo, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    meshRef.current = mesh;

    // Wireframe edges overlay with subtle emerald highlight
    const wireGeo = new THREE.WireframeGeometry(centeredGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x059669,
      linewidth: 1,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    wireMesh.visible = wireframe;
    scene.add(wireMesh);
    wireMeshRef.current = wireMesh;

    // Adjust camera view distance automatically to fit the model bounding box
    const maxDim = Math.max(size.x, size.y, size.z, 20);
    cameraAngleRef.current.radius = maxDim * 2.3;
    cameraAngleRef.current.phi = Math.PI / 3;
    cameraAngleRef.current.theta = Math.PI / 4;
    cameraTargetRef.current.set(0, size.y / 2, 0);

    const { theta, phi, radius } = cameraAngleRef.current;
    const target = cameraTargetRef.current;
    camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    camera.position.y = target.y + radius * Math.cos(phi);
    camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    camera.lookAt(target);
  }, [geometry, modelColor]);

  // Toggle wireframe visibility
  useEffect(() => {
    if (wireMeshRef.current) {
      wireMeshRef.current.visible = wireframe;
    }
  }, [wireframe]);

  // Toggle grid visibility
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // View presets
  const resetView = (angle: 'iso' | 'top' | 'front') => {
    const camera = cameraRef.current;
    if (!camera || !geometry) return;

    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox || new THREE.Box3();
    const size = new THREE.Vector3();
    bbox.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z, 20);
    const target = new THREE.Vector3(0, size.y / 2, 0);
    cameraTargetRef.current.copy(target);

    if (angle === 'iso') {
      cameraAngleRef.current = { theta: Math.PI / 4, phi: Math.PI / 3, radius: maxDim * 2.3 };
    } else if (angle === 'top') {
      cameraAngleRef.current = { theta: 0, phi: 0.05, radius: maxDim * 2.6 };
    } else if (angle === 'front') {
      cameraAngleRef.current = { theta: 0, phi: Math.PI / 2 - 0.05, radius: maxDim * 2.3 };
    }

    const { theta, phi, radius } = cameraAngleRef.current;
    camera.position.x = target.x + radius * Math.sin(phi) * Math.sin(theta);
    camera.position.y = target.y + radius * Math.cos(phi);
    camera.position.z = target.z + radius * Math.sin(phi) * Math.cos(theta);
    camera.lookAt(target);
  };

  return (
    <div
      className={`relative w-full overflow-hidden border border-slate-200 bg-[#F1F5F9] rounded-2xl select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : isInspecting ? 'h-[360px]' : 'h-[460px] md:h-[520px]'
      }`}
    >
      {/* 3D Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top HUD Overlay: File Name & Calibrated Bounding Box */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
        <div className="bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono text-[#0F172A] pointer-events-auto shadow-xs">
          <Box className="w-3.5 h-3.5 text-[#059669]" />
          <span className="font-bold max-w-[200px] sm:max-w-xs truncate">
            {fileName || 'Modelo 3D Cargado'}
          </span>
          {dimensionsMm && (
            <span className="text-[#475569] hidden sm:inline">
              · {dimensionsMm.x} × {dimensionsMm.y} × {dimensionsMm.z} mm
            </span>
          )}
        </div>

        {/* HUD Controls */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-xs">
          <button
            onClick={() => setWireframe(!wireframe)}
            title="Alternar modo alámbrico"
            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              wireframe ? 'bg-emerald-50 text-[#059669] font-bold' : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Mostrar / Ocultar retícula CAD"
            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              showGrid ? 'bg-slate-100 text-[#0F172A] font-bold' : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
          {!isInspecting && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              title="Pantalla completa"
              className="p-1.5 rounded-lg text-xs text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Bottom View Preset Buttons */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-slate-200 p-1 rounded-xl pointer-events-auto text-xs font-mono shadow-xs">
          <button
            onClick={() => resetView('iso')}
            className="px-2.5 py-1 text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Isométrica
          </button>
          <button
            onClick={() => resetView('top')}
            className="px-2.5 py-1 text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Planta
          </button>
          <button
            onClick={() => resetView('front')}
            className="px-2.5 py-1 text-[#475569] hover:text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Alzado
          </button>
          <button
            onClick={() => resetView('iso')}
            title="Centrar y reajustar"
            className="p-1.5 text-[#059669] hover:bg-emerald-50 rounded-lg transition-colors ml-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bed dimensions badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-xl text-[11px] font-mono text-[#475569] pointer-events-auto shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
          <span>Bandeja: 260×260 mm</span>
        </div>
      </div>

      {/* Touch / Click Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-[11px] font-mono text-[#475569] bg-white/90 px-3 py-1 rounded-lg border border-slate-200 shadow-xs">
          Arrastra para rotar · Rueda para zoom · Clic derecho para desplazar
        </p>
      </div>
    </div>
  );
};
