<template>
  <div class="container">
    <div class="page-header" v-if="empty">
      <h5 class="text-center">No posts loaded</h5>
    </div>
    <Post v-for="post in posts"
          v-else
          :post="post"
          :key="post.title" />
  </div>
</template>

<style scoped>
  .container {
    padding: 100px;
    top: -80px;
  }
</style>


<script>
  import Post from './Post.vue';

  export default {
    data () {
      return {
        posts: [
          {
            title: "Test Post",
            description: "My first test post",
            createdAt: "2017-04-05 12:30",
          },
          {
            title: "Test Post 2",
            description: "My second test post",
            createdAt: "2017-04-06 12:30",
          },
        ]
      };
    },

    components: {
      Post,
    },

    computed: {
      empty() {
        return this.posts.length === 0;
      },
    },
  };
</script>
