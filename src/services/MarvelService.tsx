import {InitType} from "../component/randomChar/randomChar";

const url = 'https://gateway.marvel.com:443/v1/public/characters'

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    _apiKeyFirst = 'apikey=267b1179b71f6d38f82bdbea4979092d'
    _apiKeySecond = 'apikey=0eea70cdb58e77d1fa09bb8a1a583ccf'
    _apiKeyThirty = 'apikey=f22649fb023de87918d21da0ffafbdff'

    getResource = async (url: string) => {
        let res = await fetch(url)
        if(!res.ok) {
            throw new Error('Error in server')
        }
        return await res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}?orderBy=-name&limit=5&offset=100&${this._apiKeyThirty}`)
        return res.data.result.map(this._transformCharacter)
    }

    getCharacter = async (id: number) => {
        const res = await this.getResource(`${url}/${id}?${this._apiKeyThirty}`)
        return this._transformCharacter(res.data.results[0])
    }
    // console.log("13:45 PM".split(' ')[0]); // Разделить по пробелу, взять первую часть
    // console.log("13:45 PM".match(/\d?\d:\d\d/)[0]); // совпадение по регулярному выражению
    // console.log("13:45 PM".substr(0, 5)); // 5 символов, начиная с 0го
    // console.log("13:45 PM".substring(0, 5)); // копировать по индексам [0:5)
    // console.log("13:45 PM".replace(/\s.*/, '')); // заменить пробел и всё, что дальше пустой строкой
    // console.log("13:45 PM".slice(0, -3));

    _transformCharacter = (res: InitType) => {
        if(!res.description.length) {
            res.description = 'Старик Ли умер и не успел придумать описание'
        }
        if(res.description.length > 200) {
            console.log(res.description.length + '...')
            res.description = res.description.slice(200, res.description.length) + ' ...'

        }
        return {
            name: res.name,
            description: res.description,
            thumbnail: {
                path: res.thumbnail.path,
                extension: res.thumbnail.extension,
            },
            homepage: res.resourceURI,
            resourceURI: res.resourceURI,
        }
    }
}

export default MarvelService

