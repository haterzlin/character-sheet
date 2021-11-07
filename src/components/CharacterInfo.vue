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
  props: ["bio", "generations"],
  emits: ["bioChange"]
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
      ></CharacterInfoPortrait>
      <CharacterInfoInput 
        :item="bio.name"
        @char-item-change="$emit('bioChange', [bio.name, $event])"></CharacterInfoInput>
    </div>
    <div class="char-info-group">
      <CharacterInfoSelect 
        :item="bio.generation"
        @char-item-change="$emit('bioChange', [bio.generation, $event])"></CharacterInfoSelect>         
      <CharacterInfoSelect 
        :item="bio.clan"
        @char-item-change="$emit('bioChange', [bio.clan, $event])"></CharacterInfoSelect>
      <CharacterInfoInput 
        :item="bio.sire" 
        @char-item-change="$emit('bioChange', [bio.sire, $event])"></CharacterInfoInput>     
      <CharacterInfoSelect 
        :item="bio.faction"
        @char-item-change="$emit('bioChange', [bio.faction, $event])"></CharacterInfoSelect>
      <CharacterInfoSelect 
        :item="bio.predator"
        @char-item-change="$emit('bioChange', [bio.predator, $event])"></CharacterInfoSelect>

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

</style>
