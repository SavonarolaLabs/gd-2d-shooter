import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { tiles } from './tiles';

const FBX_PATH = './assets/EnviroKit Retro-Forest/fbx/';
const TEXTURE_PATH = './assets/EnviroKit Retro-Forest/textures/';

export async function loadRetroForrest(TR) {
  const loader = new FBXLoader();
  const textureLoader = new TR.TextureLoader();

  const blocks = {};
  for (let i = 0; i < tiles.length; i++) {
    const fbx = await loader.loadAsync(FBX_PATH + tiles[i]);

    // Decide which texture to load based on model (or tile) name
    let textureName;
    if (tiles[i].includes('deco')) {
      textureName = `atlas_retroForest_extras_A.png`; // Use this texture for "extras"
    } else {
      textureName = `atlas_retroForest_A.png`; // Default texture
    }

    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = TR.SRGBColorSpace;
    texture.magFilter = TR.NearestFilter;
    texture.minFilter = TR.NearestFilter;

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.map.repeat.set(1, 1); // Adjust tiling if necessary
        child.material.map.offset.set(0.0, 0.0); // Adjust if the texture is offset incorrectly
        child.material.needsUpdate = true;
      }
    });

    fbx.position.set(0, 0, 0);
    fbx.scale.set(0.5, 0.5, 0.5);
    blocks[tiles[i].split('.')[0]] = fbx;
    console.log(fbx);
  }
  return blocks;
}
