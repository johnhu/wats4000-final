<template>
  <ul class="shortcuts">
    <li>
      <h2>Shortcuts</h2>
    </li>
    <li v-if="shortcuts.length < 1">Pin your favorite movies here</li>
    <li v-for="(movie,index) in shortcuts" :key="index">
      <router-link
        v-bind:to="{ name: 'LearnMore', params: { movieId: movie.imdbID } }"
        class="list-item"
      >{{ movie.Title }}</router-link>
      <button v-on:click="removeMovie(movie)" class="remove">x</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Shortcuts",
  data() {
    return {};
  },
  props: {
    shortcuts: Array
  },
  methods: {
    removeMovie: function(movie) {
      this.shortcuts.splice(this.shortcuts.indexOf(movie), 1);
    }
  }
};
</script>

<style scoped>
.shortcuts {
  list-style-type: none;
  padding: 10px;
  background: darkslategrey;
  width: 25%;
  float: right;
}
.list-item {
  color: lightgray;
}
.remove {
  font-size: 0.8rem;
  color: black;
  background: white;
  padding: 2px;
  cursor: pointer;
}
</style>