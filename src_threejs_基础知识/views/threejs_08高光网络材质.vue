<template>
  <div id="threeBox">16.高光网络材质Phong</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as THREE from "three"
/**
 * 三要素：场景Scene、相机Camera、渲染器Renderer
 */

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const initChart = () => {
    // 步骤一：
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xdcdcdc )

        //创建一个长方体几何对象Geometry
        const geometry = new THREE.BoxGeometry(200, 200, 200); 
        // 1、漫反射网络材质
        // const material =new THREE.MeshLambertMaterial({
        //     color: 0x1aa034,
        //     opacity:0.5,
        //     transparent:true
        // });
        // 2、高光网络材质
        const material =new THREE.MeshPhongMaterial({
            color: 0x1aa034,
            shininess: 200, //高光部分的亮度，默认30
            specular: 0x4899d1, //高光部分的颜色
        });
        // 两个参数分别为几何体geometry、材质material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(0,0,0);
        scene.add(mesh)

        // 聚光灯光源
        const spotLight = new THREE.SpotLight(0xffffff, 1000)
        spotLight.position.set(0,150,0)
        scene.add(spotLight);

    // 步骤二：
        // 实例化一个透视投影相机对象
        const camera = new THREE.PerspectiveCamera();

        camera.position.set(500, 500, 500);   //相机位置
        // camera.lookAt(mesh.position);  //相机观察目标点： 脱离页面范围后就看不到目标物体了
        camera.lookAt(0,0,0);

    // 步骤三：
        // 创建渲染器对象
        const renderer = new THREE.WebGLRenderer();
        // 定义threejs输出画布canvas的尺寸(单位:像素px)
        // 全局渲染
        const width = window.innerWidth;
        const height = window.innerHeight;
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth / window.innerHeight
        // 相机的一些属性发生变化，需要更新相机的投影矩阵
        camera.updateProjectionMatrix() 

        renderer.setSize(width, height);
        renderer.render(scene, camera);
        document.getElementById('threeBox').appendChild(renderer.domElement);

    // 步骤四：
        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
        controls.addEventListener('change', function () {
            // 设置了渲染循环,相机控件OrbitControls就不用再通过事件change执行renderer.render(scene, camera);，毕竟渲染循环一直在执行renderer.render(scene, camera);。
            renderer.render(scene, camera);
        });
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