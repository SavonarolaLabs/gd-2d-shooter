import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { buildings } from './buildings.js';

const FBX_PATH = './assets/TT_RTS_Standard/models/buildings/';
const TEXTURE_PATH = './assets/TT_RTS_Standard/models/materials/';

export async function loadBuildings() {
  const gltfLoader = new GLTFLoader();
  const textureLoader = new TGALoader();

  const blocks = {};

  for (let i = 0; i < buildings.length; i++) {
    let model = await gltfLoader.loadAsync(FBX_PATH + buildings[i]);

    let textureName = 'TT_RTS_Buildings_texture.tga';

    const texture = textureLoader.load(TEXTURE_PATH + textureName);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    const objectToTraverse = model.scene || model;
    objectToTraverse.traverse(function (child) {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
        });
        child.material.needsUpdate = true;
      }
    });

    const targetObject = model.scene || model;
    targetObject.position.set(0, 0, 0);

    blocks[buildings[i].split('.')[0]] = targetObject;
  }

  return blocks;
}
