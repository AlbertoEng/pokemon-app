import { useRouter } from 'next/router';
import { useTheme, Text, Image, Spacer, Button} from '@nextui-org/react'
import Link from 'next/link';


export const Navbar = () => {

    const { theme} = useTheme();

    const router = useRouter();

    const navegar = ()=>{
        router.push('/favoritos')
    }

    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 10px',
            backgroundColor: theme?.colors.gray50.value,
            position: 'sticky',
            top: '0px',
            zIndex: '10'
        }}>
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" 
                alt="imagen de pokemon charmander"
                objectFit="cover"
            />
            <Link style={{display: 'inline'}} href={'/'}>
                <Text h2 color='white' >Pokemon</Text>
            </Link>
            

            <Spacer css={{ flex: 1}}/>
            <Text onClick={()=> navegar()} css={{ 
                width:'150px', 
                padding: '10px', 
                cursor: 'pointer', 
                backgroundColor: '#111',
                borderRadius: '10px',
                'text-align': 'center'
            }} >
                Favoritos
            </Text>
        </div>
    )
}

