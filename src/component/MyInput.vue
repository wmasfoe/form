<template>
  <div>
    {{ $props.title }}
    <ElInput v-bind="attrs" v-model="modelValue" type="text" placeholder="Enter text" />
  </div>
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import useCustomComp from '../../components/form/customComp'
const props = withDefaults(
  defineProps<{
    modelValue: any;
    title: string;
  }>(), {
    title: '这是自定义的 input 噢'
  }
)

const emit = defineEmits(['update:modelValue'])
const { modelValue, attrs } = useCustomComp({
  props,
  emit
})
</script>

<style scoped>
.my-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  background-color: #f2f2f2;
  color: #333;
  transition: border-color 0.3s ease;
}

.my-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.my-input::placeholder {
  color: #999;
}

.my-input:hover {
  border-color: #999;
}
</style>
