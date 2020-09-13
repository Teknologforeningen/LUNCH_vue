<template>
  <div class="app-content-conatiner">
    <div class="app-content-left">
      <div class="left-image-container"></div>
    </div>
    <div class="app-content">
      <LunchMenu />
      <Announcement />
      <OpeningHours />
      <NewsList />
    </div>
    <div class="app-content-right"></div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
import NewsList from '../components/NewsList'
import OpeningHours from '../components/OpeningHours'
import LunchMenu from '../components/LunchMenu'
import Announcement from '../components/Announcement'

export default {
  name: 'App',
  components: {
    LunchMenu, Announcement, NewsList, OpeningHours
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

  .app-content {
    padding: 2rem 0;
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

  .footer {
    width: 100%;
    min-height: 200px;
    background-color: #F4F4F4;
  }

  @media (max-width: 1085px) {
    .app-content-right,
    .app-content-left  {
      display: none;
    }
    .app-content-conatiner {
      justify-content: center;
    }
    .app-content {
      padding: 2rem 1rem;
      width: 100%;
    }
  }


  
</style>
