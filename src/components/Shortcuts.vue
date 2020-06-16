<template>
  <ul class="shortcuts">
    <li>
      <h2 id="shortcut-h">Shortcuts</h2>
    </li>
    <li v-if="shortcuts.length < 1">Pin your favorite movies here</li>
    <li v-for="(movie,index) in shortcuts" :key="index">
      <router-link
        v-bind:to="{ name: 'LearnMore', params: { movieId: movie.imdbID, query: $route.params.query } }"
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
  background: #2f4f4f;
  width: 25%;
  float: right;
}

#shortcut-h {
  margin-top: 3px;
}

.list-item {
  color: lightgray;
}
.remove {
  font-size: 1.1rem;
  color: white;
  background: #2b2d2f;
  border: none;
  margin-left: 10px;
  padding: 2px;
  cursor: pointer;
}

@media only screen and (max-width: 375px) {
  #shortcut-h{
  margin-bottom: 5px;
  }

  .shortcuts {
    width: 232px;
  }
}
</style>