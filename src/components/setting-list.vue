<script setup lang="ts">
import SettingListItem from './setting-list-item.vue';
</script>

<template>
  <div class="setting-list">
    <SettingListItem label="機能オン" callApiName="changeActive" />
    <SettingListItem label="処理実行時に自動で閉じる" callApiName="changeAutoClose" />
  </div>
</template>

<style scoped>
.setting-list {
  width: 300px;
}
</style>
