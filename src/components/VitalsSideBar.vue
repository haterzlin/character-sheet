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
      class="button"
      :class="{show:!showHide,hide:showHide}">{{(!showHide)?'show':'hide'}}</span>
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
    width: 400px;
    opacity:1;
  }
  .sidebarContent{
    width: 350px;
  }
  .sidebar.hide{
    width:50px
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
</style>