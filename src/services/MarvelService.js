import { useHttp } from '../hooks/http.hook';

const useMarvelServise = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=6cd0b5da891a48a4d3f5ae350908e21c';
    const _baseOffset = 320;

    const _transformCharacter = (char) => {
        let desc = char.description;
        if (desc === '') {
            desc = 'There is no description for this character';
        }
        if (desc.length > 160) {
            desc = `${desc.substr(0, 160)}...`;
        }

        return {
            id: char.id,
            name: char.name,
            description: desc,
            thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount
                ? `${comics.pageCount} p.`
                : 'No information about the number of pages',
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : 'Not available',
            thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
            language: comics.textObjects.language || 'en-us',
        };
    };

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getCharacterByName = async (name) => {
        const res = await request(
            `${_apiBase}characters?name=${name}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getCharacterComics = async (id) => {
        const res = await request(
            `${_apiBase}characters/${id}/comics?orderBy=modified&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(
            `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacter,
        getCharacterByName,
        getCharacterComics,
        getAllComics,
        getComic,
        clearError,
    };
};

export default useMarvelServise;
