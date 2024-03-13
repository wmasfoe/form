<template>
  <ElForm>
    <ElFormItem
      v-for="item in usingConfig"
      :label="item.label"
      :rules="item.rules"
      :key="item.field"
    >
      <component
        :is="item.component"
        v-bind="item.props"
      />
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import { useComponentFactory, useElementPlusComponents } from '../utils'
import { FormConfig } from './typing'

const componentFactory = useComponentFactory()
useElementPlusComponents(componentFactory)

const props = withDefaults(
  defineProps<{
    config: FormConfig
  }>(),
  {
    config: () => [],
  }
)
const usingConfig = computed(() => props.config.map((item) => {
  const { component } = item
  return {
    ...item,
    component: typeof component === 'string' ? componentFactory.get(component) : component,
  }
}))
</script>
