<script setup lang="ts">
import { computed, Suspense, defineAsyncComponent } from 'vue'
import 'element-plus/dist/index.css'
import { ElForm, ElFormItem, ElInput } from 'element-plus'
import LightningForm from '../components/form/index.vue'
import MyInput from './component/MyInput.vue'
const MyInputLazy = defineAsyncComponent(() => import('./component/MyInput.vue'))

const config = computed(() => [
  {
    field: 'name',
    label: '名字',
    component: 'input',
    props: {},
    rules: [],
  },
  {
    field: 'age',
    label: '年龄',
    component: 'input',
    props: {},
    rules: [],
  },
  {
    field: 'myInput',
    label: '自定义组件',
    component: MyInput,
    props: {
      title: '这是自定义的 input 噢',
    },
  }
])

</script>

<template>
  <LightningForm :config="config" />

  <hr>

  <ElForm>
    <ElFormItem label="名字">
      <ElInput />
    </ElFormItem>
    <ElFormItem label="年龄">
      <ElInput />
    </ElFormItem>
    <ElFormItem label="自定义组件">
      <Suspense>
        <MyInputLazy />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </ElFormItem>
  </ElForm>
</template>

<style scoped>
</style>
