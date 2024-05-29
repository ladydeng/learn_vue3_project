<template>
  <div id="threeBox">5.1创建纹理贴图-5.6UV动画</div>
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
    const geometry = new THREE.PlaneGeometry( 10, 5 )
    
    // 自定义顶点uv
    // 顶点UV坐标的作用是从纹理贴图上提取像素映射到网格模型Mesh的几何体表面上。
    // 顶点UV坐标可以在0~1.0之间任意取值，纹理贴图左下角对应的UV坐标是(0,0)，右上角对应的坐标(1,1)
    const uvs = new Float32Array([
        0,0,
        0.5,0,
        0.5,0.5,
        0,0.5
    ])  //获取1/4左下角作为纹理贴图
    geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2) //两个为一组，表示一个顶点

    // 设置几何体的图片材质
    const texLoader = new THREE.TextureLoader()
    let mesh = null
    const texture = texLoader.load("../../src/assets/test.jpg")
    // const texture = texLoader.load("../../src/assets/touming.png") //透明背景图片，注意：下方材质需要开启透明

    // 纹理对象的阵列功能
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(8,8)

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        // transparent: true, //使用背景透明的png贴图，注意开启透明计算
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotateX(-Math.PI/4)
    scene.add(mesh)

    // 相机
    const camera = new THREE.PerspectiveCamera()
    camera.position.set(10, 10, 10)
    camera.lookAt(0,0,0)


    // 渲染器
    const renderer = new THREE.WebGLRenderer()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
    document.getElementById("threeBox").appendChild(renderer.domElement)

    // 定义循环渲染方法
    function render() {
        texture.offset.x +=0.001;  //纹理偏移
        renderer.render(scene, camera); // 执行渲染操作
        requestAnimationFrame(render); // 渲染下一帧的时候就会调用render函数
    }
    render();

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