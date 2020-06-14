<template>
  <li v-bind:class="[message.type, 'message']" v-show="showMessage">
    {{ message.text }}
    <button v-on:click="close">close</button>
  </li>
</template>

<script>
export default {
  name: "MessageContainer",
  props: {
    message: Object
  },
  data() {
    return {
      showMessage: true
    };
  },
  methods: {
    close: function() {
      this.showMessage = false;
    }
  },
  created() {
    setTimeout(this.close, 5000);
  }
};
</script>

<style scoped>
.message {
  margin: 5px auto;
  padding: 5px;
  font-size: 1rem;
  width: 60%;
}
.error {
  background: pink;
  color: red;
}
.success {
  background: green;
  color: white;
}
.info {
  background: blue;
  color: white;
}
</style>