<script setup>
import { disciplinesDefinition } from '../data.js';
import Dots from './Dots.vue';
</script>

<script>
/**
 * Displays select allowing to choose discipline
 * And dots allowing change of number of dots in discipline
 * and display selects with abilities
 */
export default {
  components: [Dots],
  props: ['discipline', 'disciplines', 'clan', 'allocatedResources', 'predatorDiscipline'],
  emits: ['disciplineChange'],
  computed: {
    /**
     * @returns {List} of clan disciplines
     */
    clanDisciplineList() {
      return disciplinesDefinition.data
        .filter(
          (discipline) =>
            discipline.clans.includes(this.clan) &&
            !this.chosenDisciplines.includes(discipline.id)
        )
        .map(({ id }) => id);
    },
    /**
     * @returns {List} of non clan disciplines
     */
    notClanDisciplineList() {
      return disciplinesDefinition.data
        .filter(
          (discipline) =>
            !discipline.clans.includes(this.clan) &&
            !this.chosenDisciplines.includes(discipline.id)
        )
        .map(({ id }) => id);
    },
    /**
     * @returns {List} of disciplines to display in select
     */
    disciplineList() {
      return disciplinesDefinition.data
        .filter((discipline) => !this.chosenDisciplines.includes(discipline.id))
        .map(({ id }) => id);
    },
    /**
     * @returns {List} of disciplines which are already selected to exclude from discipline selects
     */
    chosenDisciplines() {
      return this.disciplines
        .filter(
          (discipline) =>
            discipline.id != null && discipline.id != this.discipline.id
        )
        .map(({ id }) => id);
    },
    predatorDisciplineBonus() {
      /**
       * compute bonus for predator discipline
       * @returns {Number}
       */
      if (!this.discipline.id | this.discipline.id != this.predatorDiscipline) {
        return 0
      }
      return 1
    }
  },
  methods: {
    /**
     * @returns {Array} of abilities defined in disciplineDefinition
     * based on disciplineId and abilityLevel
     */
    abilityList(disciplineId, abilityLevel) {
      for (var i = 0; i < disciplinesDefinition.data.length; i++) {
        if (disciplinesDefinition.data[i].id == disciplineId) {
          return disciplinesDefinition.data[i].abilities[abilityLevel];
        }
      }
      return null;
    },
    /**
     * method will check if change is allowed and
     * @returns {Number} lowest allowed value
     */
    returnLowestAllowedValue(newvalue) {
      var i = newvalue;
      if (newvalue > this.discipline.value) {
        for (; i > this.discipline.value; i--) {
          if (
            this.allocatedResources[i] < disciplinesDefinition.resource[i]
          ) {
            break;
          }
        }
      }
      return i;
    },
    /**
     * Used to emit discipline changes upwards
     * check if discipline id is specified, if not we don't emit
     * create discipline instance based on input parameters
     * @param {String} newid
     * @param {Number} newvalue - restricted by returnLowestAllowedValue method
     * @param {Array} newabilities
     */
    emitChangedDiscipline(newid, newvalue, newabilities) {
      if (this.discipline.id != null || newid != null) {
        var newdisc = this.discipline;
        newdisc.id = newid;
        newdisc.value = this.returnLowestAllowedValue(newvalue);
        newdisc.abilities = newabilities;
        this.$emit('disciplineChange', newdisc);
      }
    },
    /**
     * returns 0 if discipline ability select should be enabled
     * or 1 if not 
     * depending in itemLevel and discipline value and predator discipline bonus
     * @param {String} itemLevel - which discipline ability level we are at
     */
    isAbilityDisabled(itemLevel) {
      return this.discipline.value + this.predatorDisciplineBonus < itemLevel ? 1 : 0
    }
  },
};
</script>

<template>
  <div class="statList">
    <div>
      <select
        class="discipline-select"
        :class="{ clanDiscipline: clanDisciplineList.includes(discipline.id) }"
        @change="
          emitChangedDiscipline(
            $event.target.value,
            discipline.value,
            discipline.abilities
          )
        "
        :value="discipline.id"
      >
        <option disabled value="">Choose discipline</option>
        <optgroup label="Clan disciplines">
          <option v-for="option in clanDisciplineList" :key="option">
            {{ option }}
          </option>
        </optgroup>

        <optgroup label="Other disciplines">
          <option v-for="option in notClanDisciplineList" :key="option">
            {{ option }}
          </option>
        </optgroup>
      </select>

      <Dots
        :value="discipline.value"
        :initialValue="0"
        :scale="5"
        :bonus="predatorDisciplineBonus"
        @valueChange="
          emitChangedDiscipline(discipline.id, $event, discipline.abilities)
        "
      />
    </div>

    <div
      class="discipline-ability"
      v-for="item in discipline.abilities"
      :key="item.level"
      :index="item.level"
    >
      {{ item.level }}
      <select
        class="discipline-ability-select"
        :disabled="isAbilityDisabled(item.level)"
        v-model="item.value"
      >
        <option disabled value="">Choose ability</option>
        <option
          v-for="option in abilityList(discipline.id, item.level)"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>

.discipline-item:hover {
  background-color: #f5f5f5;
}
.discipline-select {
  width: 50%;
  margin-right: 15px;
}
.discipline-ability-select {
  width: 90%;
}

.discipline-ability-select:disabled {
  cursor: default;
}

</style>
