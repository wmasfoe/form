<template>
  <div>
    {{ $props.title }}
    <input v-model="inputValue" type="text" placeholder="Enter text" class="my-input">
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    default: '这是自定义的 input 噢'
  },
  data() {
    return {
      inputValue: ''
    };
  },
  methods: {
    submit() {
      // Handle form submission logic here
      console.log('Submitted:', this.inputValue);
    }
  }
};
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
