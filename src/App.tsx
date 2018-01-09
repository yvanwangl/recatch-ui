import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter, RouteComponentProps } from 'react-router';
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

export interface AppProps {
    history: any;
}

export interface AppState {
    drawerOpen: boolean;
}

class App extends React.Component<object & RouteComponentProps<any>, AppState> {

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

    handleLogoClick = () => {
        let { history } = this.props;
        history.push('/');
    };

    render() {
        return (
            <div>
                <header className='App-appbar'>
                    <div style={{ width: 100, height: 80 }}></div>
                    <span style={{ paddingRight: 20 }}>
                        <a href="http://admin.yvanwang.com" target="_blank"><FlatButton label="登录" labelStyle={{ fontSize: 16 }} secondary={true} /></a>
                        <a href="http://admin.yvanwang.com" target="_blank"><FlatButton label="注册" labelStyle={{ fontSize: 16 }} secondary={true} /></a>
                    </span>
                </header>
                <ListButton listClassName={this.state.drawerOpen ? 'close' : 'list'} onButtonClick={this.handleClick} />
                <main className='App-appmain'>
                    <Drawer
                        docked={false}
                        onRequestChange={(open) => this.setState({ drawerOpen: open })}
                        open={this.state.drawerOpen}
                    >
                        <div className='App-appmain-logo'>Yvan</div>
                        <MenuItem onClick={this.handleClick} primaryText={<MenuLink to='/' linkText='主页' />} leftIcon={<DashBoardIcon />} />
                        <MenuItem onClick={this.handleClick} primaryText={<MenuLink to='/projects' linkText='项目' />} leftIcon={<LabelIcon />} />
                        <MenuItem onClick={this.handleClick} primaryText={<MenuLink to='/links' linkText='友链墙' />} leftIcon={<PostListIcon />} />
                        <MenuItem onClick={this.handleClick} primaryText={<MenuLink to='/about' linkText='关于' />} leftIcon={<CommentIcon />} />
                    </Drawer>
                    <div>
                        <header className='App-header'>
                            <span className='App-link-logo' onClick={this.handleLogoClick}>
                                <h2>Yvan Blog</h2>
                            </span>
                        </header>
                        <main className='App-content'>
                            <Switch>
                                {
                                    routes.map((route, i) => <Route key={i} exact path={route.path} component={route.component} />)
                                }
                            </Switch>
                        </main>
                        <footer className='App-footer'>
                            <a href=""></a>
                            <a href=""></a>
                            <p>Designed and Developed by Yafei Wang.</p>
                            <p>Copyright © 2015 YvanWang.com. All Rights Reserved.</p>
                            <p>京 ICP 备 15039446 号</p>
                        </footer>
                    </div>

                </main>

            </div>
        );
    }
}

export default withRouter(App) as any;
