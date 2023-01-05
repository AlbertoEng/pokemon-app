import { useRouter } from 'next/router';
import { Card, Grid } from '@nextui-org/react';
import { FC } from 'react';


interface Props {
    id: string
}

export const FavoritePokemon: FC<Props> = ({ id }) => {

    const router = useRouter();

    const navegar = ( id: string )=>{
        router.push('/pokemon/' + id)
    }

    return (
        <>
            <Grid key={id} xs={6} sm={4} md={3} xl={1}>
                <Card isPressable isHoverable onClick={()=> navegar( id )}>
                    <Card.Body>
                        <Card.Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                            width={'100%'}
                            height={150}
                            alt={id}
                        />
                    </Card.Body>
                </Card>
            </Grid>
        </>
    )
}

