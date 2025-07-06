<script setup>
import SettingList from './components/setting-list.vue';
</script>

<template>
  <main class="root">
    <div class="title">
      <img
        src="./assets/logo.png"
        alt="VRC Katana Kills Youのロゴ"
        class="title__logo"
      >
      <h1 class="title__text">VRC Katana Kills You</h1>
    </div>
    <SettingList />
  </main>
</template>

<style scoped lang="scss">
.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  &__logo {
    width: 48px;
    height: 48px;
  }
}
</style>
