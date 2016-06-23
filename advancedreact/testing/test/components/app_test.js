
import { renderComponent, expect } from '../test_helper.js';
import App from '../../src/components/app.js';

// use 'describe' to group together similar tests
describe('App', () => {

  let component; // declare vars we expect to reset over time

  beforeEach(() => {
    // create a fresh instance of App
    component = renderComponent(App);
  });

  // use 'it' to test a single attribute of a target
  it('shows a comment box', () => {
    // use 'expect' to make an assertion about a target (thing we're testing i.e. App, CommentBox, etc)
    expect(component.find('.comment-box')).to.exist;
  });

  it('shows a comment list', () => {
    expect(component.find('.comment-list')).to.exist;
  });

});

