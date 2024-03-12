<template>
  <div id="threeBox">模型对象、材质</div>
</template>

<script setup lang="ts">
import { onMounted, render } from "vue"
import * as THREE from "three"
/**
 * 三要素：场景Scene、相机Camera、渲染器Renderer
 */

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const initChart = () => {
    // 创建场景
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfcebeb)

    // 创建一个胶囊图形几何体
    const geometry = new THREE.CapsuleGeometry(1, 4, 4, 8)

    // 设置几何体的图片材质
    const textureLoader = new THREE.TextureLoader()
    let mesh = null
    textureLoader.load("../../src/assets/test.jpg", function(texture){
        console.log("start png")
        const material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // 相机
        const camera = new THREE.PerspectiveCamera()
        camera.position.set(10, 10, 10)
        camera.lookAt(0,0,0)

        // 渲染器
        const renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        renderer.setClearColor(0xe0e8f6, 0.9)
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(mesh, camera)
        document.getElementById("threeBox").appendChild(renderer.domElement)

        // 轨道控制器
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.addEventListener("change", function(){
            renderer.render(mesh, camera)
        })
    })
}


onMounted(() => {
    initChart()
})

</script>

<style lang="scss" scoped>
body{
    margin: 0;
    overflow: hidden;
}

</style>