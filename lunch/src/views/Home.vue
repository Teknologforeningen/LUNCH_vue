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
      <Prices />
    </div>
    <div class="app-content-right"></div>
    <div class="footer">
      <div class="footer-container">
        <h5 class="footer-title">Contact information</h5>
        <p class="footer-text">
          Teknologföreningen
          <br>Otsvängen 22
          <br>02150 ESBO
        </p>
        <p class="footer-text">
          Contact: ekonomichef[at]teknolog.fi
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NewsList from '../components/NewsList'
import OpeningHours from '../components/OpeningHours'
import LunchMenu from '../components/LunchMenu'
import Announcement from '../components/Announcement'
import Prices from '../components/Prices'

export default {
  name: 'App',
  components: {
    LunchMenu, Announcement, OpeningHours, NewsList, Prices
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
    background-color: #F4F4F4;
  }

  .footer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin: 0 auto;
    padding: 1rem;
    width: 580px;
    height: 100%;
  }

  .footer-title {
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 665px) {
    .footer-container {
      width: 100%;
    }
  }

  @media (max-width: 1185px) {
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
