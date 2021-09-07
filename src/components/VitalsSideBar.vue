<!--
  Displays vital stats such as health, willpower etc.
  has a show/hide button
--->
<template>
  <div 
    class="sidebar"
    :class="{show:showHide}">
    <span
      @click="showHide=!showHide"
      class="button">
      {{(showHide)? '<':'>'}}
    </span>
    <div 
      class="sidebarContent"     
      v-show="showHide"
      >
      <vital-stat
        v-for="stat in [vitals.health, vitals.willpower, vitals.humanity, vitals.hunger, vitals.bloodPotency]"
        :key="stat.id"
        :stat="stat"
        :style-prop="stat.style"
        :scale="stat.scale"></vital-stat>
    </div>
  </div>  
</template>
<script>

  import VitalStat from './VitalStat.vue'
/**
 * Displays vital stats such as health, willpower etc.
 * has a show/hide button
 * @param vitals {JSON} list of vital stats
 */
export default {
  props: ['bio', 'vitals', 'dependecies'],
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
    position: sticky;
    top:0;
    width:20px;
    float: inline-start;
    margin-right: 5px;
  }
  .sidebar.show{
    width: 370px;
  }
  .sidebarContent{
    width: 350px;
  }
  .sidebar.hide{
    width:20px
  }
  span.button{
    float:inline-end;
    color: red;
    font-size: 22px;
    cursor: pointer;
    border-radius: 50%;
    background-color: lightgrey;
    height: 25px;
    width: 25px;
    text-align: center;
  }
  span.button:hover{
    font-weight: 600;
    background-color: grey;
  }
</style>