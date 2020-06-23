<template>
  <p class="body">
    This application allows the user to search for any movie in the OMDB API database (http://www.omdbapi.com/) and learn basic facts about the movie. Each search result that appears can also be added to a list for the user's convenience.
    <br /> A Vue JS project by John Hu
    <a href="http://www.github.com/johnhu">
      <span class="fa-stack fa-lg">
        <i class="fas fa-circle fa-stack-2x" title="Visit John's Github"></i>
        <i class="fab fa-github fa-stack-1x fa-inverse" title="Visit John's Github"></i>
      </span>
    </a>
  </p>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      showAbout: true
    };
  }
};
</script>

<style scoped>
</style>