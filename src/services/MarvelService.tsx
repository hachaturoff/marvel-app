// import {InitType} from "../component/randomChar/randomChar";
export type ResType = {
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    homepage: string,
    resourceURI: string,
}
export type ResultsType = {
    name: string,
    description: string,
    thumbnail: {
        path: string,
        extension: string
    },
    homepage: string,
    resourceURI: string,
}
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

        const res = await this.getResource(`${url}?limit=9&${this._apiKeyThirty}`)
        // console.log(res.data.results)
        // return this._transformCharacters(res.data.results)
        return res.data.results
    }

    getCharacter = async (id: number) => {
        const res = await this.getResource(`${url}/${id}?${this._apiKeyThirty}`)
        return this._transformCharacter(res.data.results[0])
    }

    _transformCharacter = (res: ResType) => {
        // console.log(res)
        if(!res.description.length) {
            res.description = 'Старик Ли умер и не успел придумать описание'
        }
        if(res.description.length > 200) {
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
                resourceURI: res.resourceURI
        }
    }
    // _transformCharacters = (res: Array<ResType>) => {
    //     // console.log(res)
    //     return [
    //         {
    //             name: res.name,
    //             thumbnail: {
    //                 path: res.thumbnail.path,
    //                 extension: res.thumbnail.extension,
    //             },
    //             homepage: res.resourceURI,
    //             resourceURI: res.resourceURI
    //
    //     ]
    // }
}

export default MarvelService

