<template>
	<div class="admin-post-container">
		<h2>Articles:</h2>
		<b-list-group v-bind:key="item.id" v-for="item in newsArr">
			<b-list-group-item>
        {{item.title}}
        <b-icon-trash class="float-right" icon="trash" @click="deletePost(item._id)"></b-icon-trash>
      </b-list-group-item>
		</b-list-group>
		<b-button class="add-button" variant="primary" @click="openModal">Add post</b-button>
		<b-modal id="add-modal" title="Add Post" hide-footer>
			<b-form @submit="onSubmit">
				<b-form-group
					id="title-group"
					label="Add title:"
					label-for="title-input"
				>
					<b-form-input
						id="title-input"
						v-model="form.title"
						type="text"
						required
						placeholder="Enter title"
					></b-form-input>
				</b-form-group>
				<b-form-group
					id="content-group"
					label="Add content:"
					label-for="content-textarea"
				>
					<b-form-textarea
						id="content-textarea"
						v-model="form.content"
						placeholder="Enter content"
						required
						rows="4"
						max-rows="6"
					></b-form-textarea>
				</b-form-group>
				<b-button type="submit" variant="success">Add</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import RequestService from '../../RequestService';
	import { BIconTrash } from "bootstrap-vue";

  export default {
    name: 'AdminPanel',
    components: {
        BIconTrash
		},
		data() {
			return {
				newsArr: [],
				form: {
					title: '',
					content: ''
				}
			}
		},
    async created() {
			try {
				this.newsArr = await RequestService.getRequest('posts');
				
				console.log(this.newsArr)
			} catch(err) {
				console.log(err);
			}
    },
    methods: {
			deletePost(id) {
      RequestService.deleteRequest("posts", id)
        .then(() => {
          this.newsArr = this.newsArr.filter(item => item._id !== id);
        })
        .catch(error => {
          console.log(error.response);
				});
			},
			async onSubmit(evt) {
				evt.preventDefault()
				try {
					const text = JSON.stringify(this.form);
					await RequestService.sendRequest('posts', text);
					this.newsArr = await RequestService.getRequest('posts');
				} catch (err) {
					console.log(err);
				}
				this.closeModal();
			},

			openModal() {
				this.$root.$emit('bv::show::modal', 'add-modal');
			},

			closeModal() {
				this.$root.$emit('bv::hide::modal', 'add-modal');
				this.form = {title: '', content: ''};
			}
    }
  }
</script>

<style scoped>
	.admin-post-container {
		text-align: left;
		min-width: 600px;
	}

	.add-button {
		margin-top: 16px;
	}
</style>