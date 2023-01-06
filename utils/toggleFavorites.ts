

export const toggleFavorites = ( targetId: string )=>{

    
    let listaFavoritos: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    if( listaFavoritos.includes( targetId )){
        listaFavoritos = listaFavoritos.filter(( id: string )=>{
            return targetId !== id;
        })
    }else{
        listaFavoritos.push(targetId);
    }

    localStorage.setItem('favorites', JSON.stringify(listaFavoritos));

    return listaFavoritos;

}


export const existInFavorites = ( targetId: string ): boolean=>{

    if( typeof window === undefined) return false;
    let listaFavoritos = JSON.parse(localStorage.getItem('favorites') || '[]');
    if(listaFavoritos.includes(targetId)){
        return true;
    }else{
        return false;
    }
}

export const obtenerFavoritos = ()=>{
    let listaFavoritos: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    return listaFavoritos;
}
