export function setLight(TR, scene) {
  const ambientLight = new TR.AmbientLight(0xffffff, 2.0);
  scene.add(ambientLight);

  const directionalLight = new TR.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(0, 20, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
}
