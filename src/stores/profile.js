import { defineStore } from "pinia";
import { reactive } from "vue";

export const useProfileStore = defineStore('profile', ()=>{
    const user = reactive({
        id: null,
        username: null,
        avatar: null,
        status: null
    })
    return { user }
});