import { useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

//les rotations pour chaque face
const ROTATIONS = {
  1: [0, 0, 0],           
  2: [Math.PI / 2, 0, 0], 
  3: [0, 0, Math.PI / 2], 
  4: [0, 0, -Math.PI / 2],
  5: [-Math.PI / 2, 0, 0],
  6: [Math.PI, 0, 0],     
};

function Dice({ valeur }) {
  const mesh = useRef();

  //on charge les 6 textures
  const textures = useLoader(THREE.TextureLoader, [
    '/textures/dice1.png', 
    '/textures/dice2.png', 
    '/textures/dice3.png', 
    '/textures/dice4.png', 
    '/textures/dice5.png', 
    '/textures/dice6.png', 
  ]);

  const materials = [
    new THREE.MeshStandardMaterial({ map: textures[2] }), 
    new THREE.MeshStandardMaterial({ map: textures[3] }), 
    new THREE.MeshStandardMaterial({ map: textures[0] }),
    new THREE.MeshStandardMaterial({ map: textures[5] }),
    new THREE.MeshStandardMaterial({ map: textures[4] }), 
    new THREE.MeshStandardMaterial({ map: textures[1] }),
  ];

  const cible = valeur ? ROTATIONS[valeur] : [0, 0, 0];

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x += (cible[0] - mesh.current.rotation.x) * 0.1;
    mesh.current.rotation.y += (cible[1] - mesh.current.rotation.y) * 0.1;
    mesh.current.rotation.z += (cible[2] - mesh.current.rotation.z) * 0.1;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}

export default Dice;