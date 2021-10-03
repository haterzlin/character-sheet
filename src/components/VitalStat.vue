<script>
/**
 *   Displays a read-only stat
 * @param stat {JSON} displayed object
 * @DEPRECATED @param styleProp {String} style of displayed stat points
 * @param scale {Number} total number of points, split into groups of five
 * @param value {Number} sum of dependency values
 */
export default {
  props:{'stat': Object, 'scale': Number, 'value': Number},
  data(){
    return{
      initialValue:(this.stat.defaultValue) ? this.stat.defaultValue : this.finalValue()
    }
  },
  methods:{
    /**
     * @returns sum of dependecies + modifier
     */
    finalValue() {
      return (this.stat.defaultModifier) ? this.stat.defaultModifier + this.value : this.value;
    },
    /**
     * @returns keyed array of class for a point with value @param valueOfPoint
     */
    classOfPoint(valueOfPoint){
      let classOfPoint = {};
      classOfPoint[this.stat.style] = true;
      classOfPoint['fill'] = valueOfPoint > this.initialValue && valueOfPoint <= this.finalValue();
      classOfPoint['init'] = valueOfPoint <= this.initialValue;
      return classOfPoint
    }
  }
}
</script>
    
<template>
  <div class="box">
    <div class="name">{{ stat.id }}:</div>
    <div class="points">
        <span
          v-for="i in scale"          
          :key="i"          
          :class="classOfPoint(i)">
        </span>
    </div>
  </div>
</template>

<style scoped>
  .point{
    cursor:default;
  }
  .points > :nth-child(5n+0){
    margin-right: 10px;
  }
  .healthPt, .willPt{
    width: 16px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    text-align:center;
    margin: 1px;
    border: 1px;
    border-style: solid;
    border-color: transparent;
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
  .healthPt.fill{
    background-color: #ff6666;
  }
  .healthPt.init{
    background-color:#cc0000;
    color:#999999;;
    border: 1px;
    border-style: outset;
  }
  .willPt.fill{
    background-color: #6666ff;
  }
  .willPt.init{
    background-color:blue;
    color:#999999;;
    border: 1px;
    border-style: outset;
  }
  .humanityPt{
    color:#666666;
  }
  .humanityPt.fill{
    background-color:blue;
  }
  .humanityPt.init{
    background-color:black;
    color:white;
  }
  .humanityPt:hover:after, .healthPt.init:hover:after,.willPt.init:hover:after{
    content: "/";
  }
  .humanityPt.init:hover:after,.hungerPt.init:after,.hungerPt:hover:after{
    content:"X";
  }
  .hungerPt:hover:after{
    color: #666666;
  }
  .hungerPt.init:hover:after{
    color: #999999;
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