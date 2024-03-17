<template>
  <div v-if="disable" @click="handleClick" tabindex="1">
    <slot />
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { formItemContextKey, FormItemInstance } from 'element-plus'

const props = withDefaults(
  defineProps<{
    disable: boolean;
  }>(), {
  disable: false
})

const formItemInstance = inject<FormItemInstance>(formItemContextKey)

const isFocus = ref(false)

const handleBodyClick = (t) => {
  if(isFocus.value) {
    formItemInstance?.validate('blur')
  }
  isFocus.value = false
}
onMounted(() => {
  document.body.addEventListener('click', handleBodyClick)
})

const handleClick = () => {
  isFocus.value = true
}
</script>
