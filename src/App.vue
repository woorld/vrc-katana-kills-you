<script setup>
// TODO: コンポーネント分割
const toggleActive = e => {
  window.osc.changeActive(e.target.checked);
};

const toggleAutoClose = e => {
  window.osc.changeAutoClose(e.target.checked);
};
</script>

<template>
  <div class="title">
    <img
      src="./assets/logo.png"
      alt="VRC Katana Kills Youのロゴ"
      class="title__logo"
    >
    <h1 class="title__text">VRC Katana Kills You</h1>
  </div>
  <ul class="setting-list">
    <li class="setting-list__item">
      <label>機能オン</label>
      <label class="toggle__wrapper">
        <input
          class="toggle__input"
          type="checkbox"
          @click="toggleActive"
        >
      </label>
    </li>
    <li class="setting-list__item">
      <label>処理実行後に自動で閉じる</label>
      <label class="toggle__wrapper">
        <input
          class="toggle__input"
          type="checkbox"
          @click="toggleAutoClose"
        >
      </label>
    </li>
  </ul>
</template>

<style scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.title__logo {
  width: 48px;
  height: 48px;
}

.setting-list {
  width: 300px;
}

.setting-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-list__item:nth-child(n + 2) {
  margin-top: 12px;
}

.toggle__wrapper {
  width: 48px;
  height: 24px;
  border-radius: 100px;
  background-color: #999;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: 200ms ease;
  padding: 2px;
}

.toggle__wrapper::before {
  content: "";
  width: 24px;
  height: 100%;
  background-color: #eee;
  transition: 200ms ease;
  box-shadow: 0 0 12px #aaa;
  border-radius: 50px;
}

.toggle__wrapper:has(.toggle__input:checked) {
  background-color: #52e466;
}

.toggle__wrapper:has(.toggle__input:checked)::before {
  transform: translateX(24px);
}

.toggle__input {
  display: none;
}

/* NOTE: 実装したけど使わなくなったやつ 使うかもしれないので残す */
.checkbox__wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}

.checkbox__wrapper::before {
  content: "";
  width: 22px;
  height: 22px;
  border-radius: 4px;
  background-color: #eee;
}

.checkbox__wrapper::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 3px;
  width: 12px;
  height: 6px;
  border-width: 4px;
  border-color: #222;
  border-left-style: solid;
  border-bottom-style: solid;
  transform: rotate(-45deg);
  transition: 200ms ease;
  opacity: 0;
}

.checkbox__wrapper:has(.checkbox__input:checked)::after {
  opacity: 1;
}

.checkbox__input {
  display: none;
}
</style>
