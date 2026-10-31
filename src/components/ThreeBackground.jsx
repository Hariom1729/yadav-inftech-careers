import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0x0b192c, 1.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 50); // Electric Cyan
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 3, 50); // Electric Blue
    pointLight2.position.set(-10, -8, 8);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa855f7, 2.5, 40); // Neon Violet
    pointLight3.position.set(0, 12, -5);
    scene.add(pointLight3);

    // 3. Floating 3D Geometric Objects Group
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Geometries
    const geometries = [
      new THREE.IcosahedronGeometry(2.2, 0),
      new THREE.TorusKnotGeometry(1.5, 0.45, 100, 16),
      new THREE.OctahedronGeometry(1.8, 0),
      new THREE.DodecahedronGeometry(2.0, 0),
      new THREE.TetrahedronGeometry(2.4, 0),
    ];

    // Materials with glassmorphism / futuristic metallic sheen
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      emissive: 0x0f172a,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.65,
      wireframe: false,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const floatingObjects = [];

    // Instantiate 7 floating geometric crystals
    const positions = [
      { x: -9, y: 5, z: -2, rotSpeed: 0.007, geoIdx: 1 },
      { x: 10, y: 4, z: -4, rotSpeed: 0.005, geoIdx: 0 },
      { x: -11, y: -5, z: -1, rotSpeed: 0.006, geoIdx: 3 },
      { x: 11, y: -6, z: -3, rotSpeed: 0.008, geoIdx: 2 },
      { x: 0, y: -8, z: -6, rotSpeed: 0.004, geoIdx: 4 },
      { x: -6, y: 0, z: -7, rotSpeed: 0.005, geoIdx: 0 },
      { x: 7, y: 1, z: -8, rotSpeed: 0.006, geoIdx: 1 },
    ];

    positions.forEach((pos) => {
      const geo = geometries[pos.geoIdx % geometries.length];
      const mesh = new THREE.Mesh(geo, glassMaterial.clone());
      mesh.position.set(pos.x, pos.y, pos.z);
      
      // Add nested wireframe for ultra-cyberpunk look
      const wireMesh = new THREE.Mesh(geo, wireframeMaterial);
      wireMesh.scale.setScalar(1.05);
      mesh.add(wireMesh);

      shapesGroup.add(mesh);

      floatingObjects.push({
        mesh,
        baseY: pos.y,
        baseX: pos.x,
        speed: pos.rotSpeed,
        phase: Math.random() * Math.PI * 2,
      });
    });

    // 4. Background Constellation / Particle Field
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 45;
      particleCoords[i + 1] = (Math.random() - 0.5) * 45;
      particleCoords[i + 2] = (Math.random() - 0.5) * 35;
      particleScales[i / 3] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.12,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Parallax Tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // 6. Window Resize Handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards mouse
      targetX += (mouseX - targetX) * 0.035;
      targetY += (mouseY - targetY) * 0.035;
      camera.position.x = targetX * 1.8;
      camera.position.y = -targetY * 1.8;
      camera.lookAt(0, 0, 0);

      // Rotate whole shape cluster slightly
      shapesGroup.rotation.y = elapsedTime * 0.04;

      // Animate individual objects (rotation + gentle float oscillation)
      floatingObjects.forEach((obj, idx) => {
        obj.mesh.rotation.x += obj.speed;
        obj.mesh.rotation.y += obj.speed * 1.3;
        obj.mesh.position.y = obj.baseY + Math.sin(elapsedTime * 1.2 + obj.phase) * 0.6;
        obj.mesh.position.x = obj.baseX + Math.cos(elapsedTime * 0.9 + obj.phase) * 0.4;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = elapsedTime * 0.008;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometries.forEach((g) => g.dispose());
      glassMaterial.dispose();
      wireframeMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
