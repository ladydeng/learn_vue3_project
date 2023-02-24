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

  ## ts文件中使用使用 process.env.NODE_ENV 报错
  参考文档：https://blog.csdn.net/m0_47657987/article/details/117332454

  ## 报错：Property '$store' does not exist on type 
  在src下新建.d.ts文件进行配置
  参考文档：https://stackoverflow.com/questions/65237129/property-store-does-not-exist-on-type-componentpublicinstance-using-vuex-4

  ## 报错：An import declaration can only be used
  把所有的import放到顶部

  ## props声明默认值的几种方式
  参考文档：https://blog.csdn.net/weixin_40283749/article/details/127784247

  ## 运行项目报错 ** is not defined in vue 
  原因：typescript版本太低
  解决办法：升级typescript版本

  ## npm instal 报错：（vite+vue3项目完全可以使用node V14和npm V6），报错node版本为node V16.16.0 和npm V8
   1、错误信息："config global `--global`, `--local` are deprecated. Use `--location=global` instead"
      参考文档：https://blog.csdn.net/m0_49072553/article/details/127204821
   2、错误信息：Unexpected token '.'
      解决办法：降低node和npm版本（可以试用nvm工具），再install一下就可以了
  
  ## npm run dev 报错
    错误信息：The package "@esbuild/win32-x64" could not be found, and is needed by esbuild.
    解决办法：npm i esbuild-windows-64   安装依赖， 这是用于esbuild的Windows 64位二进制文件，它是一个JavaScript捆绑程序和minifier
    参考文档：https://blog.csdn.net/sunnyboysix/article/details/121931067

  ## type与interface的异同
  异：
    1、type在声明类型别名之后实际上是一个赋值操作，它需要将别名与类型关联起来，也就是说类型别名不会创建出一种新的类型，它只是给已有类型命名并进行直接引用；interface是定义一个接口类型。
    2、type能够表示非对象类型，而interface只能表示对象类型。
    3、interface可以继承其他接口、类等对象类型，type不支持继承
  同：都可以用来定义对象或者函数结构，而严谨的来说，type是引用，而interface是定义
  补充：
    1、在Ts中，一般情况下，通过interface接口的方法定义的类型都可以通过type去定义，type需要添加等号，interface不需要添加等号
    2、可以在interface后面添加关键字extends去拓展接口，  类型别名type则需要使用&符号去拓展接口
    `
      //interface extends
      interface Animal {
        name: string
      }
      interface Bear extends Animal {
        honey:boolean
      }
      const bear:Bear={
        name:"gogo"，
        honey：true
      }
    `
    `
      // type &
      type Animal = {
        name: string
      }
      type Bear=Animal&{
        honey: Boolean
      }
      const bear:Bear={
        name:"gogo"，
        honey: true
      }
    `
    3、interface可以通过定义同名的方式去拓展字段，类型别名type是不能通过同名的方法去进行拓展的
    `
      // interface
      interface User = {
        name: string
      }
      interface User = {
        age: number
      }

      const user:User = {
        name:"lili",
        age: 18
      }
    `
    `
      // type 类型创建后不能修改
      type User = {
        name: string
      }
      type User = {

      }
    `
  参考文档：https://www.jb51.net/article/266236.htm

  ## 路由别名配置: 只需要在vite.config.ts里面配置alias就可

  ##  使用别名@，开发环境不报错，在打包时报错：Cannot find module '@/assets/api/home' or its corresponding type declarations.
    报错原因：1、package.json => script => build 打包时使用了vue-tsc插件校验
             2、tsconfig.json中的路由别名配置不正确
    解决办法：1、去掉build的vue-tsc
             2、暂无解决办法（别名配置问题？）----问题已解决，在tsconfig.json中配置一下路由别名paths与baseUrl





