<script setup>
/**
 * Displays five dots selector possibly with initial value
 * initialValue 
 * value
 * scale - how many dots to display
 * hoveringOver - if cursor is over one of the dots, paint previous or next with appropriate color
 */
</script>

<script>
export default {
  data() {
    return { hoveringOver: null };
  },
  props: ['initialValue', 'value', 'scale'],
  emits: ['valueChange'],
  methods: {
    /**
     * intialValue can't be replaced
     * if we click on assigned dot, it will be removed
     * else it will be set     
     */
    emitValueChange(i) {
      this.initialValue >= i ?
        this.$emit('valueChange', i) :
        this.value == i ?
          this.$emit('valueChange', i -1) :
          this.$emit('valueChange', i)
    }
  }
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
        active:
          hoveringOver &&
          (i === hoveringOver || i > hoveringOver !== i > value),
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

.point.active {
  background-color: #ff9999;
}

.fill.active {
  background: radial-gradient(#ff6666, #ff6666);
}

.init.active {
  background: radial-gradient(#ff6666, #660000);
}
</style>
