import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, NextPage } from 'next';

import { NextUIProvider } from '@nextui-org/react';
import { Grid } from '@nextui-org/react';
import { Inter } from '@next/font/google'

import { PokemonCard } from '../components/pokemon';
import { pokeApi } from '../api';
import { PokemonList, SmallPokemon } from '../interfaces';

import { Layout } from '../components/layouts';
import { useEffect, useState } from 'react';


const inter = Inter({ subsets: ['latin'] })

interface Props {
  pokemons: SmallPokemon[]
}

const HomePage : NextPage<Props> = ( { pokemons } ) => {

  const [favoritos, setFavoritos] = useState([]);

  useEffect(()=>{
    setFavoritos(JSON.parse(localStorage.getItem('favorites') || '[]'));
  },[])

  return (
    <>
        <Layout title="Lista de pokemones">
        <Grid.Container gap={2} >
          {
            pokemons.map(({id, name, img}: SmallPokemon) => (
              <PokemonCard key={id} id={id} name={name} img={img}  />
            )) 
          }
        </Grid.Container>
        </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx)=>{
  const {data} = await pokeApi.get<PokemonList>('/pokemon?limit=151');

  const listPokemons: SmallPokemon[] = data.results.map(( p, i )=>{
    p.id = i + 1;
    p.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  
    return p;
  })


  return {
    props: {
      pokemons: listPokemons
    }
  }
}

export default HomePage;