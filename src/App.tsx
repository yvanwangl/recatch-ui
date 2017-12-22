import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MenuLink from './components/MenuLink';
import FlatButton from 'material-ui/FlatButton';
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard';
import PostListIcon from 'material-ui/svg-icons/action/list';
import LabelIcon from 'material-ui/svg-icons/action/label';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import ListButton from './components/ListButton';
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
				<header className='App-appbar'>
					<div style={{ width: 100, height: 80 }}></div>
					<span style={{ paddingRight: 20 }}>
						<FlatButton label="登陆" labelStyle={{fontSize: 16}} secondary={true} />
						<FlatButton label="注册" labelStyle={{fontSize: 16}} secondary={true} />
					</span>
				</header>
				<ListButton listClassName={this.state.drawerOpen ? 'close' : 'list'} onButtonClick={this.handleClick} />
				<main className='App-appmain'>
					<Drawer
						docked={false}
						onRequestChange={(open) => this.setState({ drawerOpen: open })}
						open={this.state.drawerOpen}
					>
						<div className='App-appmain-logo'></div>
						<MenuItem primaryText={<MenuLink to='/' linkText='主页' />} leftIcon={<DashBoardIcon />} />
						<MenuItem primaryText={<MenuLink to='/labels' linkText='项目' />} leftIcon={<LabelIcon />} />
						<MenuItem primaryText={<MenuLink to='/posts' linkText='友链墙' />} leftIcon={<PostListIcon />} />
						<MenuItem primaryText={<MenuLink to='/comments' linkText='关于' />} leftIcon={<CommentIcon />} />
					</Drawer>
					<div>
						<header className='App-header'>
							<a className='App-link-logo' href="/">
								<img src="http://materialdesignblog.com/wp-content/uploads/2015/02/logoMDBtransparentheader-2.png" alt="" />
							</a>
							<h2>Yvan Blog</h2>
						</header>
						<main className='App-content'>
							<Switch>
								{
									routes.map((route, i) => <Route key={i} exact path={route.path} component={route.component} />)
								}
							</Switch>
						</main>
						<footer style={{height: 100, textAlign: 'center', background: '#000', color: '#fff'}}>
							<p style={{lineHeight: '100px'}}>Yvan wang's blog</p>
						</footer>
					</div>

				</main>

			</div>
		);
	}
}

export default App;
