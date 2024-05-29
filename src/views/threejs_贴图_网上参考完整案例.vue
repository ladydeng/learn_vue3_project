<template>
  <div id="threeBox" style="border: 1px solid red;">
    5.1创建纹理贴图
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
    
    /*
    *1. 创建场景
    */
    const scene = new THREE.Scene();
    
    /*
    * 2.创建相机(这里是 透视摄像机--用来模拟人眼所看到的景象)
    */
    const camera = new THREE.PerspectiveCamera(
    75, // 视野角度
    window.innerWidth / window.innerHeight, // 长宽比
    0.1, // 进截面
    1000 // 远截面
    );
    // 设置相机位置
    camera.position.set(5, 5, 5);
    scene.add(camera); // 将相机添加到场景中
    
    /**
     * 导入纹理贴图
     */
    // 设置纹理加载器
    const textureLoader = new THREE.TextureLoader();
    // 注意:vue项目中需要把static文件夹放到public文件夹下,并使用static开头的绝对路径
    // 颜色贴图
    const doorColorTexture = textureLoader.load("../../src/assets/test.jpg");
    
    /*
    *  添加物体
    */
    // 创建几何体对象
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    // 材质
    const basicMaterial = new THREE.MeshBasicMaterial({
        color: "#ffff00",
        map: doorColorTexture, // 映射到材质上的贴图--颜色贴图
    });
    // 添加到网格中 = 对象 + 材质
    const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
    scene.add(cube);
    
    /**
     *  3.初始化渲染器
     */
    const renderer = new THREE.WebGL1Renderer();
    // 设置渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 将webgl渲染的canvas内容添加到body
    document.getElementById("threeBox").appendChild(renderer.domElement);
    
    /**
     * 创建轨道控制器（OrbitControls）
     * 可以使得相机围绕目标进行轨道运动
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    // // 设置控制器阻尼，让控制器更有真实效果，必须在动画循环render()中调用update()
    // controls.enableDamping = true;
    // controls.autoRotate = true; // 相机是否自动旋转
    // controls.autoRotateSpeed = 3; // 自转速度
    

    // var axesHelper = new THREE.AxesHelper(7);
    // scene.add(axesHelper);
    
    // 定义循环渲染方法
    function render() {
        renderer.render(scene, camera); // 执行渲染操作
        // controls.update(); // 加不加都行
        requestAnimationFrame(render); // 渲染下一帧的时候就会调用render函数
    }
    render();

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