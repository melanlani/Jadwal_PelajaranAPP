import { combineReducers } from 'redux';

import teachers from './teachers';
import subjects from './subjects';
import schedules from './schedules';
// import messages from './messages';

const reducers = combineReducers({
  teachers,
  subjects,
  schedules
  // messages
})

export default reducers;
