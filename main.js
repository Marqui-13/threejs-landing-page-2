// Run using Vite localhost:3000 - done, configure gui for debugging
// commented because impoprted using cloudflare in index.html: (import * as dat from 'node_modules/dat.gui')


// Comment code to explain whats happening
// let scene, camera, renderer, gui;

// Texture Loader
const loader = new THREE.TextureLoader()
const height = loader.load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDJihWICuSUgxafFd8_IWZbJ2udHsRlvzISA&usqp=CAU');
const texture = loader.load('https://images.unsplash.com/photo-1603077747884-b458237de736?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')
const alpha = loader.load('https://raw.githubusercontent.com/nkmk/python-snippets/master/notebook/data/dst/mask_circle_blur2.jpg')



// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.PlaneBufferGeometry( 4, 4, 100, 100 );

// Materials
const material = new THREE.MeshStandardMaterial({
  color: 'gray',
  map: texture,
  displacementMap: height,
  displacementScale: .3,
  alphaMap: height,
  transparent: true,
  depthTest: false
});





const plane = new THREE.Mesh(geometry,material);

scene.add(plane);
plane.rotation.x = 181;
plane.position.x = 0.9;

gui.add(plane.rotation,'x').min(0).max(600);

//Mesh

// Lights
const pointLight = new THREE.PointLight(0x2082d9, 5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

gui.add(pointLight.position,'x').min(0).max(600);
gui.add(pointLight.position,'y').min(0).max(600);
gui.add(pointLight.position,'z').min(0).max(600);
gui.close();
const col = { color: '#00ff00'};
gui.addColor(col, 'color').onChange(() => {
  pointLight.color.set(col.color);
});


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth * .5,
    height: window.innerHeight
};

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth * 0.7
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 3;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain);

let mouseY = 0;

function animateTerrain(event) {
  mouseY = event.clientY;
}

const clock = new THREE.Clock();

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime();

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

      plane.rotation.z = 0.5 * elapsedTime;
      plane.material.displacementScale = 0.2 + mouseY * 0.001;

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
