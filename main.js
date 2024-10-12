import * as TR from 'three';
import { loadRetroForrest } from './src/loadRertoForrest';
import { setLight } from './src/light';
import { init } from './src/init';
import { onResize } from './src/onResize';
import { tiles } from './src/tiles';

// initial setup
const map_size = 40;
const viewSize = map_size / 2;
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
const map = Array.from({ length: map_size }, () => Array.from({ length: map_size }, () => ({ tiles: [] })));
createLevel();

function randomFloor() {
  const x = ['floor_A', 'floor_B' /*'floor_C'*/];
  const r = Math.floor(Math.random() * x.length);
  return x[r];
}

export function set(blockName, x = 0, y = 0, rx = 0) {
  const b = blocks[blockName].clone();
  b.rotation.y = rx;
  b.position.set(x, 0, y);
  if (blockName.startsWith('water')) {
    b.position.set(x, -0.1, y);
  }
  scene.add(b);
}

export async function createLevel() {
  const walls = false;
  const s = map_size;
  for (let a = 0; a < s; a++) {
    set('wall_A', a - s / 2, -s / 2 - 1.5);
    if (walls) set('wall_A', a - s / 2, s / 2 + 0.5, Math.PI);
    if (walls) set('wall_A', s / 2 + 0.5, a - s / 2, -Math.PI / 2);
    set('wall_A', -s / 2 - 1.5, a - s / 2, Math.PI / 2);
    for (let b = 0; b < s; b++) {
      if (b == a) {
        set('waterfloor_A', a - s / 2, b - s / 2);
      } else if (b == a - 1) {
        set('waterfloorEdge_1vert', a - s / 2, b - s / 2, Math.PI);
      } else if (b == a + 1) {
        set('waterfloorEdge_1vert', a - s / 2, b - s / 2);
      } else if (b == a - 2) {
        set('waterfloorEdge_corner', a - s / 2, b - s / 2, Math.PI);
        set('wallHole_1wall_B', a - s / 2, b - s / 2);
        set('wallHole_1wall_B', a - s / 2, b - s / 2, -Math.PI / 2);
      } else if (b == a + 2) {
        set('waterfloorEdge_corner', a - s / 2, b - s / 2);
        set('wallHole_1wall_B', a - s / 2, b - s / 2, Math.PI);
        set('wallHole_1wall_B', a - s / 2, b - s / 2, Math.PI / 2);
      } else if (b - a == 3) {
        set('floorEdge_corner', a - s / 2, b - s / 2, Math.PI);
      } else if (a - b == 3) {
        set('floorEdge_corner', a - s / 2, b - s / 2);
      } else {
        set(randomFloor(), a - s / 2, b - s / 2);
        if (a > b) {
          const deco = tiles.filter((t) => t.startsWith('deco_treeDead')).map((a) => a.split('.')[0]);
          if (Math.random() < 0.1) set(deco[Math.floor(Math.random() * deco.length)], a - s / 2, b - s / 2, Math.PI);
        } else {
          const shrooms = tiles.filter((t) => t.startsWith('deco_mushrooms')).map((a) => a.split('.')[0]);
          if (Math.random() < 0.04) set(shrooms[Math.floor(Math.random() * shrooms.length)], a - s / 2, b - s / 2, Math.PI);
          if (Math.random() < 0.1) set('deco_tree_B', a - s / 2, b - s / 2, Math.PI);
        }
      }
    }
  }
  set('wall_cornerInCap_AB', -s / 2 - 1.5, -s / 2 - 1.5);
  if (walls) set('wall_cornerInCap_AB', s / 2 + 0.5, s / 2 + 0.5, -Math.PI);
  if (walls) set('wall_cornerInCap_AB', -s / 2 - 1.5, s / 2 + 0.5, Math.PI / 2);
  if (walls) set('wall_cornerInCap_AB', s / 2 + 0.5, -s / 2 - 1.5, -Math.PI / 2);

  //set('floor_big', 1, 1);
}
