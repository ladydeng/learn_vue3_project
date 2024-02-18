import { defineStore } from "pinia"

export const useStore1 = defineStore('main', {  // 这里的useStore可以更改，在引入该文件的时候同步引入修改后的名字即可
    state: () => {
        return {
            sum: 99,
        }
    },
    getters: {
        doubleSum(state) {
           return state.sum * 2
        },
    },
    actions: {
        changeSum(payload:number){
            this.sum = this.sum + payload
        }
    }
})