import { FBXLoader, TGALoader } from 'three/examples/jsm/Addons.js';
import { units } from './buildings';

const FBX_PATH = './assets/TT_RTS_Standard/models/units/';
const TEXTURE_PATH = './assets/TT_RTS_Standard/models/materials/';

export async function loadUnits(TR) {
  const loader = new FBXLoader();
  const textureLoader = new TGALoader();

  const models = {};
  for (let i = 0; i < units.length; i++) {
    const fbx = await loader.loadAsync(FBX_PATH + units[i]);
    const texture = textureLoader.load(TEXTURE_PATH + 'TT_RTS_Units_texture.tga');
    texture.colorSpace = TR.SRGBColorSpace;

    const mesh = fbx.children.find((child) => child.isMesh);
    if (mesh && mesh.material) {
      mesh.material.map = texture;
      mesh.material.side = TR.DoubleSide;
    }

    fbx.scale.set(0.005, 0.005, 0.005);
    fbx.position.set(0.5, 0.0, 0.5);

    models[units[i].split('.')[0]] = fbx;
  }
  return models;
}
