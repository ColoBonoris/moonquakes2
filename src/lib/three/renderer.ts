import { height, width } from '$lib/stores/containerStore';
import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer({
    antialias: true
  });

  // default initialization
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width(), height());

  return renderer;
}

export const renderer = createRenderer();

// on window rezize event
function resizeRenderer() {
  renderer.setSize(width(), height());
}
