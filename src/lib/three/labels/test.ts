import * as THREE from 'three';
import { MOON_UNIT_RADIUS } from '$lib/three/moon';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

let camera, scene, labelRenderer;

const clock = new THREE.Clock();
const textureLoader = new THREE.TextureLoader();

export function initLabelRender(moon, moonCamera) {
  camera = moonCamera;

/*   camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(10, 5, 20);*/
  //camera.layers.enableAll(); 

  scene = new THREE.Scene();

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 0, 1);
  dirLight.layers.enableAll();
  scene.add(dirLight);

  const axesHelper = new THREE.AxesHelper(5);
  axesHelper.layers.enableAll();
  scene.add(axesHelper);

  const labelDiv = document.createElement('div');
  labelDiv.className = 'label';
  labelDiv.textContent = 'Text';
  labelDiv.style.backgroundColor = 'transparent';
  labelDiv.style.zIndex = '1000';
  labelDiv.style.color = 'white';
  labelDiv.style.pointerEvents = "auto";

  const CSS2Dlabel = new CSS2DObject(labelDiv);
  CSS2Dlabel.position.set(MOON_UNIT_RADIUS, 0, 0);
  //CSS2Dlabel.layers.set(0);

  moon.add(CSS2Dlabel);
  scene.add(CSS2Dlabel);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.zIndex = '1000';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.querySelector('main').appendChild(labelRenderer.domElement);

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

export function animateLabel(){
  labelRenderer.render(scene, camera);
}

/* function animate() {

  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

  labelRenderer.render(scene, camera);

} */