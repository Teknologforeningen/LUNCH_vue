<template>
  <div id="app">
    <h1>Testing</h1>
    <OpeningHours />
    <NewsList />
  </div>
</template>

<script>
import NewsList from '../components/NewsList'
import OpeningHours from '../components/OpeningHours'

export default {
  name: 'App',
  components: {
    NewsList, OpeningHours
  }
}
</script>
