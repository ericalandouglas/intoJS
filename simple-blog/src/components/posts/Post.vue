<template>
<div class="columns is-fullheight">
  <div class="card column">
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="http://bulma.io/images/placeholders/96x96.png" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ post.title }}</p>
          <p class="subtitle is-6">{{ post.description }}</p>
        </div>
      </div>

      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris.
        <a>#css</a> <a>#responsive</a>
        <br>
        <small>{{ post.createdAt }}</small>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  .columns {
    padding: 10px;
  }
</style>

<script>
  export default {
    props: ['post'],

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
