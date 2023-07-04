<template>
  <div>
    <h1 class="header">Quasar</h1>
    <slot name="header"></slot>
    <slot name="default"></slot>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
.header {
  @apply text-3xl text-rose-500 m-10;
}
</style>
