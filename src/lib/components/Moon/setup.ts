import { Clock, type Group } from 'three';
import { camera } from '$lib/three/camera';
import { renderer } from '$lib/three/renderer';
import { scene } from '$lib/three/scene';
import { createMoon, createMoonEdges } from '$lib/three/moon';
import { earth } from '$lib/three/celestialbodys/earth';
import { sun } from '$lib/three/celestialbodys/sun';
import { cameraControls, ControlManager, initControls } from '$lib/three/controls';
import { addLights, toNormalMode, toSimulationMode } from '$lib/three/light';
import { QuakesManager } from '$lib/three/quakes/quakesManager';
import { TimeLine } from '$lib/three/timeline';
import { RaycasterManager } from '$lib/three/labels/raycaster';
import { getNormalizedData } from '$lib/utils/normalizeQuakeSample';
import realSample from "$data/quakes_sample.json";
import { canvasContainer, height, width } from '$lib/stores/containerStore';

let moon: Group;
const moonEdges = createMoonEdges();
scene.add(moonEdges);
scene.add(earth);
scene.add(sun);


export let quakesManager: QuakesManager;
export let clock: THREE.Clock;
export let timeline: TimeLine;
export let controlManager: ControlManager;
export let raycasterManager: RaycasterManager;

export function animate() {
  requestAnimationFrame(animate);

  quakesManager.update();
  controlManager.update();
  const delta = clock.getDelta();
  cameraControls.update(delta);
  // timeline.update(delta);
  raycasterManager.update(camera);
  renderer.render(scene, camera);
}

export function onWindowResize() {
  // camera adaptation
  camera.aspect = width() / height();
  camera.updateProjectionMatrix();

  // renderer adaptation
  renderer.setSize(width(), height());
}

export function init(container: HTMLElement, onComplete: () => void) {
  moon = createMoon(renderer, scene, camera, onComplete);
  container.appendChild(renderer.domElement);
  initControls(camera, renderer.domElement);
  addLights(scene);
  clock = new Clock();
  raycasterManager = new RaycasterManager(scene, renderer.domElement);
  quakesManager = new QuakesManager(scene, raycasterManager, getNormalizedData(realSample));
  timeline = new TimeLine(2, Infinity);
  timeline.subscribe(quakesManager.showNextQuake.bind(quakesManager));
  controlManager = new ControlManager(cameraControls);
  canvasContainer.set(container);
  onWindowResize();
}

export function toggleExternalBodys(enable: boolean) {
  if (enable) {
    toSimulationMode();
    earth.visible = true;
    sun.visible = true;
  }
  else {
    toNormalMode();
    earth.visible = false;
    sun.visible = false;
  }
}

export function toggleAllQuakes() {
  quakesManager.toggleQuakesVisualization();
}
