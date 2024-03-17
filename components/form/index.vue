<template>
  <ElForm
    ref="formRef"
    :model="formModel"
  >
    <ElFormItem
      v-for="item in usingConfig"
      :ref="(v: any) => getRefs(v, item.field)"
      :key="item.field"
      :label="item.label"
      :prop="item.field"
      :rules="item.rules"
    >
      <Suspense>
        <CustomCompWrap :disable="!item.isCustomComp">
          <component
            :is="item.component"
            :name="item.field"
            v-bind="item.props"
            v-model="formModel[item.field]"
          />
        </CustomCompWrap>
        <template #fallback>
          <slot name="async-item-loading">
            <Fallback />
          </slot>
        </template>
      </Suspense>
    </ElFormItem>
    <ElFormItem>
      <ElButton
        @click="handleReset"
      >
        重置
      </ElButton>
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
import { defineProps, withDefaults, computed, Suspense, ref, onMounted, watch } from 'vue'
import { ElForm, ElFormItem, ElButton, FormInstance, FormItemInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useComponentFactory, useElementPlusComponents } from '../utils'
import { FormConfig, NormalObject } from './typing'
import Fallback from './Fallback.vue'
import CustomCompWrap from './CustomCompWrap.vue'

const componentFactory = useComponentFactory()

const props = withDefaults(
  defineProps<{
    config: FormConfig
    modelValue: NormalObject
  }>(),
  {
    config: () => [],
    modelValue: () => ({}),
  }
)
const emit = defineEmits(['submit', 'validatorSuccess', 'validatorError', 'update:modelValue'])

const formRef = ref<FormInstance | null>(null)
const formItemRefs = ref<Record<string, FormItemInstance>>({})
const getRefs = (el: FormItemInstance, key: string) => {
  formItemRefs.value[key] = el
}

// 表单绑定的值
const formModel = computed<Record<string, any>>({
  set(v) {
    emit('update:modelValue', v)
  },
  get() {
    return props.modelValue
  },
})

const usingConfig = computed(() => props.config.map((item) => {
  const { component } = item
  // string 代表是内部支持的组件库组件，注册到 componentFactory 中
  const isCustomComp = typeof component === 'string'

  if(isCustomComp) {
    useElementPlusComponents(componentFactory, component)
  }
  return {
    ...item,
    isCustomComp,
    component: isCustomComp ? componentFactory.get(component) : component,
  }
}))

// 缓存默认值
const initFormModel: Record<string, any> = {}
onMounted(() => {
  for (const it in formModel.value) {
    initFormModel[it] = formModel.value[it]
  }
})
const handleReset = () => {
  formRef.value?.resetFields()
  formModel.value = cloneDeep(initFormModel)
}

const handleSubmit = () => {
  emit('submit', formModel.value)
  formRef.value?.validate((valid: boolean) => {
    // 调用自定义组件的 validate 方法
    const usingValid = valid
    if (usingValid) {
      emit('validatorSuccess', formModel.value)
      console.log('submit!')
    } else {
      emit('validatorError', formModel.value)
      console.log('error submit!!')
    }

    return usingValid
  })
}
</script>
