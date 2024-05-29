# vite + vue3 + ts + vue-router + pinia + element-plus + sass

# 安装sass命令：  npm install sass --save-dev
   
# vue3 生命周期钩子函数执行顺序
  `
      setup  => onbeforeMount => onMounted => onBeforeUpdate => onUpdated => onBeforeUnmount  => onUnmounted => onActivated => onDeactivivated => onErrorCaptured => onRenderTriggered => onRenderTracked
  `

# <script setup> 中可以使用顶层 await
  `
      <script setup>
         const obj = await fetch("url").then((res) => res.json())
      </script>
  `

# 使用到的node版本号为16.16.0