<!--
  Displays vital stats such as health, willpower etc.
  has a show/hide button
--->
<template>
  <div 
    class="sidebar"
    :class="{show:showHide}">
    <div 
      class="sidebarContent"     
      v-show="showHide">      
      <vital-stat
        v-for="stat in vitals"
        :key="stat.id"
        :stat="stat"
        :style-prop="stat.style"
        :scale="stat.scale"
        :dependencies="dependencies[stat.id]"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
    </div>
  </div>  
</template>
<script>
import VitalStat from './VitalStat.vue'
/**
 * Displays vital stats such as health, willpower etc.
 * has a show/hide button
 * @param vitals {JSON} list of vital stats
 * @param dependecies {JSON} keyed array of reffed dependecies
 */
export default {
  props: {'vitals':JSON, 'dependencies':JSON},
  emits:['hover'],
  components:{
    'vital-stat':VitalStat,
  },
  data(){
    return{
      showHide: true
    }
  },  
}
</script>
<style scoped>
  .sidebar{
    float: inline-start;
    position: absolute;
    width: 350px;
  }
  
</style>