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
        :dependencies="provideDepend(stat.depends)"
        @mouseenter="$emit('hover',{category:stat})"
        @mouseleave="$emit('hover', null)">
        </vital-stat>
    </div>
  </div>  
</template>
<script>

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
  },
  data(){
    return{
      showHide: true
    }
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
}
</script>
<style scoped>
  .sidebar{
    float: inline-start;
    position: static;
  }
  .sidebar.show{
    width: 350px;
    position: absolute;
    
  }
  
</style>