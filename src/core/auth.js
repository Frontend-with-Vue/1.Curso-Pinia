import { useProfileStore } from "../stores/profile";

const login = async () => {
    return new Promise(resolve =>{
        setTimeout(() => {
            resolve({
                id: 1,
                username: 'John Doe',
                avatar: '/avatars/avatar.jpg',
                status: 'active' }
            );
        }, 2500);
    })
}

export async function auth (){
    const profileStore = useProfileStore();
    const user = await login();
    profileStore.user = user;
} 