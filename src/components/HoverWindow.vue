<script>
const HELP_DATA = {
  data: {
    description: "<b>help window -- ?</b><p>click on (?) and then click another element to see info</p><p>or use select and simply pick it</p><p>mousedown on header to drag n drop this element</p><p>mousedown at bottom left of this element (the triangle) to resize</p><p>click 'x' to hide this element</p>"
    },
  path2Data: "Help/"
};
import DisciplineSection from './DisciplineSection.vue';
import {unref} from "vue"
/**
 * Displays details about the element that the mouse is over
 * mostly works with stats so far
 */
export default {
  components: { DisciplineSection },
  emits: ['helpClick', 'getHelp'],
  props: { mouseOverData: JSON, descriptionsWithPath: JSON},
  data() {
    return {      
      data: HELP_DATA.data,
      path2Data: HELP_DATA.path2Data,
      defaultData: HELP_DATA,
      hide: true,
      minWidth: 200,
      initWidth: 400,
      width: 400,
      minHeight: 200,
      initHeight: 400,
      height: 400,
      initRight: 0,
      right: 0,
      initTop: 0,
      top: 0,
      zmazat: null,
      isGrabbed : false,
    };
  },
  computed: {
    contentHeight(){
      return this.height - 74
    },
    /** returns scale if either scale or resource exists*/
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
        }
      },
      //deep: true,
    },
    /* NEFUNGUJE
    data: {
      handler(newVal) {
        if(newVal) {
          let dataPath = (this.data.stat.id && this.descriptionsWithPath[this.data.stat.id]) ? this.descriptionsWithPath[this.data.stat.id] : null
          this.path2Data = dataPath;
        }
      }
    }*/
  },
  methods:{
    /** method for resizing window 
     * @param mouseEvent{MouseEvent}
    */
    resize(mouseEvent){
      if (mouseEvent.buttons !== 1) {
        this.isGrabbed=false;
        return;
        }
      //TODO make this like dragNdrop, so it feels smoother
      let x = - mouseEvent.offsetX;
      let y = mouseEvent.offsetY - 5;
      this.zmazat = mouseEvent;
      this.width += x;
      this.height += y;
      if (this.width < this.minWidth) this.width = this.minWidth;
      if (this.height < this.minHeight) this.height = this.minHeight;
    },
    /**method for window drag and drop 
     * @param mouseEvent{MouseEvent}
    */
    dragNDrop(mouseEvent){
      let pageWidth = window.innerWidth;
      if (mouseEvent.buttons !== 1) {
        this.isGrabbed = false;
        return;
      } 
      
      //TODO make offset for right and top variables acquired when grabbed of use it instead of width/2 and 20
      this.right = pageWidth - mouseEvent.x - this.width/2
      this.top = mouseEvent.y - 20;
      if (this.right < this.initRight) this.right = this.initRight;
      if (this.top < this.initTop) this.top = this.initTop;
    }
  },
};
</script>

<template>
  <div 
    class="helpOpen"
    id="helpOpen"
    @click="hide=false; width=initWidth; height=initHeight; right=initRight; top=initTop">
  </div>
  <div 
    class="helpWindow"
    id="help"
    v-if="!hide"
    :style="{width : width + 'px', right : right + 'px', top : top + 'px'}">
    <div 
      class="helpHeader"
      :style="{cursor: (isGrabbed) ? 'grabbing' : 'grab'}"
      @mousedown.prevent="isGrabbed = true"
      @mousemove="dragNDrop($event)">
      <span 
        class="helpIcon"
        @click="$emit('helpClick')">?</span>      
      <h3 class="helpHeading">HELP</h3>
      <span 
        class="helpExit"
        id="helpClose"
        @click="hide=true">
      </span>
    </div>
    <select 
      class="helpDataSelect"
      v-model="data">
      <option :value="defaultData.data">{{defaultData.path2Data}}</option>
      <option v-for="elem in descriptionsWithPath" :key="elem.path2Data" :value="elem.data">{{elem.path2Data}}</option>
    </select>
    <div 
      class="helpContent"
      :style="{height : contentHeight + 'px'}">
      <p v-if="zmazat">
        x:{{zmazat.clientX}}<br/>
        y:{{zmazat.clientY}}<br/>
        x->{{zmazat.offsetX}} <br/>
        y->{{zmazat.offsetY}}<br/>
        width:{{width}}<br/>
        height:{{height}}<br/>
        
      </p>
      {{}}
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
      <span 
        class="resize"
        :style="{cursor: (isGrabbed) ? 'sw-resize' : 'grab'}"
        @mousedown.prevent="isGrabbed=true"
        @mousemove="resize($event)"
        ></span>
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
.helpContent {
  padding: 0px 5px;
  overflow-y: scroll;
  background-color: white;
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
  cursor:pointer;
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
  cursor: pointer;
}
</style>
