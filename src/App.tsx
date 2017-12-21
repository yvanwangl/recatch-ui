import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MenuLink from './components/MenuLink';
import FlatButton from 'material-ui/FlatButton';
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard';
import PostListIcon from 'material-ui/svg-icons/action/list';
import LabelIcon from 'material-ui/svg-icons/action/label';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new';
import './App.css';

export interface AppState {
	drawerOpen: boolean;
}

class App extends React.Component<object, AppState> {

	constructor(props: any) {
		super(props);
		this.state = {
			drawerOpen: false
		};
	}

	handleClick = () => {
		this.setState({
			drawerOpen: !this.state.drawerOpen
		});
	};

	render() {
		return (
			<div>
				<AppBar
					className='App-appbar'
					title="管理后台"
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					style={{ zIndex: 9999, background: '#fff' }}
					onLeftIconButtonClick={this.handleClick}
					iconElementRight={<div><FlatButton label="Secondary" secondary={true} /><FlatButton label="Save" secondary={true} /></div>}
					iconStyleRight={{ marginTop: 0, display: 'flex', alignItems: 'center' }}
				/>
				<div style={{
					backgroundColor: 'rgb(237, 236, 236)'
				}}>
					<Drawer
						docked={false}
						onRequestChange={(open) => this.setState({ drawerOpen: open })}
						containerStyle={{ top: 64 }}
						open={this.state.drawerOpen}
					>
						<MenuItem primaryText={<MenuLink to='/' linkText='主页' />} leftIcon={<DashBoardIcon />} />
						<MenuItem primaryText={<MenuLink to='/labels' linkText='标签' />} leftIcon={<LabelIcon />} />
						<MenuItem primaryText={<MenuLink to='/posts' linkText='文章' />} leftIcon={<PostListIcon />} />
						<MenuItem primaryText={<MenuLink to='/comments' linkText='评论' />} leftIcon={<CommentIcon />} />
						<MenuItem primaryText={<MenuLink to='/login' linkText='注销' />} leftIcon={<LogoutIcon />} onClick={() => sessionStorage.removeItem('user')} />
					</Drawer>
					<div>
						<header className='App-header'>
							<a className='App-link-logo' href="/">
								<img src="http://materialdesignblog.com/wp-content/uploads/2015/02/logoMDBtransparentheader-2.png" alt="" />
							</a>
							<h2>Yvan Blog</h2>
						</header>
						<main className='App-main'>
							<Switch>
								{
									routes.map((route, i) => <Route key={i} exact path={route.path} component={route.component} />)
								}
							</Switch>
						</main>
					</div>

				</div>

			</div>
		);
	}
}

export default App;
