<template>
  <transition name="slide">
    <div>
      <div class="about">
        <p v-on:click="toggleAbout" class="about-toggle">About</p>
        <about id="about"></about>
      </div>
    <div class="content">
      <h1>Movie Search & Learn</h1>
      <input v-on:keyup.enter="submitQuery" v-model="query" placeholder="Enter a movie, ie Inception" id="text-box" />
      <button v-on:click="submitQuery" id="send-button">Search</button>
    </div>
    </div>
  </transition>
</template>

<script>
import About from "@/components/About";

export default {
  name: "Search",
  data() {
    return {
      showAbout: false,
      query: "",
      messages: []
    };
  },
  components: {
    about: About
  },
  methods: {
    /*function changes route while passing search query*/
    submitQuery: function() {
      this.$router.push({
        name: "Search",
        params: {
          query: this.query
        }
      });
    },
    toggleAbout: function() {
      var about = document.getElementById("about");
      if (about.style.display === "none") {
        about.style.display = "block";
      } else {
        about.style.display = "none";
      }
    }
  }
};
</script>

<style scoped>
.about {
  position: absolute;
  left: 12px;
  top: 0;
}
.content {
  text-align: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
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
p {
  text-align: left;
  margin-bottom: 7px;
}

#about {
  font-size: 0.9rem;
  color: rgb(255, 255, 255);
  margin-top: 0;
  margin-right: 5px;
  display: none;
}

.about-toggle {
  font-size: 0.9rem;
  color: white;
  background-color: transparent;
  width: 50px;
  height: 20px;
}

.about-toggle:hover {
  color: #cecece;
  cursor: pointer;
}

#text-box {
  display: inline-flex;
  background-color: transparent;
  border: none;
  border-bottom: 1.5px solid white;
  padding: 3px;
  width: 270px;
  height: 32px;
}

#text-box:hover {
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

.slide-enter-active {
   -moz-transition-duration: 0.7s;
   -webkit-transition-duration: 0.7s;
   -o-transition-duration: 0.7s;
   transition-duration: 0.7s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.7s;
   -webkit-transition-duration: 0.7s;
   -o-transition-duration: 0.7s;
   transition-duration: 0.7s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 500px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

@media only screen and (max-width: 670px) {
  #send-button {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
    float: center;
  }
  
  #about {
    position: relative;
    background-color: rgb(43,45,47, 0.6);
    z-index: 6;
  }
}

@media only screen and (min-width: 670px) {
  #about {
  width: 33%;
  }
}

</style>


