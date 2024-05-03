<template>
  <Splide
    :options="{
      rewind: true,
      autoplay: true,
      interval: 5000,
      pauseOnHover: true,
      keyboard: true,
    }"
  >
    <SplideSlide
      v-for="movie in UpcomingMoviesList"
      :key="movie.id"
      :style="{ '--bgUrl': `url(${baseImgUrl}${movie.backdrop_path})` }"
      class="bannerSlide"
    >
      <div class="w-full h-full flex p-12 relative">
        <div
          :style="{
            borderColor:
              new Date(movie.release_date) < new Date() ? 'lime' : 'red',
          }"
          class="releaseDate absolute top-10 right-10 p-2 rounded-full shadow-lg flex gap-2 items-center justify-between font-bold border"
        >
          <i class="pi pi-calendar"></i>
          <span>{{ movie.release_date.split("-").reverse().join("/") }}</span>
        </div>
        <div class="w-full h-full flex flex-col justify-between items-start">
          <div class="flex flex-col justify-center h-full items-start">
            <span class="text-4xl font-extrabold max-w-[50vw]">{{
              movie.title
            }}</span>
            <span class="text-sm text-slate-500 mb-5 mt-1"
              >{{ movie.original_title }} -
              <i class="fa fa-star text-yellow-300"></i>

              {{ movie.vote_average.toString().substring(0, 3) }}</span
            >
            <span class="text-lg max-w-[35vw] font-md text-justify">
              {{ movie.overview }}</span
            >

          </div>

          <Button
              icon-pos="right"
              icon="pi pi-chevron-right"
              label="Mais sobre o filme"
              rounded
              class="mt-5 mb-12 border-2 w-auto"
            ></Button>
        </div>

        <div class="h-full flex items-end pr-10">
          <div class="card" @mousemove="cardHover" @mouseleave="resetCard">
            <div class="card-content" :style="cardStyle">
              <img
                :src="baseImgUrl + movie.poster_path"
                alt=""
                class="bannerPoster max-w-[200px] shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </SplideSlide>
  </Splide>
</template>

<script lang="ts">
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { defineComponent, onMounted, ref, type Ref } from "vue";
import "@splidejs/vue-splide/css";
import axios from "axios";
import type PopularMovie from "@/interfaces/PopularMovie";
import Button from "primevue/button";

export default defineComponent({
  components: {
    Splide,
    SplideSlide,
    Button,
  },
  setup() {
    const UpcomingMoviesList: Ref<PopularMovie[]> = ref([]);
    const token = import.meta.env.VITE_TMDB_API_TOKEN;
    const lang = "pt-BR";
    const maxResults = 10;
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const baseUrl = "https://api.themoviedb.org/3/movie/upcoming";

    const getPopularMovies = async () => {
      try {
        const request = await axios.get(baseUrl, {
          params: {
            language: lang,
            page: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        UpcomingMoviesList.value = request.data.results.splice(0, maxResults);
        console.log(UpcomingMoviesList.value);
      } catch (error) {
        alert(error);
      } finally {
        console.log("Finally: Do something");
      }
    };

    onMounted(getPopularMovies);

    const cardStyle = ref({
      transform: "",
    });

    const cardHover = (event: any) => {
      const cardBoundingRect = event.target.getBoundingClientRect();

      const offsetX = event.clientX - cardBoundingRect.left;
      const offsetY = event.clientY - cardBoundingRect.top;

      const tiltX = (offsetX - cardBoundingRect.width / 2) / 5;
      const tiltY = (offsetY - cardBoundingRect.height / 2) / 5;

      cardStyle.value.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
    };

    const resetCard = () => {
      cardStyle.value.transform = "";
    };

    return {
      getPopularMovies,
      UpcomingMoviesList,
      baseImgUrl,
      cardStyle,
      cardHover,
      resetCard,
    };
  },
});
</script>

<style scoped lang="scss">
.splide {
  padding: 10px;
}

.bannerSlide {
  --bgUrl: "";
  background-image: linear-gradient(
      to right,
      black,
      rgba(black, 0.4),
      transparent
    ),
    var(--bgUrl);
  background-size: cover;
  background-position: right;
  min-height: 70dvh;
  border-radius: 20px;
}

.bannerPoster {
  border: 1px solid white;
  transform: translateZ(20px);
}

.card {
  transition: transform 0.3s ease;
}

.releaseDate {
  background: #00000048;
  backdrop-filter: blur(4px);
}

:global(.splide__pagination__page) {
  width: 20px;
  height: 20px;
  opacity: 0.5;
  background-color: black;
  border: 1px solid white;
}

:global(.splide__pagination__page.is-active) {
  opacity: 1;
  transform: scale(1.2);
}

:global(.splide__pagination) {
  bottom: 35px;
}

:global(.splide__arrow) {
  top: unset;
  bottom: 5px;
  background: white;
  opacity: 1;
  border: 1px solid black;
  width: 50px;
  height: 50px;
  transition: 0.2s all ease;
}
:global(.splide__arrow--next) {
  left: 120px;
}
:global(.splide__arrow--prev) {
  left: 60px;
}

:global(.splide__arrow--prev:hover:not(:disabled)) {
  box-shadow: 0px 0px 0 3px white;
  opacity: 1;
}
:global(.splide__arrow--next:hover:not(:disabled)) {
  box-shadow: 0px 0px 0 3px white;
  opacity: 1;
}

span {
  text-shadow: 0 0 0 black;
}
</style>
