
import { renderComponent, expect } from '../test_helper.js';
import CommentBox from '../../src/components/commentBox.js';

describe('CommentBox', () => {

  let component; // declare a var we expect to change overtime

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has the class "comment-box"', () => {
    expect(component).to.have.class('comment-box');
  });

  it('has a text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('entering some text', () => { // can nest describes to provide more context in the test report

    let textarea;

    beforeEach (() => {
      textarea = component.find('textarea');
      textarea.simulate('change', 'new comment'); // find specific text area in our component
    });

    it('shows text in the textarea', () => {
      expect(textarea).to.have.value('new comment');
    });

    it('when submitted, clears the input', () => {
      component.simulate('submit'); // our component is a form which fires submit events
      expect(textarea).to.have.value('');
    });

  });

});


