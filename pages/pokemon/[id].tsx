
import {useEffect, useState} from 'react'
import { Layout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../../api'
import { PokemonFull } from '../../interfaces'
import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react'
import { toggleFavorites, existInFavorites } from '../../utils'
import Head from 'next/head';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: PokemonFull
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {


    const [inFavorites, setInFavorites] = useState(false)

    const handleFavorites = ()=>{
        
        toggleFavorites(pokemon.id.toString());
        if(!inFavorites){
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 150,
                angle: -120,
                origin: {
                    x: 0.9,
                    y: 0.15
                }
            })
        }
        setInFavorites(!inFavorites);
        
    }

    useEffect(()=>{
        setInFavorites(existInFavorites(pokemon.id.toString()));
    },[])



    return (
        <>
            <Layout title={`Pokemon: ${pokemon.name}`}>
                <Grid.Container  gap={2}>
                    <Grid xs={12} sm={8} md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <Card.Image 
                                    src={pokemon.sprites.other?.dream_world.front_default || ""}
                                    objectFit="cover"
                                    width="70%"
                                    height="100%"
                                />
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={12} sm={4} md={6} xl={8}>
                        <Card>
                            <Card.Header>
                                <h3>{pokemon.name}</h3>
                                <Spacer css={{ flex: 1}} />
                                <Button onPress={handleFavorites} color="gradient" auto ghost={inFavorites}>
                                    {
                                        inFavorites? 'Quitar de favoritos' : 'Agregar a favoritos'
                                    }
                                </Button>
                            </Card.Header>
                            <Card.Divider/>
                            <Card.Body>
                                <h3>Habilidades:</h3>
                                {
                                    pokemon.abilities.map(( item, i )=>{
                                        return <Text key={i}>{item.ability.name}</Text>
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async()=>{

    const listadoIds = Array(151).fill(0).map(( i, idx)=>{
        const obj = {
            params: {id: (idx + 1).toString()}
        }
        return obj
    });

    return {
        paths: listadoIds,
        fallback: false 
    }
}

export const getStaticProps: GetStaticProps = async( ctx )=>{

    const {id} = ctx.params as {id: string};
    const {data} = await pokeApi.get<PokemonFull>(`pokemon/${id}`)

    const nuevoPokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
        abilities: data.abilities
    }

    return {
        props: {
            pokemon: nuevoPokemon
        }
    }
}


export default PokemonPage;