(() => {
  'use strict';

  const B = window.BABYLON;
  if (!B || !B.EngineStore) return;

  const scene = B.EngineStore.LastCreatedScene;
  if (!scene || scene.getMeshByName('railwayDecorFenceTop')) return;

  function material(name, color) {
    const m = new B.StandardMaterial(name, scene);
    m.diffuseColor = B.Color3.FromHexString(color);
    m.specularColor = new B.Color3(0.04, 0.04, 0.04);
    return m;
  }

  const fenceMat = material('railwayFenceMaterial', '#526777');
  const darkMat = material('railwayCarGlass', '#263441');
  const wheelMat = material('railwayWheel', '#1c2229');
  const carColors = ['#c84e47', '#2f4053', '#8f969c', '#c95a45'];

  // Reja frontal ligera. Los barrotes son pocos y no son seleccionables.
  const fenceZ = 8.35;
  const top = B.MeshBuilder.CreateBox('railwayDecorFenceTop', {
    width: 29,
    height: 0.16,
    depth: 0.16
  }, scene);
  top.position.set(0, 2.9, fenceZ);
  top.material = fenceMat;
  top.isPickable = false;

  const mid = B.MeshBuilder.CreateBox('railwayDecorFenceMid', {
    width: 29,
    height: 0.12,
    depth: 0.14
  }, scene);
  mid.position.set(0, 1.55, fenceZ);
  mid.material = fenceMat;
  mid.isPickable = false;

  for (let x = -14; x <= 14; x += 2) {
    // Deja un pequeño acceso visual al centro.
    if (Math.abs(x) < 1.4) continue;
    const bar = B.MeshBuilder.CreateBox(`railwayFenceBar_${x}`, {
      width: 0.12,
      height: 3,
      depth: 0.12
    }, scene);
    bar.position.set(x, 1.5, fenceZ);
    bar.material = fenceMat;
    bar.isPickable = false;
  }

  function createCar(id, x, z, color, rotation = 0) {
    const root = new B.TransformNode(`railwayCar_${id}`, scene);
    root.position.set(x, 0, z);
    root.rotation.y = rotation;

    const bodyMat = material(`railwayCarMaterial_${id}`, color);

    const body = B.MeshBuilder.CreateBox(`railwayCarBody_${id}`, {
      width: 2.05,
      height: 0.62,
      depth: 3.45
    }, scene);
    body.parent = root;
    body.position.y = 0.48;
    body.material = bodyMat;

    const cabin = B.MeshBuilder.CreateBox(`railwayCarCabin_${id}`, {
      width: 1.62,
      height: 0.52,
      depth: 1.75
    }, scene);
    cabin.parent = root;
    cabin.position.set(0, 0.94, -0.05);
    cabin.material = darkMat;

    const wheelPositions = [
      [-0.92, 0.25, -1.05], [0.92, 0.25, -1.05],
      [-0.92, 0.25, 1.05], [0.92, 0.25, 1.05]
    ];
    wheelPositions.forEach((p, i) => {
      const wheel = B.MeshBuilder.CreateCylinder(`railwayWheel_${id}_${i}`, {
        diameter: 0.44,
        height: 0.18,
        tessellation: 12
      }, scene);
      wheel.parent = root;
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(p[0], p[1], p[2]);
      wheel.material = wheelMat;
    });

    root.getChildMeshes().forEach(mesh => {
      mesh.isPickable = false;
      mesh.alwaysSelectAsActiveMesh = false;
    });
  }

  // Posiciones deliberadamente dentro del encuadre inicial.
  createCar(0, -8.6, 6.35, carColors[0], 0.02);
  createCar(1, -3.4, 6.25, carColors[1], -0.03);
  createCar(2, 4.2, 6.45, carColors[2], 0.02);
  createCar(3, 9.2, 6.25, carColors[3], -0.02);

  console.log('[Torre Segura] Decoración ligera cargada: autos + reja.');
})();
