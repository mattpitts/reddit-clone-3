import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Post from './Post';

import * as postActions from '../actions/postActions';

class AllPosts extends React.Component {
	constructor(props) {
		super(props);
		this.onPostRatingChange = this.onPostRatingChange.bind(this);
		this.onPostDelete = this.onPostDelete.bind(this);
	}
	componentDidMount() {
		axios.get('http://localhost:5000/api/posts')
			.then(response => {
				this.props.actions.postsFetched(response.data);
				console.log(response.data);
			}).catch(err => {
				console.log(err);
				// alert(err)
		})
	}
	onPostDelete(id) {
		console.log(id);
		axios.delete(`http://localhost:5000/api/posts/${id}`)
			.then(response => {
				this.props.actions.deletePost(id);
			}).catch(err => {
				console.log(err);
			})
	}

	onPostRatingChange(id, change) {
		if(change === 1) {
			axios.post(`http://localhost:5000/api/posts/${id}/votes`)
				.then(success => {
					this.props.actions.upvotePost(id);
				}).catch(err => {
					alert(err);
				});
		} else {
			axios.delete(`http://localhost:5000/api/posts/${id}/votes`)
				.then(success => {
					this.props.actions.downvotePost(id);
				}).catch(err => {
					alert(err);
				});
		}
	}


	render() {
		let posts;

		if(this.props.posts.posts) {
			posts = this.props.posts.posts.map((post, i) => {
				return (
					<Post
						key={i}
						post={post}
						onPostRatingChange={this.onPostRatingChange}
						onPostDelete={this.onPostDelete}
					/>
				)
			});
		}
		return (
			<div className='container'>
				{posts}
			</div>
		)
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
export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
