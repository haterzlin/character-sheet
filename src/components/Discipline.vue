<script setup>
/**
 * Displays select allowing to choose discipline
 * And dots allowing change of number of dots in discipline
 * and display selects with abilities
 */
import {disciplinesDefinition} from "../data.js";
</script>

<script>
export default {
  props: ["discipline", "disciplines", "clan"],
  emits: ["disciplineChange"],
  computed: {
    /**
     * @returns {List} of clan disciplines
     */
    clanDisciplineList() {
      var list = []
      for (var i = 0; i < disciplinesDefinition.data.length; i++) {
        if ( disciplinesDefinition.data[i].clans.includes(this.clan) &&
             ! this.choosenDisciplines.includes(disciplinesDefinition.data[i].id)) {
          list.push(disciplinesDefinition.data[i].id)
        }
      }
      return list
    },
    /**
     * @returns {List} of non clan disciplines
     */
    notClanDisciplineList() {
      var list = []
      for (var i = 0; i < disciplinesDefinition.data.length; i++) {
        if (! disciplinesDefinition.data[i].clans.includes(this.clan) &&
            ! this.choosenDisciplines.includes(disciplinesDefinition.data[i].id)) {
          list.push(disciplinesDefinition.data[i].id)
        }
      }
      return list
    },
    /**
    * @returns {List} of disciplines to display in select
    */
    disciplineList() {
      var list = []
      for (var i = 0; i < disciplinesDefinition.data.length; i++) {
        if (! this.choosenDisciplines.includes(disciplinesDefinition.data[i].id) ) {
          list.push(disciplinesDefinition.data[i].id)
        }
      }
      return list
    },
    /**
    * @returns {List} of disciplines which are already selected to exclude from discipline selects
    */
    choosenDisciplines() {
      var list = []
      for (var i = 0; i < this.disciplines.length; i++) {
        if (this.disciplines[i].id != null && this.disciplines[i].id != this.discipline.id)
        list.push(this.disciplines[i].id)
      }
      return list
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
          return disciplinesDefinition.data[i].abilities[abilityLevel]
        }
      }
      return null
    },
    /**
    * create discipline instance based on input
    * newid, newvalue, newabilities
    * and then emits new discipline values upwards
    */    
    emitChangedDiscipline(newid, newvalue, newabilities) {
      var newdisc = this.discipline
      newdisc.id = newid
      newdisc.value = newvalue
      newdisc.abilities = newabilities
      this.$emit('disciplineChange', newdisc)
    }
  }
};
</script>

<template>
  <div class="discipline-item">
    <div>      
      <select
        class="discipline-select" 
        :class="{ clanDiscipline: clanDisciplineList.includes(discipline.id) }"
        @change="emitChangedDiscipline($event.target.value, discipline.value, discipline.abilities)"
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

      <span class="points">
        <span
          v-for="i in 5"
          :key="i"
          :class="{
            point: true,
            fill: i <= discipline.value,
          }"
          @click="if (discipline.value == i) { i-- }; emitChangedDiscipline(discipline.id, i, discipline.abilities)"
        >
        </span>
      </span>
    </div>   

    <div
      class="discipline-ability"
      v-for="item in discipline.abilities"
      :key="item.level"
      :index="item.level">
    {{ item.level }}
      <select 
        class="discipline-ability-select"
        :disabled="this.discipline.value < item.level ? 1 : 0"
        v-model="item.value"
      >
        <option disabled value="">Choose ability</option>
        <option v-for="option in abilityList(discipline.id, item.level)" :key="option">
          {{ option }}
        </option>
    </select>
    </div>

  </div>
</template>

<style scoped>
.discipline-item {
  width: 32%;
  float: left;
  margin: 5px;
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
.clanDiscipline {
  font-weight: bold
}

</style>
