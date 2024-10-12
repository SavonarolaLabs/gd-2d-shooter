import { FBXLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { buildings } from './buildings.js';

const FBX_PATH = './assets/TT_RTS_Standard/models/buildings/';
const TEXTURE_PATH = './assets/TT_RTS_Standard/models/materials/';

export async function loadBuildings(TR) {
  const gltfLoader = new GLTFLoader();
  const textureLoader = new TR.TextureLoader();

  const blocks = {};

  for (let i = 0; i < buildings.length; i++) {
    let model = await gltfLoader.loadAsync(FBX_PATH + buildings[i]);

    let textureName = `TT_RTS_Buildings_texture.tga`;

    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = TR.SRGBColorSpace;
    texture.magFilter = TR.NearestFilter;
    texture.minFilter = TR.NearestFilter;

    const objectToTraverse = model.scene || model;
    objectToTraverse.traverse(applyTexture);

    function applyTexture(child) {
      if (child.isMesh && child.material) {
        if (child.material.map) {
          child.material.map = texture;
          if (child.material.map.repeat) {
            child.material.map.repeat.set(1, 1);
          }
          if (child.material.map.offset) {
            child.material.map.offset.set(0.0, 0.0);
          }
          child.material.needsUpdate = true;
        }
      }
    }

    const targetObject = model.scene || model;
    targetObject.position.set(0, 0, 0);

    //blocks[buildings[i].split('.')[0]] = targetObject;
    blocks[buildings[i].split('.')[0]] = targetObject;
  }

  return blocks;
}
