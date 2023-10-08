import { RAYCASTER_CHANNEL_APOLLO, UNIT_TO_KM } from '$lib/three/constants';
import { MOON_UNIT_RADIUS } from '$lib/three/moon';
import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';
import type { ApolloData } from '../quakes/types';
import type { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { createLabelMesh } from './labels';

/* export const APOLLO_MISIONS = [
  { mission: 'Apollo 12 LM', date: '20 November 1969', lat: -3.94, lon: -21.20 },
  { mission: 'Apollo 13 SIVB', date: '15 April 1970', lat: -2.5550, lon: -27.8875 }
]; */

const SIZE = 20 * UNIT_TO_KM;
const DISTANCE_TO_WORLD_ORIGIN = MOON_UNIT_RADIUS;

// const geometry = new SphereGeometry(5 * UNIT_TO_KM, 64, 32);

const APOLLO_MESH = new MeshBasicMaterial({
  color: `hsl(197, 10%, 87%)`,
  wireframe: false
})

function getMesh() {
  return APOLLO_MESH
}

function createLabel(data: ApolloData) {
  const elem = document.createElement('div');
  elem.textContent = data.mission;
  elem.style.color = 'white';
  elem.style.backgroundColor = 'black';
  elem.style.padding ="4px"
  return elem;
}

export function createMesh(radiusToOrigin: number, lat: number, lon: number) {
  let geo = undefined;
  let newApollo = null;
  const phi = (90 - lon) * (Math.PI / 180);
  const theta = (lat + 180) * (Math.PI / 180);
  /* if (type.match(/A\d+/)) {
    geo = new BoxGeometry(SIZE, SIZE, profundity);
    newQuake = new Mesh(geo, getMesh(type));
  }
  else { */
  geo = new SphereGeometry(SIZE, 64, 32);
  newApollo = new Mesh(geo, getMesh());
  /*   } */
  newApollo.position.set(
    -((radiusToOrigin) * Math.sin(phi) * Math.cos(theta)),
    -((radiusToOrigin) * Math.sin(phi) * Math.sin(theta)),
    -((radiusToOrigin) * Math.cos(phi)),
  );
  newApollo.visible = false;
  newApollo.name = 'apollo';
  newApollo.layers.enable(RAYCASTER_CHANNEL_APOLLO);
  newApollo.lookAt(0, 0, 0);
  return newApollo;
}

export class Apollo {
  mesh: Mesh;
  label: HTMLDivElement;
  labelMesh: CSS2DObject;
  date: string;
  isVisible: boolean;

  constructor(data: ApolloData) {
    this.mesh = createMesh(DISTANCE_TO_WORLD_ORIGIN, data.lat, data.lon);
    this.mesh.userData.apollo = this;
    this.date = data.date;
    this.isVisible = false;
    this.label = createLabel(data);
    this.labelMesh = createLabelMesh(this.label);

    this.mesh.add(this.labelMesh);

    this.mesh.onBeforeRender = () => {
      this.labelMesh.visible = true;
    }
  }

  toggleVisivility() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.mesh.visible = true;

    }
    else {
      this.mesh.visible = false;

    }
  }

  setVisibility(visible: boolean) {
    this.isVisible = visible;
    if (visible) {
      this.mesh.visible = true;

    }
    else {
      this.mesh.visible = false;

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
    // update del pulse
  }
}
