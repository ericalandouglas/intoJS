
import { expect } from '../test_helper.js';
import { SAVE_COMMENT } from '../../src/actions/types.js';
import { saveComment } from '../../src/actions'; // webpack knows to look in index.js in actions dir

describe('actions', () => { // testing all actions in a single file

  describe('saveComment', () => { // our saveComment action creator subset
    let action;

    beforeEach(() => {
      action = saveComment('new comment');
    });

    it('has the correct type', () => {
      expect(action.type).to.equal(SAVE_COMMENT);
    });

    it('has the correct payload', () => {
      expect(action.payload).to.equal('new comment');
    });

  });

});

