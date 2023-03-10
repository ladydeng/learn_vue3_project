import { type } from "os"
import { ref, onMounted, onUnmounted } from "vue"

// 组合式API示例，类似于封装了公共的业务逻辑方法，也类似于mixin，但是比mixin灵活
export function getPosition(){
    const x = ref(0)
    const y = ref(0)

    function update(event:any){
        x.value = event.pageX
        y.value = event.pageY
    }

    onMounted(() => window.addEventListener("mousemove", update))
    onUnmounted(() => window.removeEventListener("mousemove", update))

    return { x,y }
}