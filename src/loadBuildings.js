import { FBXLoader, TGALoader } from 'three/examples/jsm/Addons.js';
import { buildings } from './buildings';

const FBX_PATH = './assets/TT_RTS_Standard/models/buildings/';
const TEXTURE_PATH = './assets/TT_RTS_Standard/models/materials/';

export async function loadBuildings(TR) {
  const loader = new FBXLoader();
  const textureLoader = new TGALoader();

  const models = {};
  for (let i = 0; i < buildings.length; i++) {
    const fbx = await loader.loadAsync(FBX_PATH + buildings[i]);
    const texture = textureLoader.load(TEXTURE_PATH + 'TT_RTS_Buildings_texture.tga');
    texture.colorSpace = TR.SRGBColorSpace;

    const mesh = fbx.children.find((child) => child.isMesh);
    if (mesh && mesh.material) mesh.material.map = texture;

    fbx.scale.set(0.005, 0.005, 0.005);
    fbx.position.set(0.5, 0.0, 0.5);

    models[buildings[i].split('.')[0]] = fbx;
  }
  return models;
}
