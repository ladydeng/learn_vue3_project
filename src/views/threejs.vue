<template>
  <div id="threeBox">3.2 欧拉Euler与角度属性.rotation</div>
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
    const geometry = new THREE.CapsuleGeometry(2, 2, 4, 8)

    // 创建材质对象
    const material = new THREE.MeshBasicMaterial({
        color: 0x44c1ff,
        wireframe:true,
    })
    // material.color.set("#00ff00")
    material.color.set("rgb(0,255,0)")

    
    // 网络模型对象
    const mesh = new THREE.Mesh(geometry, material)
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

    function render(){
        renderer.render(scene, camera)
        mesh.rotateY(0.01)
        // const axis = new THREE.Vector3(0,1,0);//向量axis
        // mesh.rotateOnAxis(axis,Math.PI/8);//绕axis轴旋转π/8
        requestAnimationFrame(render)
    }
    render()


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