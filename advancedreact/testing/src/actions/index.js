
import { SAVE_COMMENT } from './types.js';

export const saveComment = (comment) => {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
};

