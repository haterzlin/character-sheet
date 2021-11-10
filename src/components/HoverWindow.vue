<script>
/**
 * Displays details about the element that the mouse is over
 * mostly works with stats so far
 */
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
  <div class="helpWindow">
    <div class="helpHeader">
      <div :style="{float:'left',position:'fixed'}">
        <span class="helpIcon">?</span>
        <select class="helpDataSelect">
          <option>1</option>
        </select>
      </div>
      <h3 class="helpHeading">HELP</h3>
      <span class="helpExit"></span>
    </div>
    <div class="helpContent">
      <div v-if="data.category">
        <p v-html="data.category.description"></p>
      </div>
      <div class="statDescription" v-if="data.stat">
        <p v-html="data.stat.description.general"></p>
        <p
          v-if="data.stat.description.specialties"
          v-html="data.stat.description.specialties"
        ></p>
        <div v-if="data.hoverPointer">
          <span
            v-for="i in 5"
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
          <p class="ability" v-for="item in data.stat.abilities[data.hoverPointer]" :key="item">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
    <div class="helpFooter"><span class="resize"></span></div>
  </div>
</template>

<style scoped>
.ability {
  font-variant: small-caps;
  font-weight: bold;
}
.helpHeading {  
  margin: 0;
}
.helpContent {
  padding: 0px 5px;
  overflow-y: scroll;
}
div.helpWindow {
  margin-left: 1150px;
  float: right;
  z-index: 9;
  position: fixed;
  width: 350px;
  background-color: white;
  border: 1px solid black;
}
</style>
