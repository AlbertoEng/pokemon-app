import {useEffect, useState} from 'react'
import { Layout } from '../../components/layouts'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../../api'
import { PokemonFull, PokemonList } from '../../interfaces'
import { Button, Card, Grid, Spacer, Text } from '@nextui-org/react'
import { toggleFavorites, existInFavorites } from '../../utils'
import Head from 'next/head';
import confetti from 'canvas-confetti';

interface Props {
    pokemon: PokemonFull
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {


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


// generamos todas las rutas que queremos prerenderizar del lado del servidor 
export const getStaticPaths: GetStaticPaths = async()=>{


    const {data} = await pokeApi.get<PokemonList>(`/pokemon/?limit=151`)
    
    const listadoNames = data.results.map(( item )=>{
        const obj = {
            params: {name: item.name}
        }
        return obj
    });

    return {
        paths: listadoNames,
        fallback: 'blocking' 
    }
}

// generamos las props para cada pagina que se renderiza en el lado del servidor.
export const getStaticProps: GetStaticProps = async( ctx )=>{

    const {name} = ctx.params as {name: string};

    try {
        const {data} = await pokeApi.get<PokemonFull>(`pokemon/${name}`)
        const nuevoPokemon = {
            id: data.id,
            name: data.name,
            sprites: data.sprites,
            abilities: data.abilities
        }
    
        // revalidate es para incremental static regeneration
        return {
            props: {
                pokemon: nuevoPokemon
            },
            revalidate: 10  
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

export default PokemonNamePage;