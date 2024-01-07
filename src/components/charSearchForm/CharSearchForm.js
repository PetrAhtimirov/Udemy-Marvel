import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikError } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServise from '../../services/MarvelService';
import './charSearchForm.scss';

const CharSearchForm = () => {
    const [searchedChar, setSearchedChar] = useState({});

    const { getCharacterByName, error, clearError } = useMarvelServise();

    const onSearch = async (charName) => {
        clearError();

        const char = (await getCharacterByName(charName))[0];
        setSearchedChar(char);
    };

    const results = searchedChar ? (
        searchedChar.name ? (
            <div className="char__search-wrapper">
                <div className="char__search-success">
                    There is! Visit {searchedChar.name} page?
                </div>
                <Link
                    to={`/characters/${searchedChar.id}`}
                    className="button button__secondary"
                >
                    <div className="inner">To page</div>
                </Link>
            </div>
        ) : null
    ) : (
        <div className="char__search-error">
            The character was not found. Check the name and try again
        </div>
    );

    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{ charName: '' }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('Обязательное поле!'),
                })}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={({ charName }) => onSearch(charName)}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">
                        Or find a character by name:
                    </label>
                    <div className="char__search-wrapper">
                        <Field
                            id="charName"
                            name="charName"
                            type="text"
                            placeholder="Enter name"
                            validate={(value) => {
                                if (value === '') {
                                    setSearchedChar({});
                                }
                            }}
                        />
                        <button type="submit" className="button button__main">
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikError
                        component="div"
                        className="char__search-error"
                        name="charName"
                    />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
};

export default CharSearchForm;
