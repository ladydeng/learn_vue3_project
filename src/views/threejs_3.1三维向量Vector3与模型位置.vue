<template>
  <div id="threeBox">3.1三维向量Vector3与模型位置(实际探讨的是模型位置position就是一个vector3对象)</div>
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
    const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8)

    // 创建材质对象
    const material = new THREE.MeshBasicMaterial({
        color: 0x44c1ff,
        wireframe:true,
    })

    // 实例化一个三维向量对象
    // const v3 = new THREE.Vector3(0,0,0)
    // v3.set(1,0,0)
    // v3.x = 100 //改变某个属性的值
    
    // 网络模型对象
    const mesh = new THREE.Mesh(geometry, material)
    console.log(mesh.position)  //position属性就是一个三维向量对象，可使用三维向量的方式去改变某个属性的值
    // 法一：
    // mesh.position.set(0,0,1)
    // 法二：
    mesh.position.z = 1
    // 平移
    mesh.translateX(1)
    // 缩放
    mesh.scale.x = 2

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
    renderer.render(scene, camera)
    document.getElementById("threeBox").appendChild(renderer.domElement)

    // 轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener("change", function(){
        renderer.render(scene, camera)
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