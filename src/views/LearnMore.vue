<template>
  <body>
    <h1>Movie Search & Learn</h1>
    <router-link to="/">Home</router-link> |
    <router-link
      :to="{ name: 'Search', params: { 
              query: $route.params.query } }"
    >Back</router-link>
    <load-spinner v-if="showLoading"></load-spinner>
    <section v-if="movieData!=null" class="container">
      <div class="movie-info">
        <h2>{{ movieData.Title }} ({{ movieData.Year }})</h2>
        <h3 v-if="movieData.Plot!='N/A'">{{ movieData.Plot }}</h3>
        <h3 v-else>
          <i>Plot not available.</i>
        </h3>
        <h3><b>Cast:</b> {{ movieData.Actors }}</h3>
        <h3><b>Director:</b> {{ movieData.Director }}</h3>
        <h3><b>Rated:</b> {{ movieData.Rated }}</h3>
        <h3><b>Country:</b> {{ movieData.Country }}</h3>
        <h3><b>Runtime:</b> {{ movieData.Runtime }}</h3>
        <!--Shows scores only if available in the array-->
        <h3 v-if="movieData.Ratings[1]"><b>{{ movieData.Ratings[1].Value }}</b> on Rotten Tomatoes</h3>
        <h3 v-if="movieData.Ratings[0]"><b>{{ movieData.Ratings[0].Value }}</b> on <a :href="'https://www.imdb.com/title/'+movieData.imdbID" id="imdb">IMDb</a></h3>
      </div>
      <div class="movie-poster">
        <img :src="movieData.Poster" />
      </div>
    </section>
  </body>
</template>

<script>
import axios from "axios";
import ReelSpinner from "@/components/ReelSpinner";

export default {
  name: "LearnMore",
  components: {
    "load-spinner": ReelSpinner
  },
  data() {
    return {
      movieData: Object,
      showLoading: false
    };
  },
  /*created hook runs methods upon page load */
  created() {
    this.movieData = null;
    this.showLoading = true;
    axios
      .get("http://www.omdbapi.com/?apikey=b72bc356", {
        /*imdbID of movie is sent in API call to obtain data*/
        params: {
          i: this.$route.params.movieId
        }
      })
      .then(response => {
        this.movieData = response.data;
        this.showLoading = false;
      })
      .catch(response => {
        this.messages.push({
          type: "error",
          text: response.data
        });
      });
  }
};
</script>

<style scoped>
  body{
    background: url('../assets/img/reel-graphic.svg')#2b2d2f;
    background-repeat: no-repeat;
    background-position-y: 30px;
  }

  .container {
    margin: auto;
    padding: 10px;
    display: flex;
  }

  .movie-info {
    width: 50%;
    text-shadow: 2px 2px black;
  }

  .movie-poster {
    text-align: center;
    width: 50%;
  }

  img {
    box-shadow: 2px 2px 7px black;
  }

  .errors li {
    color: red;
    border: solid red 1px;
    padding: 5px;
  }

  h3 {
    font-weight: normal;
  }

  a {
    color: yellow;
  }
  a:hover {
    color: rgb(206, 206, 29);
  }
  #imdb {
    color: white;
  }
  #imdb:hover {
    color: rgb(196, 196, 196);
  }

/*media queries to set breakpoints for responsiveness*/
@media only screen and (max-width: 900px) {
  img {
    width: 90%;
  }
}
@media only screen and (max-width: 768px) {
  body{
    background-position: center;
  }
  .container {
    margin: auto;
    display: grid;
  }
  .movie-info {
    width: 100%;
  }
  .movie-poster {
    width: 100%;
  }
}
@media only screen and (max-width: 365px) {
  .movie-info {
    width: 95%;
  }

  img {
    width: 95%;
  }
}
</style>