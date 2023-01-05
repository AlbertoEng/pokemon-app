
import { NextPage } from 'next';
import { useEffect, useState, FC } from 'react'
import { Layout } from '../../components/layouts';
import { obtenerFavoritos } from '../../utils'

import { Grid } from '@nextui-org/react';

import { FavoritePokemon } from '../../components/pokemon';


export const FavoritosPage : NextPage = (props) => {

    const [listaFavoritos, setListaFavoritos] = useState<any>([]);


    useEffect(()=>{
        setListaFavoritos(obtenerFavoritos());
    },[])


    

    return (
        <Layout>
            <Grid.Container gap={2} >
                {
                    !listaFavoritos
                    ? 'no hay favoritos'
                    : listaFavoritos.map(( id: string )=>(
                        <FavoritePokemon key={id} id={id}/>
                    ))
                    
                }
            </Grid.Container>
        </Layout>
    )
}

export default FavoritosPage;

