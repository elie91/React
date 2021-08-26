import React, {useCallback, useState} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import debounce from "../../utils/debounce";
import {fetchSuggestionsStart, userInputEmpty} from "../../redux/suggestions/suggestions.actions";
import {createStructuredSelector} from "reselect";
import {selectIsSuggestionsVisible, selectSuggestionsError, selectSuggestionsResults} from "../../redux/suggestions/suggestions.selectors";
import './autocomplete.style.scss';
import Error from "../error/error.component";

const Autocomplete = ({suggestions, error, showSuggestions, fetchSuggestionsStart, userInputEmpty}) => {

    const history = useHistory();
    const [userInput, setUserInput] = useState("");

    const debouncedMemoized = useCallback(
        debounce(userInput => fetchSuggestionsStart(userInput), 500),
        [],
    );

    const handleChange = event => {
        setUserInput(event.target.value)
        debouncedMemoized(userInput)
    }

    const handleClick = (event, data) => {
        const urlSplitted = data.value.url.split('/');
        const id = urlSplitted[urlSplitted.length - 2];
        userInputEmpty();
        setUserInput(data.value.name ?? data.value.title);
        history.push(`/${data.type}/${id}`)
    }

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-lg-4 col-md-4 col-xs-12">
                {error && <Error error={error} />}
                <input
                    onChange={handleChange}
                    value={userInput}
                    placeholder="Rechercher dans l'alliance..."
                    className="form-control mt-5"
                />
                {showSuggestions && <>
                    {suggestions.length > 0 ?
                        <ul className="suggestions">
                            {suggestions.map((swapiType) => {
                                return swapiType.values.map((value, index) => {
                                    return <li onClick={(event) => handleClick(event, {type: swapiType.type, value})} key={index}>
                                        {value.name ? value.name : value.title}
                                    </li>
                                });
                            })}
                        </ul>
                        : <div className="no-suggestions">
                            <em>Aucune suggestion</em>
                        </div>}
                </>}
            </div>

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    suggestions: selectSuggestionsResults,
    showSuggestions: selectIsSuggestionsVisible,
    error: selectSuggestionsError
})

const mapDispatchToProps = dispatch => ({
    fetchSuggestionsStart: userInput => dispatch(fetchSuggestionsStart(userInput)),
    userInputEmpty: () => dispatch(userInputEmpty())
});

export default connect(mapStateToProps, mapDispatchToProps)(Autocomplete);