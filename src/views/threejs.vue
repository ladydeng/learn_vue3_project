<template>
    <div id="hello">

    </div>
</template>

<script>

import AMapLoader from "@amap/amap-jsapi-loader";
import * as THREE from "three"
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    data() {
        return {
            map: null,//高德地图
            gllayer: null,//three 图层
            camera: null, //相机
            renderer: null,//渲染对象
            scene: null,//场景对象
            meshes: [], //模型集合
            customCoords: null, //初始化数据转换工具

        }
    },
    mounted() {
        this.initMap() //初始化高德地图    https://www.npmjs.com/package/@amap/amap-jsapi-loader
    },
    methods: {
        initMap() {
            AMapLoader.load({
                "key": "1f3424ff419f89f53b5d80521b3b0bfd",    // 申请好的Web端开发者Key， Web服务和Web端(JS API)不一样
                "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                "plugins": [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
                "AMapUI": {             // 是否加载 AMapUI，缺省不加载
                    "version": '1.1',   // AMapUI 缺省 1.1
                    "plugins": [],       // 需要加载的 AMapUI ui插件
                }
            }).then((AMap) => {
                this.map = new AMap.Map("hello", {
                    //设置地图容器id
                    viewMode: "3D", //是否为3D地图模式
                    zoom: 20, //初始化地图级别
                    center: [113.670057, 34.745244], //初始化地图中心点位置
                    pitch: 50,     //地图倾斜角
                });
                this.addThree()

            }).catch((e) => {
                console.log(e);
            });
        },
        addThree() {
            this.customCoords = this.map.customCoords   // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
            let data = this.customCoords.lngLatsToCoords([
                [120.52, 36.06],
                [120.388725, 36.076636],
                [120.36, 35.51],
            ]);

            // 创建 GL 图层
            let gllayer = new AMap.GLCustomLayer({
                // 图层的层级
                zIndex: 15,
                // 初始化的操作，创建图层过程中执行一次。
                init: (gl) => {
                    // 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
                    // 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
                    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

                    this.renderer = new THREE.WebGLRenderer({
                        context: gl,  // 地图的 gl 上下文
                        // alpha: true,
                        // antialias: true,
                        // canvas: gl.canvas,
                    });

                    // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
                    this.renderer.autoClear = false;
                    this.scene = new THREE.Scene();

                    // 环境光照和平行光
                    let aLight = new THREE.AmbientLight(0xffffff, 0.3);
                    let dLight = new THREE.DirectionalLight(0xffffff, 1);
                    dLight.position.set(1000, -100, 900);
                    this.scene.add(dLight);
                    this.scene.add(aLight);


                    let texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
                    texture.minFilter = THREE.LinearFilter;
                    //  这里可以使用 three 的各种材质
                    let mat = new THREE.MeshPhongMaterial({
                        color: 0xfff0f0,
                        depthTest: true,
                        transparent: true,
                        map: texture,
                    });
                    // let geo = new THREE.BoxBufferGeometry(9000, 9000, 8000);
                    let geo = new THREE.BufferGeometry(9000, 9000, 8000);
                    for (let i = 0; i < data.length; i++) {
                        const d = data[i];
                        let mesh = new THREE.Mesh(geo, mat);
                        mesh.position.set(d[0], d[1], 500);
                        this.meshes.push({
                            mesh,
                            count: i,
                        });
                        this.scene.add(mesh);
                    }
                },
                render: () => {
                    // 这里必须执行！！重新设置 three 的 gl 上下文状态。
                    this.renderer.resetState();
                    // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
                    // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题
                    this.customCoords.setCenter([120.52, 36.79]);
                    let { near, far, fov, up, lookAt, position } = this.customCoords.getCameraParams();

                    // 2D 地图下使用的正交相机
                    // var { near, far, top, bottom, left,  right, position, rotation } = customCoords.getCameraParams();

                    // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
                    this.camera.near = near;
                    this.camera.far = far;
                    this.camera.fov = fov;
                    this.camera.position.set(...position);
                    this.camera.up.set(...up);
                    this.camera.lookAt(...lookAt);
                    this.camera.updateProjectionMatrix();

                    // 2D 地图使用的正交相机参数赋值
                    // camera.top = top;
                    // camera.bottom = bottom;
                    // camera.left = left;
                    // camera.right = right;
                    // camera.position.set(...position);
                    // camera.updateProjectionMatrix();

                    this.renderer.render(this.scene, this.camera);

                    // 这里必须执行！！重新设置 three 的 gl 上下文状态。
                    this.renderer.resetState();
                },
            });
            this.map.add(gllayer);
            this.animate()
        },
        animate() {
            for (let i = 0; i < this.meshes.length; i++) {
                let { mesh, count } = this.meshes[i];
                count += 1;
                mesh.rotateZ(count / 180 * Math.PI);
            }
            this.map.render();
            requestAnimationFrame(this.animate);
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hello {
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid red;
}
</style>