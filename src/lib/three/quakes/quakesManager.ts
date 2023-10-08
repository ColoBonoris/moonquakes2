import type { RaycasterManager } from '$lib/three/labels/raycaster';
import type { Object3D, Scene } from 'three';
import { Quake } from './quake';
import type { QuakeData } from './types';

interface EventsMap {
  'appear': (quake: Quake) => void,
  'hidden': () => void;
  'clickedQuake': (quake: Quake) => void;
}

class QuakesManager {
  private scene: Scene;
  private rcManager: RaycasterManager;
  private baseQuakes: Quake[];
  public quakes: Quake[];
  private quakesVisibles: boolean;
  private currentQuake: number;
  private listeners: {
    [k in keyof EventsMap]: EventsMap[k][]
  };
  public labelsContainer!: HTMLDivElement;
  private labels: Quake[];
  private addLabel: (quake: Quake) => void;
  private initilizeQuakes: (quakesData: QuakeData[]) => void;
  public clickedQuake: Quake | undefined;


  constructor(scene: Scene, raycasterManager: RaycasterManager, quakesData: QuakeData[]) {
    this.scene = scene;
    this.rcManager = raycasterManager;
    this.baseQuakes = [];
    this.quakes = [];
    this.quakesVisibles = false;
    this.currentQuake = 0;
    this.listeners = { 'appear': [], 'hidden': [], 'clickedQuake': [] };
    this.labels = [];
    // this.labelsContainer

    const $ = this;

    this.addLabel = (quake: Quake) => {
      this.labelsContainer.innerHTML = '';
      quake.showLabel();
      this.labels.push(quake);
      this.labelsContainer.appendChild(quake.label);
    };
    this.initilizeQuakes = (quakes: QuakeData[]) => {
      // const point = createMesh(MOON_UNIT_RADIUS,20,20,'M');
      // point.visible = true
      // scene.add(point)
      quakes.forEach(quakeData => {
        const quake = new Quake(quakeData);
        $.scene.add(quake.mesh);
        $.scene.add(quake.pulse);
        $.baseQuakes.push(quake);
      });
    };
    this.initilizeQuakes(quakesData);

    this.rcManager.addClickListener((element: Object3D) => {
      if (!element.userData.quake) return;
      this.clickedQuake = element.userData.quake;
      this.notifyQuakeClicked(this.clickedQuake!);
    });
  }

  toggleQuakesVisualization() {
    this.quakesVisibles = !this.quakesVisibles;
    if (this.quakesVisibles) {
      this.quakes = [];
      this.baseQuakes.forEach(quake => {
        quake.setVisibility(true);
        this.quakes.push(quake);
      });
    }
    else {
      this.quakes.forEach(quake => quake.setVisibility(false));
    }
  }

  showNextQuake() {
    this.notifyQuakeHidden();
    this.baseQuakes[this.currentQuake].mesh.visible = false;
    this.currentQuake += 1;
    if (this.currentQuake > this.baseQuakes.length) this.currentQuake = 0;
    const quake = this.baseQuakes[this.currentQuake];
    quake.mesh.visible = true;
    this.notifyQuakeAppear(quake);
  }

  notifyQuakeHidden() {
    this.listeners['hidden'].forEach(callback => callback());
  }
  notifyQuakeAppear(quake: Quake) {
    this.listeners['appear'].forEach(callback => callback(quake));
  }
  notifyQuakeClicked(quake: Quake) {
    this.listeners['clickedQuake'].forEach(callback => callback(quake));
  }

  addEventListener<K extends keyof EventsMap>(event: K, callback: EventsMap[K]) {
    this.listeners[event].push(callback);
  }
  removeEventListener<K extends keyof EventsMap>(event: K, callback: EventsMap[K]) {
    const index = this.listeners[event].indexOf(callback)
    if (index < 0) return;
    this.listeners[event].splice(this.listeners[event].indexOf(callback), 1);
  }

  filterBy(filter: (quake: Quake) => boolean, allQuakes = false) {
    if (allQuakes)
      this.quakes = this.baseQuakes.filter(filter);
    else
      this.quakes = this.quakes.filter(filter);
    this.baseQuakes.forEach(q => {
      if(this.quakes.includes(q))
        q.setVisibility(true);
      else
        q.setVisibility(false);
    });
    return this;
  }
  sortBy(sort: (quake1: Quake, quake2: Quake) => number, allQuakes = false) {
    if (allQuakes)
      this.quakes = this.baseQuakes.slice().sort(sort);
    else
      this.quakes = this.quakes.sort(sort);
    return this;
  }

  update() {
    this.quakes.forEach(quake => quake.update());
  }
}

export { QuakesManager };
