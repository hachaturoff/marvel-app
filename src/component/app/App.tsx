import '../../style/style.scss';

import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";


import decoration from '../../resources/img/vision.png';
import {useState} from "react";

const App = () => {

    let [charId, setCharId] = useState(1011360)

    const getCharId = (id: number) => {
        setCharId(id)
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList getCharId={getCharId}/>
                    <CharInfo charId={charId}/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;