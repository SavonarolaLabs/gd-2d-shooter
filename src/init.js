import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function init(TR, viewSize) {
  const scene = new TR.Scene();
  const renderer = new TR.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = TR.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = TR.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new TR.OrthographicCamera((-viewSize * aspectRatio) / 2, (viewSize * aspectRatio) / 2, viewSize / 2, -viewSize / 2, 1, 1000);
  camera.position.set(viewSize, viewSize, viewSize);
  camera.lookAt(0, 0, 0);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.update();
  return { scene, renderer, camera, controls };
}
