<template>
    <span @click.stop="toggleDark()">暗黑模式sum:{{ $store().sum }}\doubleSum:{{ $store().doubleSum }}</span>
    <!-- <el-switch size="small" v-model="isDark" /> -->
    <HelloWorld
        ref="helloworld"
        msg="Vite + Vue"
        :list="list"
        @ageAdd="ageAdd"
    />
    <el-button type="danger" @click="changeChild()">调用子组件的方法</el-button>
    <el-button type="danger" @click="$store().changeSum(2)">点击sum-2</el-button>
    <div>{{ x }}---{{ y }}</div>
</template>

<!-- setup语法糖写法 -->
<!-- <script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import HelloWorld from "../components/HelloWorld.vue";
import { onMounted, getCurrentInstance, reactive, ref } from "vue";
const { proxy } = getCurrentInstance() as any;
const isDark = useDark();
const toggleDark = useToggle(isDark);

interface ListItem{
    name: string,
    age: number,
    intro?: () => void
}
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
    console.log(proxy.websiteTitle);
    // 获取store里的state
    console.log( proxy.$store().sum)
    console.log(proxy.$store)
});
</script> -->

<!-- defineComponent写法 -->
<script lang="ts">
import {defineComponent, defineAsyncComponent, ref, reactive, getCurrentInstance, onMounted, nextTick} from "vue"
import HelloWorld from "../components/HelloWorld.vue";
import { getPosition } from "../compositionApi/getPosition"
export default defineComponent({
    setup(props, { attrs, slots, emit, expose }){
        const { proxy } = getCurrentInstance();
        interface ListItem{
            name: string,
            age: number,
            intro?: () => void
        }
        const list = reactive<ListItem[]>([
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
            
        })

        const { x, y } = getPosition()

        return {
            list, ageAdd, changeChild, x, y
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
</script>

<style scoped>
</style>
