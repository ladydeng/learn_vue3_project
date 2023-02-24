<template>
    <h1>{{ msg }}--{{ num }}</h1>
    <h2 v-once>--{{ proxy.websiteTitle }}--</h2>
    <div class="item" v-for="(item, index) in list" :key="index">
        <p>{{ index + 1 }}、{{ item.name }} - {{ item.age }}</p>
        <el-button @click="ageAdd(index)">点击年龄+1</el-button>
        <div>{{ x }}---{{ y }}</div>
    </div>
</template>

<!-- <script setup lang="ts">
import {
    reactive,
    getCurrentInstance,
    ref,
    computed,
    watch,
    useSlots,
    useAttrs,
} from "vue";
const { proxy } = getCurrentInstance() as any;

interface ListItem{
    name: string,
    age: number,
    intro?: () => void
}
// 养成好习惯，给每一个Props创建interface
interface Props {
    msg: string;
    list: ListItem[];
    // list: [] as ListItem[];  // 对象数组声明写法一
    // list: Array<ListItem>;  // 对象数组声明写法二
}

// 提前声明emit事件
const emits = defineEmits(["ageAdd"]);
const ageAdd = (index: number): void => {
    emits("ageAdd", index);
};

const num = ref(3);
// 注意，这里的doubleNum是一个proxy，需要通过doubleNum.value获取原值
const doubleNum = computed(() => (num.value *= 2));

// const props = defineProps<Props>()
// 通过withDefaults给Props设置默认值，还是使用上面的那个例子
const props = withDefaults(defineProps<Props>(), {
    msg: "默认值",
    list: () => [],
});

// 通过defineExpose将子组件的方法或属性暴露给父组件
const getSomething = (): void => {
    num.value++;
    // console.log(doubleNum.value);
};
defineExpose({
    getSomething,
});

// 普通监听
watch(num, (val:number):void => {
    console.log(val, "watcher");
});

// 深层监听
watch(
    () => num,
    (val) => {
        console.log(val.value, "deeep watcher");
    },
    { deep: true }
);

const slots = useSlots();
const attrs = useAttrs();
console.log(slots);
console.log(attrs);

</script> -->

<script lang="ts">
import { rowProps } from "element-plus";
import { defineComponent, getCurrentInstance, ref, PropType } from "vue"
import { getPosition } from "../compositionApi/getPosition"
type ListItem = {
    name: string,
    age: number,
    intro?: () => void
}

interface List {
    [index: number]: ListItem
}
export default defineComponent({
    props:{
        msg: String,
        // 法一：
        // list: {
        //     type: Array,
        //     default: () => []
        // }
        // 法二：通过ProType为数组定义一个更为具体的类型
        list: Array as PropType<List>

    },
    emits:['ageAdd'],  // 声明emit事件
    setup(props, context){
        const { proxy } = getCurrentInstance() as any;
        const num = ref(3);

        // 透传 Attributes（非响应式的对象，等价于 $attrs）
        // console.log(context.attrs)

        // 插槽（非响应式的对象，等价于 $slots）
        // console.log(context.slots)

        // 触发事件（函数，等价于 $emit）
        // console.log(context.emit)

        // 暴露公共属性（函数）
        // console.log(context.expose)
        const ageAdd = (index: number): void => {
            context.emit("ageAdd", index);
        };

        const getSomething = (): void => {
            num.value++;
        };
        context.expose({ getSomething })
        
        const { x, y } = getPosition()

        return {
            proxy,
            num,
            ageAdd,
            x,
            y
        }
    }, 
})
</script>

<style scoped lang="scss">
.item {
    border-bottom: 1px solid;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $color;
    p {
        font-size: 20px;
    }
}
</style>
