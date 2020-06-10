<template>
<div>
    <my-list :myList="items"></my-list>

          <form v-on:submit.prevent="submitSearch(true)">
            <p>
          <input type="text" v-model="query" placeholder="enter a movie" />
          <button type="submit">Go</button>
            </p>
          </form>
         <!-- <load-spinner v-if="showLoading"></load-spinner> -->
          <ul class="results" v-if="results && results.list.length > 0"></ul>
          </div>
</template>

<script>
import api from "../common/api.js";

  export default {
    data () {
      return {
        searchKey:'',
        moviesList: [],
        results: [],
        
      }
    },
      methods: {
        searchMovies(){
          var url='http://www.omdbapi.com/?s='+this.searchKey+api;
          fetch(url)
          .then(response=>response.json())
          .then(data=>{
            console.log(data)
          });
        }
      }
    }
</script>

<style scoped>
  .album-box {
    position: relative;
    display: inline-block;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .album-box:hover {
    -webkit-transform: scale(1.12, 1.12);
    transform: scale(1.12, 1.12);
  }

  .album-card {
    width: 160px;
  }

  .album-card:hover {
    cursor: pointer;
  }

  .album-card:hover .play-btn {
    display: block;
  }

  .album-cover,
  .album-cover img {
    border-radius: 2px !important;
  }

  .album-cover:active {
    animation: pop 0.3s linear 1;
  }

  @keyframes pop{
    50%  { transform: scale(1.02); }
  }

  .album-info div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .v-card {
    background: #1C1F37;
    height: 100%;
  }

  .v-card__title,
  .v-card__text {
    background: #262B48;
  }

  .play-btn {
    padding-top: 110px;
    padding-right: 100px;
    position: absolute;
    right: 0;
    top: 0;
    display: none;
    z-index: 9;
  }

  .v-input--radio-group .v-radio {
       margin-bottom: 8px;
  }
</style>
