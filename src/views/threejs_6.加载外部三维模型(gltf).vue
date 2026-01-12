<template>
  <div id="threeBox">6、加载外部三维模型(gltf)</div>
</template>

<script setup lang="ts">
    import { onMounted } from "vue"
    import * as THREE from "three"
    // 引入gltf模型加载库GLTFLoader.js
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    // 引入轨道控制器扩展库OrbitControls.js
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    /**
        * 三要素：场景Scene、相机Camera、渲染器Renderer
    */

    let startInit = () => {
        const scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf7f8fc)
        
        // const geometry = new THREE.BoxGeometry(2,2,2)
        // const material = new THREE.MeshBasicMaterial({
        //     color:0xc0e8f6
        // })
        // const mesh = new THREE.Mesh(geometry, material)
        // scene.add(mesh)

        
        const loader = new GLTFLoader()
        loader.load("/src/assets/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf", function( gltf ){
            scene.add(gltf.scene)

            console.log(gltf.scene.children) //查看所有子节点

            const helmet = gltf.scene.getObjectByName("node_damagedHelmet_-6514")  //该命名需要程序和美术配合命名
            console.log(helmet.material)  // 可以根据节点名称获取节点，并改变节点属性

        })


        const pointLight = new THREE.PointLight(0xffffff, 80000.0);
        pointLight.position.set(200, 200, 200); 
        scene.add(pointLight)


        
        
        // 相机
        const camera = new THREE.PerspectiveCamera()
        camera.position.set(10,10,10) //摄像机的位置一定要比几何体的长宽高要大
        camera.lookAt(0,0,0)
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        // 渲染器
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        document.getElementById("threeBox").appendChild(renderer.domElement)


        // 动画
        function animate(){
            scene.rotateY(Math.PI / 500)
            renderer.render(scene, camera)
            requestAnimationFrame(animate)
        }
        animate()


        // 相机控件轨道控制
        const controls = new OrbitControls(camera, renderer.domElement)
        // controls.target.set(0,0,0)  //与lookAt参数保持一致
        // controls.update()  //update()函数内会执行camera.lookAt(controls.target)
        controls.addEventListener("change", function(){
            renderer.render(scene, camera)
        })   
        
        


        // 创建鼠标点击事件，给点击的对象添加业务逻辑++++++++++++++++++++++++++++
        //  创建射线投射器
        const raycaster = new THREE.Raycaster()
        // 鼠标位置
        const mouse = new THREE.Vector2()
        // 鼠标点击事件监听
        window.addEventListener('click', mouseClick, false)
        function mouseClick(event) {
            console.log("进入点击事件》》》》》》》》")
            // 将鼠标坐标归一化
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
            // 设置射线起点为鼠标位置，射线的方向为相机视角方向
            raycaster.setFromCamera(mouse, camera)
            // 计算射线相交
            const intersects = raycaster.intersectObjects(scene.children, true)
            if (intersects.length > 0) {
                // 选中物体
                const selectedObject = intersects[0].object
                alert(`点击了${selectedObject.name}`)
                // 改变当前被点击物体的颜色
                selectedObject.material.color.set(0xff62e258)
            } 
        }
    
    }




    onMounted(() => {
        startInit()
    })










</script>

<style lang="scss" scoped>
    #threeBox{
        border: 1px solid red;
    }
</style>