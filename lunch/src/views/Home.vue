<template>
  <div id="app">
    <h1>Testing</h1>
    <NewsList />
  </div>
</template>

<script>
import NewsList from '../components/NewsList'

export default {
  name: 'App',
  components: {
    NewsList
  }
}
</script>
