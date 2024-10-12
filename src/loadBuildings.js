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

    let textureName = 'TT_RTS_Buildings_texture.tga';
    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = TR.SRGBColorSpace;
    // @ts-ignore
    fbx.children[0].material.map = texture;

    fbx.scale.set(0.01, 0.01, 0.01);

    models[buildings[i].split('.')[0]] = fbx;
  }
  return models;
}
