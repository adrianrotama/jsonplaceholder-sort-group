import './index.css'

import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import configureStore from './store/configureStore'

import App from './App'
import JSONPlaceholder from './components/JSONPlaceholder/JSONPlaceholder'
import MultipleAudio from './components/MultipleAudio/MultipleAudio'

const store = configureStore()

const routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={JSONPlaceholder}/>
                <Route path="audio" component={MultipleAudio}/>
            </Route>
        </Router>
    </Provider>
)

ReactDOM.render(routes, document.getElementById('root'))
