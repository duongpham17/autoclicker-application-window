import { combineReducers } from '@reduxjs/toolkit';

import authentications from './authentications';
import scripts from './scripts';
import orders from './orders';

const reducers = combineReducers({
    authentications,
    scripts,
    orders
});

export default reducers;