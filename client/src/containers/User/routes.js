import React from 'react';
import { Route, IndexRoute } from 'react-router';
import User from './User';
import UserList from './components/UserList';
import { redirectNotPermited } from '../../middleware/auth';

const routes = (
	<Route path="/users" component={ User } onEnter={ redirectNotPermited }>
		<IndexRoute component={ UserList } />
	</Route>
);

export default routes;
