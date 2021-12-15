<script>
/**
 * Displays details about the element that the mouse is over
 * mostly works with stats so far
 */
export default {
  emits: ['helpClick', 'getHelp'],
  props: { mouseOverData: JSON, descriptionsWithPath: JSON},
  data() {
    return {      
      data: this.descriptionsWithPath.Help.data,
      path2Data: this.descriptionsWithPath.Help.path2Data,
      defaultData: this.descriptionsWithPath.Help,
      hide: true,
      emitHelp: false,
      width: 600,
      height: 400,
    };
  },
  computed: {
    /**@returns {number} height of content*/
    contentHeight(){
      return Math.max(this.height, window.innerHeight) - 54
    },
    /**@returns {number} width of content box */
    contentWidth(){
      return Math.min(this.width, window.innerWidth)
    },    
    /** @returns {number} scale if either scale or resource exists*/
    scaleOfPoints(){
      let tmp = (this.data.scale) ? this.data.scale : null;
      tmp = (!tmp && this.data.resource) ? this.data.resource.length - 1 : tmp;
      tmp = (!tmp) ? 0 : tmp;
      return tmp;
    },
  },
  watch: {
    mouseOverData: {
      handler(newVal) {
        if (newVal) {
         this.data = newVal;
         this.hide = false;
         this.emitHelp = false;
         let value = (newVal.category) ? newVal.category : null;
         value = (newVal.stat) ? newVal.stat : value;
         value = (!value) ? value.path2Data = "" : value; // vazne by som mal najst nejaky syntakticky cukor na priradzovanie ak hodnota existuje
         this.path2Data = value.path2Data;
        }
      },
      //deep: true,
    },
  },
};
</script>

<template>
  <div 
    class="helpOpen"
    id="helpOpen"
    :style="{cursor: (emitHelp) ? 'help' : 'pointer'}"
    @click="hide=false; $emit('getHelp', defaultData.data);">
  </div>
  <div 
    class="helpWindow"
    id="help"
    v-if="!hide">
    <div 
      class="helpHeader">
      <span 
        id="helpClick"
        class="helpIcon"
        @click="$emit('helpClick'); hide=true; emitHelp=true;">?</span>      
      <h3 class="helpHeading">HELP</h3>
      <span 
        class="helpExit"
        id="helpExit"
        @click="hide=true">
      </span>
    </div>
    <ul 
      class="helpDataSelect"
      id="helpSelect"
      :style="{height : contentHeight + 'px'}"
      >
      <li v-for="elem in descriptionsWithPath"
      class="helpItem"
      :class="{selected: elem.path2Data == path2Data}" 
      :key="elem.path2Data"
      >
      <div 
        @click="data=elem.data; path2Data = elem.path2Data">
        {{elem.name}}
      </div>
      <ul class="margin10"><li v-for="item in elem.items"
        class="helpItem"
        :class="{selected: item.path2Data == path2Data}" 
        :key="item.path2Data">
        <div 
          @click="data = item.data; path2Data = item.path2Data">
          {{item.name}}
        </div>
        <ul class="margin20"><li v-for="subitem in item.items"
          class="helpItem"
          :class="{selected: subitem.path2Data == path2Data}" 
          :key="subitem.path2Data">
          <div 
            @click="data=subitem.data; path2Data = subitem.path2Data">
            {{subitem.name}}
          </div>
        </li></ul>
      </li></ul>
      </li>
    </ul>
    <div 
      class="helpContent"
      :style="{height : contentHeight + 'px', width : contentWidth + 'px'}">
      <h4 v-if="path2Data">{{path2Data}}</h4>
      <p 
        v-if="data.description"
        v-html="data.description"></p>
      <div v-if="data.category">
        <p v-html="data.category.description"></p>
      </div>
      <div class="statDescription" v-if="data.stat">
        <p v-html="data.stat.description.general"></p>
        <p
          v-if="data.stat.description.specialties"
          v-html="data.stat.description.specialties"
        ></p>
        <div>
          <div
            v-for="j in scaleOfPoints" :key="j">
            <span
              v-for="i in scaleOfPoints"
              :key="i"
              class="point"
              :class="{ init: j >= i }"
            >
            </span>
            {{(j == data.stat.value)? '(current value of ' + data.stat.id + ')' : ''}}
            <p
              v-if="data.stat.description[j]"
              v-html="data.stat.description[j]"
            ></p>
            <div v-if="data.stat.abilities && !data.stat.description[j]">
              <p class="ability" v-for="item in data.stat.abilities[j]" :key="item">
                {{ item }}
              </p>
            </div>
          </div>
        </div>
      </div>      
    </div>
    <div class="helpFooter">
    </div>
  </div>
</template>

<style scoped>
.point {
  cursor: default;
}
.ability {
  font-variant: small-caps;
  font-weight: bold;
  margin-left: 10px;
}
.helpHeading {  
  margin: 0;
}
.helpWindow {
  top: 0;
  right: 0;
  width: 100%;
}
.helpContent {
  padding: 0px 5px;
  overflow-y: scroll;
  background-color: white;
  margin: auto;
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
  background-color: #cccccc;
}
.helpIcon {
  height: 15px;
  width: 15px;
  margin: 0px 5px;
  cursor:pointer;
  border: black outset 2px;
  display: inline-flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%; 
}
.helpIcon:hover {  
  color: #ff6666;
  border-color: #ff6666;
  border-style: solid;
}
.helpOpen {
  bottom: 5px;
  left: 5px;
  position: fixed;
  height: 50px;
  width: 50px;
  font: 700;
  font-size: 50px;
  margin: 0px 5px;
  border: black solid 1px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; 
  background-color: #f0f0f0;
  opacity: 0.5;
}
.helpOpen:hover {
  opacity: 1;
}
.helpOpen:after {
  content: '?'
}
div.helpWindow {  
  position:fixed;
  z-index: 9;
  background-color: #f0f0f0;
}
span.resize {
  display:inline-block;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #666666;
  border-left: 10px solid #666666;
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
  float:left;
  overflow-y: scroll;
}
.helpItem {
  cursor: pointer;
  color: blue;
}
.helpItem:hover {
  color: purple;
}
.helpItem.selected{
  color: black;
  font: 700;
}
</style>
