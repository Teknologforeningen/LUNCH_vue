<template>
    <div class="news-container">
        <h2>News Feed</h2>
        <div v-bind:key="item.id" v-for="item in newsArr">
            <Article v-if="item.visible" v-bind:article="item" />
        </div>
    </div>
</template>

<script>
import Article from './Article';
import RequestService from '../RequestService'

export default {
    name: "NewsList",
    components: {
        Article
    },
    data() {
        return {
            newsArr: []
        }
    },
    async created() {
        try {
            this.newsArr = await RequestService.getDataRequest('posts');
            this.newsArr.sort((a, b) => b.date - a.date)
            // console.log(this.newsArr)
        } catch(err) {
            console.log(err);
        }
    }
}
</script>

<style scope>
    .news-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>