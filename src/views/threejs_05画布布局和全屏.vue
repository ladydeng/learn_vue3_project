<template>
  <div id="threeBox">12.画布布局和全屏</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as THREE from "three"

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const initChart = () => {
    // 步骤一：
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xdcdcdc )
        //创建一个长方体几何对象Geometry
        const geometry = new THREE.BoxGeometry(200, 200, 200); 
        // 创建漫反射网络材质MeshLambertMaterial  受光照影响
        const material =new THREE.MeshLambertMaterial({
            color: 0x1aa034,
            opacity:0.7,
            transparent:true
        });
        // 两个参数分别为几何体geometry、材质material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(0,0,0);
        // AxesHelper：辅助观察的坐标系
        const axesHelper = new THREE.AxesHelper(350);

        // 1、环境光：没有特定方向，整体改变场景的光照明暗
        const ambient = new THREE.AmbientLight(0xffffff, 0.5)

        // 2、点光源
        const pointLight = new THREE.PointLight(0xffffff, 100000.0);
        pointLight.position.set(400, 200, 300); 

        // 3、平行光
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        directionalLight.position.set(80,60,50)
        directionalLight.target = mesh
        
        // 4、聚光灯光源
        const spotLight = new THREE.SpotLight(0xffffff, 10000)
        spotLight.position.set(0,200,0)

        scene.add(mesh).add(axesHelper).add(spotLight);

    // 步骤二：
        // 实例化一个透视投影相机对象
        const camera = new THREE.PerspectiveCamera();
        camera.position.set(400, 500, 100); 
        camera.lookAt(mesh.position);

    // 步骤三：
        // 创建渲染器对象
        const renderer = new THREE.WebGLRenderer();
        // 定义threejs输出画布canvas的尺寸(单位:像素px)

        // 1、局部渲染
        // const width = 350;
        // const height = 350; 

        // 2、全局渲染
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
            // renderer.render(scene, camera);
        });

    // 步骤五：
        // 动画渲染循环
        function render(){
            renderer.render(scene, camera)
            mesh.rotateY(0.01)
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