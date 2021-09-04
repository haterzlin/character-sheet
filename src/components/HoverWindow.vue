<!--
Displays details about the element that the mouse is over
mostly works with stats so far
 -->

<script>
export default {
  props: ["mouseOverData"],
  data() {
    return {
      data: "test",
    };
  },
  watch: {
    mouseOverData: {
      handler(newVal) {
        if (newVal) this.data = newVal;
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="hover">
    <div v-if="data.allocated && data.resource">
      <span
        :style="{ display: 'block' }"
        v-for="(item, index) in data.allocated"
        :key="index"
        >{{ item }}/{{ data.resource[index] }} of {{ index }}</span
      >
    </div>
    <div v-if="data.category">
      <p v-html="data.category.description"></p>
    </div>
    <div class="statDescription" v-if="data.stat">
      <p v-html="data.stat.description.general"></p>
      <p
        v-if="data.stat.description.specialties"
        v-html="data.stat.description.specialties"
      ></p>
      <div v-if="data.hoverPointer && data.allocated">
        <span
          v-for="i in data.allocated.length - 1"
          :key="i"
          class="point"
          :class="{ init: data.hoverPointer >= i }"
        >
        </span>
      </div>
      <p
        v-if="data.stat.description[data.hoverPointer]"
        v-html="data.stat.description[data.hoverPointer]"
      ></p>
      <div v-if="data.stat.abilities && !data.stat.description[data.hoverPointer]">
        <h4 v-for="item in data.stat.abilities[data.hoverPointer]" :key="item">
          {{ item }}
        </h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.hover {
  margin-left: 800px;
  float: right;
  z-index: 9;
  position: fixed;
  width: 600px;
}

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

.init {
  background: radial-gradient(#ff6666, #660000);
}
</style>
