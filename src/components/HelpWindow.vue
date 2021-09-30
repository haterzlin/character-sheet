<script>
/**
 * Displays details about the element that the mouse is over
 * mostly works with stats so far
 */
export default {
  props: ["helpData"],
};
</script>

<template>
  <div class="hover">
    <h3>Help</h3>
    <div v-if="helpData.section && ! helpData.category">
      <h4>{{ helpData.section.id}}</h4>
      <p v-html="helpData.section.description"></p>
    </div>
    <div v-if="helpData.section && helpData.category && ! helpData.stat">
      <h4>{{ helpData.category.id}} {{ helpData.section.id}}</h4>
      <p v-html="helpData.category.description"></p>
    </div>
    <div v-if="helpData.stat">
      <h4>{{ helpData.stat.id }} ({{ helpData.category.id }} {{ helpData.section.id }})</h4>
      <p v-html="helpData.stat.description.general"></p>
      <p v-for="(item, index) in helpData.stat.description">
        <span v-if="index != 'general'"> 
          <span v-for="i in Number(index)" class="point fill"></span>
          {{ item }} 
        </span>
      </p>
      <p v-if="helpData.stat.specialties">{{ helpData.stat.specialties }}</p>
    </div>
    <div v-if="helpData.stat && helpData.stat.abilities">
      <h4>Abilities</h4>
      <p class="ability" v-for="(item, index) in helpData.stat.abilities" :key="item">
        <span v-for="i in Number(index)" class="point fill"></span> &nbsp;        
        <span v-for="(ability, index2) in item"> {{ ability }}<span v-if="Number(index2) < Number(item.length - 1 )">, </span>
        </span>
      </p>
    </div>      
  </div>
</template>

<style scoped>
.ability {
  font-variant: small-caps;
  font-weight: bold;
}
div.hover {
  margin-left: 800px;
  float: right;
  z-index: 9;
  position: fixed;
  width: 600px;
}
</style>
