<template>
	<div class="admin-post-container">
		<h2>Articles:</h2>
		<b-list-group v-bind:key="item.id" v-for="item in newsArr">
			<b-list-group-item>
        {{item.title}}
				<div class="float-right">
					<b-icon-eye v-if="!item.visible" class="item-icon" icon="eye" @click="showItem(item)"></b-icon-eye>
					<b-icon-eye-fill v-if="item.visible" class="item-icon" icon="eye-fill" @click="hideItem(item)"></b-icon-eye-fill>
					<b-icon-trash class="icon-delete" icon="trash" @click="showDeleteModal(item._id)"></b-icon-trash>
				</div>
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
				<div class="mt-3">Select file: <span class="image-input-error">{{message}}</span></div>
				<b-form-file v-model="form.image" class="mt-3 file-input" plain></b-form-file>
				<b-button type="submit" variant="success">Add</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import RequestService from '../../RequestService';
	import { BIconTrash, BIconEye, BIconEyeFill } from "bootstrap-vue";

  export default {
    name: 'AdminPosts',
    components: {
        BIconTrash, BIconEye, BIconEyeFill
	},
	data() {
		return {
			newsArr: [],
			form: {
				title: '',
				content: '',
				image: null
			},
			message: ''
		}
	},
    async created() {
		try {
			this.newsArr = await RequestService.getRequest('posts');
			this.newsArr.sort((a, b) => b.date - a.date)
			//console.log(this.newsArr)
		} catch(err) {
			console.log(err);
		}
    },
    methods: {
		async onSubmit(evt) {
			evt.preventDefault();
			if (this.validateImage()) {
				try {
					const formData  = new FormData();
					formData.append("title", this.form.title);
					formData.append("content", this.form.content);
					formData.append("image", this.form.image);
					await RequestService.sendDataRequest('posts', formData);
					this.newsArr = await RequestService.getRequest('posts');
					this.newsArr.sort((a, b) => b.date - a.date);
				} catch (err) {
					console.log(err);
				}
				this.closeModal();
			}
		},

		showDeleteModal(id) {
			this.$bvModal.msgBoxConfirm('Are you sure?')
			.then(value => {
			if (value) {
					this.deletePost(id);
				}
			})
			.catch(err => {
				console.log(err);
			})
		},

		deletePost(id) {
			RequestService.deleteRequest("posts", id)
			.then(() => {
				this.newsArr = this.newsArr.filter(item => item._id !== id);
			})
			.catch(error => {
				console.log(error.response);
			});
		},

		validateImage() {
			const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
			const file = this.form.image;
			if(!allowedTypes.includes(file.type)) {
				this.message = "Only images are aloud !!";
				return false;
			} else if(file.size > 5000000) {
				this.message = "File size exceedes 5MB limit !!";
				return false;
			} else {
				return true;
			}
		},

		async hideItem(item) {
			item.visible = false;
			const temp = ({
				title: item.title,
				content: item.content,
				visible: item.visible
			});
			const text = JSON.stringify(temp);
			await RequestService.sendRequest('posts/' + item._id, text);
			this.newsArr.map(items => {
				if (items._id == item._id) {
					items.visible = item.visible;
				}
			})
		},

		async showItem(item) {
			item.visible = true;
			const temp = ({
				title: item.title,
				content: item.content,
				visible: item.visible,
			});
			const text = JSON.stringify(temp);
			await RequestService.sendRequest('posts/' + item._id, text);
			this.newsArr.map(items => {
				if (items._id == item._id) {
					items.visible = item.visible;
				}
			})
		},

		openModal() {
			this.$root.$emit('bv::show::modal', 'add-modal');
		},

		closeModal() {
			this.$root.$emit('bv::hide::modal', 'add-modal');
			this.form = {title: '', content: '', image: null};
		}
    }
  }
</script>

<style scoped>
	.admin-post-container {
		text-align: left;
		min-width: 600px;
		margin-bottom: 16px;
	}

	.add-button {
		margin-top: 16px;
	}

	.item-icon {
		margin: 0 8px;
		cursor: pointer;
	}

	.item-icon:hover {
		color: #007bff;
	}

	.icon-delete {
		cursor: pointer;
	}

	.icon-delete:hover {
		color: #dc3545;
	}

	.image-input-error {
		color: #dc3545;
	}

	.file-input {
		margin-bottom: 2rem;
	}
	
</style>