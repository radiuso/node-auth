import React from 'react';
import { Route, IndexRoute } from 'react-router';
import SearchPage from './components/SearchPage';

const routes = (
	<Route path="/search/:value">
		<IndexRoute component={SearchPage} />
	</Route>
);

export default routes;
