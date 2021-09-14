<!--
  Displays a read-only stat
  
--->
<template>
  <div
    class="box">
    <div class="name">{{stat.id}}:{{stat.value}}</div>
    <div
      class="points">
      <div 
        class="five"
        v-for="fives in numberOfFives"
        :key="fives">
        <span
          v-for="i in (fives==numberOfFives && scale%5!=0) ? scale%5 : 5"
          :key="i"
          :class="{
            point:styleProp=='point',
            healthPt:styleProp=='healthPt',
            willPt:styleProp=='willPt',
            hungerPt:styleProp=='hungerPt',
            humanityPt:styleProp=='humanityPt',
            fill: i+((fives-1)*5) > initialValue && i+((fives-1)*5) <=stat.value,
            init: i+((fives-1)*5) <= initialValue,
          }">
        </span>

      </div>
    </div>
  </div>
</template>

<script>
/**
 *   Displays a read-only stat
 * @param stat {JSON} displayed object
 * @param styleProp {String} style of displayed stat points
 * @param scale {Number} total number of points, split into groups of five
 */
export default {
  props:{'stat':Object, 'styleProp':String, 'scale':Number},
  data(){
    return{
      initialValue:this.stat.value
    }
  },
  computed:{
    /** Counts amount of groups of five for @param scale */
    numberOfFives(){
      var tmp = 5;
      for (;tmp<this.scale;tmp+=5);
      return tmp/5
    }
  },
}
</script>
<style scoped>
  .point{
    cursor:default;
  }
  .healthPt, .willPt{
    width: 16px;
    height: 20px;
    border: 1px;
    border-style: outset;
    display: inline-block;
    vertical-align: middle;
    text-align:center;
    margin: 1px;
  }

  .hungerPt,.humanityPt{
    width: 14px;
    height: 14px;
    border: 1px;
    border-style: outset;
    display: inline-block;
    vertical-align: middle;
    text-align:center;
    margin: 1px;
  }
  .humanityPt.fill{
    background-color:blue;
  }
  .humanityPt.init{
    background-color:black;
    color:white;
    cursor: pointer;
  }
  .humanityPt.init:hover:after{
    content:"X";
  }
  .healthPt.fill{
     background: radial-gradient(#ff6666, #cc0000);
  }
  .healthPt.init{
    background-color:#cc0000;
    color:black;
    cursor: pointer;
  }
  .healthPt.init:hover:after{
    content:"/";
  }
  .healthPt.init.stake:hover:after{
    content:"X";
  }
  .five{
    float:left;
    margin-right: 1ch;
  }
  .box{
    width: 350px;
    margin:auto;
    display:inline-block;
    margin-bottom: 1ch;
  }
  .name{
    font-weight: 600;
  }
</style>