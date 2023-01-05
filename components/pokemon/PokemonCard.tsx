import React from 'react'
import { FC } from 'react'
import {useRouter} from 'next/router'

import { Grid, Card, Text, Row } from '@nextui-org/react';

interface Props {
    id: number,
    img: string,
    name: string
}

export const PokemonCard: FC<Props> = ( { id, img, name } ) => {

    const router = useRouter();

    const navegar = ( pokemonId: number )=>{
        router.push(`name/${name}`)
    }


    return (
        <Grid onClick={()=> navegar(id)} xs={6} sm={3} md={2} xl={1} key={id}>
            <Card isHoverable isPressable>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row justify='space-between'>
                        <Text>{name}</Text>
                        <Text>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}



