<template>
  <div>
    <short-cuts :shortcuts="listItems"></short-cuts>
    <message-container v-bind:messages="messages"></message-container>
    <form v-on:submit.prevent="getMovies" id="form">
      <p>Enter a movie:</p>
      <input type="text" v-model="query" placeholder="Inception" id="text-box" />
      <button type="submit" id="send-button">Go</button>
    </form>
    <load-spinner v-if="showLoading"></load-spinner>
    <!--Iterates through results and displays movie search data in a list -->
    <ul class="cities" v-if="results && results.Search.length > 0">
      <li v-for="(movie,index) in results.Search" :key="index">
        <h2>{{movie.Title}}</h2>
        <h3 class="year">{{movie.Year}}</h3>
        <img :src="movie.Poster" class="poster" />
        <br />
        <p>
          <router-link
            v-bind:to="{ name: 'LearnMore', params: { 
              movieId: movie.imdbID} }"
          >Learn More</router-link>
        </p>
        <p>
          <button class="save" v-on:click="saveMovie(movie)">Add to Shortcuts</button>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import ReelSpinner from "@/components/ReelSpinner";
import MessageContainer from "@/components/MessageContainer";
import Shortcuts from "@/components/Shortcuts";

export default {
  name: "Search",
  components: {
    "load-spinner": ReelSpinner,
    "message-container": MessageContainer,
    "short-cuts": Shortcuts
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
    /*movie is passed into listItems array*/

    saveMovie: function(movie) {
      this.listItems.push(movie);
    },
    getMovies: function() {
      this.results = null;
      this.showLoading = true;

      axios
        .get("http://www.omdbapi.com/?apikey=b72bc356", {
          /*Sends query as a search item, using "type" to filter results */

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
  margin: 2px;
}
.save {
  background-color: darkslategray;
  color: white;
  padding: 10px;
}

#form {
  margin-bottom: 5px;
  margin-top: 30px;
}

#text-box,
#send-button {
  padding: 10px;
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
  color: yellow;
}

.poster {
  width: 60%;
}

.year {
  font-size: 70%;
  margin-left: 2px;
  color: lightgray;
}
</style>


