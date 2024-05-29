<template>
  <div id="threeBox">4.3模型的本地坐标与世界坐标-4.6模型隐藏或显示</div>
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
    // scene.background = new THREE.Color(0xfcebeb)  //设置场景的背景颜色

    // 创建一个几何体
    const geometry1 = new THREE.BoxGeometry(50, 50, 50)
    geometry1.translate(50,50,0)
    const geometry2 = new THREE.BoxGeometry(40, 40, 40)
    geometry2.translate(50,0,0)

    // 创建材质对象
    const material1 = new THREE.MeshBasicMaterial({
        color: 0x44c1ff,
        // wireframe:true,
    })

    // 创建高光网络材质对象
    const material2 = new THREE.MeshPhongMaterial({
        color: 0x44c1ff,
        shininess: 20
        
    })
    // 创建点光源对象
    const pointLight = new THREE.PointLight(0xffffff, 1000000.0);
    pointLight.position.set(100, 100, 150); 
    // 创建点光源辅助观察---可移动关原点观察光源位置的改变对物体造成的影响
    const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
    scene.add(pointLight).add(pointLightHelper)

    // scene.remove(pointLightHelper).remove(pointLight).移除对象

    // 网络模型对象
    const mesh1 = new THREE.Mesh(geometry1, material1)
    mesh1.name="正面墙"
    const mesh2 = new THREE.Mesh(geometry2, material2)
    mesh2.name="左侧墙"
    mesh2.visible = true;  //visible true显示 false隐藏
    mesh2.material.visible = true//visible true显示 false隐藏
    console.log(mesh2)

    // 创建一个组对象
    const group = new THREE.Group()
    group.name="房子"
    group.translateX(9.9)
    // group可以单独插入一个对象，也可以同时插入多个子对象
    // group.add(mesh1).add(mesh2)
    group.add(mesh1, mesh2)
    scene.add(group)
    group.visible = true;  //visible true显示 false隐藏
    // scene和group的关系：
        // scene:{
        //     children:[
        //         {
        //             group:{
        //                 children:[
        //                     Mesh{}
        //                 ]
        //             }
        //         }
        //     ]
        // }
    console.log(group.children)
    console.log(scene.children)

    // 对父对象操作旋转缩放平移等，子对象也会跟着变化
    group.rotateX(Math.PI/10)
    // group.scale.set(2, 2, 2)
    // group.translateX(20)

    group.traverse(function(obj){
        console.log("所有模型节点的名称：", obj.name)
        console.log(obj)  //obj里面包含字段isMesh, type等等，可以作为group里面子对象的判断
    })

    // 查找某个具体的模型 getObjectByName()
    const myMesh = scene.getObjectByName("正面墙")
    console.log(myMesh)

    // scene.remove(group) //移除对象

    // 本地坐标和世界坐标:
    // 对于任何一个【模型】来说（心得：只是获取模型的世界坐标），本地坐标就是模型本身的position， 世界坐标就是该模型的position和所有父对象的position累加的坐标
    var worldPosition = new THREE.Vector3()
    myMesh.getWorldPosition(worldPosition)
    console.log("myMesh网络模型对象的世界坐标是：",worldPosition)  


    // 相机
    const camera = new THREE.PerspectiveCamera()
    camera.position.set(200, 200, 200)
    camera.lookAt(0,0,0)

    // 渲染器
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setClearColor(0xe0e8f6, 1.0)  //设置渲染器的背景颜色
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
        group.rotateX(Math.PI/200)
        group.rotateY(Math.PI/200)
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