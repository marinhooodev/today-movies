<template>
  <Splide :options="{ rewind: true, autoplay: true, interval: 5000 }">
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
          <div class="flex flex-col justify-center h-full">
            <span class="text-4xl font-extrabold max-w-[50vw] mb-5">{{
              movie.title
            }}</span>
            <span class="text-lg max-w-[35vw] font-light">
              {{ movie.overview }}</span
            >
          </div>

          <Button
            icon-pos="right"
            icon="pi pi-chevron-right"
            label="Mais sobre o filme"
            rounded
            class="mt-5 border-2"
            
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
      rgba(black, 0.6),
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
</style>
