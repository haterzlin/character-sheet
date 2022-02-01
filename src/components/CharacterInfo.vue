<script setup>
import CharacterInfoInput from "./CharacterInfoInput.vue";
import CharacterInfoSelect from "./CharacterInfoSelect.vue";
import CharacterInfoPortrait from "./CharacterInfoPortrait.vue";
</script>

<script>
/**
 * Displays basic character info in inputs or selects,
 * emits detected changes upwards to have data fresh for export or potential other work
 */
export default {
  components: [CharacterInfoInput, CharacterInfoSelect, CharacterInfoPortrait],
  props: ["bio", "predatorDefinitions"],
  emits: ["bioChange"],
  computed: {
    /**
     * @returns list of disciplines filtered by predator type value from predatorDefinitions
     */
    predatorTypeDisciplines() {
      return this.predatorDefinitions.filter(
        (predator) => predator.id == this.bio.predator.value
      )[0].disciplines
    }
  },
  methods: {
    /**
     * after change of predator type check if we have to remove predator discipline
     */
    chosenDisciplineCheck(predatorType) {
      var allowedDisciplines = this.predatorDefinitions.filter(
        (predator) => predator.id == predatorType
      )[0].disciplines
      if (! allowedDisciplines.includes(this.bio.predator.chosenDiscipline)) {
        this.bio.predator.chosenDiscipline = "no"
      }
    }
  }
};
</script>

<template>
  <div class="char-info" id="char-info">
    <div class="char-info-group">
      <CharacterInfoInput 
        :item="bio.concept" 
        @char-item-change="$emit('bioChange', [bio.concept, $event])"></CharacterInfoInput>
      <CharacterInfoSelect 
        :item="bio.sex"
        @char-item-change="$emit('bioChange', [bio.sex, $event])" ></CharacterInfoSelect>
      <CharacterInfoInput 
        :item="bio.age" 
        @char-item-change="$emit('bioChange', [bio.age, $event])"></CharacterInfoInput>
      <CharacterInfoInput 
        :item="bio.description" 
        @char-item-change="$emit('bioChange', [bio.description, $event])"></CharacterInfoInput>
      <CharacterInfoInput 
        :item="bio.ambition"
        @char-item-change="$emit('bioChange', [bio.ambition, $event])"></CharacterInfoInput>
      <CharacterInfoInput 
        :item="bio.desire"
        @char-item-change="$emit('bioChange', [bio.desire, $event])"></CharacterInfoInput>
    </div>
    <div class="char-info-group middle">
      <CharacterInfoPortrait
        :item="bio.image"
        @char-item-change="$emit('bioChange', [bio.image, $event])"
      />
      <CharacterInfoInput 
        :item="bio.name"
        @char-item-change="$emit('bioChange', [bio.name, $event])"/>
    </div>
    <div class="char-info-group">
      <CharacterInfoSelect 
        :item="bio.generation"
        @char-item-change="$emit('bioChange', [bio.generation, $event])"/>
      <CharacterInfoSelect 
        :item="bio.clan"
        @char-item-change="$emit('bioChange', [bio.clan, $event])"/>
      <CharacterInfoInput 
        :item="bio.sire" 
        @char-item-change="$emit('bioChange', [bio.sire, $event])"/>
      <CharacterInfoSelect 
        :item="bio.faction"
        @char-item-change="$emit('bioChange', [bio.faction, $event])"/>
      <CharacterInfoSelect 
        :item="bio.predator"
        @char-item-change="$emit('bioChange', [bio.predator, $event]); chosenDisciplineCheck($event)"/>

      <div class="char-info-item">
        <label>Predator Discipline:</label>
        <select
          @change="bio.predator.chosenDiscipline = $event.target.value"
          :value="bio.predator.chosenDiscipline"
        >
          <option disabled value>Choose discipline</option>
          <option v-for="option in predatorTypeDisciplines" :key="option">
            {{ option }}
          </option>
        </select>
      </div>

    </div>
    <div class="clear"></div>
  </div>
</template>

<style scoped>
.char-info-group {
  width: 32%;
  float: left
}

.middle {
  text-align: center;
}

.clear {
  clear: both;
}
.char-info-item label {
  font-size: small;
  font-variant: small-caps;
  display: block;
}

</style>
