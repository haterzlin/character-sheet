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
  emits: ["bioChange", "bioChangeList"],
  methods: {
    /**
     * @param {String} newPredator is value of new predator type
     * we generate list of allowed disciplines based on it
     * we will check if current selected predator discipline is allowed and if not, we'll reset it
     * also we need to update list of allowed disciplines 
     */
    checkPredatorDiscipline(newPredator) {
      var allowedDisciplines = this.predatorDefinitions.filter(
        (predator) => predator.id == newPredator
      )[0].disciplines
      if (!allowedDisciplines.includes(this.bio.predatorDiscipline.value)) {
        this.$emit('bioChange', [this.bio.predatorDiscipline, null])
      }
      this.$emit('bioChangeList', [this.bio.predatorDiscipline, allowedDisciplines])
    }
  }
};
</script>

<template>
  <div class="threeColumns" id="char-info">
    <div class="statList">
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
    <div class="statList middle">
      <CharacterInfoPortrait
        :item="bio.image"
        @char-item-change="$emit('bioChange', [bio.image, $event])"
      />
      <CharacterInfoInput 
        :item="bio.name"
        @char-item-change="$emit('bioChange', [bio.name, $event])"/>
    </div>
    <div class="statList">
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
        @char-item-change="$emit('bioChange', [bio.predator, $event]); checkPredatorDiscipline($event)"/>
      <CharacterInfoSelect 
        :item="bio.predatorDiscipline"
        @char-item-change="$emit('bioChange', [bio.predatorDiscipline, $event]);"/>
    </div>
    <div class="clearFloat"></div>
  </div>
</template>

<style scoped>
.middle {
  text-align: center;
}
</style>
