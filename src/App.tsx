import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<div>
				<Menu />
				<Switch>
					{
						routes.map((route, i) => <Route key={i} exact path={route.path} component={route.component} />)
					}
				</Switch>
			</div>
		);
	}
}

export default App;
