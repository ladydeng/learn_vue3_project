<template>
  <div id="threeBox">几何体BufferGeometry(1-8)</div>
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
    // 步骤一：
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xdcdcdc )

        //创建一个长方体几何对象Geometry
        // const geometry = new THREE.BoxGeometry(50, 300, 200); 
        // 漫反射网络材质
        // const material =new THREE.MeshLambertMaterial({
        // const material =new THREE.MeshBasicMaterial({
        //     color: 0x1aa034,
        //     opacity:1,
        //     transparent:true,
        //     wireframe:true,//线条模式渲染mesh对应的三角形数据
        // });


    // start——————————————————
    // 几何体BufferGeometry
        // 创建一个空的几何体对象
        const geometry = new THREE.BufferGeometry()
        // 类型化数组创建顶点数据
        // const vertices = new Float32Array([
        //     0,0,0,  //顶点1
        //     100,0,0,  //顶点2
        //     0,200,0,  //顶点3

        //     0,0,0,  //顶点4   --和顶点1位置相同
        //     0,0,200,  //顶点5
        //     100,0,0,  //顶点6   --和顶点2位置相同

        //     0,0,0,  //顶点7  --和顶点1位置相同
        //     0,200,0,  //顶点8  --和顶点3位置相同
        //     0,0,200,  //顶点9  --和顶点5位置相同

        //     100,0,0,  //顶点10  --和顶点2位置相同
        //     0,200,0,  //顶点11  --和顶点3位置相同
        //     0,0,200,  //顶点12   --和顶点5位置相同
        // ])
         
        //  优化start+++
        // 方法：通过geometry.index(顶点索引)减少顶点位置相同的坐标
        const vertices = new Float32Array([
            0,0,0,  //顶点1
            100,0,0,  //顶点2
            0,200,0,  //顶点3

            // 0,0,0,  //顶点4   --和顶点1位置相同
            0,0,200,  //顶点5
            // 100,0,0,  //顶点6   --和顶点2位置相同

            // 0,0,0,  //顶点7  --和顶点1位置相同
            // 0,200,0,  //顶点8  --和顶点3位置相同
            // 0,0,200,  //顶点9   --和顶点5位置相同

            // 100,0,0,  //顶点10   --和顶点2位置相同
            // 0,200,0,  //顶点11  --和顶点3位置相同
            // 0,0,200,  //顶点12   --和顶点5位置相同
        ])
        const indexes = new Uint16Array([
            0,1,2,
            0,3,1,
            0,2,3,
            1,2,3
        ])
        geometry.index = new THREE.BufferAttribute(indexes, 1)


        //  优化end+++

        // 创建属性缓冲区对象
        // 3个为一组，表示一个顶点xyz坐标
        const attribute = new THREE.BufferAttribute(vertices, 3)
        // 设置几何体attributes的属性的位置属性
        geometry.attributes.position = attribute

        // 01、{【点】
        // 点渲染模式
        // const material = new THREE.PointsMaterial({
        //     color: 0xfb512c,
        //     size: 10.0, //点对象像素尺寸
        // })
        // 点模型对象
        // const points = new THREE.Points(geometry,material)
        // scene.add(points)

        // 02、【线】
        // 纸材质对象
        // const material = new THREE.LineBasicMaterial({
        //     color: 0xfb512c,
        // })
        // 创建线模型对象
        // const line = new THREE.Line(geometry, material)  //依次连成线
        // const line = new THREE.LineLoop(geometry, material)  //闭合线条
        // const line = new THREE.LineSegments(geometry, material)  //非连续的线条
        // scene.add(line)

        // 03、【面】
        // 创建基础网络材质对象
        const material = new THREE.MeshBasicMaterial({
        // const material = new THREE.MeshLambertMaterial({   //无效
            // color: 0x1aa034,
            color: 0xd8d3d0,
            // side: THREE.FrontSide, //默认只有正面可见
            side: THREE.DoubleSide, //两面可见
            // side: THREE.BackSide, //只有背面可见
        })
        // 创建网络模型对象
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh)


        // 几何体xyz三个方向都放大2倍
        geometry.scale(2,2,2)
        // 几何体沿着x轴平移50
        geometry.translate(150, 0,0)
        // 几何体沿着x轴旋转45度
        geometry.rotateX(Math.PI / 4)  //π/4 为45度
    // end—————————————————— 

        // 辅助观察的坐标系
        const axesHelper = new THREE.AxesHelper(300)
        scene.add(axesHelper)

        // 点光源
        const pointLight = new THREE.PointLight(0xffffff, 1000000000.0);
        pointLight.position.set(300, 300, 300); 
        // scene.add(pointLight);
        

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
        camera.aspect = width / height
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