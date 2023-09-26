import { persisted } from 'svelte-local-storage-store'


export const fav = persisted('fav', []);
