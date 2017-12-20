import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import configStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//开启严格模式，确保只能在action中修改store数据
useStrict(true);

declare global {
    interface Window {
        __INITIAL_STATE__: string;
    }
}

let initialState = JSON.parse(window.__INITIAL_STATE__ ) || {};
let store = configStore(initialState);

ReactDOM.render(
	<Provider {...store}>
		<MuiThemeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
