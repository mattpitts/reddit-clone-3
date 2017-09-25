import React, { Component } from 'react';
import '../App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Options from './Options';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import AllPosts from './AllPosts';

class App extends Component {
	constructor(props) {
		super();
	}
  	render() {
    	return (
			<BrowserRouter>
				<div>
					<Header/>
					<Options/>
					<Route exact path='/' component={AllPosts}/>
					<Switch>
						<Route exact path="/posts/new" component={PostForm}/>
						<Route exact path="/posts/:id/edit" component={PostForm}/>
						<Route exact path="/posts/:id" component={PostDetail}/>
					</Switch>
				</div>
			</BrowserRouter>
    	);
  	}
}

export default App;
