<script>
/**
 * Displays one stat with @param stat.id as a name of stat
 * Then @param scale number of points with css style @param stat.style
 * And init and fill css style depending on computed @param value while looking
 * at @param stat.defaultValue and @param stat.defaultModifier
 * @param stat {JSON} displayed object
 * @param scale {Number} total number of points, split into groups of five
 * @param value {Number} sum of dependency values
 */
export default {
  props: { stat: Object, scale: Number, value: Number },
  data() {
    return {
      initialValue: this.stat.value ? this.stat.value : this.finalValue()
    };
  },
  methods: {
    /**
     * checks if default modifier exists, if not it is zero
     * @returns computed modifier(value) + default modifier
     */
    finalValue() {
      let mod = (this.stat.defaultModifier) ? this.stat.defaultModifier : 0;
      return mod + this.value
    },
    /**
     * @returns keyed array of class for a point with value @param valueOfPoint
     */
    classOfPoint(valueOfPoint) {
      let classOfPoint = {};
      classOfPoint[this.stat.style] = true;
      classOfPoint['fill'] =
        valueOfPoint > this.initialValue && valueOfPoint <= this.finalValue();
      classOfPoint['init'] = valueOfPoint <= this.initialValue;
      return classOfPoint;
    },
  },
};
</script>

<template>
  <div class="vitalStatBox">
    <div class="vitalStatName">{{ stat.id }}:</div>
    <div class="vitalStatPoints">
      <span v-for="i in scale" :key="i" :class="classOfPoint(i)"> </span>
    </div>
  </div>
</template>

<style scoped>
.point {
  cursor: default;
}
.vitalStatPoints > :nth-child(5n + 0) {
  margin-right: 10px;
}
.healthPt,
.willPt {
  width: 16px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: 1px;
  border: 1px;
  border-style: solid;
  border-color: transparent;
}
.hungerPt,
.humanityPt {
  width: 14px;
  height: 14px;
  border: 1px;
  border-style: outset;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: 1px;
}
.healthPt.fill {
  background-color: #ff6666;
}
.healthPt.init {
  background-color: #cc0000;
  color: #999999;
  border: 1px;
  border-style: outset;
}
.willPt.fill {
  background-color: #6666ff;
}
.willPt.init {
  background-color: blue;
  color: #999999;
  border: 1px;
  border-style: outset;
}
.humanityPt {
  color: #666666;
}
.humanityPt.fill {
  background-color: blue;
}
.humanityPt.init {
  background-color: black;
  color: white;
}
.humanityPt:hover:after,
.healthPt.init:hover:after,
.willPt.init:hover:after {
  content: '/';
}
.humanityPt.init:hover:after,
.hungerPt.init:after,
.hungerPt:hover:after {
  content: 'X';
}
.hungerPt:hover:after {
  color: #666666;
}
.hungerPt.init:hover:after {
  color: #999999;
}
.vitalStatBox {
  margin: auto;
  display: display-block;
  margin-bottom: 1ch;
}
.vitalStatName {
  font-weight: 600;
}
</style>
