import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelServise from '../../services/MarvelService';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(700);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelServise();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newCharList) => {
        setComicsList((charList) => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setComicsEnded(newCharList.length < 8);
    };

    const items = comicsList.map((item, i) => {
        return (
            <li className="comics__item" key={item.id}>
                <Link to={`/comics/${item.id}`}>
                    <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="comics__item-img"
                    />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
        );
    });

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">{items}</ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: comicsEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
