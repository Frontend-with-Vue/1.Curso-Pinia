import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useProfileStore } from '@/stores/profile.js';
import { useContactsStore } from '@/stores/contacts.js';

export const useMessagesStore = defineStore('messages', ()=>{
    const messages = reactive([
        { id: 1, author: 1, message: 'Hola 👀', timestamp: new Date().toLocaleTimeString(), channelId: 1, read: false },
        { id: 2, author: 2, message: 'Holaaa!!!', timestamp: new Date().toLocaleTimeString(), channelId: 1, read: false },
        { id: 3, author: 3, message: 'Hola a todo el mundo 😊', timestamp: new Date().toLocaleTimeString(), channelId: 2, read: false },
        { id: 4, author: 3, message: '¿Cómo están?', timestamp: new Date().toLocaleTimeString(), channelId: 3, read: false },
        { id: 5, author: 1, message: 'Todo muy bien :D', timestamp: new Date().toLocaleTimeString(), channelId: 3, read: false },
        { id: 6, author: 2, message: 'Si, todo bien.', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
        { id: 7, author: 1, message: 'Oigan, les escribo para contarles algo... 😌', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
        { id: 8, author: 3, message: 'A vers 👀', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
        { id: 9, author: 2, message: 'Ahhhh!!', timestamp: new Date().toLocaleTimeString(), channelId: 5, read: false },
        { id: 10, author: 2, message: '¡Cuenta ese chismesito yaaaa!', timestamp: new Date().toLocaleTimeString(), channelId: 5, read: false },
        { id: 11, author: 1, message: 'Pues, ¡acabamos de lanzar los nuevos cursos de Vue.js!', timestamp: new Date().toLocaleTimeString(), channelId: 6, read: false },
    ]);

    const profileStore = useProfileStore();
    const contactsStore = useContactsStore();

    const filterMessagesByChannelId = computed(() => {
        return (channelId) => {
            return messages
                .filter(message => message.channelId === parseInt(channelId))
                .map(message => {
                    const author = contactsStore.contacts.find(contact => contact.id === message.author);
                    if (!author) return message;
                    return {
                        ...message,
                        author,
                        self: author.id === profileStore.user.id,
                    };
                });
        };
    });

    const countUnreadMessagesByChannelId = computed(()=>{
        return (channelId)=>{
            return filterMessagesByChannelId.value(channelId).filter(message=>!message.read).length;
        }
    });

    function addMessage(channelId, messageContent){
        messages.push({
            id: Math.random(),
            author: profileStore.user.id,
            message: messageContent,
            timestamp: new Date().toLocaleTimeString(),
            channelId: Number(channelId),
            read: false
        });
    }

    return {
        messages,
        filterMessagesByChannelId,
        countUnreadMessagesByChannelId,
        addMessage
    };
});