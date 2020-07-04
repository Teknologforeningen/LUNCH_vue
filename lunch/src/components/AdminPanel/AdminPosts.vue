<template>
  <div class="admin-post-container">
    <b-list-group v-bind:key="item.id" v-for="item in newsArr">
      <b-list-group-item>
        {{item.title}}
        <b-icon-trash class="float-right" icon="trash" @click="deletePost(item._id)"></b-icon-trash>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import RequestService from "../../RequestService";
import { BIconTrash } from "bootstrap-vue";

export default {
  name: "AdminPanel",
  components: {
    BIconTrash
  },
  data() {
    return {
      newsArr: []
    };
  },
  async created() {
    try {
      this.newsArr = await RequestService.getRequest("posts");
      console.log(this.newsArr);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    deletePost(id) {
      RequestService.deleteRequest("posts", id)
        .then(() => {
          this.newsArr = this.newsArr.filter(item => item._id !== id);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
.admin-post-container {
  text-align: left;
}
</style>