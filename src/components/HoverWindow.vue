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
      <span class="helpIcon">?</span>      
      <h3 class="helpHeading">HELP</h3>
      <span class="helpExit"></span>
    </div>
    <select class="helpDataSelect">
      <option>something</option>
    </select>
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
  cursor: grab;
}
.helpContent {
  padding: 0px 5px;
  overflow-y: scroll;
}
.helpHeader {
  display:flex;
  width:100%;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 5px 0px;
  background-color: #aaaaaa;
}
.helpExit {
  height: 20px;
  width: 20px;
  font-size: 20px;
  color: #666666;  
  margin: 0px 5px;
  align-self: flex-start;
  justify-self: flex-end;
  cursor: pointer;
  display: inline-flex;  
  align-items: center;
  justify-content: center;

}
.helpExit:after {
  content:'\00D7';
}
.helpExit:hover {
  color: black;
}
.helpIcon {
  height: 15px;
  width: 15px;
  margin: 0px 5px;
  cursor:pointer;
  border: black outset 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; 
}
.helpIcon:hover {  
  color: #ff6666;
  border-color: #ff6666;
}
div.helpWindow {
  margin-left: 1150px;
  float: right;
  position:fixed;
  z-index: 9;
  width: 350px;
  background-color: white;
  border: 1px solid black;
}
span.resize {
  display:inline-block;
  border-top: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid #666666;
  border-left: 6px solid #666666;
  cursor: sw-resize;
  vertical-align: bottom;
}
span.resize:hover {
  border-bottom-color: black;
  border-left-color: black;
}
.helpFooter {
  clear: both;
}
.helpDataSelect {
  cursor: pointer;
}
</style>
