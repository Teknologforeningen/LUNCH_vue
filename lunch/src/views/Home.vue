<template>
  <div class="app-content-conatiner">
    <div class="app-content-left">
      <div class="left-image-container"></div>
    </div>
    <div class="app-content">
      <h1>Testing</h1>
      <OpeningHours />
      <NewsList />
    </div>
    <div class="app-content-right"></div>
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
<style lang="scss">
  .app-content-conatiner {
    display: flex;
    flex-direction: row;
    overflow: auto;
    flex-wrap: wrap;
  }

  .app-content-left {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .left-image-container {
    width: 300px;
    background-size: auto 300px;
    background-image: url(../assets/taffa_fruits.png);
    background-repeat: repeat-y;
  }

  .app-content-right {
    flex: 1;
  }

  @media (max-width: 1085px) {
    .app-content-right,
    .app-content-left  {
      display: none;
    }
    .app-content-conatiner {
      justify-content: center;
    }
  }


  
</style>
