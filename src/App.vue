<script setup lang="ts">
import { computed, Suspense, defineAsyncComponent, ref } from 'vue'
import 'element-plus/dist/index.css'
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
import LightningForm from '../components/form/index.vue'
import MyInput from './component/MyInput.vue'
const MyInputLazy = defineAsyncComponent(() => import('./component/MyInput.vue'))

const model = ref({})

const config = computed(() => [
  {
    field: 'name',
    label: '名字',
    component: 'input',
    props: {
    },
    rules: [
      { required: true, message: 'Please input Activity name', trigger: 'blur' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
  },
  {
    field: 'age',
    label: '年龄',
    component: 'input',
    props: {
    },
    rules: [
      { required: true, message: 'Please input Activity age', trigger: 'blur' },
    ],
  },
  // {
  //   field: 'sex',
  //   label: '性别',
  //   component: 'radioGroup',
  //   props: {
  //     options: [
  //       { label: '男', value: 1 },
  //       { label: '女', value: 2 },
  //     ],
  //   },
  //   rules: [
  //     { required: true, message: 'Please input Activity sex', trigger: 'blur' },
  //   ],
  // },
  {
    field: 'myInput',
    label: '自定义组件',
    component: MyInput,
    props: {
      title: '这是自定义的 input 噢',
    },
  }
])

const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!!')
    }
    return valid
  })
}

</script>

<template>
  <LightningForm v-model="model" :config="config" />
  <ElButton @click="console.log('model', model)">点我打印model</ElButton>

  <hr>

  <ElForm ref="formRef">
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

<style scoped>
</style>
