<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

const pokemon = ref(null)

const fetchPokemon = async (id=1) => {
  try {
    const response = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query GetPokemon($id: Int!) {
            getPokemon(id: $id) {
              name
              types {
                type {
                  name
                }
              }
              sprites {
                officialArtwork {
                  frontDefault
                }
              }
            }
          }
        `,
        variables: {
          id // You can make this dynamic later
        }
      })
    })

    const data = await response.json()
    pokemon.value = data.data.getPokemon
  } catch (error) {
    console.error('Error fetching Pokemon:', error)
  }
}

onMounted(() => {
  fetchPokemon(2)
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="I am Poke Vue" />
    </div>
  </header>

  <main>
    <div v-if="pokemon" class="pokemon-container">
      <h2>{{ pokemon.name }}</h2>
      <img 
        v-if="pokemon.sprites?.officialArtwork?.frontDefault" 
        :src="pokemon.sprites.officialArtwork.frontDefault" 
        :alt="pokemon.name"
      />
      <div class="types">
        <span v-for="type in pokemon.types" :key="type.type.name" class="type">
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.pokemon-container {
  text-align: center;
  margin: 2rem 0;
}

.pokemon-container img {
  max-width: 300px;
  height: auto;
}

.types {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.type {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #eee;
  text-transform: capitalize;
}
</style>
