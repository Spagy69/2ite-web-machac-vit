/**
 * Tux 3D Scene - Three.js Integration
 * Loads and displays the Tux penguin mascot with interactive controls
 */

class Tux3DScene {
    constructor() {
        this.canvas = document.getElementById('tux-canvas');
        if (!this.canvas) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.tux = null;
        this.mixer = null;
        this.clock = new THREE.Clock();

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.setupControls();
        this.loadTuxModel();
        this.addEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        // Transparent background to show CSS gradient
        this.scene.background = null;
    }

    setupCamera() {
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.set(0, 0, 5);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
    }

    setupLighting() {
        // Ambient light for overall illumination
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // Main key light (warm orange)
        const keyLight = new THREE.DirectionalLight(0xf77f00, 1.2);
        keyLight.position.set(5, 5, 5);
        this.scene.add(keyLight);

        // Fill light (cool blue)
        const fillLight = new THREE.DirectionalLight(0x0096c7, 0.8);
        fillLight.position.set(-5, 3, -5);
        this.scene.add(fillLight);

        // Rim light for edge definition
        const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
        rimLight.position.set(0, -2, -5);
        this.scene.add(rimLight);

        // Point light for specular highlights
        const pointLight = new THREE.PointLight(0xffffff, 0.6, 10);
        pointLight.position.set(2, 3, 2);
        this.scene.add(pointLight);
    }

    setupControls() {
        if (typeof THREE.OrbitControls !== 'undefined') {
            this.controls = new THREE.OrbitControls(this.camera, this.canvas);
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.05;
            this.controls.enablePan = false;
            this.controls.enableZoom = false;
            // Disable auto-rotate to keep Tux facing front
            this.controls.autoRotate = false;
            // Limit vertical rotation
            this.controls.minPolarAngle = Math.PI / 3;
            this.controls.maxPolarAngle = Math.PI / 1.8;
            // Limit horizontal rotation to prevent seeing back
            this.controls.minAzimuthAngle = -Math.PI / 4;
            this.controls.maxAzimuthAngle = Math.PI / 4;
            this.controls.target.set(0, 0, 0);
        }
    }

    loadTuxModel() {
        const loader = new THREE.GLTFLoader();

        loader.load(
            'assets/models/tux.glb',
            (gltf) => {
                this.tux = gltf.scene;

                // Calculate bounding box to center and scale properly
                const box = new THREE.Box3().setFromObject(this.tux);
                const center = box.getCenter(new THREE.Vector3());
                const size = box.getSize(new THREE.Vector3());

                // Create wrapper group for proper centering
                const wrapper = new THREE.Group();
                wrapper.add(this.tux);

                // Move model so its center is at origin
                this.tux.position.sub(center);

                // Scale to fit nicely in view
                const maxDim = Math.max(size.x, size.y, size.z);
                const targetSize = 2.5;
                const scale = targetSize / maxDim;
                wrapper.scale.setScalar(scale);

                // Store wrapper as tux for animations
                this.tux = wrapper;
                this.scene.add(wrapper);

                // Handle animations if present
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(gltf.scene);
                    const action = this.mixer.clipAction(gltf.animations[0]);
                    action.play();
                }

                console.log('Tux model loaded and centered!');
            },
            (progress) => {
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`Loading Tux: ${percent.toFixed(0)}%`);
            },
            (error) => {
                console.error('Error loading Tux model:', error);
                this.createFallbackTux();
            }
        );
    }

    createFallbackTux() {
        // Create a stylized procedural penguin if GLB fails to load
        const group = new THREE.Group();

        // Body (black ellipsoid)
        const bodyGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        bodyGeometry.scale(1, 1.3, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.4,
            metalness: 0.1
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.y = 0;
        group.add(body);

        // Belly (white ellipsoid)
        const bellyGeometry = new THREE.SphereGeometry(0.45, 32, 32);
        bellyGeometry.scale(0.8, 1.1, 0.5);
        const bellyMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.5
        });
        const belly = new THREE.Mesh(bellyGeometry, bellyMaterial);
        belly.position.set(0, -0.1, 0.25);
        group.add(belly);

        // Head (black sphere)
        const headGeometry = new THREE.SphereGeometry(0.35, 32, 32);
        const headMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            roughness: 0.4
        });
        const head = new THREE.Mesh(headGeometry, headMaterial);
        head.position.y = 0.9;
        group.add(head);

        // Beak (orange cone)
        const beakGeometry = new THREE.ConeGeometry(0.08, 0.2, 16);
        const beakMaterial = new THREE.MeshStandardMaterial({
            color: 0xf77f00,
            roughness: 0.4
        });
        const beak = new THREE.Mesh(beakGeometry, beakMaterial);
        beak.rotation.x = Math.PI / 2;
        beak.position.set(0, 0.85, 0.4);
        group.add(beak);

        // Eyes (white spheres)
        const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.12, 0.95, 0.28);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.12, 0.95, 0.28);
        group.add(rightEye);

        // Pupils
        const pupilGeometry = new THREE.SphereGeometry(0.04, 16, 16);
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

        const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        leftPupil.position.set(-0.12, 0.95, 0.34);
        group.add(leftPupil);

        const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        rightPupil.position.set(0.12, 0.95, 0.34);
        group.add(rightPupil);

        // Feet (orange)
        const footGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.3);
        const footMaterial = new THREE.MeshStandardMaterial({
            color: 0xf77f00,
            roughness: 0.5
        });

        const leftFoot = new THREE.Mesh(footGeometry, footMaterial);
        leftFoot.position.set(-0.15, -0.8, 0.1);
        group.add(leftFoot);

        const rightFoot = new THREE.Mesh(footGeometry, footMaterial);
        rightFoot.position.set(0.15, -0.8, 0.1);
        group.add(rightFoot);

        this.tux = group;
        this.scene.add(this.tux);

        console.log('Fallback Tux created');
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());

        // Stop auto-rotate on user interaction
        this.canvas.addEventListener('pointerdown', () => {
            if (this.controls) {
                this.controls.autoRotate = false;
            }
        });

        // Resume auto-rotate after inactivity
        let timeout;
        this.canvas.addEventListener('pointerup', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.controls) {
                    this.controls.autoRotate = true;
                }
            }, 3000);
        });
    }

    onResize() {
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const delta = this.clock.getDelta();

        // Update animation mixer
        if (this.mixer) {
            this.mixer.update(delta);
        }

        // Idle floating and gentle sway animation
        if (this.tux) {
            const time = this.clock.getElapsedTime();
            // Gentle floating up/down
            this.tux.position.y = Math.sin(time * 0.8) * 0.15;
            // Gentle side tilt
            this.tux.rotation.z = Math.sin(time * 0.5) * 0.05;
            // Gentle Y rotation sway (keeps front visible with nice movement)
            this.tux.rotation.y = Math.sin(time * 0.3) * 0.3;
        }

        // Update controls
        if (this.controls) {
            this.controls.update();
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Tux3DScene();
});
