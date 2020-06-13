<template>
  <div>
    <my-list v-bind:myList="listItems"></my-list>

    <message-container v-bind:messages="messages"></message-container>
    <form v-on:submit.prevent="getMovies">
      <p>Search for a movie:</p>
      <input type="text" v-model="query" placeholder="Inception" />
      <button type="submit">Go</button>
    </form>
    <load-spinner v-if="showLoading"></load-spinner>
    <ul class="cities" v-if="results && results.Search.length > 0">
      <li v-for="(movie,index) in results.Search" :key="index">
        <h2>{{movie.Title}}</h2>
        <img :src="movie.Poster" class="poster" />
        <br />
        <p>
          <router-link
            v-bind:to="{ name: 'LearnMore', params: { movieId: movie.imdbID } }"
          >Learn More</router-link>
        </p>
        <p>
          <button class="save" v-on:click="saveMovie(movie)">Add to My List</button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { API } from "@/common/api";
import ReelSpinner from "@/components/ReelSpinner";
import MessageContainer from "@/components/MessageContainer";
import MyList from "@/components/MyList";

export default {
  name: "Search",
  components: {
    "load-spinner": ReelSpinner,
    "message-container": MessageContainer,
    "my-list": MyList
  },
  data() {
    return {
      results: null,
      query: "",
      showLoading: false,
      messages: [],
      listItems: []
    };
  },
  methods: {
    saveMovie: function(movie) {
      this.listItems.push(movie);
    },
    getMovies: function() {
      this.results = null;
      this.showLoading = true;

      API.get("http://www.omdbapi.com/?apikey=b72bc356", {
        params: {
          s: this.query,
          type: "movie"
        }
      })
        .then(response => {
          this.results = response.data;
          this.showLoading = false;
        })
        .catch(error => {
          this.messages.push({
            type: "error",
            text: error.message
          });
          this.showLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.errors li {
  color: red;
  border: solid red 1px;
  padding: 5px;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 300px;
  min-height: 300px;
  border: solid 1px #e8e8e8;
  padding: 10px;
  margin: 5px;
}

a {
  color: #42b983;
}

.poster {
  width: 60%;
}
</style>


