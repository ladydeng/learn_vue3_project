<template>
    <div class="home">
        <span @click.stop="toggleDark()">暗黑模式sum:{{ $store().sum }}\doubleSum:{{ $store().doubleSum }}</span>
        <el-switch size="small" v-model="isDark" />
        <!-- 所有 Vue 模板语法都会被保留并按原样渲染。最常见的用例就是显示原始双大括号标签及内容 -->
        <div v-pre>{{ this will not be compiled }}</div>
        <HelloWorld
            ref="helloworld"
            msg="Vite + Vue"
            :list="list"
            @ageAdd="ageAdd"
        />
        <el-button type="danger" @click="changeChild()">调用子组件的方法</el-button>
        <el-button type="danger" @click="$store().changeSum(2)">点击sum-2</el-button>
        <div>{{ x }}---{{ y }}</div>
        </div>
</template>

<!-- setup语法糖写法 -->
<script setup lang="ts">
import { useStore1 } from "../store/index"
import { useDark, useToggle } from "@vueuse/core";
import HelloWorld from "../components/HelloWorld.vue";
import { getPosition } from "../compositionApi/getPosition"
import { onMounted, getCurrentInstance, reactive, ref, watch } from "vue";
const { proxy } = getCurrentInstance() as any;
const isDark = useDark();
const toggleDark = useToggle(isDark);

interface ListItem{
    name: string,
    age: number,
    intro?: () => void
}
const { x, y } = getPosition()
const store = useStore1()
const list = reactive<ListItem[]>([
    { name: "lili", age: 18, intro: () => { console.log("my name is lili") } },
    { name: "lilie", age: 18, intro: () => { console.log("my name is lilie") } },
]);

const ageAdd = (index: number): void => {
    list[index].age = list[index].age + 1;
};

const helloworld = ref();
const changeChild = (): void => {
    helloworld.value.getSomething();
};

onMounted(() => {
    // console.log(proxy.websiteTitle);
    // 获取store里的state
    // console.log( proxy.$store().sum)
    // console.log(proxy.$store)
});

// watch(store.num,(newVal, oldVal) => {
//         console.log("store.num change-------", newVal, oldVal)
//     }
// );
console.log(store.sum)
watch(
    () => store.sum,
    (newVal, oldVal) => {
        console.log("store.num change-------", newVal, oldVal)
    }
);
</script>

<!-- defineComponent写法 -->
<!-- <script lang="ts">
import {defineComponent, defineAsyncComponent, ref, reactive, getCurrentInstance, onMounted, nextTick} from "vue"
import HelloWorld from "../components/HelloWorld.vue";
import { getPosition } from "../compositionApi/getPosition"
import { useDark, useToggle } from "@vueuse/core";
import { List } from "@/type/home"
// import { List } from "../type/home"
export default defineComponent({
    setup(props, { attrs, slots, emit, expose }){
        // const { attrs, slots, emit, expose } = context  //context上下文对象，通过对象结构获取里面的内置方法
        const { proxy } = getCurrentInstance() as any;
        // type ListItem = {
        //     name: string,
        //     age: number,
        //     intro?: () => void
        // }

        // interface List {
        //     [index: number]: ListItem
        // }
        const list = reactive<List>([
            { name: "lili", age: 18, intro: () => { console.log("my name is lili") } },
            { name: "lilie", age: 18, intro: () => { console.log("my name is lilie") } },
        ]);

        const ageAdd = (index: number): void => {
            list[index].age = list[index].age + 1;
        };
        
        const changeChild = (): void => {
            // 调用子组件的方法
            // var helloworld = ref()
            // console.log(helloworld)  //undefined
            proxy.$refs.helloworld.getSomething()
        };

        onMounted(() => {
            type User = {
                name: string,
                age: number
            }
            const user = reactive<User>({
                name:'hanmeimei',
                age: 18
            })
            console.log(user)
        })

        const isDark = useDark();
        const toggleDark = useToggle(isDark);

        const { x, y } = getPosition()

        return {
            list, ageAdd, changeChild, x, y, toggleDark, isDark
        }
    },
    components:{
        // HelloWorld: defineAsyncComponent(() => import("../components/HelloWorld.vue"))
        HelloWorld
    },
    mounted() {
        // console.log(this.$store)
    },
})
</script> -->

<style scoped>
   .home{
       border: 1px solid;
   }
</style>
<!-- src导入， template和script也可使用src导入 -->
<!-- <template src="filename.html"></template> -->
<!-- <script src="filename.ts"></script> -->
<style src="@/assets/styles/home.scss"></style>
