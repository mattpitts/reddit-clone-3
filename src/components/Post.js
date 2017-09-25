import React from 'react';
// import {CommentContainer} from './CommentContainer';
// import { PostForm} from './PostForm';
import { Link } from 'react-router-dom'

export default class Post extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const detailLink = `/posts/${this.props.post.id}`;
		const editLink = `/posts/${this.props.post.id}/edit`;

		return (
			<div className="card">
				<div className="card-block bg-faded">
					<div className="row">
						<div className="col-sm-3">
							<img className="post-thumbnail" src={this.props.post.image_url}></img>
						</div>
						<div className="col-sm-9">
							<div className="row">
								<div className="col-sm-12">
									<h4 className="card-title">{this.props.post.title}</h4>
									<h6 className="card-subtitle mb-2 text-muted">
										<i
											onClick={() => this.props.onPostRatingChange(this.props.post.id, 1)}
											className="fa fa-arrow-circle-up upvote-small">
										</i>
										{this.props.post.vote_count}
										<i
											onClick={() => this.props.onPostRatingChange(this.props.post.id, -1)}
											className="fa fa-arrow-circle-down downvote-small">
										</i>
										Created {this.props.post.created_at} by {this.props.post.author} |
										<Link to={editLink}>
											<i className="fa fa-pencil" aria-hidden="true"></i>
										</Link> |
										<Link to={detailLink}>
											<button className="card-subtitle mb-2 text-muted comment-button" type="button">{this.props.post.comments.length} Comments</button> 
										</Link>
										<i onClick={() => this.props.onPostDelete(this.props.post.id)} className="fa fa-trash-o" aria-hidden="true"></i>
									</h6>
									<p className="card-text post-body">{this.props.post.body}</p>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}
