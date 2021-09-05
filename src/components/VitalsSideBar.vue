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
      <stat
        :stat="vitals.bloodPotency"
        :scale="10"></stat>
      
    </div>
  </div>  
</template>
<script>

import Stat from './Stat.vue'

export default {
  props: ['bio', 'vitals', 'dependecies'],
  components:{
    stat:Stat,
  },
  data(){
    return{
      showHide: true
    }
  }
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
</style>