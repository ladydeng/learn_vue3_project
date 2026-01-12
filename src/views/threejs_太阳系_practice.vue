<template>
    <div class="center-map-box" id="mycontant" style="width: 100vw; height: 100vh; border: 1px solid red;">
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as d3 from 'd3';
import jsondata from '../assets/json/guangdong.json'

var scene, contant, spotLight, ambient, camera, renderer, map, raycaster, mouse = null
var materialArr = []

// 新建透视相机
var setCamera = () => {
    camera = new THREE.PerspectiveCamera(10, contant.clientWidth / contant.clientHeight, 0.1, 500);
    // camera.position.z = 10

    console.log(camera)
}
// 设置渲染器
var setRenderer = () => {
    renderer = new THREE.WebGLRenderer()
    // 设置画布的大小
    renderer.setSize(contant.clientWidth, contant.clientHeight)
    //这里 其实就是canvas 画布  renderer.domElement
    contant.appendChild(renderer.domElement)
    renderer.setClearColor(0x000000, 0)
}
var render = () => {
    renderer.render(scene, camera)
}
var generateGeometry = () => {
    // 初始化一个地图对象
    map = new THREE.Object3D()

    // 墨卡托投影转换
    const projection = d3
        .geoMercator()
        .center([104.0, 37.5])
        .scale(80)
        .translate([0, 0])


    jsondata.features.forEach((elem) => {
        renderer.render(scene, camera);
        const coordinates = elem.geometry.coordinates
        // 循环坐标数组
        coordinates.forEach((multiPolygon) => {
            multiPolygon.forEach((polygon, index) => {
                const province = new THREE.Object3D()
                const shape = new THREE.Shape()
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 'white',
                })
                const lineGeometry = new THREE.BufferGeometry()
                const pointsArray = new Array()
                for (let i = 0; i < polygon.length; i++) {
                    const [x, y] = projection(polygon[i])
                    if (i === 0) {
                        shape.moveTo(x, -y)
                    }
                    shape.lineTo(x, -y)
                    pointsArray.push(new THREE.Vector3(x, -y, 0))
                }
                lineGeometry.setFromPoints(pointsArray)


                const extrudeSettings = {
                    depth: 0.07,
                    bevelEnabled: false,
                }

                const geometry = new THREE.ExtrudeGeometry(
                    shape,
                    extrudeSettings
                )
                const material = new THREE.MeshPhongMaterial({
                    color: '#43A7FF',
                    transparent: true,
                    opacity: 0.8,
                })
                const material1 = new THREE.MeshBasicMaterial({
                    color: '#3480C4',
                    transparent: true,
                    opacity: 0.4,
                })
                const loader = new FontLoader();
                //字体需放到根目录public下
                loader.load('/src/assets/json/helvetiker_regular.typeface.json', (font) => {
                    const fontOption = {
                        font: font,
                        size: 0.07,
                        height: 0.01,
                        curveSegments: 1,
                        bevelThickness: 1,
                        bevelSize: 0,
                        bevelEnabled: false,
                        bevelSegments: 0
                    };
                    const txtMater = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    const txtGeometry = new TextGeometry(name, fontOption);
                    const txtMesh = new THREE.Mesh(txtGeometry, txtMater);
                    const [x, y] = projection(elem.properties.center)
                    txtMesh.position.set(x - 8.3, -y + 4.4, 0.08)
                    if (name == 'xx县') {
                    //这里位置不对可以做微调
                        txtMesh.position.set(x - 8.33, -y + 4.55, 0.08)
                    }
                    scene.add(txtMesh);
                });
                var name = elem.properties.name;//区县名
                const mesh = new THREE.Mesh(geometry, [material, material1])
                const line = new THREE.Line(lineGeometry, lineMaterial)
                materialArr.push(material)
                province.properties = elem.properties
                province.add(mesh)
                province.add(line)
                map.add(province)
                render()
            })
        })
    })
    // map.position.set(-5, 5, -30);
    scene.add(map);
    spotLight.target = map;
    camera.position.set(100, -200, 150)
    renderer.render(scene, camera);

}
//加事件
var setClickFn = () => {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    const onMouseMove = (event) => {
        var marginLeft = contant.offsetLeft
        var marginTop = contant.offsetTop + 92
        // 如果该地图不是占满全屏需要减去margintop和marginleft
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        // mouse.x = (event.clientX / contant.clientWidth) * 2 - 1;
        // mouse.y = -(event.clientY / contant.clientHeight) * 2 + 1;
        mouse.x = ((event.clientX - marginLeft) / contant.clientWidth) * 2 - 1;
        mouse.y = -((event.clientY - marginTop) / contant.clientHeight) * 2 + 1;
    };

    let clickPosition;
    window.addEventListener("mousemove", onMouseMove, false);
    const onclick = (event) => {
        var marginLeft = contant.offsetLeft
        var marginTop = contant.offsetTop
        // let x = (event.clientX / contant.clientWidth) * 2 - 1;
        // let y = -(event.clientY / contant.clientHeight) * 2 + 1;
        // 如果该地图不是占满全屏需要减去margintop和marginleft
        let x = ((event.clientX - marginLeft) / contant.clientWidth) * 2 - 1;
        let y = -((event.clientY - marginTop) / contant.clientHeight) * 2 + 1;
        clickPosition = { x: x, y: y };
        raycaster.setFromCamera(clickPosition, camera);
        // 算出射线 与当场景相交的对象有那些
        const intersects = raycaster.intersectObjects(scene.children, true);
        let clickObj = intersects.find(
            (item) => item.object.material && item.object.material.length === 2
        );
        // 点击区县
        if (clickObj && clickObj.object) {
            console.log(clickObj)
            // $emit('clickAreaCheck',clickObj)
        }
    };
    window.addEventListener("mousedown", onclick, false);
}
// 设置最大旋转的角度
var setController = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = 2.5
    controls.minPolarAngle = 1
    controls.maxAzimuthAngle = 1
    controls.minAzimuthAngle = -1
    controls.addEventListener("change", () => {
        renderer.render(scene, camera);
    });
}
var animate = () => {
    window.requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    renderer.render(scene, camera);
}

onMounted(() => {
    // 第一步新建一个场景
    scene = new THREE.Scene()
    contant = document.getElementById('mycontant')
    scene.background = new THREE.Color(0xdee1e6)
    // 辅助线
    // const axesHelper = new THREE.AxesHelper(10);
    // scene.add(axesHelper);
    // 光源
    spotLight = new THREE.PointLight('#fff', 4, 100)
    spotLight.position.set(0.2, -0.4, 1)
    scene.add(spotLight)
    //环境光
    const ambient = new THREE.AmbientLight('#fff', 4)
    scene.add(ambient)
    // 可视化点光源
    // const pointLightHelper = new THREE.PointLightHelper(spotLight, 0.1)
    // scene.add(pointLightHelper)
    setCamera()
    setRenderer()
    generateGeometry()
    setClickFn()
    setController()
    animate()

    window.onresize = () => {
        renderer.setSize(contant.clientWidth, contant.clientHeight);
        camera.aspect = contant.clientWidth / contant.clientHeight;
        camera.updateProjectionMatrix();
    };
})
</script>