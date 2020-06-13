<template>
  <div>
    <h2>Loading...</h2>
    <div class="container">
      <div class="reel">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReelSpinner"
};
</script>

<style scoped>
html {
  height: 100%;
}
body {
  background: linear-gradient(#fff, #bbb);
}
.container {
  text-align: center;
}
.reel {
  display: inline-block;
  width: 100px;
  height: 100px;
  line-height: 100%;
  vertical-align: middle;
  background: url(https://pixabay.com/static/uploads/photo/2013/07/12/14/09/film-reel-147850_960_720.png);
  background-size: 100px 100px;
  background-repeat: no-repeat;
  border-radius: 50%;
  text-align: center;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-name: spin;
}

div i {
  content: "";
  display: inline-block;
  border-radius: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* Spinner animation and markup borrowed from @aburd - https://codepen.io/aburd/ */
</style>