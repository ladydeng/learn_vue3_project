# 新建项目出现代码下划线报红：
  ## Cannot find name 'defineProps'
  解决办法：打开文件--首选项--设置中搜索Vetur，拉到最底部，把这三块的勾去掉（script、style、templete）。
  参考文档：https://www.cnblogs.com/liangtao999/p/12843961.html

  ## 找不到模块“@vitejs/plugin-vue”或其相应的类型声明
  打开文件--首选项--设置中搜索validate, 把TypeScript › Validate: Enable选择项的typescript验证关闭，勾去掉

  ## 通过在script标签上添加setup使用语法糖的作用：
    1、不需要再使用setup函数进行return操作了
    2、不需要自己注册自定义componet，引入的组件可以直接使用
  
  ## npm run build 报错， 修改package.json的script下的"build": "vue-tsc && vite build"改为"build": "vite build",

