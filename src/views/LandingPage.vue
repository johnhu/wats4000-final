<template>
  <transition name="fade">
    <div class="content">
      <h1>Movie Search & Learn</h1>
      <p>Enter a movie:</p>
      <input
        v-on:keyup.enter="submitQuery"
        type="text"
        v-model="query"
        placeholder="Inception"
        id="text-box"
      />
      <button v-on:click="submitQuery" type="submit" id="send-button">Go</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      query: "",
      messages: []
    };
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
    }
  }
};
</script>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 670px) {
  #send-button {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 15px;
    float: center;
  }
}
</style>


