<template>
  <div>
    <h1>Movie Search & Learn</h1>
    <message-container v-bind:messages="messages"></message-container>
    <short-cuts :shortcuts="listItems" class="shortcuts"></short-cuts>
    <form v-on:submit.prevent="getMovies" id="form">
      <p>Enter a movie:</p>
      <input type="text" v-model="$route.params.query" placeholder="Inception" id="text-box" />
      <button type="submit" id="send-button">Go</button>
    </form>
    <load-spinner v-if="showLoading"></load-spinner>
    <!--Iterates through results and displays movie search data in a list -->
    <ul class="cities" v-if="results && results.Search.length > 0">
      <li v-for="(movie,index) in results.Search" :key="index">
        <h2 class="title">{{movie.Title}}</h2>
        <h3 class="year">{{movie.Year}}</h3>
        <img :src="movie.Poster" class="poster" />
        <br />
        <p>
          <router-link
            v-bind:to="{ name: 'LearnMore', params: { 
              movieId: movie.imdbID, query: $route.params.query } }"
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
  created() {
    this.getMovies();
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
            s: this.$route.params.query,
            type: "movie"
          }
        })
        .then(response => {
          this.results = response;
          /*conditional used for error handling, where a false response
        will cause error data to be pushed to messages array */
          if (this.results.data.Response == "False") {
            this.messages.push(response.data);
          } else {
            this.results = response.data;
          }
        });
      this.showLoading = false;
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
  font-weight: bold;
  margin: 21px;
  margin-left: 0;
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

.shortcuts {
  margin: 0px;
}

p {
  margin-bottom: 5px;
}

#text-box {
  display: inline-flex;
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid white;
  padding: 3px;
  width: 275px;
  height: 32px;
}

#text-box:focus {
  background-color: #3b3f42;
}

#send-button {
  padding: 10px;
  background-color: transparent;
  margin-left: 7px;
  border: 1.5px solid;
  border-color: white;
  color: white;
}

::placeholder {
  color: rgb(156, 156, 156);
  font-size: 1.2em;
}

input {
  color: lightgrey;
}

#send-button:hover {
  background-color: #3b3f42;
}

.title {
  margin: 2px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 300px;
  min-height: 300px;
  border: solid 1.5px #757575;
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
  font-size: 75%;
  margin-left: 2px;
  color: lightgray;
}
@media only screen and (max-width: 375px) {
  #form,
  .shortcuts {
    display: inline-grid;
    float: left;
  }
}
</style>


