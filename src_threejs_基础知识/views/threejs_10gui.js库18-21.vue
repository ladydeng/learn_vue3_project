<template>
  <div id="threeBox">18.gui.js库(可视化改变三维场景)——21.gui.js库(分组)</div>
</template>

<script setup lang="ts">
import { onMounted, render } from "vue"
import * as THREE from "three"
/**
 * 三要素：场景Scene、相机Camera、渲染器Renderer
 */

// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入dat.gui.js的一个类GUI（threejs三维空间参数调试库）
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const initChart = () => {
    // 步骤一：
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xdcdcdc )

        //创建一个长方体几何对象Geometry
        const geometry = new THREE.BoxGeometry(50, 300, 200); 
        // 漫反射网络材质
        const material =new THREE.MeshLambertMaterial({
            color: 0x1aa034,
            opacity:1,
            transparent:true
        });

        // 两个参数分别为几何体geometry、材质material
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        mesh.position.set(0,-100,0);
        scene.add(mesh)

        // 环境光
        // const ambient = new THREE.AmbientLight(0xffffff, 2);
        // scene.add(ambient);

        const pointLight = new THREE.PointLight(0xffffff, 100000.0);
        pointLight.position.set(400, 200, 300); 
        scene.add(pointLight);

    // 步骤二：
        // 实例化一个透视投影相机对象
        const camera = new THREE.PerspectiveCamera();

        camera.position.set(500, 500, 500);   //相机位置
        // camera.lookAt(mesh.position);  //相机观察目标点： 脱离页面范围后就看不到目标物体了
        camera.lookAt(0,0,0);

    // 步骤三：
        // 创建渲染器对象
        const renderer = new THREE.WebGLRenderer({
            antialias: true, //渲染器锯齿属性
        });
        // 设置设备像素比， 告诉threejs,以免渲染模糊问题
        renderer.setPixelRatio(window.devicePixelRatio)
        // 设置背景颜色——与场景scene背景颜色重叠，需要注释掉scene背景颜色才能看到效果
        renderer.setClearColor(0xe0e8f6, 1)

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
    


    // gui.js start---------
        const gui = new GUI()
        gui.domElement.style.right = "0px"
        gui.domElement.style.width = "300px"

        // step：每次改变间隔  name:命名
        gui.add(pointLight, 'intensity', 100000, 900000).name('光照强度').step(100000).onChange(function(value){
            // pointLight.intensity = value;
            // renderer.render(scene, camera);
        });

        // addColor：颜色选择器
        gui.addColor(material, 'color').name('颜色').onChange(function(value){
            // 如果执行了循环渲染就不用手动调用renderer.render(scene, camera)了，
            // 也不用手动赋值material.color = value
            
            // material.color = value
            // renderer.render(scene, camera);
        })

        // addFolder分组
        const dirFolder = gui.addFolder("位置")
        dirFolder.close()
        // 1、数组——下拉框
        dirFolder.add(mesh.position, 'x', [-200, 200]).onChange(function(value){
            // mesh.position.x = value
            // renderer.render(scene, camera);
        })
        // 2、对象——下拉框
        dirFolder.add(mesh.position, 'y', {
            left: -200,
            center: 0,
            right: 200
        }).onChange(function(value){
            // mesh.position.y = value
            // renderer.render(scene, camera);
        })
        // 3、直接传值——拖动条
        gui.add(mesh.position, 'z', -400, 400).onChange(function(value){
            // mesh.position.z = value
            // renderer.render(scene, camera);
        })


        let obj = {
            bool: true
        }
        // 4、布尔值——单选按钮
        gui.add(obj, 'bool').name('旋转动画');

        // 渲染循环
        function render() {
            // 当gui界面设置obj.bool为true,mesh执行旋转动画
            if (obj.bool) mesh.rotateY(0.01);
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        render();
    // gui.js end---------

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