import React from 'react';
import { Route, IndexRoute } from 'react-router';
import User from './User';
import UsersList from './components/UsersList';
import { redirectNotPermited } from '../../middleware/auth';

const routes = (
	<Route path="/users" component={ User } onEnter={ redirectNotPermited }>
		<IndexRoute component={ UsersList } />
	</Route>
);

export default routes;
