<template>
  <div id="threeBox">
      <p>3.2 欧拉Euler与角度属性.rotation(实际讲的是rotation的属性值是一个Euler-欧拉对象)</p>
      <p>3.3 模型材质颜色Color对象(实际讲的是模型材质颜色是一个Color对象)</p>
      <p>3.4 模型材质父类Material(所有的网络材质都会继承父类Material的一些属性和方法，如：opacity、side、transparent等)</p>
      <p>3.5 模型材质和集合体属性(可以通过访问父类一层一层来找到访问的属性)</p>
      <p>3.6 克隆.clone()和复制.copy()(复制一个和原来对象一样的新对象，把一个对象的属性复制给另一个对象)</p>
  </div>
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
    console.log(material.color) //Color对象

    
    // 网络模型对象
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = 0.3
    console.log(mesh.rotation)  //Euler对象
    console.log(mesh.material.color)  //可以通过访问父类一层一层来找到访问的属性
    scene.add(mesh)

    // 克隆 clone()-复制一个和原对象一样的对象
    let mesh1 = mesh.clone()
    // 复制 copy()-把一个对象的2属性赋值给另一个对象
    let material1 = new THREE.MeshBasicMaterial({
        color:"0x00ff00"
    })
    material1.copy(material)
    console.log(mesh)
    console.log(mesh1)
    console.log(material.color)
    console.log(material1.color)

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

    function render(){
        renderer.render(scene, camera)
        // mesh.rotateX(0.01)
        mesh.rotateX(Math.PI/200)
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