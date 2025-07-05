<template>
  <li class="setting-list__item">
    <slot />
  </li>
</template>

<style scoped>
.setting-list__item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-list__item:nth-child(n + 2) {
  margin-top: 12px;
}
</style>
