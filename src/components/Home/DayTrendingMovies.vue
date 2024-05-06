<template>
  <div class="mt-10">
    <span class="text-5xl font-extrabold pl-5 mt-5"
      >Os melhores filmes do dia!</span
    >
  </div>

  <div class="flex justify-around items-center p-10" v-if="loading">
    <Skeleton class="mb-2 max-w-[280px] min-h-[420px] rounded-none"></Skeleton>
    <Skeleton class="mb-2 max-w-[280px] min-h-[420px] rounded-none"></Skeleton>
    <Skeleton class="mb-2 max-w-[280px] min-h-[420px] rounded-none"></Skeleton>
    <Skeleton class="mb-2 max-w-[280px] min-h-[420px] rounded-none"></Skeleton>
    <Skeleton class="mb-2 max-w-[280px] min-h-[420px] rounded-none"></Skeleton>
  </div>
  <Splide
    :options="{
      rewind: true,
      perPage: 5,
      arrows: false,
      drag: 'free',
      snap: true,
      pagination: false,
      breakpoints: {
        1700: {
          perPage: 4,
        },
        1350: {
          perPage: 3,
        },
        1050: {
          perPage: 2,
        },
      },
    }"
    aria-label="Os melhores filmes do dia"
    class="p-10 pr-20 overflow-hidden"
    id="dailyMovies"
  >
    <SplideSlide
      v-for="(movie, index) in dayMovies"
      :key="index"
      class="dailySplide flex items-center justify-center relative"
      :data-number="index + 1"
    >
      <div
        class="movieBox relative"
        :data-rating="movie.vote_average.toString().substring(0, 3)"
      >
        <img
          :src="baseImgUrl + movie.poster_path"
          alt=""
          class="bannerPoster max-w-[280px] shadow-lg"
        />
      </div>
    </SplideSlide>
  </Splide>
</template>

<script setup lang="ts">
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";
import type TrendingMovie from "@/interfaces/TrendingMovie";
import Skeleton from "primevue/skeleton";
import { onMounted } from "vue";

const token = import.meta.env.VITE_TMDB_API_TOKEN;
const baseURL = "https://api.themoviedb.org/3/trending/movie/day";
const baseImgUrl = "https://image.tmdb.org/t/p/original";
const lang = "pt-BR";
const dayMovies: Ref<TrendingMovie[]> = ref([]);
const loading = ref(true);

const getDayTrendingMovies = async () => {
  try {
    loading.value = true;

    const request = await axios.get(baseURL, {
      params: {
        language: lang,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.data;

    dayMovies.value = response.results;
  } catch (error) {
    loading.value = false;
    alert(error);
  } finally {
    loading.value = false;
  }
};

onMounted(getDayTrendingMovies);
</script>

<style scoped lang="scss">
:global(#dailyMovies .splide__track) {
  overflow: visible;
}
:global(#dailyMovies .splide__track::-webkit-scrollbar) {
  display: none;
}

:global(.dailySplide::before) {
  content: attr(data-number);
  position: absolute;
  display: block;
  font-size: 100px;
  @apply font-extrabold;
  color: white;
  bottom: 0;
  left: 0;
  z-index: 2;
  text-shadow: 0 0 5px black;
}
:global(.movieBox::after) {
  content: "⭐" attr(data-rating);
  position: absolute;
  display: block;
  font-size: 20px;
  font-weight: normal;
  padding: 0 5px 3px 0;
  color: white;
  top: 0px;
  right: 0;
  z-index: 2;
  background: #000000a2;
  backdrop-filter: blur(5px);
  border-radius: 0px;
  border-end-start-radius: 10px;
  box-shadow: 0 0 10px black;
  border-bottom: 1px solid rgba(255, 255, 255, 0.336);
  border-left: 1px solid rgba(255, 255, 255, 0.336);
}
</style>
