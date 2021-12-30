<script setup>
/**
 * @param initialValue {Number} - lowest available value
 * @param value {Number} - selected number of dots
 * @param scale {Number} - how many dots to display
 *
 * data hoveringOver - which dot is cursor over, to be able to paint previous or next with appropriate color
 */
</script>

<script>
export default {
  data() {
    return {
      hoveringOver: null,
    };
  },
  props: ['initialValue', 'value', 'scale'],
  emits: ['valueChange'],
  
  methods: {
    /**
     * should notify parent component of value change
     * we also do checks:
     * if selectedValue is greater than initialValue
     *    if we click on already assigned dot, it will be set to initialValue
     *    else it will be set
     */
    emitValueChange(i) {
      let emited_value = i;
      if (i < this.initialValue || this.value == i) {
          emited_value = this.initialValue;
        }
      this.$emit('valueChange', emited_value);
          
    },
  },
};
</script>

<template>
  <span class="points">
    <span
      v-for="i in scale"
      :key="i"
      :class="{
        point: true,
        init: i <= initialValue,
        fill: i > initialValue && i <= value,
        add:  i > value && i <= hoveringOver,
        remove: hoveringOver && i > hoveringOver || hoveringOver == value,
      }"
      @click="emitValueChange(i)"
      @mouseover="hoveringOver = i"
      @mouseout="hoveringOver = null"
    >
    </span>
  </span>
</template>

<style>
.point {
  height: 14px;
  width: 14px;
  margin: 1px;
  background-color: none;
  border-radius: 50%;
  border: 2px;
  border-style: outset;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.point.init {
  background: radial-gradient(#ff6666, #660000);
}

.point.fill {
  background: radial-gradient(#ff6666, #cc0000);
}

.point.add {
  background: radial-gradient(#ff6666, #ff5050);
  }

.point.fill.remove {
  background: radial-gradient(#ffffff, #cc0000);
}
</style>
