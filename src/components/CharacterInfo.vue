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
  props: ["bio", "generations"],
  emits: ["bioChange"],
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
        @char-item-change="$emit('bioChange', [bio.predator, $event])"/>

    </div>
    <div class="clearFloat"></div>
  </div>
</template>

<style scoped>
.middle {
  text-align: center;
}
</style>
