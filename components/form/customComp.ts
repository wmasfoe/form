import { computed, useAttrs } from 'vue'

const useCustomComp = (ctx: {
  props: any;
  emit: (eventName: any, ...args: any[]) => void;
}) => {

  const { props, emit } = ctx

  const attrs = useAttrs()
  const modelValue = computed({
    set(v) {
      emit('update:modelValue', v)
    },
    get() {
      return props.modelValue;
    }
  })

  return {
    modelValue,
    attrs
  }
}

export default useCustomComp
