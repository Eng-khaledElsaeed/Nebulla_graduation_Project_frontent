import SideBarItems from './data/sidebarItems';
import {defineStore} from 'pinia'
import Collections from './data/collections';
import Interactions from './data/interactions';
import {reactive, ref} from "vue";

export const useStore = defineStore('main', () => {
  const sidebarItems = reactive(SideBarItems)
  const collections = reactive(Collections)
  const interactions = reactive(Interactions)
  const isSidebarActive = ref(true)
  const isloading = ref(false)
  const Responseisloading = ref(false)
  const isDark = ref(true)
  const toggleSidebar = () => isSidebarActive.value = !isSidebarActive.value
  const closeSidebar = () => isSidebarActive.value = false
  const openSidebar = () => isSidebarActive.value = true
  const toggleDark = () => isDark.value = !isDark.value

  return {
    sidebarItems,
    collections,
    interactions,
    isSidebarActive,
    isDark,
    isloading,
    toggleDark,
    toggleSidebar,
    closeSidebar,
    openSidebar
  }
})
