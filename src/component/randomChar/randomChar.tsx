import '../../style/style.scss';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import MarvelService from "../../services/MarvelService";

export type InitType = {
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    homepage: string,
    resourceURI: string,
}

const RandomChar = () => {

    const init: InitType = {
        name: '',
        description: '',
        thumbnail: {
            path: '',
            extension: '',
        },
        homepage: '',
        resourceURI: '',
    }

    let [character , setCharacter] = useState(init)

    const onCharLoaded = (res: InitType) => {
        setCharacter(res)

    }

    const onRandomCharacter = () => {
        const newMarvelService = new MarvelService()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        newMarvelService.getCharacter(id)
            .then(onCharLoaded)}

    // useEffect(() => {
    //     onRandomCharacter()
    // })

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={character.thumbnail.path + '.' + character.thumbnail.extension} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{character.name}</p>
                    <p className="randomchar__descr">
                        {character.description}
                    </p>
                    <div className="randomchar__btns">
                        <a href={character.homepage} className="button button__main">
                            <div className="inner">HomePage</div>
                        </a>
                        <a href={character.resourceURI} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    onClick={onRandomCharacter}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;