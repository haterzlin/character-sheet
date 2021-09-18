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
        :stat="vitals[0]"
        :style-prop="vitals[0].style"
        :scale="vitals[0].scale"
        :dependencies="[stamina.value]"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
        <vital-stat
        :stat="vitals[1]"
        :style-prop="vitals[1].style"
        :scale="vitals[1].scale"
        :dependencies="[composure.value, resolve.value]"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
        <vital-stat
        :stat="vitals[2]"
        :style-prop="vitals[2].style"
        :scale="vitals[2].scale"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
        <vital-stat
        :stat="vitals[3]"
        :style-prop="vitals[3].style"
        :scale="vitals[3].scale"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
        <vital-stat
        :stat="vitals[4]"
        :style-prop="vitals[4].style"
        :scale="vitals[4].scale"
        :dependencies="[(bloodPotency) ? bloodPotency.value : null]"
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
  props: {'vitals':JSON, 'stamina':JSON, 'composure':JSON,'resolve':JSON,'bloodPotency':JSON,},
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