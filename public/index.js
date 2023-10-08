const form = document.querySelector('form');
const button = document.querySelector('#submit');

let mash = null;

// Создаем сцену
const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Создаем освещение
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 5);
scene.add(light);

/** @arg {MouseEvent} e */
button.onclick = async function (e) {

    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    const result = await fetch('/triangulate', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

    });

    const coneGeometry = await result.json();

    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Вычисляем треугольную сетку конуса
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(coneGeometry.positions, 3)
    );
    geometry.setIndex(coneGeometry.indices);

    // Создаем материал для конуса
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Создаем меш конуса
    const coneMesh = new THREE.Mesh(geometry, material);

    // Добавляем меш конуса на сцену
    scene.add(coneMesh);

    // Создаем рендерер
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('div_wrapper_scene').appendChild(renderer.domElement);

    // Определяем функцию анимации
    function animate() {
        requestAnimationFrame(animate);
        coneMesh.rotation.y += 0.01;
        coneMesh.rotation.x += 0.01;
        renderer.render(scene, camera);
    }

    // Запускаем анимацию
    animate();

};