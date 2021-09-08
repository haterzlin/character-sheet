<!--
  Displays vital stats such as health, willpower etc.
  has a show/hide button
--->
<template>
  <div 
    class="sidebar"
    :class="{show:showHide}">
      <div 
        class="button"
        @click="showHide=!showHide">
        <span>
          {{(showHide) ? '<' : '>'}}
        </span>
      </div>
    <div 
      class="sidebarContent"     
      v-show="showHide">      
      <vital-stat
        v-for="stat in vitals"
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
    float: inline-start;
    margin-right: 25px;
  }
  .sidebar.show{
    width: 350px;
  }
  .sidebarContent{
    width: 350px;
    position: fixed;
  }
  .button{
    float: inline-end;
    cursor: pointer;
    height:2em;
    width:4px
  }
  .button>span{
    position:fixed; 
    color: red;
    font-size: 20px;  
    border-radius: 50%;
    background-color: lightgrey;
    height: 25px;
    width: 25px;
    text-align: center;
    vertical-align: center;
    font-weight: bold;
  }
  .button:hover > span{
    background-color: grey;
  }
</style>