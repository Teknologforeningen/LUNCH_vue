<template>
	<div>
		<b-form class="login-container" @submit="login">
			<b-form-group id="usernameGroup" label="Username:" label-for="usernameInput">
				<b-form-input id="usernameInput" v-model="user.username" type="text" required placeholder="Enter Username">
				</b-form-input>
			</b-form-group>
			<b-form-group id="passwordGroup" label="Password:" label-for="passwordInput">
				<b-form-input id="usernameInput" v-model="user.password" type="password" required placeholder="Enter Username">
				</b-form-input>
			</b-form-group>
			<b-button type="submit" variant="primary">Login</b-button>
		</b-form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Login",
	data() {
		return {
			user: {
				username: '',
				password: ''
			}
		}

	},
	methods: {
		login() {
			const user = {
				username: this.user.username,
				password: this.user.password
			}
			axios.post('http://localhost:5000/login', user)
				.then(res => {
					console.log(res);
					localStorage.setItem('token', res.data.token);
					this.$router.go();
				}).catch(error => {
					console.log(error.response);
				});
		}
	}
}
</script>

<style scope>
	.login-container {
		max-width: 600px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: start;
	}
</style>