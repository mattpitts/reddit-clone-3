export function addPost(post) {
	return { type: 'CREATE_POST', post }
}
export function upvotePost(id) {
	return { type: 'UPVOTE_POST', id }
}
export function downvotePost(id) {
	return { type: 'DOWNVOTE_POST', id }
}
export function addComment(payload) {
	return { type: 'ADD_COMMENT', payload }
}
export function fetchPosts() {
	return { type: 'FETCH_POSTS' }
}
export function postsFetched(posts) {
	return { type: 'POSTS_FETCHED', posts }
}
export function postSubmitted(post) {
	return { type: 'POST_SUBMITTED', post }
}
export function deletePost(id) {
	return { type: 'DELETE_POST', id}
}
