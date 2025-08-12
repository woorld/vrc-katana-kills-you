<script setup lang="ts">
import SettingList from './components/setting-list.vue';
</script>

<template>
  <VApp class="root">
    <VMain class="d-flex justify-center align-center flex-column ga-12">
      <div class="title d-flex justify-center align-center ga-4">
        <img
          src="./assets/logo.png"
          alt="Katana Kills Youのロゴ"
          class="title__logo"
        />
        <h1 class="text-h4 font-weight-bold">Katana Kills You</h1>
      </div>
      <SettingList />
    </VMain>
  </VApp>
</template>

<style scoped lang="scss">
.root {
  background: linear-gradient(135deg, #e9df55, #92296a);
}

.title {
  &__logo {
    width: 48px;
    height: 48px;
  }
}

@media (prefers-color-scheme: dark) {
  .root {
    background: linear-gradient(135deg, #b39b33, #85293d);
  }
}
</style>

<style>
@font-face {
  font-family: "Noto Sans JP";
  src:
    local("Noto Sans JP"),
    url("./NotoSansJP-Medium.ttf") format("truetype");
}

* {
  font-family: "Noto Sans" !important;
  color: #222;
  user-select: none;
  -webkit-user-drag: none;
  list-style: none;
}

html {
  overflow-y: auto !important;
}

@media (prefers-color-scheme: dark) {
  * {
    color: #fff;
  }
}
</style>
