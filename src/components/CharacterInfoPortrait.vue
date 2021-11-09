<script>
/**
 * Will display image and allow change by clicking on it
 * There is hidden file input, which we trigger clicking by clicking on image
 * so file can be chosen and after that we will emit change upwards
 */
export default {
  props: ["item"],
  emits: ["charItemChange"],
  methods: {
    selectImage () {
      this.$refs.fileInput.click()
    },
    pickFile() {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.$emit('charItemChange', e.target.result)
        }
        reader.readAsDataURL(file[0])
      }
    }
  }
};
</script>

<template>
  <input ref="fileInput" type="file" @change="pickFile()">
  <div class="image-borders">
    <img :src="item.value" @click="selectImage">
  </div>
</template>

<style scoped>
input {
  display: none;   
}
img {
  cursor: pointer;
  max-width: 98%;
  max-height: 9.5em;
}
.image-borders {
  height: 10em;
}
</style>