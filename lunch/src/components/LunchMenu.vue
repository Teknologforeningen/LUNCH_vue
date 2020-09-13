<template>
	<div class="component-container">
        <h2 class="component-title">Menu</h2>
		<div class="lunch-menu-container component-content">
            <pre v-if="today">{{ menu }}</pre>
            <div v-if="!today" v-html="menu"></div>
        </div>
        <b-button @click="toggleLunchView()" class="lunch-menu-button">{{text}}</b-button>
	</div>
</template>

<script>
import RequestService from '../RequestService';
export default {
	name: "LunchMenu",
	props: [],
	data() {
		return {
            text: "Show more",
            today: true,
			menu: null
		}
    },
    async mounted () {
        this.menu = await RequestService.getMenuToday();
    },
    methods: {
        async toggleLunchView() {
            if (this.today) {
                this.menu = await RequestService.getMenuWeek();
                this.today = false;
                this.text = "Show less";
            } else {
                this.menu = await RequestService.getMenuToday();
                this.today = true;
                this.text = "Show more";
            }
        }
    }
}
</script>

<style scope>
    .lunch-menu-container {
        text-align: left;
    }

    .lunch-menu-button {
        margin: 1rem 0;
    }

    p {
        font-weight: bold;
    }

    ul {
        list-style: none;
    }

    pre {
        white-space: pre-wrap;       /* Since CSS 2.1 */
        white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
        white-space: -pre-wrap;      /* Opera 4-6 */
        white-space: -o-pre-wrap;    /* Opera 7 */
        word-wrap: break-word;       /* Internet Explorer 5.5+ */
        font-family: Avenir, Helvetica, Arial, sans-serif;
        font-size: 100%;
        font-style: normal;
    }
</style>