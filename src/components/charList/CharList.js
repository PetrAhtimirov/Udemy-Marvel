import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelServise from '../../services/MarvelService';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(324);
    const [charEnded, setChatEnded] = useState(false);

    const marvelService = new MarvelServise();

    useEffect(() => {
        onRequest();
    }, []);

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onCharListLoaded = (newCharList) => {
        setCharList((charList) => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset((offset) => offset + 9);
        setChatEnded(newCharList.length < 9);
    };

    const onError = () => {
        setLoading(false);
        setError(true);
    };

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService
            .getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach((item) =>
            item.classList.remove('char__item__selected')
        );
        itemRefs.current[id].classList.add('char__item__selected');
        itemRefs.current[id].focus();
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;

    const elements = charList.map((item, i) => {
        return (
            <li
                className="char__item"
                tabIndex={0}
                key={item.id}
                ref={(el) => (itemRefs.current[i] = el)}
                onClick={() => {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                }}
                onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }
                }}
            >
                <img src={item.thumbnail} alt={item.name} />
                <div className="char__name">{item.name}</div>
            </li>
        );
    });

    const content = !(loading || error) ? elements : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">{content}</ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    charId: PropTypes.number,
};

export default CharList;
