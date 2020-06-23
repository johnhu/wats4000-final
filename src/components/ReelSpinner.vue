<template>
  <div>
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
.container {
  text-align: center;
}
.reel {
  display: inline-block;
  margin-top: 50px;
  width: 100px;
  height: 100px;
  vertical-align: middle;
  background: url('../assets/img/loading-reel.png');
  background-size: 100px 100px;
  background-repeat: no-repeat;
  border-radius: 50%;
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
/* Spinner animation and markup borrowed from @aburd and modified - https://codepen.io/aburd/ */
</style>