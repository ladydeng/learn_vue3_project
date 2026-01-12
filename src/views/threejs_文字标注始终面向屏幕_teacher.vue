<template>
	<div
		style="
			font-size: 24px;
			color: #ffffff;
			text-align: center;
			position: absolute;
			top: 20%;
			left: 50%;
			transform: translate(-50%, -50%);
		"
	>
		{{ msg }}
	</div>
</template>
<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
const msg = ref('')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75, //视锥体垂直视野角度
	window.innerWidth / window.innerHeight,  //视锥体长宽比
	0.1,  //视锥体近端面
	1000  //视锥体远端面
)
const renderer = new THREE.WebGLRenderer({ antialias: true })
const controls = new OrbitControls(camera, renderer.domElement)
const loader = new FontLoader() // 创建字体加载器
onMounted(() => {
	init()
})
function init() {
	camera.position.set(0, 0, 5)
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	const geometry = new THREE.BoxGeometry(1, 1, 1)
	const material1 = new THREE.MeshBasicMaterial({
		color: 0xff00a2d7,
		transparent: true,
		opacity: 0.5,
	})
	const material2 = new THREE.MeshBasicMaterial({
		color: 0xffd3e3fd,
		transparent: true,
		opacity: 0.5,
	})
	const cube1 = new THREE.Mesh(geometry, material1)
	const cube2 = new THREE.Mesh(geometry, material2)
	scene.add(cube1, cube2)
	cube1.position.set(0, 0, 0)
	cube1.name = '方块1'
	cube2.position.set(2, 0, 0)
	cube2.name = '方块2'
	cube1.position.x = -2
	controls.update()
	function animate() {
		requestAnimationFrame(animate)
		controls.update()
		cube1.rotation.y += 0.01
		cube2.rotation.y -= 0.01
		renderer.render(scene, camera)
	}
	animate()
	addEachText()
}
// 为每个物体添加文字标注
function addEachText() {
	// 遍历场景中的所有物体
	scene.children.forEach((child) => {
		if (child.name.includes('方块')) {
			addText(child)
		}
	})
	console.log('添加文字', scene)
}
// 为指定物体添加文字标注
function addText(obj) {
	loader.load(
		'/src/assets/json/HONOR_Sans_CN_Regular.json',
		function (font) {
			const geometry = new TextGeometry(obj.name, {
				font: font,
				size: 0.3, // 字体大小
				height: 0.1, // 挤出文本的厚度
			})
			geometry.center() // 居中文本
			const materials = new THREE.MeshBasicMaterial({
				color: 0xffffffff,
				transparent: true,
				opacity: 0.5,
			})
			const textMesh = new THREE.Mesh(geometry, materials)
			textMesh.position.copy(obj.position)
			textMesh.position.y = 1.2
			scene.add(textMesh)
			// 可选：在渲染循环中保持文字面向摄像机
			function animate() {
				requestAnimationFrame(animate)
				textMesh.lookAt(camera.position)
			}
			animate()
		}
	)
}
</script>