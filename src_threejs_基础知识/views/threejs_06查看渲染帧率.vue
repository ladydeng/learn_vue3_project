<template>
  <div id="threeBox">13.stats查看threejs渲染帧率</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as THREE from "three"

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入性能监视器
import Stats from "three/addons/libs/stats.module.js"

const initChart = () => {
    // 步骤一：
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xdcdcdc )
        /**
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
        */
        const num = 10
        for(let i = 0; i < num; i++){
            const geometry = new THREE.BoxGeometry(50,50,50)
            const material = new THREE.MeshLambertMaterial({
                color: 0x1aa034
            })
            const mesh = new THREE.Mesh(geometry, material)
            const x = (Math.random() - 0.5) * 300
            const y = (Math.random() - 0.5) * 300
            const z = (Math.random() - 0.5) * 300
            mesh.position.set(x,y,z)
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

            scene.add(mesh).add(axesHelper).add(pointLight);
        }

    // 步骤二：
        // 实例化一个透视投影相机对象
        const camera = new THREE.PerspectiveCamera();
        camera.position.set(400, 500, 100); 
        camera.lookAt(0,0,0);

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

        // 查看渲染帧率
        const stats = new Stats()
        document.body.appendChild(stats.domElement)
        function render(){
            // 调用update方法刷新时间
            stats.update()
            renderer.render(scene, camera)
            // mesh.rotateY(0.01)
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