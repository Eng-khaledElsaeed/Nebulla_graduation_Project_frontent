<script lang="ts" setup>
import PerfectScrollbar from "perfect-scrollbar"
import SidebarItem from "./SidebarItem.vue";
import Dark from "./Dark.vue";
import { useStore } from '~/store/useStore';
import { ref, watch, computed, onMounted } from "vue";

const store = useStore()
const isSidebarActive = computed(() => store.isSidebarActive)
const collections= await getUserlistColections()

const sidebarWrapper = ref<HTMLElement>()

/**
 * On Window Resize
 */
const onresize = () => {
  // Hide sidebar if screen size is below 1200
  const screenWidth = window.innerWidth;
  if (screenWidth < 1200) {
    store.closeSidebar()
    return
  }
  store.openSidebar()
}
/**
 * Create Sidebar Backdrop
 */
const createBackdrop = () => {
  if (window.innerWidth > 1200) return
  deleteBackdrop()
  const backdrop = document.createElement("div")
  backdrop.classList.add("sidebar-backdrop")
  backdrop.addEventListener("click", () => {
    store.closeSidebar()
    deleteBackdrop()
  })
  document.body.appendChild(backdrop)
}
/**
 * Delete Sidebar Backdrop
 */
const deleteBackdrop = () => {
  const backdrop = document.querySelector(".sidebar-backdrop")
  if (backdrop) {
    backdrop.remove()
  }
}


onMounted(() => {
  onresize();
  window.addEventListener('resize', onresize);
  // Perfect Scrollbar Init
  new PerfectScrollbar(sidebarWrapper.value!, {
    wheelPropagation: false
  });
})

watch(() => store.isSidebarActive, (isSidebarActive) => {
  // Create/Delete backdrop for sidebar
  if (isSidebarActive) {
    createBackdrop()
  } else {
    deleteBackdrop()
  }

  // Disable scrolling when sidebar is open
  const body = document.querySelector("body")
  if (body && window.innerWidth >= 1200) {
    body.style.overflowY = "auto"
  } else if (body) {
    body.style.overflowY = isSidebarActive ? "hidden" : "auto"
  }
})
</script>
<template>
  <div id="sidebar" :class="{ 'active': isSidebarActive }">
    <div class="sidebar-wrapper active">
      <div class="sidebar-header">
        <div class="d-flex justify-content-between">
          <div class="logo">
            <nuxt-link to="/">
              <div class="logo-container">
                <img src="~/assets/images/logo/logo.png" alt="Logo">
                <p>Nebulla</p>
              </div>
            </nuxt-link>
          </div>
          <Dark />
          <div class="sidebar-toggler x">
            <a href="#" class="sidebar-hide d-xl-none d-block" @click="store.toggleSidebar">
              <i class="bi bi-x bi-middle"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="sidebar-menu" ref="sidebarWrapper">
        <ul class="menu">
          <template v-for="item in collections">
            <!--<li v-if="item.isTitle" class="sidebar-title" :key="item.key">
              {{ item.name }}
            </li>-->
            <SidebarItem :item="item"></SidebarItem>
          </template>
        </ul>
      </div>
      <button class="sidebar-toggler btn x" @click="store.toggleSidebar"><i data-feather="x"></i></button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
[class^="bi-"]::before,
[class*=" bi-"]::before {
  vertical-align: text-top;
}
</style>
