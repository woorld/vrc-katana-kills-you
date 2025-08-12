<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'updateVisibility', isShow: boolean): void,
}>();

const isShow = ref(false);

watch(isShow, (newValue) => {
  emit('updateVisibility', newValue);
});
</script>

<template>
  <VDialog fullscreen v-model="isShow">
      <!-- ダイアログを開くボタン #activator, v-bindを使うことで変数を親子で受け渡さなくて済む -->
    <template #activator="{ props }">
      <VBtn
        icon="mdi-cog"
        class="position-fixed top-0 right-0 bg-transparent mr-4 mt-4 elevation-0"
        v-bind="props"
      />
    </template>
    <VSheet class="bg-transparent">
      <VBtn
        icon="mdi-close"
        class="position-fixed top-0 right-0 bg-transparent mr-4 mt-4 elevation-0"
        @click="isShow = false"
      />
      <!-- TODO: 設定項目作成 -->
    </VSheet>
  </VDialog>
</template>

<style scoped lang="scss">
:deep(.v-overlay__scrim) {
  background: transparent;
}
</style>
