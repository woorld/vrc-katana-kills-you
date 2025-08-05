<script setup lang="ts">
import SettingListItem from './setting-list-item.vue';
import ToggleSwitch from './toggle-switch.vue';
</script>

<template>
  <ul class="setting-list">
    <SettingListItem>
      <ToggleSwitch label="機能オン" callApiName="changeActive" />
    </SettingListItem>
    <SettingListItem>
      <ToggleSwitch label="処理実行時に自動で閉じる" callApiName="changeAutoClose" />
    </SettingListItem>
  </ul>
</template>

<style scoped>
.setting-list {
  width: 300px;
}
</style>
