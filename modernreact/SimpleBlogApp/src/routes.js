
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app.js';
import PostsIndex from './components/postsIndex.js';
import PostsNew from './components/postsNew.js';
import PostShow from './components/postShow.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={PostsIndex} />
    <Route path="/posts/new" component={PostsNew} />
    <Route path="/posts/:id" component={PostShow} />
  </Route>
);

