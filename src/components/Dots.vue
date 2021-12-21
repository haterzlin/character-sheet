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
  computed: {
    /**
     * @returns {Array} of dots which will be added if we click on dot cursor is hovering over
     */
    addPointHover() {
      var list = [];
      if (this.hoveringOver != null) {
        for (let i = this.initialValue + 1; i <= this.scale; i++) {
          if (this.hoveringOver > this.value && i <= this.hoveringOver) {
            list.push(i);
          }
          if (this.hoveringOver < this.value && i <= this.hoveringOver) {
            list.push(i);
          }
        }
      }
      //console.log("add list: " + list)
      return list;
    },
    /**
     * @returns {Array} of dots which will be removed if we click on dot cursor is hovering over
     */
    deletePointHover() {
      var list = [];
      if (this.hoveringOver != null) {
        for (let i = this.initialValue + 1; i <= this.scale; i++) {
          if (this.hoveringOver == this.value && i <= this.value) {
            list.push(i);
          }
          if (
            this.hoveringOver < this.value &&
            i > this.hoveringOver &&
            i <= this.value
          ) {
            list.push(i);
          }
        }
      }
      //console.log("remove list: " + list)
      return list;
    },
  },
  methods: {
    /**
     * should notify parent component of value change
     * we also do checks:
     * if selectedValue is greater than initialValue
     *    if we click on already assigned dot, it will be set to initialValue
     *    else it will be set
     */
    emitValueChange(i) {
      i > this.initialValue
        ? this.value == i
          ? this.$emit('valueChange', this.initialValue)
          : this.$emit('valueChange', i)
        : this.$emit('valueChange', i);
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
        add: addPointHover.includes(i),
        remove: deletePointHover.includes(i),
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
  background: radial-gradient(#ff6666, #ff6666);
}

.point.remove {
  background: radial-gradient(#ff9999, #ff9999);
}
</style>
