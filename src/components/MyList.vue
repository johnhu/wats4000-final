<template>
    <ul class="my-list">
        <li><h2>My List</h2></li>
        <li v-if="myList.length < 1">Nothing to show</li>
        <li v-for="(movie,index) in myList" :key="index">
          <router-link v-bind:to="{ name: 'LearnMore', params: { movieId: movie.id } }">{{ movie.Title }}</router-link> 
          <button v-on:click="removeMovie(movie)" class="remove">x</button>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'MyList',
  data () {
    return {}
  },
  props: {
    myList: Array
  },
  methods: {
    removeMovie: function (movie) {
      this.myList.splice(this.myList.indexOf(movie), 1);
    }
  }
}
</script>

<style scoped>
.my-list {
  list-style-type: none;
  padding: 10px;
  background: gold;
  width: 25%;
  float: right;
}
.remove {
  font-size: 0.8rem;
  color: black;
  background: white;
  padding: 2px;
  cursor: pointer;
}
</style>