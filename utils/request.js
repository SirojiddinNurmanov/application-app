import { BACK_END_URL } from '../config/config'


async function requestGraphql(gql) {

	const response = await fetch(BACK_END_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: gql
		}),
	})

	const data = await response.json()

	return data
}
async function requestLink(gql, token) {
	console.log(token)

	const response = await fetch(BACK_END_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify({
			query: gql
		}),
	})

	const data = await response.json()

	return data
}

export { requestGraphql, requestLink }