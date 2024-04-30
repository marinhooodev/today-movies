<template>
  <Splide :options="{ rewind: true }">
    <SplideSlide v-for="(movie, index) in movies" :key="index" :style="{ '--bgUrl': `url(${baseImgUrl}${movie.backdrop_path})` }" class="bannerSlide"> 
    
      <div class="w-full h-full flex flex-col justify-center items-start pl-10">
        <span class="text-4xl font-extrabold max-w-[50vw] mb-5">{{ movie.title }}</span>
        <span class="text-sm max-w-[45vw] font-light"> {{  movie.overview }}</span>
        <Button outlined label="Adicionar à lista de desejos"></Button>
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

export default defineComponent({
  components: { Splide, SplideSlide },
  setup() {
    const movies: Ref<HTMLButtonElement[]> = ref([]);
    const token = import.meta.env.VITE_TMDB_API_TOKEN;
    const lang = "pt-BR";
    const maxResults = 5;
    const baseImgUrl = "https://image.tmdb.org/t/p/original";
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";

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

        
        movies.value = request.data.results.splice(0,10)
        console.log(movies.value)

      } catch (error) {
        alert(error);
      } finally {
        console.log("Finnaly: Do something");
      }
    };


    onMounted(getPopularMovies)

    return { getPopularMovies, movies, baseImgUrl };
  },
});
</script>

<style scoped lang="scss">

.splide {
  padding: 10px;
}

.bannerSlide {
  --bgUrl: "";
  background-image: linear-gradient(to right, black, rgba(black, 0.6), transparent), var(--bgUrl);
  background-size: cover;
  background-position: right;
  min-height: 70dvh;
  border-radius: 20px;
}
</style>
