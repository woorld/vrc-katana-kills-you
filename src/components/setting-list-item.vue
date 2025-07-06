<template>
  <li class="setting-list__item">
    <slot />
  </li>
</template>

<style scoped lang="scss">
.setting-list__item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(n + 2) {
    margin-top: 12px;
  }
}
</style>
