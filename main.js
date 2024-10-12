import * as TR from 'three';
import { loadRetroForrest } from './src/loadRertoForrest';
import { setLight } from './src/light';
import { init } from './src/init';
import { onResize } from './src/onResize';

// initial setup
const { scene, renderer, camera, controls } = init(TR);
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
Object.values(blocks).forEach((element) => {
  scene.add(element);
});
