import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { useMessagesStore } from '@/stores/messages.js';

export const useChannelsStore = defineStore('channels', ()=>{
    const channels = reactive([
        { id: 1, name: 'General', messages: null },
        { id: 2, name: 'Emergencias', messages: null },
        { id: 3, name: 'Anuncios', messages: null },
        { id: 4, name: 'Proyecto 1', messages: null },
        { id: 5, name: 'Non-work', messages: null },
        { id: 6, name: 'Atención a clientes', messages: null }
    ]);

    const messagesStore = useMessagesStore();

    const getChannels = computed(()=>{
        return (search)=>{
            const searchString = String(search).toLocaleLowerCase();
            return channels
            .filter(channel =>
                channel.name.toLocaleLowerCase().includes(searchString)
            )
            .map(channel=>{
                const unreadMessagesCount = messagesStore.countUnreadMessagesByChannelId(channel.id)
                return {
                    ...channel,
                    messages: unreadMessagesCount
                }
            })
        }
    })

    return {
        channels,
        getChannels
    };
});