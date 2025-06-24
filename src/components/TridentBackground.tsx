import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TridentBackground = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Create the trident geometry
  const tridentGeometry = useMemo(() => {
    const group = new THREE.Group();
    
    const color = new THREE.Color().setRGB(0,0,0);

    // Create the handle with a more ornate design
    const handleGeometry = new THREE.CylinderGeometry(0.08, 0.08, 2.5, 16);
    const handle = new THREE.Mesh(handleGeometry);
    handle.position.y = -1.25;
    handle.material = new THREE.MeshStandardMaterial({ color });
    
    // Add decorative rings to the handle
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.12, 0.02, 16, 32);
      const ring = new THREE.Mesh(ringGeometry, new THREE.MeshStandardMaterial({ color }));
      ring.position.y = -1.25 + (i * 0.8);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);
    }
    group.add(handle);

    // Create the three prongs with more elaborate shapes
    const prongGeometry = new THREE.ConeGeometry(0.15, 1, 16);
    
    // Left prong
    const leftProng = new THREE.Mesh(prongGeometry, new THREE.MeshStandardMaterial({ color }));
    leftProng.position.set(-0.4, 0.5, 0);
    leftProng.rotation.z = -Math.PI / 6;
    group.add(leftProng);

    // Middle prong
    const middleProng = new THREE.Mesh(prongGeometry, new THREE.MeshStandardMaterial({ color }));
    middleProng.position.set(0, 0.5, 0);
    group.add(middleProng);

    // Right prong
    const rightProng = new THREE.Mesh(prongGeometry, new THREE.MeshStandardMaterial({ color }));
    rightProng.position.set(0.4, 0.5, 0);
    rightProng.rotation.z = Math.PI / 6;
    group.add(rightProng);

    // Add decorative elements at the base of the prongs
    const baseGeometry = new THREE.TorusGeometry(0.25, 0.05, 16, 32);
    const base = new THREE.Mesh(baseGeometry, new THREE.MeshStandardMaterial({ color }));
    base.position.y = 0.2;
    base.rotation.x = Math.PI / 2;
    group.add(base);

    return group;
  }, []);

  // Animate the rotation with a more subtle movement
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={2}>
      <primitive object={tridentGeometry} />
      <meshStandardMaterial 
        metalness={0.5} 
        roughness={0.1}
        envMapIntensity={1}
        transparent={true}
        opacity={0.5}
      />
    </group>
  );
};

export default TridentBackground;