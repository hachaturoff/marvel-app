import './charInfo.scss';
import '../../style/style.scss';

import MarvelService, {ResType} from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {InitType} from "../randomChar/randomChar";
import ErrorMesasge from "../errorMessage/ErrorMesasge";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/skeleton";

type PropsType = {
    charId: number
}

const CharInfo = (props: PropsType) => {
    const init: InitType = {
        char: {
            id: 0,
            name: '',
            description: '',
            comics: {
                available: 0,
                items: [],
            },
            thumbnail: {
                path: '',
                extension: '',
            },
            homepage: '',
            resourceURI: '',
        },
        loading: true,
        error: false
    } || null

    let [character , setCharacter] = useState(init)

    const onSetChar = (char: ResType) => {
        setCharacter({char , loading: false, error: false})
    }
    const onError = (char: ResType ) => {
        setCharacter({char , loading: false, error: true})
    }

    const onLoad = () => {
        setCharacter({
            ...init,
            loading: true,
            error: false
        })
    }

    const getChar = (id : number) => {
        onLoad()
        if(!id) {
            return;
        }
        const marvelService = new MarvelService()

        marvelService.getCharacter(id)
            .then(onSetChar)
            .catch(onError)
    }

    useEffect(() => {
        getChar(props.charId)
    },[props.charId])



    let comics = character.char.comics.items.map((item, index) => {

        if (index < 10) {
            return <li
                    key={index}
                    className="char__comics-item">
                    <a href={item.resourceURI}>{item.name}</a>
                </li>
        }
    })
    const skeleton = character.char || character.error || character.loading ? null : <Skeleton/>
    const errorMessage = character.error ? <ErrorMesasge/> : null
    const spinner = character.loading ? <Spinner/> : null
    const content = !(character.loading || character.error || !character.char)
                            ? <>
                                <div className="char__basics">
                                    <img src={character.char.thumbnail.path+ '.' + character.char.thumbnail.extension} alt="abyss"/>
                                    <div>
                                        <div className="char__info-name">{character.char.name}</div>
                                        <div className="char__btns">
                                            <a href={character.char.homepage} className="button button__main">
                                                <div className="inner">homepage</div>
                                            </a>
                                            <a href={character.char.resourceURI} className="button button__secondary">
                                                <div className="inner">Wiki</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="char__descr">{character.char.description}</div>
                                <div className="char__comics">Comics:</div>
                                <ul className="char__comics-list">
                                    {comics}
                                </ul>
                            </>
                            : null

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

export default CharInfo;