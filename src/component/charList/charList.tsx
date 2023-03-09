import './charList.scss';
import '../../style/style.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type InitCharType = {
    name: string,
    thumbnail: {
        path: string,
        extension: string,
    }
}

let initChars: Array<InitCharType> = []

const CharList = () => {
    let [characters , setCharacters] = useState(initChars)

    const onAllChar = (initChars: Array<any>) => {
        setCharacters(initChars)
    }

    const getCharacters = () => {
        const newMarvelService = new MarvelService()
        newMarvelService.getAllCharacters()
            .then(onAllChar)
            .catch(error)
    }

    useEffect(() => {
        getCharacters()
    },[])
    console.log(characters)

    let newCharacters = characters.map((char: InitCharType) => {
        return <li className="char__item">
                    <img src={char.thumbnail.path+ '.' + char.thumbnail.extension} alt="abyss"/>
                    <div className="char__name">{char.name}</div>
                </li>
    })

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