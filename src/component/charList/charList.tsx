import './charList.scss';
import '../../style/style.scss';
import MarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import ErrorMesasge from "../errorMessage/ErrorMesasge";
import Spinner from "../spinner/Spinner";

type PropsType = {
    getCharId: (id: number) => void,
}
type TypeInitChars = {
    charList: Array<MapInitCharType>,
    loading: boolean,
    error: boolean,
    newItemLoading: boolean,
    offset: number
}
export type MapInitCharType =  {
    id: number,
    name: string,
    thumbnail: {
        path: string,
        extension: string
    },
}
let initChars: TypeInitChars = {
    charList: [],
    loading: false,
    error: false,
    newItemLoading: false,
    offset: 210
}

const CharList = (props : PropsType) => {
    let [characters , setCharacters] = useState(initChars)

    // const onAllChar = (initChars: Array<MapInitCharType>) => {
    //     setCharacters({
    //         charList : initChars,
    //         loading: false,
    //         error: false,
    //         newItemLoading: false})
    // }
    const onGetCharId = (id: number) => {
        props.getCharId(id)
    }

    const onRequest = (offset: number = 210) => {
        onCharListLoading()
        const newMarvelService = new MarvelService()
        newMarvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(ErrorMesasge)
    }
    // const onError = () => {
    //     setCharacters({
    //         charList : [],
    //         loading: false,
    //         error: true,
    //         newItemLoading: false})
    // }
    // if (window.scrollY + document.documentElement.clientHeight  >= document.documentElement.scrollHeight ) {
    //     console.log('34')
    // }

    const onCharListLoading = () => {
        setCharacters({
            charList : characters.charList,
            loading: false,
            error: false,
            newItemLoading: true,
            offset: 210})
    }
    const onCharListLoaded = (newCharList: Array<MapInitCharType> ) => {
        setCharacters({
            charList : [...characters.charList, ...newCharList],
            loading: false,
            error: false,
            newItemLoading: false,
            offset: characters.offset + 9})
    }
    useEffect(() => {
        if (window.scrollY + document.documentElement.clientHeight  >= document.documentElement.scrollHeight ) {
            console.log('34')
        }
        onRequest()
    },[])

    let newCharacters = characters.charList.map((char: MapInitCharType) => {
            return <li
                    onClick={()=> {onGetCharId(char.id)}}
                    key={char.id}
                    className="char__item">
                        <img src={char.thumbnail.path+ '.' + char.thumbnail.extension} alt="abyss"/>
                        <div className="char__name">{char.name}</div>
                    </li>
    })

    const errorMessage = characters.error ? <ErrorMesasge/> : null
    const spinner = characters.loading ? <Spinner/> : null
    const content = !characters.error && !characters.loading
                ? <>
                    <ul className="char__grid">
                        {newCharacters}
                    </ul>
                    <button
                        onClick={( ) => onRequest(characters.offset)}
                        disabled={characters.newItemLoading}
                        className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
                </>
                : null
    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
        </div>
    )
}

export default CharList;