export const SignUp = ({ name, email, password }) => {
	return `
	mutation{
		signup(email: "${email}", password: "${password}", name: "${name}" ){
			token
			user {
				id
				name
				email
			}
		}
	}
	`
}
export const Loginin = ({ email, password }) => {
	return `
	mutation {
		login(email: "${email}", password: "${password}") {
		  token
		}
	  }
	`
}


export const getUsers = () => {
	return `
			query {
			  user {
			    id
			    name
			    email
			  }
			}
	`
}

export const getAllLinks = () => {
	return `
	query {
		feed {
		  count
		  links {
			id
			description
			url
			postedBy {
			  id
			  name
			}
			votes {
			  id
			  user {
				id
				name
			  }
			}
		  }
		}
	  }
	`
}

export const sendLink = ({ url, description }) => {
	return `
	mutation {
		post(
		  url: "${url}",
		  description: "${description}"
		) {
		  id
		}
	  }
	`
}
export const upvote = ({ id }) => {
	console.log("id", id)
	return `
	mutation {
		vote(linkId: "${id}") {
		  id
		}
	  }
	`
}