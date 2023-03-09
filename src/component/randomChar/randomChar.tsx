import '../../style/style.scss';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {useEffect, useState} from "react";
import MarvelService, {ResType} from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import {Simulate} from "react-dom/test-utils";
import ErrorMesasge from '../errorMessage/ErrorMesasge';


export type InitType = {
    char: {
        name: string,
        description: string,
        thumbnail: {
            path: string,
            extension: string
        },
        homepage: string,
        resourceURI: string,
    },
    loading: boolean,
    error: boolean
}

const RandomChar = () => {

    const init: InitType = {
       char: {
           name: '',
           description: '',
           thumbnail: {
               path: '',
               extension: '',
           },
           homepage: '',
           resourceURI: '',
       },
        loading: true,
        error: false
    }


    let [character , setCharacter] = useState(init)

    const onCharLoaded = (char: ResType) => {
        setCharacter({char , loading: false, error: false})
    }

    const onError = (char: ResType ) => {
        setCharacter({char , loading: false, error: true})
    }
    // console.log('ji')

    const onLoad = () => {
        setCharacter({
            ...init,
            loading: true,
            error: false
        })
    }
    const onRandomCharacter = () => {
        onLoad()
        const newMarvelService = new MarvelService()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

        newMarvelService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)

    }

    useEffect(() => {
        onRandomCharacter()
    },[])

    const errorMessage = character.error ? <ErrorMesasge/> : null
    const spinner = character.loading ? <Spinner/> : null
    const content = !character.error && !character.loading
        ? <div className="randomchar__block">
            <img src={character.char.thumbnail.path + '.' + character.char.thumbnail.extension} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{character.char.name}</p>
                <p className="randomchar__descr">
                    {character.char.description}
                </p>
                <div className="randomchar__btns">
                    <a href={character.char.homepage} className="button button__main">
                        <div className="inner">HomePage</div>
                    </a>
                    <a href={character.char.resourceURI} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        : null;

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
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