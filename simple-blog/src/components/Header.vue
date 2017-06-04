<template>

<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <router-link to="/" class="nav-item">
        <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
      </router-link>
      <router-link to="/posts"
                   activeClass="is-active"
                   class="nav-item is-tab is-hidden-mobile">
        Posts
      </router-link>
      <router-link to="/post"
                   activeClass="is-active"
                   class="nav-item is-tab is-hidden-mobile">
        Post
      </router-link>
    </div>
    <div class="nav-right nav-menu">
      <a class="nav-item is-tab">Log out</a>
    </div>
  </div>
</nav>

</template>

<script>

  export default {
    data() {
      return {
      };
    },

    computed: {
    },

    methods: {
    },
  };

</script>
