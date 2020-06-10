<template>
    <ul class="my-list">
        <li><h2>My List</h2></li>
        <li v-if="listItems.length < 1">Save your favorite movies here</li>
        <li v-for="(item,index) in listItems" :key="index">
          <router-link :to="{ name: 'SearchResults', params: { itemId: item.id } }">{{ item.name }}</router-link> 
          <!--<button v-on:click="removeItem(item)" class="remove">x</button>-->
        </li>
    </ul>
</template>

<script>
export default {
  name: 'MyList',
  data () {
    return {}
  },
  props: {
    listItems: Array
  }
  }
</script>

<style scoped>
.my-list {
  list-style-type: none;
  padding: 10px;
  background: #ccc;
  width: 25%;
  float: right;
}
.remove {
  font-size: 0.8rem;
  color: white;
  background: #AA0000;
  padding: 2px;
  cursor: pointer;
}
</style>