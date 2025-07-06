<script setup>
import SettingListItem from './setting-list-item.vue';

const props = defineProps({
  label: String,
  callApiName: String,
});

const callApi = (e) => {
  window.osc[props.callApiName](e.target.checked);
}
</script>

<template>
  <SettingListItem>
    <label>{{ props.label }}</label>
    <label class="toggle__wrapper">
      <input
        class="toggle__input"
        type="checkbox"
        @click="callApi"
      >
    </label>
  </SettingListItem>
</template>

<style scoped lang="scss">
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

  &::before {
    content: "";
    width: 24px;
    height: 100%;
    background-color: #eee;
    transition: 200ms ease;
    box-shadow: 0 0 12px #aaa;
    border-radius: 50px;
  }

  &:has(.toggle__input:checked) {
    background-color: #52e466;

    &::before {
      transform: translateX(24px);
    }
  }

  .toggle__input {
    display: none;
  }
}
</style>
