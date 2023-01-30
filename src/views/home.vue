<template>
  <div>
    <el-button type="success">Success</el-button>
    <span @click.stop="toggleDark()">暗黑模式</span>
    <el-switch size="small" v-model="isDark"/>
    <HelloWorld ref="helloworld" msg="Vite + Vue" :list="list" @ageAdd="ageAdd"/>
    <el-button type="danger" @click="changeChild()">调用子组件的方法</el-button>
  </div>
</template>

<script setup lang="ts">
  import HelloWorld from "../components/HelloWorld.vue"
  import { onMounted, getCurrentInstance, reactive, ref } from 'vue';
  const { proxy } = getCurrentInstance() as any;
  
  import { useDark, useToggle } from '@vueuse/core'
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  const list = reactive([
    { name:'lili', age:18 },
    { name:'lilie', age:18 },
  ])

  const ageAdd = (index:Number):void => {
    list[index].age = list[index].age + 1
  }

  const helloworld = ref()
  const changeChild = ():void =>{
    helloworld.value.getSomething()
  }

  onMounted(()=>{
    console.log(proxy.websiteTitle)
  })

</script>

<style scoped>

</style>
