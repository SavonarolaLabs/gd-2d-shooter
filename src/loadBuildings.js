import { FBXLoader, TGALoader } from 'three/examples/jsm/Addons.js';
import { buildings } from './buildings';

const FBX_PATH = './assets/TT_RTS_Standard/models/buildings/';
const TEXTURE_PATH = './assets/TT_RTS_Standard/models/materials/';

export async function loadBuildings(TR) {
  const loader = new FBXLoader();
  const textureLoader = new TGALoader();

  const blocks = {};
  for (let i = 0; i < buildings.length; i++) {
    const fbx = await loader.loadAsync(FBX_PATH + buildings[i]);

    let textureName = 'TT_RTS_Buildings_texture.tga';

    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = TR.SRGBColorSpace;
    texture.magFilter = TR.NearestFilter;
    texture.minFilter = TR.NearestFilter;

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.map.repeat.set(1, 1); // Adjust tiling if necessary
        child.material.map.offset.set(0.0, 0.0); // Adjust if the texture is offset incorrectly
        child.material.side = TR.DoubleSide;
        child.material.needsUpdate = true;
      }
    });
    fbx.animations;
    console.log('🚀 ~ loadBuildings ~ fbx.animations:', fbx.animations);

    fbx.position.set(0, 0, 0);
    fbx.scale.set(0.01, 0.01, 0.01);
    blocks[buildings[i].split('.')[0]] = fbx;
  }
  return blocks;
}
