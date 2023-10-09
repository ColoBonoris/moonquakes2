import * as THREE from 'three';
import { MOON_UNIT_RADIUS } from '$lib/three/moon';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

let camera: THREE.Camera, scene: THREE.Scene, labelRenderer: CSS2DRenderer;
let labelsContainer: HTMLElement;

export function initLabelRender(containerElement: HTMLElement, moon: THREE.Group, moonCamera: THREE.Camera) {
  camera = moonCamera;

  scene = new THREE.Scene();

  const dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.position.set(0, 0, 1);
  dirLight.layers.enableAll();
  scene.add(dirLight);

  /*   const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = 'Text';
    labelDiv.style.backgroundColor = 'transparent';
    labelDiv.style.zIndex = '1000';
    labelDiv.style.color = 'white';
    labelDiv.style.pointerEvents = "auto"; */

  /* const CSS2Dlabel = new CSS2DObject(labelDiv);
  CSS2Dlabel.position.set(MOON_UNIT_RADIUS, 0, 0); */
  //CSS2Dlabel.layers.set(0);

  /* moon.add(CSS2Dlabel);
  scene.add(CSS2Dlabel); */

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight); // resize teniendo en cuenta el sidebar
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.zIndex = '10000';
  labelRenderer.domElement.style.pointerEvents = 'none';
  containerElement.appendChild(labelRenderer.domElement);
  labelsContainer = labelRenderer.domElement;
  return labelRenderer;
}

export function createLabelMesh(divElement: HTMLElement) {
  let auxlabel = new CSS2DObject(divElement);
  auxlabel.position.set(0, 0, 0)
  scene.add(auxlabel);
  auxlabel.visible = true;
  return auxlabel;
}

function onWindowResize() {
  // resize teniendo en cuenta el sidebar
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

export function resetLabels() {
  scene.children.forEach((label) => {
    label.visible = false;
  })
}

export function updateLabel() {
  labelRenderer.render(scene, camera);
}

/* function animate() {

  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  // moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

  labelRenderer.render(scene, camera);

} */