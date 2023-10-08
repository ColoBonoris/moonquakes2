import type { RaycasterManager } from '$lib/three/labels/raycaster';
import type { Object3D, Scene } from 'three';
import { Apollo } from './apollo';
import type { ApolloData } from '../quakes/types';
import { initLabelRender } from './labels';
import type { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';

interface EventsMap {
  'appear': (apollo: Apollo) => void,
  'hidden': () => void;
}

class ApollosManager {
  private scene: Scene;
  private rcManager: RaycasterManager;
  private baseApollos: Apollo[];
  public apollos: Apollo[];
  private apollosVisibles: boolean;
  private currentApollo: number;
  private listeners: {
    [k in keyof EventsMap]: EventsMap[k][]
  };
  public labelsContainer!: HTMLDivElement;
  private labels: Apollo[];
  private addLabel: (apollo: Apollo) => void;
  private initilizeApollos: (apolloData: ApolloData[]) => void;
  private labelRenderer: CSS2DRenderer;

  constructor(scene: Scene, raycasterManager: RaycasterManager, apoloData: ApolloData[], renderer: CSS2DRenderer) {
    this.scene = scene;
    this.rcManager = raycasterManager;
    this.baseApollos = [];
    this.apollos = [];
    this.apollosVisibles = false;
    this.currentApollo = 0;
    this.listeners = { 'appear': [], 'hidden': [] };
    this.labels = [];
    // this.labelsContainer
    this.labelRenderer = renderer;

    const $ = this;

    this.addLabel = (apollo: Apollo) => {
      this.labelsContainer.innerHTML = '';
      console.log(apollo.label.textContent);
      apollo.showLabel();
      this.labels.push(apollo);
      this.labelsContainer.appendChild(apollo.label);
    };
    this.initilizeApollos = (apollos: ApolloData[]) => {
      // const point = createMesh(MOON_UNIT_RADIUS,20,20,'M');
      // point.visible = true
      // scene.add(point)
      apollos.forEach(apoloData => {
        const apollo = new Apollo(apoloData);
        $.scene.add(apollo.mesh);
        //$.scene.add(apollo.pulse);
        $.baseApollos.push(apollo);
      });
    };
    this.initilizeApollos(apoloData);

    /*     this.rcManager.addClickListener((element: Object3D) => {
          if (!element.userData.apollo) return;
          $.addLabel(element.userData.apollo);
        }); */
  }

  toggleApollosVisualization() {
    this.apollosVisibles = !this.apollosVisibles;
    if (this.apollosVisibles) {
      this.apollos = [];
      this.baseApollos.forEach(apollo => {
        apollo.setVisibility(true);
        this.apollos.push(apollo);
      });
    }
    else {
      this.apollos.forEach(apollo => apollo.setVisibility(false));
    }
  }

  notifyApolloHidden() {
    this.listeners['hidden'].forEach(callback => callback());
  }
  notifyApolloAppear(apollo: Apollo) {
    this.listeners['appear'].forEach(callback => callback(apollo));
  }

  addEventListener<K extends keyof EventsMap>(event: K, callback: EventsMap[K]) {
    this.listeners[event].push(callback);
  }
  /* 
    filterBy(filter: (apollo: Apollo) => boolean, allApollos = false) {
      if (allApollos)
        this.apollos = this.baseApollos.filter(filter);
      else
        this.apollos = this.apollos.filter(filter);
      return this;
    }
    shortBy(short: (apollo1: Apollo, apollo2: Apollo) => number, allApollos = false) {
      if (allApollos)
        this.apollos = this.baseApollos.slice().sort(short);
      else
        this.apollos = this.apollos.sort(short);
      return this;
    } */

  update() {
    this.apollos.forEach(apollo => apollo.update());
  }
}

export { ApollosManager };
