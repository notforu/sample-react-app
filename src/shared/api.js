const serverURL = "https://api.github.com";

class API {
	constructor() {
		this.accessToken = "";
	}

	getAccessToken = async code => {
		const params = new FormData();
		params.append("client_id", Config.clientId);
		params.append("client_secret", Config.clientSecret);
		params.append("code", code);
		const response = await fetch(Config.proxyUrl + "https://github.com/login/oauth/access_token", {
			method: "POST",
			body: params
		}).then(r => r.text());
		const queryParams = new URLSearchParams(response);
		const accessToken = queryParams.get("access_token");
		if (accessToken) {
			this.accessToken = accessToken;
			return true;
		}
		return false;
	};

	fetchRepos = async username => {
		if (!this.accessToken) {
			return false;
		}
		const repos = await fetch(serverURL + "/users/" + username + "/repos?access_token=" + this.accessToken)
			.then(response => response.json());
		return repos;
	};

	fetchLoggedUserRepos = async () => {
		if (!this.accessToken) {
			return false;
		}
		const repos = await fetch(serverURL + "/user/repos?access_token=" + this.accessToken)
			.then(response => response.json());
		return repos;
	};

	fetchContributors = async (username, repo) => {
		if (!this.accessToken) {
			return false;
		}
		const contributors = fetch(serverURL + "/repos/" + username + "/" + repo + "/contributors?access_token=" + this.accessToken)
			.then(response => response.json());
		return contributors;
	}
}

const APIInstance = new API();
export default APIInstance;
