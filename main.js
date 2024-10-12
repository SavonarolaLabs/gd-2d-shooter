import * as TR from 'three';
import { loadRetroForrest } from './src/loadRertoForrest';
import { setLight } from './src/light';
import { init } from './src/init';
import { onResize } from './src/onResize';

// initial setup
const viewSize = 10;
const { scene, renderer, camera, controls } = init(TR, viewSize);
setLight(TR, scene);
window.addEventListener('resize', () => onResize());
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// level
let blocks = await loadRetroForrest(TR);
createLevel();

export function set(blockName, x = 0, y = 0) {
  const b = blocks[blockName].clone();
  b.position.set(x, 0, y);
  scene.add(b);
}

function randomFloor() {
  const x = ['floor_A', 'floor_B', 'floor_C'];
  const r = Math.floor(Math.random() * 3);
  return x[r];
}

export async function createLevel() {
  const s = 10;
  for (let a = 0; a < s; a++) {
    set('wall_A', a - s / 2, -s / 2 - 1.5);
    for (let b = 0; b < s; b++) {
      set(randomFloor(), a - s / 2, b - s / 2);
    }
  }
  //set('floor_big', 1, 1);
}
