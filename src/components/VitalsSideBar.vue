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
        :scale="stat.scale"
        :value="values[stat.id]"
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
  props: {'vitals':JSON, 'stamina': Number, 'composure':Number,'resolve':Number,'bloodPotency':Number,},
  emits:['hover'],
  components:{
    'vital-stat':VitalStat,
  },
  data(){
    return{
      showHide: true
    }
  },
  computed: {
    /** Computes values of attributes to send to vital stat component */
    values(){
      var valueArray = []
      
      valueArray["Health"] = this.dependecySum([this.stamina])
      valueArray["Willpower"] = this.dependecySum([this.resolve + this.composure])
      valueArray["Humanity"] = this.dependecySum([])
      valueArray["Hunger"] = this.dependecySum([])
      valueArray["Blood Potency"] = this.dependecySum([])
      
      return valueArray      
    }
  },
  methods: {
    /**
     * returns sum of numbers in @param numberArray 
     */
    dependecySum(numberArray){
      let sum = 0;
      numberArray.forEach(element => {
        sum+=element
      });
      return sum;
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