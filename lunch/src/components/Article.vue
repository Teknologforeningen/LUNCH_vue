<template>
	<div>
		<b-card :title="article.title" img-src="https://picsum.photos/600/300/?image=25" img-alt="Image" img-top
			tag="article" class="mb-2 article-card">
			<b-card-text>
				{{article.content}}
			</b-card-text>
		</b-card>
	</div>
</template>

<script>
export default {
	name: "Article",
	props: ["article"]
}
</script>

<style scope>
	.article-card {
		max-width: 30rem;
		text-align: left;
	}
</style>