import * as THREE from 'three';

export interface StlMetrics {
  dimensionsMm: {
    x: number;
    y: number;
    z: number;
  };
  volumeCm3: number;
  surfaceAreaCm2: number;
  triangleCount: number;
  geometry: THREE.BufferGeometry;
}

/**
 * Computes exact volume of a 3D manifold mesh using the signed tetrahedron algorithm.
 * 1 mm³ = 0.001 cm³ (divide total by 1000)
 */
export function calculateMeshVolume(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  if (!position) return 0;

  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();
  let totalSignedVolume = 0;

  const count = position.count;
  for (let i = 0; i < count; i += 3) {
    p1.fromBufferAttribute(position, i);
    p2.fromBufferAttribute(position, i + 1);
    p3.fromBufferAttribute(position, i + 2);

    // Signed volume of tetrahedron formed by origin and triangle (p1, p2, p3)
    // V = (p1 · (p2 × p3)) / 6
    const crossX = p2.y * p3.z - p2.z * p3.y;
    const crossY = p2.z * p3.x - p2.x * p3.z;
    const crossZ = p2.x * p3.y - p2.y * p3.x;

    const signedVol = (p1.x * crossX + p1.y * crossY + p1.z * crossZ) / 6.0;
    totalSignedVolume += signedVol;
  }

  // Volume in mm³ converted to cm³
  const volumeMm3 = Math.abs(totalSignedVolume);
  return volumeMm3 / 1000.0;
}

/**
 * Computes total surface area of the mesh in cm²
 * 1 mm² = 0.01 cm² (divide total by 100)
 */
export function calculateSurfaceArea(geometry: THREE.BufferGeometry): number {
  const position = geometry.attributes.position;
  if (!position) return 0;

  const vA = new THREE.Vector3();
  const vB = new THREE.Vector3();
  const vC = new THREE.Vector3();
  const ab = new THREE.Vector3();
  const ac = new THREE.Vector3();
  const cross = new THREE.Vector3();
  let totalAreaMm2 = 0;

  const count = position.count;
  for (let i = 0; i < count; i += 3) {
    vA.fromBufferAttribute(position, i);
    vB.fromBufferAttribute(position, i + 1);
    vC.fromBufferAttribute(position, i + 2);

    ab.subVectors(vB, vA);
    ac.subVectors(vC, vA);
    cross.crossVectors(ab, ac);

    totalAreaMm2 += cross.length() * 0.5;
  }

  return totalAreaMm2 / 100.0;
}

/**
 * Parses binary or ASCII STL from ArrayBuffer
 */
export function parseSTL(buffer: ArrayBuffer): StlMetrics {
  const isBinary = isBufferBinary(buffer);
  const geometry = isBinary ? parseBinarySTL(buffer) : parseAsciiSTL(buffer);

  // Compute bounding box
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const volumeCm3 = Math.max(0.1, calculateMeshVolume(geometry));
  const surfaceAreaCm2 = Math.max(0.1, calculateSurfaceArea(geometry));
  const triangleCount = geometry.attributes.position ? geometry.attributes.position.count / 3 : 0;

  return {
    dimensionsMm: {
      x: parseFloat(size.x.toFixed(2)),
      y: parseFloat(size.y.toFixed(2)),
      z: parseFloat(size.z.toFixed(2)),
    },
    volumeCm3: parseFloat(volumeCm3.toFixed(2)),
    surfaceAreaCm2: parseFloat(surfaceAreaCm2.toFixed(2)),
    triangleCount: Math.round(triangleCount),
    geometry,
  };
}

function isBufferBinary(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 84) return false;
  const reader = new DataView(buffer);
  const faceCount = reader.getUint32(80, true);
  const expectedSize = 84 + faceCount * 50;

  if (expectedSize === buffer.byteLength) {
    return true;
  }

  // Check if first chars are 'solid'
  const header = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 80));
  const headerStr = String.fromCharCode(...Array.from(header)).toLowerCase();
  if (headerStr.startsWith('solid') && !headerStr.includes('\n')) {
    // Solid could be ASCII
    const textSample = new TextDecoder('utf-8').decode(new Uint8Array(buffer, 0, Math.min(buffer.byteLength, 1024)));
    if (textSample.includes('facet') && textSample.includes('vertex')) {
      return false;
    }
  }

  return true;
}

function parseBinarySTL(buffer: ArrayBuffer): THREE.BufferGeometry {
  const reader = new DataView(buffer);
  const faces = reader.getUint32(80, true);

  const vertices = new Float32Array(faces * 9);
  const normals = new Float32Array(faces * 9);

  let offset = 84;
  for (let face = 0; face < faces; face++) {
    if (offset + 50 > buffer.byteLength) break;

    const nx = reader.getFloat32(offset, true);
    const ny = reader.getFloat32(offset + 4, true);
    const nz = reader.getFloat32(offset + 8, true);

    const normal = new THREE.Vector3(nx, ny, nz);
    if (normal.lengthSq() < 0.0001) {
      // Recompute later if normal is zero
      normal.set(0, 0, 1);
    } else {
      normal.normalize();
    }

    const faceVertOffset = face * 9;

    for (let i = 0; i < 3; i++) {
      const vx = reader.getFloat32(offset + 12 + i * 12, true);
      const vy = reader.getFloat32(offset + 16 + i * 12, true);
      const vz = reader.getFloat32(offset + 20 + i * 12, true);

      const vIndex = faceVertOffset + i * 3;
      vertices[vIndex] = vx;
      vertices[vIndex + 1] = vy;
      vertices[vIndex + 2] = vz;

      normals[vIndex] = normal.x;
      normals[vIndex + 1] = normal.y;
      normals[vIndex + 2] = normal.z;
    }

    offset += 50; // 50 bytes per face (12 normal + 36 vertices + 2 attr byte count)
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.computeVertexNormals();

  return geometry;
}

function parseAsciiSTL(buffer: ArrayBuffer): THREE.BufferGeometry {
  const text = new TextDecoder('utf-8').decode(buffer);
  const lines = text.split('\n');

  const vertices: number[] = [];
  const normals: number[] = [];
  let currentNormal = new THREE.Vector3(0, 0, 1);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('facet normal')) {
      const parts = line.split(/\s+/);
      const nx = parseFloat(parts[2]) || 0;
      const ny = parseFloat(parts[3]) || 0;
      const nz = parseFloat(parts[4]) || 1;
      currentNormal.set(nx, ny, nz).normalize();
    } else if (line.startsWith('vertex')) {
      const parts = line.split(/\s+/);
      const x = parseFloat(parts[1]) || 0;
      const y = parseFloat(parts[2]) || 0;
      const z = parseFloat(parts[3]) || 0;
      vertices.push(x, y, z);
      normals.push(currentNormal.x, currentNormal.y, currentNormal.z);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.computeVertexNormals();

  return geometry;
}

/**
 * Creates built-in procedural industrial sample models for instantaneous inspection
 */
export function createSampleModel(
  type: 'gear' | 'bracket' | 'turbine' | 'cube'
): { name: string; metrics: StlMetrics } {
  let geometry: THREE.BufferGeometry;
  let name = '';

  switch (type) {
    case 'gear': {
      name = 'engranaje_industrial_m2.stl';
      // Procedural Spur/Helical Gear
      const outerRadius = 38;
      const innerRadius = 30;
      const teeth = 18;
      const toothDepth = 6;
      const height = 18;
      const shape = new THREE.Shape();

      const numPoints = teeth * 4;
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const segment = i % 4;
        const r = segment === 1 || segment === 2 ? outerRadius + toothDepth : innerRadius;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      shape.closePath();

      // Shaft hole with keyway
      const hole = new THREE.Path();
      const holeRadius = 12;
      hole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
      shape.holes.push(hole);

      geometry = new THREE.ExtrudeGeometry(shape, {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 1.2,
        bevelThickness: 1.2,
      });
      geometry.center();
      break;
    }

    case 'bracket': {
      name = 'soporte_estructural_L.stl';
      // Structural L-Bracket with stiffener rib and mounting holes
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(75, 0);
      shape.lineTo(75, 12);
      shape.lineTo(14, 12);
      shape.lineTo(14, 85);
      shape.lineTo(0, 85);
      shape.closePath();

      geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 45,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 1,
        bevelSize: 1,
        bevelThickness: 1,
      });
      geometry.center();
      break;
    }

    case 'turbine': {
      name = 'rotor_turbina_impulsora.stl';
      // Impeller turbine
      const group = new THREE.Group();
      const hubGeom = new THREE.CylinderGeometry(14, 20, 22, 32);
      const hubMesh = new THREE.Mesh(hubGeom);
      group.add(hubMesh);

      // Blades
      const bladeCount = 9;
      for (let i = 0; i < bladeCount; i++) {
        const bladeAngle = (i / bladeCount) * Math.PI * 2;
        const bladeGeom = new THREE.BoxGeometry(32, 2.5, 18);
        const bladeMesh = new THREE.Mesh(bladeGeom);
        bladeMesh.position.set(Math.cos(bladeAngle) * 22, 0, Math.sin(bladeAngle) * 22);
        bladeMesh.rotation.y = -bladeAngle + 0.55;
        bladeMesh.rotation.z = 0.35;
        group.add(bladeMesh);
      }

      // Convert group to single geometry for STL metrics
      geometry = mergeGroupToBufferGeometry(group);
      geometry.center();
      break;
    }

    case 'cube':
    default: {
      name = 'cubo_calibracion_20mm.stl';
      geometry = new THREE.BoxGeometry(20, 20, 20);
      geometry.center();
      break;
    }
  }

  // Ensure normal computation
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  const bbox = geometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const volumeCm3 = Math.max(0.1, calculateMeshVolume(geometry));
  const surfaceAreaCm2 = Math.max(0.1, calculateSurfaceArea(geometry));
  const triangleCount = geometry.attributes.position ? geometry.attributes.position.count / 3 : 0;

  return {
    name,
    metrics: {
      dimensionsMm: {
        x: parseFloat(size.x.toFixed(2)),
        y: parseFloat(size.y.toFixed(2)),
        z: parseFloat(size.z.toFixed(2)),
      },
      volumeCm3: parseFloat(volumeCm3.toFixed(2)),
      surfaceAreaCm2: parseFloat(surfaceAreaCm2.toFixed(2)),
      triangleCount: Math.round(triangleCount),
      geometry,
    },
  };
}

function mergeGroupToBufferGeometry(group: THREE.Group): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];

  group.updateMatrixWorld(true);

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const meshGeom = child.geometry.clone();
      meshGeom.applyMatrix4(child.matrixWorld);

      const posAttr = meshGeom.attributes.position;
      meshGeom.computeVertexNormals();
      const normAttr = meshGeom.attributes.normal;

      if (posAttr) {
        for (let i = 0; i < posAttr.count; i++) {
          positions.push(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
          if (normAttr) {
            normals.push(normAttr.getX(i), normAttr.getY(i), normAttr.getZ(i));
          } else {
            normals.push(0, 1, 0);
          }
        }
      }
    }
  });

  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  return merged;
}
