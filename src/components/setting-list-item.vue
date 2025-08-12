<script setup lang="ts">
const props = defineProps<{
  label: String,
  callApiName: 'changeActive' | 'changeAutoClose',
}>();

const callApi = (e: Event) => {
  window.osc[props.callApiName]((e.target as HTMLInputElement).checked);
};
</script>

<template>
  <VSwitch
    inset
    hide-details
    center-affix
    color="green"
    class="justify-md-end"
    @change="callApi"
  >
    <template #prepend>{{ props.label }}</template>
  </VSwitch>
</template>

<style scoped lang="scss">
:deep(.v-input__control) {
  justify-content: flex-end;
}

:deep(.v-selection-control.v-selection-control--density-default) {
  flex: unset;
}
</style>
