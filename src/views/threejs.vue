<template>
  <div id="threeBox"></div>
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
        scene.background = new THREE.Color( 0x263238 )
        //创建一个长方体几何对象Geometry
        const geometry = new THREE.SphereGeometry(100); 
        // 创建漫反射网络材质MeshLambertMaterial  受光照影响
        const material =new THREE.MeshLambertMaterial({
            color: 0x1aa034,
            opacity:0.7,
            transparent:true
        });

        //点光源：两个参数分别表示光源颜色和光照强度
        // 参数1：0xffffff是纯白光,表示光源颜色
        // 参数2：1.0,表示光照强度，可以根据需要调整
        const pointLight = new THREE.AmbientLight(0xffffff, 10.0);

        // pointLight.decay = 0.0;//设置光源不随距离衰减，默认2.0
        // 两个参数分别为几何体geometry、材质material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        //设置网格模型在三维空间中的位置坐标，默认是坐标原点
        mesh.position.set(0,10,0);
        // AxesHelper：辅助观察的坐标系
        const axesHelper = new THREE.AxesHelper(350);
        // 通过add方法
        scene.add(mesh).add(axesHelper).add(pointLight);

        // 步骤二：
        // 实例化一个透视投影相机对象
        const camera = new THREE.PerspectiveCamera();
        //相机在Three.js三维坐标系中的位置
        // 根据需要设置相机位置具体值
        camera.position.set(400, 500, 100); 
        // 相机观察目标指向Threejs 3D空间中某个位置
        camera.lookAt(mesh.position);//指向mesh对应的位置

        // 步骤三：
        // 创建渲染器对象
        const renderer = new THREE.WebGLRenderer();
        // 定义threejs输出画布canvas的尺寸(单位:像素px)
        const width = 600; //宽度
        const height = 600; //高度
        renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
        renderer.render(scene, camera); //执行渲染操作
        document.getElementById('threeBox').appendChild(renderer.domElement);


        // 步骤三：
        // 设置相机控件轨道控制器OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
        controls.addEventListener('change', function () {
            renderer.render(scene, camera); //执行渲染操作
        });//监听鼠标、键盘事件
}


onMounted(() => {
    initChart()
    console.log("hello world!")
})

</script>

<style lang="scss" scoped>
#threeBox{
    border: 1px solid red;
}

</style>