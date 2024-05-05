<script lang="ts" setup>

</script>
<template>
  <div id="app">
    <LayoutSidebar></LayoutSidebar>
    <div id="main" class="layout-navbar navbar-fixed">
      <VerticalHeader></VerticalHeader>
      <div id="main-content">
        <slot/>
      </div>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>
