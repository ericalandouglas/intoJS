import Home from '../components/Home.vue';
import Posts from '../components/posts/Posts.vue';
import Post from '../components/posts/Post.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
];

export default routes;
