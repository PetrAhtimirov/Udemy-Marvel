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

    return { loading, error, getAllCharacters, getCharacter, clearError };
};

export default useMarvelServise;
