import { RAYCASTER_CHANNEL, UNIT_TO_KM } from '$lib/three/constants';
import { MOON_UNIT_RADIUS } from '$lib/three/moon';
import { BoxGeometry, CapsuleGeometry, CylinderGeometry, Mesh, MeshBasicMaterial, SphereGeometry, Vector3 } from 'three';
import type { QuakeData, QuakeType } from './types';
import { Pulse } from './wave/Pulse';

const SIZE = 10 * UNIT_TO_KM;
const DISTANCE_TO_WORLD_ORIGIN = MOON_UNIT_RADIUS;

const geometry = new SphereGeometry(5 * UNIT_TO_KM, 64, 32);

const MESH_TABLE_BY_TYPE: { [magnitud in QuakeType]: MeshBasicMaterial } = {
  M: new MeshBasicMaterial({
    color: `hsl(${0}, 100%, 50%)`,
    wireframe: false
  }),
  SH: new MeshBasicMaterial({
    color: `hsl(${64}, 100%, 50%)`,
    wireframe: false
  }),
  A: new MeshBasicMaterial({
    color: `hsl(${128}, 100%, 50%)`,
    wireframe: false
  }),
  LM: new MeshBasicMaterial({
    color: `hsl(${246}, 100%, 50%)`,
    wireframe: false
  }),
  _: new MeshBasicMaterial({
    color: `hsl(${192}, 100%, 50%)`,
    wireframe: false
  })
};

function getMesh(type: string) {
  if (type === 'M' || type === 'SH')
    return MESH_TABLE_BY_TYPE[type];
  if (type.match(/A\d+/))
    return MESH_TABLE_BY_TYPE.A;
  if (type.includes("LM"))
    return MESH_TABLE_BY_TYPE.LM;
  return MESH_TABLE_BY_TYPE._;
}

function createLabel(data: QuakeData) {
  const elem = document.createElement('div');
  elem.textContent = data.type;
  elem.style.display = 'none';
  return elem;
}

export function createMesh(radiusToOrigin: number, lat: number, lon: number, depth: number, type: QuakeType) {
  const profundity = depth * UNIT_TO_KM;
  let geo = undefined;
  let newQuake = null;
  const phi = (90 - lon) * (Math.PI / 180);
  const theta = (lat + 180) * (Math.PI / 180);
  if(type.match(/A\d+/)) {
    geo = new BoxGeometry(SIZE, SIZE, profundity);
    newQuake = new Mesh(geo, getMesh(type));
    newQuake.position.set(
      -((radiusToOrigin - (profundity / 2)) * Math.sin(phi) * Math.cos(theta)),
      -((radiusToOrigin - (profundity / 2)) * Math.sin(phi) * Math.sin(theta)),
      -((radiusToOrigin - (profundity / 2)) * Math.cos(phi)),
    );
  }
  else{
    geo = new SphereGeometry(5 * UNIT_TO_KM, 64, 32);
    newQuake = new Mesh(geo, getMesh(type));
    newQuake.position.set(
      -((radiusToOrigin - profundity / 2) * Math.sin(phi) * Math.cos(theta)),
      -((radiusToOrigin - profundity / 2) * Math.sin(phi) * Math.sin(theta)),
      -((radiusToOrigin - profundity / 2) * Math.cos(phi)),
    );
  }
  newQuake.visible = false;
  newQuake.name = 'quake';
  newQuake.layers.enable(RAYCASTER_CHANNEL);
  newQuake.lookAt(0, 0, 0);
  return newQuake;
}

export class Quake {
  mesh: Mesh;
  label: HTMLDivElement;
  labelContainer: HTMLDivElement | undefined;
  date: string;
  depth: number;
  pulse: Pulse;
  isVisible: boolean;
  constructor(data: QuakeData) {
    this.mesh = createMesh(DISTANCE_TO_WORLD_ORIGIN, data.latitude, data.longitude, data.depth, data.type);
    this.mesh.userData.quake = this;
    // @ts-ignore
    const color = this.mesh.material.color.getHex()
    if(data.type.includes("LM")){
      this.pulse = new Pulse(SIZE * 1, color);
    }
    else {
      this.pulse = new Pulse(SIZE * 7, color);
    }

    if(data.type.match(/A\d+/)){
      const phi = (90 - data.longitude) * (Math.PI / 180), theta = (data.latitude + 180) * (Math.PI / 180);
      let position = new Vector3(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
      position.set(
        -((DISTANCE_TO_WORLD_ORIGIN ) * Math.sin(phi) * Math.cos(theta)),
        -((DISTANCE_TO_WORLD_ORIGIN ) * Math.sin(phi) * Math.sin(theta)),
        -((DISTANCE_TO_WORLD_ORIGIN ) * Math.cos(phi)),
      );

      console.log(position);
      this.pulse.position.copy(position);
    }
    else {
      this.pulse.position.copy(this.mesh.position);
    }

    this.pulse.lookAt(0, 0, 0);
    this.label = createLabel(data);
    this.depth = data.depth;
    this.date = data.date;
    this.isVisible = false;
  }

  toggleVisivility() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.mesh.visible = true;
      this.pulse.start();
    }
    else {
      this.mesh.visible = false;
      this.pulse.stop();
    }
  }

  setVisibility(visible: boolean) {
    this.isVisible = visible;
    if (visible) {
      this.mesh.visible = true;
      this.pulse.start();
    }
    else {
      this.mesh.visible = false;
      this.pulse.stop();
    }
  }

  showLabel() {
    this.label.style.display = 'block';
  }

  hideLabel() {
    this.label.style.display = 'none';
  }
  update() {
    if (!this.isVisible) return;
    this.pulse.update();
  }
}
