<template>
  <div id="app">
    <section class="section">
      <h1 class="title">Квартиры</h1>

      <the-loader v-if="isLoaderVisible"/>

      <div class="apartment-wrapper" v-else>
        <div
            class="apartment-item"
            v-for="(apartment, index) in apartmentList"
            :key="index"
        >
          <div class="apartment-thumb">
            <img
                class="apartment-img"
                :src="apartment.url"
                alt=""
            >

            <img
                @click.stop="doLike(index)"
                class="apartment-like-img"
                :src="apartment.isLike ? require('@/assets/favorite.svg') : require('@/assets/not-favorite.png')"
                alt=""
            >
          </div>

          <p>
            {{apartment.title}}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import TheLoader from './components/TheLoader'

  export default {
    name: 'App',
    components: { TheLoader },
    data() {
      return {
        isLoaderVisible: true,
      }
    },
    computed: mapState(['apartmentList']),
    methods: {
      doLike(index) {
        this.$store.commit('CHANGE_APARTMENT_LIKE', index)
      },
    },
    async mounted() {
      await this.$store.dispatch('fetchApartments')
      this.isLoaderVisible = false
    },
  }
</script>

<style lang="scss">
  @import "./assets/normalize";

  * {
    box-sizing: border-box;
  }

  .section {
    padding: 0 15px;

    @media (min-width: 575.98px) {
      padding: 0 calc(50% - 270px);
    }

    @media (min-width: 767.98px) {
      padding: 0 calc(50% - 360px);
    }

    @media (min-width: 991.98px) {
      padding: 0 calc(50% - 480px);
    }

    @media (min-width: 1199.98px) {
      padding: 0 calc(50% - 590px);
    }
  }

  .title {
    margin: 20px 0;
    text-align: center;
  }

  .apartment {
    &-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &-item {
      flex: 0 1 auto;
      margin: 20px;
      cursor: pointer;
      @media (min-width: 767.98px) {
        flex-basis: calc(100%/2 - 2*20px);
      }
      @media (min-width: 1199.98px) {
        flex-basis: calc(100%/3 - 2*20px);
      }
    }

    &-thumb {
      position: relative;
    }

    &-img {
      border-radius: 4px;
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    &-like-img {
      position: absolute;
      width: 20px;
      height: 20px;
      bottom: 10%;
      right: 10%;
    }
  }
</style>
