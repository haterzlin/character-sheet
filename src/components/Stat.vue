<script>
/**
 * displays clickable point representing number depending on scale and stat value
 * after click, change is emitted to parent component to decide if it is alright
 * also when we hover over the stat, we emit additional event to notify help change
 */
export default {
  name: "stat",
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
    <div class="points">
      <span
        v-for="i in scale"
        :key="i"
        :class="{
          point: true,
          init: i <= initialValue,
          fill: i > initialValue && i <= stat.value,
          active:
            hoverPointer && (i === hoverPointer || i > hoverPointer !== i > stat.value),
        }"
        @click="$emit('statChange', [stat, i, stat.value >= i && i > initialValue])"
        @mouseover="hoverPointer = i"
        @mouseleave="hoverPointer = null"
      >
      </span>
    </div>
  </div>
</template>

<style scoped>
.points {
  float: right;
  height: 20px;
  overflow: hidden;
  width: 100px;
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
</style>
