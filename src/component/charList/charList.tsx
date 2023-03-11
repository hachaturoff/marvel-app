import './charList.scss';
import '../../style/style.scss';
import MarvelService, {ItemsComicsType} from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type PropsType = {
    getCharId: (id: number) => void,
}

export type MapInitCharType =  {
    id: number,
    name: string,
    thumbnail: {
        path: string,
        extension: string
    },
}


let initChars: Array<MapInitCharType> = []

const CharList = (props : PropsType) => {
    let [characters , setCharacters] = useState(initChars)

    const onAllChar = (initChars: Array<MapInitCharType>) => {
        setCharacters(initChars)
    }

    const getCharacters = () => {
        const newMarvelService = new MarvelService()
        newMarvelService.getAllCharacters()
            .then(onAllChar)
            .catch(error)
    }
    const onGetCharId = (id: number) => {
        props.getCharId(id)
    }

    useEffect(() => {
        getCharacters()
    },[])


    let newCharacters = characters.map((char: MapInitCharType) => {
            return <li
                    onClick={()=> {onGetCharId(char.id)}}
                    key={char.id}
                    className="char__item">
                        <img src={char.thumbnail.path+ '.' + char.thumbnail.extension} alt="abyss"/>
                        <div className="char__name">{char.name}</div>
                    </li>
    })

    // const loading =

    return (
        <div className="char__list">
            <ul className="char__grid">
                {newCharacters}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default CharList;