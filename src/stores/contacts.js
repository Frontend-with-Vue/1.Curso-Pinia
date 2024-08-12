import { defineStore } from "pinia";
import { reactive } from "vue";

export const useContactsStore = defineStore('contacts', ()=>{
    const contacts = reactive([
        { id: 1, name: 'Tú', avatar: '/avatars/avatar.jpg' },
        { id: 2, name: 'Jason', avatar: '/avatars/avatar-02.jpg' },
        { id: 3, name: 'Janet', avatar: '/avatars/avatar-03.jpg' }
    ]);
    return { contacts };
});