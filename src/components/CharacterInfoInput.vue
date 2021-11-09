<script>
/**
 * Displays label as item.id, input with placeholder of item.placeholder
 * and emits change
 */
export default {
  props: ["item"],
  emits: ["charItemChange"]
};
</script>

<template>
  <div class="char-info-item">
    <label>{{item.id}}:</label>
    <input
      type="text"
      v-model="item.value"
      :placeholder="item.placeholder"
      @change="$emit('charItemChange', item.value)"
    />
  </div>
</template>

<style scoped>
label {
  font-size: small;
  font-variant: small-caps;
  display: block;
}

input {
  border: none;
  width: 95%;
}

input:hover {
  background-color: #dddddd;
}

.middle input {
  text-align: center;
}

</style>