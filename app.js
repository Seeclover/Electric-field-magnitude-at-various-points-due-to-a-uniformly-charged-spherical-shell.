// 建立場景和相機
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 建立渲染器
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 建立半球殼
var sphereGeometry = new THREE.SphereGeometry(3, 32, 32, Math.PI, Math.PI, 0, Math.PI);
var sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// 使圓面總是朝向觀察者
sphere.lookAt(camera.position);

// 將半球殼加入場景中
scene.add(sphere);

// 當窗口大小變化時，重新調整渲染器和相機
window.addEventListener("resize", function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 定義動畫函數
function animate() {
    requestAnimationFrame(animate);

    // 使圓面總是朝向觀察者
    sphere.lookAt(camera.position);

    renderer.render(scene, camera);
}

// 開始動畫循環
animate();

// 在右上角顯示鼠標位置和圓心距離
var info = document.getElementById("info");
function updateInfo(x, y) {
    var mouseVector = new THREE.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.5);
    mouseVector.unproject(camera);
    var dir = mouseVector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    var point = camera.position.clone().add(dir.multiplyScalar(distance));
    var distanceToCenter = point.distanceTo(sphere.position);
    if (+ distanceToCenter.toFixed(2) < 3) {
        info.innerHTML = "Mouse: (" + x + ", " + y + ")<br>E: 0";
    }
    else {
        info.innerHTML = "Mouse: (" + x + ", " + y + ")<br>E: Q / " + distanceToCenter.toFixed(2) * + distanceToCenter.toFixed(2) * 3.14 * 8.85;
    }

}

// 當鼠標移動時，更新信息
document.addEventListener("mousemove", function (event) {
    updateInfo(event.clientX, event.clientY);
});

// 當窗口大小變化時，重新調整渲染
