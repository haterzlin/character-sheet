<script setup>
import Dots from "./Dots.vue";
</script>

<script>
/**
 * displays attribute or skill name and uses Dots.vue to display clickable dots enabling to change value
 * after change new value is emitted to parent component to decide if it is alright
 * also we emit statClick to send message to help which attribute was chosen
 */
export default {
  name: "stat",
  components: [Dots],
  props: ["stat", "scale"],
  emits: ["statChange", "statClick"],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null,
    };
  },
};
</script>

<template>
  <div
    class="stat"
    @click="$emit('statClick', { stat: stat })"    
  >
    <div class="statName">{{ stat.id }}</div>

    <Dots
      :value="stat.value"
      :initialValue="initialValue"
      :scale="scale"
      @valueChange="$emit('statChange', [stat, $event, stat.value >= $event && $event > initialValue])"
    />
    

  </div>
</template>

<style scoped>

.statName {
  float: left;
  width: 140px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
}

.statName:after {
  content: " ________________";
}

.stat:hover > .statName {
  color:#cc0000
}
</style>
