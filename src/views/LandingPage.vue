<template>
  <div id="body">
    <div class="about">
      <p v-on:click="toggleAbout" class="about-toggle">About</p>
      <about id="about"></about>
    </div>
      <div class="content">
        <h1>Movie Search & Learn</h1>
        <input
          v-on:keyup.enter="submitQuery"
          v-model="query"
          placeholder="Enter a movie, ie Inception"
          id="text-box"
        />
        <button v-on:click="submitQuery" id="send-button">Search</button>
        <div class=shortcuts>
        <short-cuts :shortcuts="listItems"></short-cuts>
        </div>
      </div>
  </div>
</template>

<script>
import About from "@/components/About";
import Shortcuts from "@/components/Shortcuts";

export default {
  name: "LandingPage",
  data() {
    return {
      query: "",
      messages: [],
      listItems: []
    };
  },
  components: {
    "about": About,
    "short-cuts": Shortcuts
  },
  created(){
    if (this.$ls.get("shortcuts")) {
      this.listItems = this.$ls.get("shortcuts");
    }
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
  background: url('../assets/img/reel-graphic.svg')#2b2d2f;
  background-repeat: no-repeat;
  background-position: 15px;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: -1;
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
  color: rgb(255, 255, 255);
  margin-top: 0;
  margin-right: 5px;
  display: none;
}

.about-toggle {
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

#send-button:hover {
  background-color: rgb(59, 63, 66, 0.5);
}

::placeholder {
  color:#cecece;
  font-size: 1.2em;
}

input {
  color: lightgrey;
}

@media only screen and (max-width: 670px) {
  #send-button {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
  }

  #about {
    background-color: rgb(43, 45, 47, 0.6);
    z-index: 6;
  }
}

@media only screen and (min-width: 670px) {
  #about {
    width: 33%;
  }
}

@media only screen and (max-width: 376px) {
  h1,
  #send-button,
  #text-box {
    margin-left: 30px;
    margin-right: 30px;
  }

  #text-box {
    width: 75%;
  }
}
</style>


