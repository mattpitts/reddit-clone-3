import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import * as postActions from '../actions/postActions';

class PostForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			post: false,
			title: '',
			body: '',
			author: '',
			url: ''
		}
	}
	componentDidMount() {
		let href = window.location.href.split('/')
		if(href[href.length-1] === 'edit') {
			let id = href[href.length-2];
			axios.get(`http://localhost:5000/api/posts/${id}`)
				.then(response => {
					let post = response.data;
					this.setState({
						post,
						title: post.title,
						body: post.body,
						author: post.author,
						url: post.image_url
					})
				})
		}

	}

	handleChange(event) {
		let name = event.target.name
		this.setState({
			[name]: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let post = {
			title: this.state.title,
			body: this.state.body,
			author: this.state.author,
			image_url: this.state.url,
			created_at: this.props.postData ? this.props.postData.time : Date.now(),
			vote_count: 0,
			comments: this.props.postData ? this.props.postData.comments : []
		}
		if(!this.state.post) {
			axios.post('http://localhost:5000/api/posts', post).then(response => {
				this.props.actions.postSubmitted(post);
				window.location.href = '/';
			});
		} else {
			let post = {
					title: this.state.title,
					body: this.state.body,
					author: this.state.author,
					image_url: this.state.url
			}
			axios.patch(`http://localhost:5000/api/posts/${this.state.post.id}`, post)
				.then(response => {
					console.log(response);
					window.location.href='/';
				}).catch(err => {
					console.log(err);
			});
		}
	}
	render() {
		let buttonText = this.state.post ? 'Update' : 'Submit';
		return (
			<div className='container-fluid'>

				<div className='col-sm-12'>
					<form onSubmit={this.handleSubmit}>
						<div className="form-group">
		    				<label htmlFor="new-post-title">Title</label>
		    				<input name="title"type="text" onChange={this.handleChange} value={this.state.title} className="form-control" id="new-post-title"></input>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-body">Body</label>
		    				<textarea name="body"className="form-control" onChange={this.handleChange} value={this.state.body} id="new-post-body" rows="3"></textarea>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-author">Author</label>
		    				<input name="author"type="text" onChange={this.handleChange} value={this.state.author} className="form-control" id="new-post-author"></input>
		  				</div>
						<div className="form-group">
		    				<label htmlFor="new-post-url">Image URL</label>
		    				<input name="url"type="text" onChange={this.handleChange} value={this.state.url} className="form-control" id="new-post-url"></input>
		  				</div>
						<button type="submit" className="btn btn-primary">{buttonText}</button>
					</form>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		posts: state.posts
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(postActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
