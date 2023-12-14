

class MarvelServise {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.join();
    }

    getAllCharacteres = () => {
        return this.getResource('https://gateway.marvel.com:443/v1/public/characters?apikey=6cd0b5da891a48a4d3f5ae350908e21c');
    }
}