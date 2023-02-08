# 进阶用法-也面优化方法

## 指令
    1、v-once，组件与内容只渲染一次， 并跳过之后的更新
    `
      <div v-once>{{ msg }}</div>
    `
    
    2、v-memo，指定缓存
    `
      //当组件重新渲染时，如果valueA与valueB都保持不变，这个div及其子项的所有更新都被跳过（效果与v-once相同）
      <div v-memo="[valueA, valueB]"></div>
    `
    
    3、v-cloak，用于隐藏尚未完成的编译DOM模板，解决“未编译模板闪现”，配合css规则使用
    `
      <!-- css -->
      [v-cloak]{
        display: none;
      }
      
      <!-- dom -->
      <div v-cloak>{{ msg }}</div>
    `
