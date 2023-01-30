<template>
  <h1>{{ msg }}{{ num }}</h1>
  <h2>{{ websiteTitle }}</h2>
  <div class="item" v-for="(item, index) in list" :key="index">
    <p>{{index + 1}}、{{ item.name }} - {{ item.age }}</p><el-button @click="ageAdd(index)">点击年龄+1</el-button>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, getCurrentInstance, ref, computed, watch, useSlots, useAttrs  } from 'vue'
const { proxy } = getCurrentInstance() as any;

// 养成好习惯，给每一个Props创建interface
interface Props {
  msg: string,
  // list: Array
  list: Object[]
}

// 提前声明emit事件
const emits = defineEmits(['ageAdd'])
const ageAdd = (index:Number):void => {
  emits("ageAdd", index)
}

const num = ref(0)
const doubleNum = computed(() => num.value *= 2) // 注意，这里的doubleNum是一个proxy，需要通过doubleNum.value获取原值

// const props = defineProps<Props>()
// 通过withDefaults给Props设置默认值，还是使用上面的那个例子
const props = withDefaults(defineProps<Props>(), {
    msg: '默认值',
    list: []
})

// 通过defineExpose将子组件的方法或属性暴露给父组件
const getSomething = ():void => {
  num.value++
  console.log(doubleNum.value)
}
defineExpose({
  getSomething
})

// 普通监听
watch(doubleNum, val => {
  console.log(val, 'watcher')
})

// 深层监听
watch(() => doubleNum, val => {
  console.log(val.value, 'deeep watcher')
}, { deep: true })

const slots = useSlots()
const attrs = useAttrs()
console.log(slots)
console.log(attrs)

</script>

<style scoped lang="scss">
.item{
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: $color;
  p{
    font-size: 20px;
  }
}
</style>
