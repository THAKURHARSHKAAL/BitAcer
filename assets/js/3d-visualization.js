// Three.js setup
let scene, camera, renderer;
let land;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Create land parcel
    const geometry = new THREE.BoxGeometry(2, 0.2, 2);
    const material = new THREE.MeshPhongMaterial({
        color: 0x44aa88,
        specular: 0x333333,
        shininess: 30,
        transparent: true,
        opacity: 0.8
    });
    
    land = new THREE.Mesh(geometry, material);
    scene.add(land);

    // Add grid helper
    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(scene.position);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the land
    land.rotation.y += 0.005;
    
    // Add subtle floating animation
    land.position.y = Math.sin(Date.now() * 0.001) * 0.1;

    renderer.render(scene, camera);
}

// Initialize the 3D scene
init();
