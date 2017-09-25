export default function(state = {posts: [], fetching: false}, action) {
	let posts;
	switch(action.type) {
		case 'CREATE_POST':
			return [...state,
				Object.assign({}, action.post)
			];
		case 'UPVOTE_POST':
			posts = state.posts.map(post => {
				if(post.id === action.id) {
					post.vote_count += 1;
					return post;
				} else {
					return post;
				}
			})
			return {...state, posts}
		case 'DOWNVOTE_POST':
			posts = state.posts.map(post => {
				if(post.id === action.id) {
					post.vote_count -= 1;
					return post;
				} else {
					return post;
				}
			})
			return {...state, posts}
		case 'FETCH_POSTS':
			return {...state, fetching: true}
		case 'POSTS_FETCHED':
			return {fetching: false, posts: [...action.posts]};
		case 'POST_SUBMITTED':
			return {...state, posts: [...state.posts, action.post]}
		case 'DELETE_POST':
			posts = []
			state.posts.forEach(post => {
				if(post.id !== action.id) {
					posts.push(post);
				}
			})
			return {...state, posts}
		default:
			return state;
	}
}
