<script lang="ts" setup>
import PerfectScrollbar from "perfect-scrollbar"
import { useStore } from '~/store/useStore';
import { ref, watch, computed, onMounted } from "vue";
definePageMeta({
  middleware: ["auth"],
})

const store = useStore()
const isSidebarActive = computed(() => store.isSidebarActive)

</script>
<template>
  <div id="app">
    <LayoutSidebar></LayoutSidebar>
    <div id="main" class="layout-navbar navbar-fixed">
      <VerticalHeader></VerticalHeader>
      <div id="main-content">
        <slot />
      </div>
    </div>
  </div>
</template>
