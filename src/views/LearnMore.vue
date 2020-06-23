<template>
  <div>
    <h1>Movie Search & Learn</h1>
    <router-link to="/">Home</router-link> |
    <router-link
      :to="{ name: 'Search', params: { 
              query: $route.params.query } }"
    >Back</router-link>
    <section v-if="movieData!=null" class="container">
      <load-spinner v-if="showLoading"></load-spinner>
      <div class="movie-info">
        <h2>{{ movieData.Title }}</h2>
        <h3>{{ movieData.Year }}</h3>
        <h3 v-if="movieData.Plot!='N/A'">{{ movieData.Plot }}</h3>
        <h3 v-else>
          <i>Plot not available</i>
        </h3>
        <h3>Cast: {{ movieData.Actors }}</h3>
        <h3>Director: {{ movieData.Director }}</h3>
        <h3>Rated: {{ movieData.Rated }}</h3>
        <h3>Country: {{ movieData.Country }}</h3>
        <h3>Runtime: {{ movieData.Runtime }}</h3>
        <!--Shows scores only if available in the array-->
        <h3 v-if="movieData.Ratings[1]">{{ movieData.Ratings[1].Value }} on Rotten Tomatoes</h3>
        <h3 v-if="movieData.Ratings[0]">{{ movieData.Ratings[0].Value }} on IMDb</h3>
      </div>
      <div class="movie-poster">
        <img :src="movieData.Poster" />
      </div>
    </section>
  </div>
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
      showLoading: true
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
      .catch(error => {
        this.messages.push({
          type: "error",
          text: error.message
        });
      });
    this.showLoading = false;
  }
};
</script>

<style scoped>
@media only screen and (min-width: 900px) {
  .container {
    margin: auto;
    padding: 10px;
    display: flex;
  }

  .movie-info {
    width: 50%;
    background: darkslategray;
    padding: 10px;
  }

  .movie-poster {
    margin-left: 10%;
  }

  .errors li {
    color: red;
    border: solid red 1px;
    padding: 5px;
  }
  h1,
  h2 {
    font-weight: bold;
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
  }
  a {
    color: yellow;
  }
}
/*media queries to set breakpoints for responsiveness*/
@media only screen and (max-width: 900px) {
  .container {
    margin: auto;
    display: grid;
  }
  .movie-info {
    margin-bottom: 20px;
  }
  .movie-poster {
    margin-left: 0;
  }
  a {
    color: yellow;
  }
}
@media only screen and (max-width: 365px) {
  .movie-info {
    margin-bottom: 20px;
    width: 95%;
  }
  .movie-poster {
    margin-left: 0;
  }

  img {
    width: 95%;
  }
}
</style>