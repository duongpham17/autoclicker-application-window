import { combineReducers } from '@reduxjs/toolkit';

import authentications from './authentications';
import users from './users';
import scripts from './scripts';
import orders from './orders';

const reducers = combineReducers({
    authentications,
    scripts,
    orders,
    users,
});

export default reducers;