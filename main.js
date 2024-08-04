import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x616161); // Define a cor de fundo como preto
document.body.appendChild(renderer.domElement);

// Cube with physical material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xb0b0b0,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Rotate the cube 45 degrees along the y axis
cube.rotation.y = Math.PI / 4; // 45 degrees in radians

// Criação da geometria da esfera
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32); // Raio 0.5, 32 segmentos verticais e horizontais
const sphereMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xb0b0b0,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});

// Criação da malha da esfera
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// Posicionando a esfera na cena
sphere.position.set(2, 0, 0); // Move a esfera 2 unidades ao longo do eixo X
scene.add(sphere);

// Criação da geometria do cone
const coneGeometry = new THREE.ConeGeometry(0.5, 1, 32); // Raio da base 0.5, altura 1, 32 segmentos
const coneMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xb0b0b0,
  metalness: 0.5,
  roughness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
});

// Criação da malha do cone
const cone = new THREE.Mesh(coneGeometry, coneMaterial);

// Posicionando o cone na cena
cone.position.set(-2, 0, 0); // Move o cone 2 unidades ao longo do eixo X negativo
scene.add(cone);

// Materiais
const standardMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const metalMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  metalness: 0.8,
  roughness: 0.5,
});
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x00ff95,
  transparent: true,
  opacity: 0.5,
  metalness: 0.0,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  transmission: 1.0, // Ativa a refração
  ior: 1.5, // Índice de refração típico do vidro
  thickness: 1.0, // Espessura do vidro (ajuste conforme necessário)
});

// Seletor de material
const materialTypeSelect = document.getElementById('materialType');

// Função para aplicar o material selecionado
function applyMaterial() {
  const selectedMaterial = materialTypeSelect.value;

  // Define o material a ser aplicado
  let material;
  if (selectedMaterial === 'standard') {
    material = standardMaterial;
  } else if (selectedMaterial === 'metal') {
    material = metalMaterial;
  } else if (selectedMaterial === 'glass') {
    material = glassMaterial;
  }

  // Aplica o material a todos os objetos na cena
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = material;
    }
  });
}

// Adiciona um listener ao seletor para aplicar o material quando a seleção mudar
materialTypeSelect.addEventListener('change', applyMaterial);

// Seletor de cor de fundo
const backgroundColorInput = document.getElementById('backgroundColor');

// Função para aplicar a cor de fundo selecionada
function applyBackgroundColor() {
  const selectedColor = backgroundColorInput.value;
  renderer.setClearColor(selectedColor);
}

// Adiciona um listener ao seletor de cor para aplicar a cor de fundo quando a seleção mudar
backgroundColorInput.addEventListener('input', applyBackgroundColor);

// Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 3); // white color, 50% intensity
scene.add(ambientLight);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Handle window resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Post-processing setup
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.visibleEdgeColor.set('#ffaa00'); // Define a cor do contorno como vermelho
composer.addPass(outlinePass);

const effectFXAA = new ShaderPass(FXAAShader);
effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
composer.addPass(effectFXAA);

// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  // Convert mouse position to normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);

  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    outlinePass.selectedObjects = [intersects[0].object];
  } else {
    outlinePass.selectedObjects = [];
  }
}

window.addEventListener('click', onMouseClick, false);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}
animate();
