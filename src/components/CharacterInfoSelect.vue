<script>
/**
 * Displays label as item.id, select with options in item.list
 * and emits change
 */
export default {
  props: ["item"],
  emits: ["charItemChange"],
};
</script>

<template>
  <div class="char-info-item">
    <label>{{item.id}}:</label>
    <select 
      @change="$emit('charItemChange', $event.target.value)"
      :value="item.value"
    >
      <option disabled value="">{{item.disabledValue}}</option>
      <option v-for="option in item.list" :key="option">
            {{ option }}
      </option>
    </select>

  </div>
</template>

<style scoped>
label {
  font-size: small;
  font-variant: small-caps;
  display: block;
}
</style>