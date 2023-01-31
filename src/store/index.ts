import { defineStore } from "pinia"

export const useStore = defineStore('main', {
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