import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter, getCharacterComics, clearError } =
        useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = async () => {
        clearError();
        const { charId } = props;
        if (!charId) {
            return;
        }

        let char = await getCharacter(charId);
        char.comics = await getCharacterComics(charId);
        onCharLoaded(char);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    let imageClasses = '';
    if (
        thumbnail ===
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    ) {
        imageClasses += ' not_found';
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={imageClasses} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.slice(0, 10).map((item, i) => {
                    return (
                        <li key={i} className="char__comics-item">
                            <Link to={`/comics/${item.id}`}>{item.title}</Link>
                        </li>
                    );
                })}
                {comics.length === 0
                    ? 'There is no comics with this character'
                    : null}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    onCharSelected: PropTypes.number,
};

export default CharInfo;
