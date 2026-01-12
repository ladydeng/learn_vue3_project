<template>
    <div class="root">
        <div class="myBox"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// 场景、相机、渲染器
const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0x353d44 )
// scene.background = new THREE.TextureLoader().load( "/src/assets/images/starry_sky_bg.jpg" )
const camera = new THREE.PerspectiveCamera(
    75, //视锥体垂直视野角度
	window.innerWidth / window.innerHeight,  //视锥体长宽比
	0.1,  //视锥体近端面
	1000  //视锥体远端面-物体在视锥体范围内才会显示在canvas上
)
const renderer = new THREE.WebGLRenderer({
    antialias: true, 
    alpha: true, //开启后，不会覆盖掉父级元素设置的背景
})
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)
const fontLoader = new FontLoader()
const myGroup = new THREE.Group()
myGroup.name = "我的星系组"

let startList = [
    { name:"木星", radius: 2, x: 10, speed: 0.012, img:"/src/assets/images/jupiter_bg.png" },
    { name:"土星", radius: 2.6, x: 11, speed: 0.01, img:"/src/assets/images/saturn_bg.png" },
    { name:"海王星", radius: 2.5, x: 15, speed: 0.006, img:"/src/assets/images/neptune_bg.png" },
    { name:"天王星", radius: 2.3, x: 12, speed: 0.008, img:"/src/assets/images/jupiter_bg.png" },
    { name:"地球", radius: 2, x: 5, speed: 0.016, img:"/src/assets/images/earth_bg.png" },
    { name:"金星", radius: 1.9, x: 4.5, speed: 0.018, img:"/src/assets/images/venus_bg.png" },
    { name:"火星", radius: 1.5, x: 7, speed: 0.014, img:"/src/assets/images/spark_bg.png" },
    { name:"水星", radius: 1.2, x: 4, speed: 0.02, img:"/src/assets/images/mercury_bg.png" },
]


function initChart(){
    camera.position.set(0,-6,20)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementsByClassName("myBox")[0].appendChild(renderer.domElement)

    startList.forEach(item => {
        const geometry = new THREE.SphereGeometry(1,6,32)
        const material = new THREE.MeshBasicMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        mesh.name = item.name

        // 轨道
        const track = new THREE.Mesh(new THREE.RingGeometry(item.x, item.x+0.01, 320, 1), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
        // 星光
        var starLite = new THREE.Sprite(new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load(item.img)  //图片加载
        }));
        starLite.scale.x = starLite.scale.y = starLite.scale.z = item.radius;
	    starLite.position.set(item.x, 0, 0);
        
        // 三维空间物体对象
        var object3D = new THREE.Object3D()
        object3D.add(track)
        object3D.add(starLite)
        
        // 字体设置
        fontLoader.load(
            "/src/assets/json/HONOR_Sans_CN_Regular.json",
            function(font){
                const geometry = new TextGeometry(item.name, {
                    font: font,
                    size: 0.2, //字体大小
                    height: 0.2 //文本厚度
                })
                geometry.center()  //文本居中
                const materials = new THREE.MeshBasicMaterial({
                    color: 0xffffffff,
                    transparent: true,
                    opacity: 0.5
                })
                const textMesh = new THREE.Mesh(geometry, materials)
                textMesh.position.copy(starLite.position)
                textMesh.position.y = item.radius

                object3D.add(textMesh)

                // 在渲染循环中始终保持文字面向摄像机
                function animate(){
                    textMesh.lookAt(camera.position)
                    requestAnimationFrame(animate)
                }
                animate()

            }
        )
        mesh.add(object3D)
        myGroup.add(mesh)


        function animate(){
            mesh.rotation.z += item.speed
            controls.update();
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

    })
    scene.add(myGroup)
}

onMounted(() => {
    initChart()
})
</script>

<style lang="scss" scoped>
.root{
    width: 100vw;
    height: 100vh;
    background: url("/src/assets/images/starry_sky_bg.jpg") center center no-repeat;
    background-size: cover;
}

.myBox{
    width: 100vw;
    height: 100vh;
}

</style> 