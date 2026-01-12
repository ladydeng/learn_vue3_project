<template>
    <div class="myBox"></div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

// 导入动画库
import gsap from "gsap"

// 场景、相机、渲染器
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0x353d44 )
const camera = new THREE.PerspectiveCamera(
    75, //视锥体垂直视野角度
	window.innerWidth / window.innerHeight,  //视锥体长宽比
	0.1,  //视锥体近端面
	1000  //视锥体远端面-物体在视锥体范围内才会显示在canvas上
)
const renderer = new THREE.WebGLRenderer({antialias: true})

const controls = new OrbitControls(camera, renderer.domElement)
const fontLoader = new FontLoader()


function initChart(){
    camera.position.set(0,0,6)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementsByClassName("myBox")[0].appendChild(renderer.domElement)
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material1 = new THREE.MeshBasicMaterial({
        color: 0x4798d0,
        transparent: true,
        opacity: 0.5
    })
    const material2 = new THREE.MeshBasicMaterial({
        color: 0xffd3e3fd,
        transparent: true,
        opacity: 0.5
    })
    const mesh1 = new THREE.Mesh(geometry, material1)
    const mesh2 = new THREE.Mesh(geometry, material2)
    mesh1.position.x = 2
    mesh2.position.x = -2
    mesh1.name = "盒子11"
    mesh2.name = "盒子22"
    scene.add(mesh1).add(mesh2)

    // gsap动画使用 start-----------
    gsap.to(mesh2.rotation, { 
        z: 2 * Math.PI, 
        duration: 5, 
        // 设置重复的次数，无限次循环-1
        repeat: -1,
        // 控制动画过程中的更改频率，默认值power1.inout, 全部属性表详见：https://gsap.com/docs/v3/Eases/
        ease: "bounce.in",
    })
    // end----------------

    function animate(){

        mesh1.rotation.x += 0.01

        controls.update();
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
    }
    animate()

    addEachText()
}

function addEachText(){
    scene.children.forEach((obj, index) => {
        addText(obj, index)
    })
}

function addText(obj, index){
    console.log(obj)
    fontLoader.load(
        "/src/assets/json/HONOR_Sans_CN_Regular.json",
        function(font){
            const geometry = new TextGeometry(obj.name, {
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
            textMesh.position.copy(obj.position)
            textMesh.position.y = 1

            scene.add(textMesh)

            // 在渲染循环中始终保持文字面向摄像机
            function animate(){
                requestAnimationFrame(animate)
                textMesh.lookAt(camera.position)
            }
            animate()

        }
    )
}

onMounted(() => {
    initChart()
})
</script>

<style lang="scss" scoped>
.myBox{
    width: 100vw;
    height: 100vh;
    background: #f7f8fc;
}

</style>