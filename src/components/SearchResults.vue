<template>
  <div class="results">
    <h1>Found {{results}} results
    </h1>
    <ul>
      <li v-for="result in results" :key="result" class="movie-item">
        <h2 class="title">
          <a :href="'http://www.omdbapi.com?i=' + result.id">{{result.title}}</a>
        </h2>
        <p class="release-date">Original Release: {{result.release_date}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../common/api.js";
export default {
  data() {
    return api;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  margin: 0 0 1rem 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.search-meta {
  text-align: right;
}
.movie-item {
  margin: 10px 0;
  padding: 2rem;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}
.movie-item img {
  float: left;
  margin-right: 1rem;
}
.release-date {
  font-weight: 600;
  font-size: 12px;
  color: #333;
}

a {
  color: #42b983;
}
</style>