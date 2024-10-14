import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mechs } from './mechs';

const MODEL_PATH = './assets/mechs/';

export async function loadMechs(TR) {
  const fbxLoader = new FBXLoader();
  const gltfLoader = new GLTFLoader();

  const models = {};
  for (let i = 0; i < mechs.length; i++) {
    const fileName = mechs[i];
    const extension = fileName.split('.').pop().toLowerCase(); // Get the file extension

    let model;
    if (extension === 'fbx') {
      const fbx = await fbxLoader.loadAsync(MODEL_PATH + fileName);
      model = fbx;
    } else if (extension === 'gltf' || extension === 'glb') {
      const gltf = await gltfLoader.loadAsync(MODEL_PATH + fileName);
      model = gltf.scene; // GLTF models are inside `gltf.scene`
    } else {
      console.error(`Unsupported file extension: ${extension}`);
      continue;
    }

    model.scale.set(0.005, 0.005, 0.005);
    model.position.set(0.5, 0.0, 0.5);

    models[fileName.split('.')[0]] = model; // Store model by its name without extension
  }
  return models;
}
