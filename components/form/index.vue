<template>
  <ElForm
    ref="formRef"
    :model="formModel"
  >
    <ElFormItem
      v-for="item in usingConfig"
      :key="item.field"
      :label="item.label"
      :prop="item.field"
      :rules="item.rules"
    >
      <Suspense>
        <component
          :is="item.component"
          :name="item.field"
          v-bind="item.props"
        />
        <template #fallback>
          <slot name="async-item-loading">
            Loading...
          </slot>
        </template>
      </Suspense>
    </ElFormItem>
    <ElFormItem>
      <ElButton
        type="primary"
        @click="handleSubmit"
      >
        提交
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, computed, Suspense, ref, watch } from 'vue'
import { ElForm, ElFormItem, ElButton } from 'element-plus'
import { useComponentFactory, useElementPlusComponents } from '../utils'
import { FormConfig, NormalObject } from './typing'

const componentFactory = useComponentFactory()

const props = withDefaults(
  defineProps<{
    config: FormConfig
  }>(),
  {
    config: () => [],
  }
)
const emit = defineEmits(['submit', 'validatorSuccess', 'validatorError'])

const formRef = ref(null)
const formModel = ref<NormalObject>({})

watch(() => props.config, () => {
  props.config.forEach((item) => {
    formModel.value[item.field] = item.props?.defaultValue || ''
  })
}, {
  immediate: true
})

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

const handleSubmit = () => {
  emit('submit', formModel.value)
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('validatorSuccess', formModel.value)
      console.log('submit!')
    } else {
      emit('validatorError', formModel.value)
      console.log('error submit!!')
    }

    return valid
  })
}
</script>
