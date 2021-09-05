<<<<<<< HEAD
<!--
  Displays vital stats such as health, willpower etc.
  has a show/hide button
--->
=======
>>>>>>> sidebar w/ hide/show | data
<template>
  <div 
    class="sidebar"
    :class="{show:showHide}">
<<<<<<< HEAD
    <div 
      class="sidebarContent"     
      v-show="showHide">      
      <vital-stat
        v-for="stat in vitals"
        :key="stat.id"
        :stat="stat"
        :style-prop="stat.style"
        :scale="stat.scale"
        :dependencies="provideDepend(stat.depends)"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
=======
    <span
      @click="showHide=!showHide"
      class="button"
      :class="{show:!showHide,hide:showHide}">{{(!showHide)?'show':'hide'}}</span>
    <div 
      class="sidebarContent"     
      v-show="showHide"
      >
      <stat
        :stat="vitals.bloodPotency"
        :scale="10"></stat>
      
>>>>>>> sidebar w/ hide/show | data
    </div>
  </div>  
</template>
<script>

<<<<<<< HEAD
  import VitalStat from './VitalStat.vue'
  import {unref} from 'vue'
/**
 * Displays vital stats such as health, willpower etc.
 * has a show/hide button
 * @param vitals {JSON} list of vital stats
 */
export default {
  props: ['bio', 'vitals', 'dependencies'],
  emits:['hover'],
  components:{
    'vital-stat':VitalStat,
=======
import Stat from './Stat.vue'

export default {
  props: ['bio', 'vitals', 'dependecies'],
  components:{
    stat:Stat,
>>>>>>> sidebar w/ hide/show | data
  },
  data(){
    return{
      showHide: true
    }
<<<<<<< HEAD
  },
  methods: {
    provideDepend(statDepends){
      let dependency = undefined;
      if (statDepends){
         this.dependencies.forEach(element => {
          let found = true;
          let count = 0;
          element.forEach((elem, index) => {
            found = found && unref(elem).id==statDepends[index];
            count++;
          });
          if (found && count) dependency = element;
        });
      }
      return dependency;
    }
  },
=======
  }
>>>>>>> sidebar w/ hide/show | data
}
</script>
<style scoped>
  .sidebar{
<<<<<<< HEAD
    float: inline-start;
    position: static;
  }
  .sidebar.show{
    width: 350px;
    position: absolute;
    
  }
  
=======
    position: fixed;
    background:white;
    width:50px;
    opacity: 0;
    height:100%
  }
  .sidebar:hover{
    opacity: 1;
  }
  .sidebar.show{
    position: fixed;
    background:white;
    width: 450px;
    opacity:1;
  }
  .sidebarContent{
    width: 400px;
  }
  .sidebar.hide{
    width:0px
  }
  span.button{
    display:block;
    float:right;
    color: blue;
    height:100%
    
  }
  span.button:hover{
    color:black;
    font-weight: 600;
  }
  span.button.show:after{
    content:">"
  }
  span.button.hide:after{
    content:"<"
  }
>>>>>>> sidebar w/ hide/show | data
</style>