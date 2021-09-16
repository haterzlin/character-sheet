<!--
  Displays a read-only stat
  
--->
<template>
  <div
    class="box">
    <div class="name">{{stat.id}}:</div>
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
            fill: i+((fives-1)*5) > initialValue && i+((fives-1)*5) <= finalValue,
            init: i+((fives-1)*5) <= initialValue,
          }">
        </span>

      </div>
    </div>
  </div>
</template>

<script>
  import {unref} from 'vue'
/**
 *   Displays a read-only stat
 * @param stat {JSON} displayed object
 * @param styleProp {String} style of displayed stat points
 * @param scale {Number} total number of points, split into groups of five
 */
export default {
  props:{'stat':JSON, 'styleProp':String, 'scale':Number, 'dependencies':Array},
  data(){
    return{
      initialValue:this.calcValue()
    }
  },
  computed:{
    /** Counts amount of groups of five for @param scale */
    numberOfFives(){
      var tmp = 5;
      for (;tmp<this.scale;tmp+=5);
      return tmp/5;
    },
    finalValue(){
      return this.calcValue();
    }
  },
  methods: {
    calcValue(){
      let tmp=this.stat.defaultValue;
      if (this.dependencies) {
        this.dependencies.forEach(element => {
          tmp+=unref(element).value;
        });
      };
      return tmp;
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
    cursor: pointer;
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
     background: radial-gradient(#cc0000, #ff6666);
  }
  .healthPt.init{
    background-color:#cc0000;
    color:black;
    cursor: pointer;
    border: 1px;
    border-style: outset;
  }
  .healthPt.init:hover:after{
    content:"/";
  }
  .healthPt.init.stake:hover:after{
    content:"X";
  }
  .willPt.fill{
     background: radial-gradient(blue, #6666ff);
  }
  .willPt.init{
    background-color:blue;
    color:black;
    cursor: pointer;
    border: 1px;
    border-style: outset;
  }
  .hungerPt.init:after, .hungerPt.fill:after{
    content: "X";
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