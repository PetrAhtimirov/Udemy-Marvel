import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './charList.scss';
import MarvelServise from '../../services/MarvelService';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelServise();

    componentDidMount() {
        this.updateChars();
    }

    componentWillUnmount() {
        
    }

    onCharsLoaded = (chars) => {
        console.log(chars);
        this.setState({chars, loading: false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateChars = () => {
        this.setState({loading: true, error: false});

        this.marvelService
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    render () {
        const {chars, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;

        const elements = chars.map(item => {
            return (
                <li 
                    className="char__item" 
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt={item.name}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })
        const content = !(loading || error) ? elements : null;
        
        
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;