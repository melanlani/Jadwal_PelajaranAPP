import { combineReducers } from 'redux';

import teachers from './teachers';
import subjects from './subjects';
// import messages from './messages';

const reducers = combineReducers({
  teachers,
  subjects
  // messages
})

export default reducers;
