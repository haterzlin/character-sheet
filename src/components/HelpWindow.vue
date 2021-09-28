<script>
/**
 * Displays details about the element that the mouse is over
 * mostly works with stats so far
 */
export default {
  props: ["helpData"],
  data() {
    return {
      data: {
        section: {
          id: "Start",
          description: "Click on item to display help."
        }
      }
    };
  },
  watch: {
    helpData: {
      handler(newVal) {
        if (newVal) this.data = newVal;
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="hover">
    <h3>Help</h3>
    <div v-if="data.section && ! data.category">
      <h4>{{ data.section.id}}</h4>
      <p v-html="data.section.description"></p>
    </div>
    <div v-if="data.section && data.category && ! data.stat">
      <h4>{{ data.category.id}} {{ data.section.id}}</h4>
      <p v-html="data.category.description"></p>
    </div>
    <div v-if="data.stat">
      <h4>{{ data.stat.id}} ({{ data.category.id}} {{ data.section.id}})</h4>
      <p v-html="data.stat.description.general"></p>
      <p v-for="(item, index) in data.stat.description">
        <span v-if="index != 'general'"> 
          <span v-for="i in Number(index)" class="point fill"></span>
          {{ item }} 
        </span>
      </p>
    </div>
    <div v-if="data.stat && data.stat.abilities">
      <h4>Abilities</h4>
      <p class="ability" v-for="(item, index) in data.stat.abilities" :key="item">
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
