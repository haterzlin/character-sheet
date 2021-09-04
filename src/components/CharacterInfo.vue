<!--
  displays inputs for name and age
  displays selects for clan, generation, faction
 -->

<script>
export default {
  props: ["bio", "clans"],
};
</script>

<template>
  <div class="char-info">
    <input
      class="heading1"
      type="text"
      v-model="bio.name"
      :placeholder="bio.defaultName"
    />
    <b>Age:</b>
    <input
      :style="{ width: 7 + 'ch' }"
      v-model="bio.age"
      type="number"
      :placeholder="123"
    />
    <b>Generation:</b>
    <select v-model="bio.generation">
      <option>15th</option>
      <option>14th</option>
      <option>13th</option>
    </select>
    <b>Clan:</b>
    <select v-model="bio.clan">
      <option disabled value="">Pick a Clan</option>
      <option v-for="clan in clans" :key="clan.id" :value="clan">
        {{ clan.id }}
      </option>
    </select>
    <b>Faction:</b>
    <select v-model="bio.faction">
      <option disabled value="">Choose Your Coterie's Faction</option>
      <option value="Anarch">Anarch</option>
      <option value="Autarki">Autarki</option>
      <option value="Camarilla">Camarilla</option>
      <option value="Sabbat">Sabbat</option>
    </select>
  </div>
</template>

<style scoped>
input {
  border: none;
}
input.heading1 {
  display: block;
  font-family: Serif;
  font-size: 2em;
  font-weight: bolder;
  width: 100%;
}
input:hover {
  background-color: #dddddd;
}
select {
  border: none;
}
select:hover {
  background-color: #dddddd;
  cursor: pointer;
}
</style>
