<template>
  <body>
    <h1>Movie Search & Learn</h1>
    <message-container v-bind:messages="messages"></message-container>
    <short-cuts :shortcuts="listItems" class="shortcuts"></short-cuts>
    <div id="form">
      <input
        v-on:keyup.enter="getMovies"
        v-model="$route.params.query"
        placeholder="Enter a movie, ie Inception"
        id="text-box"
      />
      <button v-on:click="getMovies" id="send-button">Search</button>
    </div>
    <!--Iterates through results and displays movie search data in a list -->
    <div id="search-results">
      <load-spinner v-if="showLoading"></load-spinner>
      <ul class="movies" v-if="results && results.Search.length > 0">
        <li class="search-result" v-for="(movie,index) in results.Search" :key="index">
          <h2 class="title">{{movie.Title}}</h2>
          <h3 class="year">{{movie.Year}}</h3>
          <img :src="movie.Poster" class="poster" />
          <br />
          <p>
            <router-link
              v-bind:to="{ name: 'LearnMore', params: { 
              movieId: movie.imdbID, query: $route.params.query } }"
              class="learn-more"
            >Learn More</router-link>
          </p>
          <p>
            <button class="save" v-on:click="saveMovie(movie)">Add to Shortcuts</button>
          </p>
        </li>
      </ul>
    </div>
  </body>
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
    if (this.$ls.get("shortcuts")) {
      this.listItems = this.$ls.get("shortcuts");
    }
  },
  methods: {
    /*movie is passed into listItems array*/
    saveMovie: function(movie) {
      this.listItems.push(movie);
      this.$ls.set("shortcuts", this.listItems);
    },
    getMovies: function() {
      this.results = null;
      this.showLoading = true;
      let cacheLabel = "movieSearch_" + this.$route.params.query;
      let cacheExpiry = 15 * 60 * 1000; // 15 minutes
      if (this.$ls.get(cacheLabel)) {
        console.log("Cached query detected.");
        this.results = this.$ls.get(cacheLabel);
        this.showLoading = false;
      } else {
        console.log("No cache available. Making API request.");

        axios
          .get("http://www.omdbapi.com/?apikey=b72bc356", {
            /*Sends query as a search item, using "type" to filter results */
            params: {
              s: this.$route.params.query,
              type: "movie"
            }
          })
          .then(response => {
            this.$ls.set(cacheLabel, response.data, cacheExpiry);
            console.log("New query has been cached as: " + cacheLabel);
            this.results = response.data;
            this.showLoading = false;
            /*A "False" response will push data to error messages array */
            if (this.results.Response == "False") {
              this.messages.push(response.data);
            }
            this.showLoading = false;
          });
      }
    }
  }
}
</script>

<style scoped>
body {
  background: url('../assets/img/reel-graphic.svg')#2b2d2f;
  background-repeat: no-repeat;
  background-position-y: 30px;
}

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
  background-color: transparent;
  border: 1.5px solid white;
  color: white;
  padding: 10px;
}

.save:hover {
  background-color: rgb(59, 63, 66, 0.5);
}

.learn-more:hover {
  color: rgb(206, 206, 29);
}

#form {
  margin-bottom: 5px;
  margin-top: 30px;
}

.shortcuts {
  margin: 0px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
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

#text-box:hover {
  background-color: rgb(59, 63, 66, 0.5);
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
  color: rgb(211, 211, 211);
  font-size: 1.2em;
}

input {
  color: rgb(255, 255, 255);
}

#send-button:hover {
  background-color: rgb(59, 63, 66, 0.5);
}

.title {
  margin: 2px;
}

#search-results {
  width: 75%;
}

.movies {
  list-style-type: none;
  padding: 0;
}
.search-result {
  display: inline-block;
  text-align: center;
  vertical-align: top;
  width: 235px;
  min-height: 300px;
  border: none;
  padding: 5px;
  margin: 5px;
  box-shadow: 0px 0px 3px rgb(131, 131, 131);
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

@media only screen and (max-width: 580px) {
  .shortcuts {
    width: 50%;
    position: unset;
  }
  #search-results {
    width: 100%;
  }
  .movies {
    text-align: center;
  }
}

@media only screen and (max-width: 426px) {
  .shortcuts {
    display: flexbox;
    width: 90%;
    position: unset;
  }

  #text-box {
    margin-left: 10px;
    width: 90%;
  }
  #send-button {
    width: 92%;
    margin-top: 7px;
    margin-left: 10px;
  }
  .search-result {
    width: 92%;
  }
}
</style>


