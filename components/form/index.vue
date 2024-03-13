<template>
  <ElForm
    ref="formRef"
  >
    <ElFormItem
      v-for="item in usingConfig"
      :label="item.label"
      :rules="item.rules"
      :key="item.field"
    >
      <Suspense>
        <component
          :is="item.component"
          v-bind="item.props"
        />
        <template #fallback>
          <slot name="async-item-loading">
            Loading...
          </slot>
        </template>
      </Suspense>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed, Suspense } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import { useComponentFactory, useElementPlusComponents } from '../utils'
import { FormConfig } from './typing'

const componentFactory = useComponentFactory()

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
  // string 代表是已经内部支持的组件，注册到 componentFactory 中
  if(typeof component === 'string') {
    useElementPlusComponents(componentFactory, component)
  }
  return {
    ...item,
    component: typeof component === 'string' ? componentFactory.get(component) : component,
  }
}))
</script>
