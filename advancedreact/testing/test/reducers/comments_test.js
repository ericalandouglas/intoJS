
import { expect } from '../test_helper.js';
import commentReducer from '../../src/reducers/comments.js';
import { SAVE_COMMENT } from '../../src/actions/types.js';

describe('Reducers', () => {

  describe('commentsReducer', () => {

    it('handles action with unknown type', () => {
      expect(commentReducer(undefined, {})).to.eql([]); // eql does a deep comparison (checks all elements), equal checks absolute value (for strings and numbers)
    });

    it('handles action of type SAVE_COMMENT', () => {
      const action = { type: SAVE_COMMENT, payload: 'new comment' };
      expect(commentReducer([], action)).to.eql(['new comment']);
    });

  });

});

