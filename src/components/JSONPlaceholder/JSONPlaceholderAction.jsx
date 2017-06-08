import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_FAILED = 'FETCH_FAILED'

const isFetchingPosts = () => {
	return {
		type: FETCH_POSTS
	}
}

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCESS,
		payload: users
	}
}
const fetchPostsSuccess = (posts) => {
	return {
		type: FETCH_POSTS_SUCCESS,
		payload: posts
	}
}
const fetchFailed = () => {
	return {
		type: FETCH_FAILED
	}
}

const buildUsersPayload = (users) => {
	let payload = {}
	users.forEach((user, index) => {
		payload[user.id] = user.name
	})

	return payload
}

const buildPostsPayload = (posts, users) => {
	let payload = []
	posts.forEach((post,index)=>{
		payload.push({
			...post,
			username : users[post.userId]
		})
	})

	return payload
}

export const fetchPosts = () => {
	return (dispatch, getState) => new Promise((resolve,reject) => {
		dispatch(isFetchingPosts())

		axios.get(`https://jsonplaceholder.typicode.com/users`)
		.then((response) => {
			let users = buildUsersPayload(response.data)
			dispatch(fetchUsersSuccess(users))

			axios.get(`https://jsonplaceholder.typicode.com/posts`)
			.then((response) => {
				dispatch(fetchPostsSuccess(buildPostsPayload(response.data, users)))
				resolve()
			})
			.catch((error) => {
				dispatch(fetchFailed())
				reject()
			})
		})
		.catch((error) => {
            dispatch(fetchFailed())
			reject()
        })
	})
}