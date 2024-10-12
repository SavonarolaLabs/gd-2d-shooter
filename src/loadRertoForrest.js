import { FBXLoader } from 'three/examples/jsm/Addons.js';
import { retroForrestAssets } from './retroForrestAssets';

const FBX_PATH = './assets/EnviroKit Retro-Forest/fbx/';
const TEXTURE_PATH = './assets/EnviroKit Retro-Forest/textures/';

export async function loadRetroForrest(TR) {
  const loader = new FBXLoader();
  const textureLoader = new TR.TextureLoader();

  const blocks = {};
  for (let i = 0; i < retroForrestAssets.length; i++) {
    const fbx = await loader.loadAsync(FBX_PATH + retroForrestAssets[i]);
    const textureName = `atlas_retroForest_A.png`;
    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = TR.SRGBColorSpace;
    texture.magFilter = TR.NearestFilter;
    texture.minFilter = TR.NearestFilter;

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        //child.material.side = TR.DoubleSide; // Ensure the texture is rendered on both sides
        child.material.needsUpdate = true;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    fbx.position.set(0, 0, 0);
    fbx.scale.set(0.5, 0.5, 0.5);
    blocks[retroForrestAssets[i].split('.')[0]] = fbx;
  }
  return blocks;
}
