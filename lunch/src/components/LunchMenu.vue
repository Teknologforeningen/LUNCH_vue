<template>
	<div>
        <h2>Menu</h2>
		<div>
            <pre>{{ menu }}</pre>
        </div>
	</div>
</template>

<script>
import RequestService from '../RequestService';
export default {
	name: "LunchMenu",
	props: [],
	data() {
		return {
			menu: null
		}
    },
    async mounted () {
        this.menu = await RequestService.getMenuToday();
    }
}
</script>

<style scope>

</style>