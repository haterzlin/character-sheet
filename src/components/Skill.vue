<script setup>
import Dots from "./Dots.vue";
import VueTagsInput from '@sipec/vue3-tags-input';
</script>

<script>
/**
 * displays attribute or skill name and uses Dots.vue to display clickable dots enabling to change value
 * after change new value is emitted to parent component to decide if it is alright
 * also we emit statClick to send message to help which attribute was chosen
 */
export default {
  name: "stat",
  components: [Dots],
  props: ["stat", "scale"],
  emits: ["statChange", "statClick"],
  data() {
    return {
      initialValue: this.stat.value,
      hoverPointer: null,
      tag: '',
      tags: [],
      smallSpecialty: true, 
    };
  },  
  computed: {
    specialtyList() {
      var inputArray = this.stat.description.specialties.split(",")
      var arr = [];
      var len = inputArray.length;
      for (var i = 0; i < len; i++) {
        arr.push({
          text: inputArray[i],
        });
      }
      return arr
    },
    disabled() { 
      if (this.stat.value == 0) { return true }
      return false
    },
    maxSpecialtyCount() {
      if (this.stat.value == 0) {
        return -1
      }
      return parseInt(this.stat.value)
    }
  },
  methods: {
    resizeSpecialties() {
      this.smallSpecialty ? this.smallSpecialty = false : this.smallSpecialty = true
    }
  }
};
</script>

<template>
  <table class="skill">
    <tr>
      <td v-show="smallSpecialty">
        <label>{{ stat.id }}</label>
      </td>
      <td class="maxSize">
        <vue-tags-input
          :disabled="disabled"
          v-model="tag"
          :tags="tags"          
          placeholder=""
          :max-tags="maxSpecialtyCount"
          autocomplete-always-open=true
          :autocomplete-items="specialtyList"
          @focusin="resizeSpecialties"
          @focusout="resizeSpecialties"
          @tags-changed="newTags => tags = newTags"
          :class="{
            smallSpecialty: smallSpecialty
          }"
        />
      </td>
      <td>
        <Dots
          v-show="smallSpecialty"
          :value="stat.value"
          :initialValue="initialValue"
          :scale="scale"
          @valueChange="$emit('statChange', [stat, $event, stat.value >= $event && $event > initialValue])"
        />
      </td>
    </tr>
  </table>
</template>

<style>
table {
  width: 265px;
}

td {
  white-space: nowrap;
}
.maxSize {
  width: 100%;
  max-width: 0;
}

.skill .ti-new-tag-input-wrapper {
  padding: 0px 0px;
  margin: 0px;
}

.skill .ti-new-tag-input-wrapper input {
  padding: 0px 0px;
  margin: 0px 0px;
  min-width: 0px;
}

.skill .ti-input {
  border: 0px;
  border-bottom: 1px solid #ccc;
  padding: 0px;
}


.skill .ti-tag {
  background-color: white ; 
  color: black;
  padding: 1px; 
  margin: 1px;
}

.skill .ti-tags {
    flex-wrap: wrap-reverse;
}

.smallSpecialty {
  overflow: hidden;
}

.stat:hover > .statName {
  color:#cc0000
}
</style>
