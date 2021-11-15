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
  emits: ['vitalStatHelp'],
  components: {
    'vital-stat': VitalStat,
  },
  data() {
    return {
      BloodPGensTable: {
        "16th": 0,
        "15th": 0,
        "14th": 0,
        "13th": 1,
        "12th": 1,
        "11th": 2,
        "10th": 2,
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
      valueArray['Blood Potency'] = this.BloodPGensTable[this.generation]
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
        @click="$emit('vitalStatHelp', { category: stat })"
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
