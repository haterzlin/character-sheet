<!--
  Displays a read-only stat
  @param stat {json} displayed object
  @param styleProp {string} style of displayed stat points
  @param scale {number} total number of points, split into groups of five
--->
<template>
  <div
    class="box">
    <div class="name">{{stat.id}}</div>
    <div
      class="points">
      <div 
        class="five"
        v-for="fives in numberOfFives"
        :key="fives">
        <span
          v-for="i in (fives==numberOfFives && scale%5!=0) ? scale%5 : 5"
          :key="i"
          :class="styleProp">
        </span>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{'stat':Object, 'styleProp':String, 'scale':Number},
  computed:{
    /** Count amount of groups of five */
    numberOfFives(){
      var tmp = 5;
      for (;tmp<this.scale;tmp+=5);
      return tmp/5
    }
  }
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
    margin: 1px;
  }

  .hungerPt,.humanityPt{
    width: 16px;
    height: 16px;
    border: 1px;
    border-style: outset;
    display: inline-block;
    vertical-align: middle;
    margin: 1px;
  }
  .humanityPt.fill{
    color:blue;
  }
  .five{
    float:left;
    width: 100px;
    height: 20px;
    margin: 5px;
  }
  .box{
    width: 350px;
    margin:auto;
    display:inline-block;
    margin-bottom: 10px;
  }
  .name{
    font-weight: 600;
  }
</style>