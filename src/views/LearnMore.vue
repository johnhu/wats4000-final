<template>
  <div v-on:submit.prevent="getMovies">
    <message-container v-bind:messages="messages"></message-container>
    <p>
      <router-link to="/">Home</router-link>
    </p>
    <load-spinner v-if="showLoading"></load-spinner>
      <dl>
        <dd>{{ movieData.Title }} </dd>
        <dd>{{ movieData.Year }} </dd>
        <dt>Cast</dt>
        <dd>{{ movieData.Actors }} </dd>
        <dt>Director</dt>
        <dd>{{ movieData.Director }} </dd>
        <dd>{{ movieData.Rated }} </dd>
        <dd>{{ movieData.Language }} </dd>
        <dd>{{ movieData.Runtime }} </dd>
        <dd>{{ movieData.Ratings.indexOf(1).Value }} + 'on Rotten Tomatoes'</dd>
    </dl>
  </div>
</template>

<script>
import {API} from '@/common/api';
import ReelSpinner from "@/components/ReelSpinner";
import MessageContainer from '@/components/MessageContainer';
import movieId from '@/views/Search';

export default {
  name: 'LearnMore',
  components: {
    'load-spinner': ReelSpinner,
    'message-container': MessageContainer
  },
  data () {
    return {
      movieData: null,
      messages: [],
      query: '',
      showLoading: false,
    }
  },
  getMovies: function () {
      this.movieData = null,
      this.showLoading = true;

      API.get('http://www.omdbapi.com/?apikey=b72bc356',{
        params: {
            i: movieId
        }
      })
      .then(response => {
      this.movieData = response.data;
      this.showLoading = false;
      })
      .catch(error => {
        this.messages.push({
          type: 'error',
          text: error.message
        });
        this.showLoading = false;
      });
    }
  }

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
}
a {
  color: #42b983;
}
</style>