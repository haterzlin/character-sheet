<script>
import VitalStat from './VitalStat.vue';
/**
 * Displays dependent stats in bar located to the left side, also contains algorithm
 * how values are computed
 * @param vitals {JSON} list of vital stats
 * @param stamina {Number}  dependency, current value of attribute Stamina
 * @param composure {Number} dependency, current value of attribute Composure
 * @param resolve {Number} dependency, current value of attribute Resolve
 * @param bloodPotency {JSON} dependency, @TODO
 */
export default {
  props: {
    vitals: JSON,
    stamina: Number,
    composure: Number,
    resolve: Number,
    generation: String,        
  },
  emits: ['hover'],
  components: {
    'vital-stat': VitalStat,
  },
  data() {
    return {
      BloodPGensTable: {
        "16th": {
          bloodPotencyMin: 0,
          startingBloodPotency: 0,
          bloodPotencyMax: 0,  
        },
        "15th": {
          bloodPotencyMin: 0,
          startingBloodPotency: 0,
          bloodPotencyMax: 0,
        },
        "14th": {
          bloodPotencyMin: 0,
          startingBloodPotency: 0,
          bloodPotencyMax: 0,
        },
        "13th": {
          bloodPotencyMin: 1,
          startingBloodPotency: 1,
          bloodPotencyMax: 3,
        },
        "12th": {
          bloodPotencyMin: 1,
          bloodPotencyMax: 3,
        },
        "11th": {
          bloodPotencyMin: 1,
          startingBloodPotency: 2,
          bloodPotencyMax: 3,
        },
        "10th": {
          bloodPotencyMin: 1,
          startingBloodPotency: 2,
          bloodPotencyMax: 4,
        },
        "9th": {
          bloodPotencyMin: 2,
          bloodPotencyMax: 5,
        },
        "8th": {
          bloodPotencyMin: 2,
          bloodPotencyMax: 6,
        },
        "7th": {
          bloodPotencyMin: 3,
          bloodPotencyMax: 7,
        },
        "6th": {
          bloodPotencyMin: 3,
          bloodPotencyMax: 8,
        },
        "5th": {
          bloodPotencyMin: 4,
          bloodPotencyMax: 9,
        },
        "4th": {
          bloodPotencyMin: 5,
          bloodPotencyMax: 10,
        },
      }
    }
  },
  computed: {
    /** Computes values of attributes to send to vital stat component 
     * TODO bind this to data so its less stupid and easier to modify from user side
    */
    values() {
      var valueArray = [];
      valueArray['Health'] = this.stamina;
      valueArray['Willpower'] = this.resolve + this.composure;
      valueArray['Humanity'] = 0;
      valueArray['Hunger'] = 0;
      valueArray['Blood Potency'] = this.BloodPGensTable[this.generation].startingBloodPotency 
      return valueArray;
    },
  },
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebarContent">
      <vital-stat
        v-for="stat in vitals"
        :key="stat.id"
        :stat="stat"
        :scale="stat.scale"
        :value="values[stat.id]"
        @mouseenter="$emit('hover', { category: stat })"
        @mouseleave="$emit('hover', null)"
      >
      </vital-stat>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  float: inline-start;
  display:flex;
  position: relative;
  top:0;
}
</style>
