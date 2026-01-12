<template>
  <div id="threeBox">7、PBR材质与纹理贴图</div>
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


        // const texture = new THREE.TextureLoader().load("../../src/assets/test.jpg")
        // const material = new THREE.MeshBasicMaterial({
        //     map: texture
        // })
        

        const geometry = new THREE.BoxGeometry(8,8,8)
        const textureCube = new THREE.CubeTextureLoader()
            .setPath("../../src/assets/SwedishRoyalCastle/")
            .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

        //如果renderer.outputEncoding=THREE.sRGBEncoding;环境贴图需要保持一致
        textureCube.encoding = THREE.sRGBEncoding;   

        const material = new THREE.MeshStandardMaterial({
            // color:0xc0e8f6, 
            roughness: 0.0,   //粗糙度
			metalness: 1,   //金属度
            envMap: textureCube,
            envMapIntensity: 1,
        })



        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        
        
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