import { useState, useEffect, useCallback, useRef } from "react";
import { Typeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { autocomplete } from "../../api/general";

function Typeaheads({ scrollToTable }) {
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTextNormal, setSearchTextNormal] = useState("");
    const [searchTextAsync, setSearchTextAsync] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [typeaheadOptions, setTypeaheadOptions] = useState([]);
    const [typeaheadNormalNotFound, setTypeaheadNormalNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const typeaheadRefNormal = useRef(null);
    const typeaheadRefAsync = useRef(null);
    const fromRefNormal = useRef(null);
    const fromRefAsync = useRef(null);

    useEffect(() => {
        setTypeaheadOptions([{ id: "1", value: "123"}, {id: "2", value: "abc"}, {id: "3", value: "zyx"}]);
    }, []);

    const handleSearchEnterNormal = useCallback(
        (e) => {
            if (e.keyCode === 13 && activeIndex === -1) {
                if (searchTextNormal.trim() !== "") {
                    if (typeaheadRefNormal.current.state.initialItem !== undefined) {
                        let foundOption = typeaheadRefNormal.current.state.initialItem;
                        if (!selectedOptions.some((opt) => opt.id == foundOption.id)) {
                            let newSelectedOptions = [...selectedOptions, foundOption];
                            setSelectedOptions(newSelectedOptions);
                            setTypeaheadOptions(typeaheadOptions.filter((opt) => opt.id != foundOption.id));
                        }
                    } else {
                        renderTypeaheadNormalNotFound();
                    }
                }
                setSearchTextNormal("");
                typeaheadRefNormal.current.clear();
            }
        },
        [activeIndex, searchTextNormal, selectedOptions]
    );

    const handleSearchEnterAsync = useCallback(
        (e) => {
            if (e.keyCode === 13 && activeIndex === -1) {
                setSearchResults([]);
                typeaheadRefAsync.current.clear();
                handleAutocomplete(searchTextAsync, true);
            }
        },
        [activeIndex, searchTextAsync]
    );

    const ActiveIndexWatcher = ({ update }) => {
        useEffect(update);
        return null;
    };

    function handleOnChangeNormal(newSelected) {
        console.log('e ' , newSelected);
        if (newSelected.length && newSelected[0].id != undefined) {
            if (!selectedOptions.some((opt) => opt.id == newSelected[0].id)) {
                let newSelectedOptions = [...selectedOptions, newSelected[0]];
                setSelectedOptions(newSelectedOptions);
                setTypeaheadOptions(typeaheadOptions.filter((opt) => opt.id != newSelected[0].id));
            }   
        }
        setSearchTextNormal("");
        typeaheadRefNormal.current.clear();
        typeaheadRefNormal.current.focus();
    }

    function handleDeleteSelectedOption(option) {
        console.log('del opt ' , option);
        let newSelectedOptions = selectedOptions.filter((opt) => opt.id != option.id);
        setSelectedOptions(newSelectedOptions);
        let newTypeaheadOptions = [...typeaheadOptions, option];
        setTypeaheadOptions(newTypeaheadOptions);
    }

    function renderTypeaheadNormalNotFound() {
        setTypeaheadNormalNotFound(true);
        setTimeout(() => {
            setTypeaheadNormalNotFound(false);
        }, 1250);
    }

    async function handleAutocomplete(q, onEnterPress) {
        setIsLoading(true);
        let resp = await autocomplete(q, "users");
        console.log('resp ' , resp);
        console.log('on enter press ' , onEnterPress);
        setSearchResults(resp.data.results);
        setIsLoading(false);
    }

    return (
        <div id="typeahead-container" className="row form-group">
            <label className="js-examples col-sm-12">Typeahead</label>
            <Typeahead
                id="typeahead-normal"
                className="col-sm-12"
                labelKey={"value"}
                ref={typeaheadRefNormal}
                options={typeaheadOptions}
                placeholder="Search..."
                onChange={handleOnChangeNormal}
                onInputChange={(text) => {
                    setSearchTextNormal(text);
                    fromRefNormal.current = text;
                }}
                onKeyDown={handleSearchEnterNormal}
            />
            <ActiveIndexWatcher update={() => setActiveIndex(activeIndex)} />
            <div className="col-sm-12" id="output-normal">
                {typeaheadNormalNotFound && <span style={{color: "red"}}>Not Found!</span>}
                {selectedOptions.map((opt, i) => (
                    <div key={i}>
                        <span>{opt.value}</span>
                        <button className="btn btn-danger" onClick={() => handleDeleteSelectedOption(opt)}>X</button>
                    </div>
                ))}
            </div>
            <div className="col-sm-12">
                <label className="col-sm-12" style={{ marginTop: "5px" }}>Async Typeahead
                    <button className="btn btn-primary" onClick={scrollToTable} style={{ marginLeft: "15px", fontSize: "12px" }}>Edit</button>
                </label>
                <label className="col-sm-12" style={{ marginBottom: "5px" }}>
                    <small style={{ fontSize: "12px" }}>
                        <span>(Database `users` lookup + autocomplete)</span>
                    </small>
                </label>
                <span className="col-sm-2">Dropdown for "options"</span>
                <AsyncTypeahead
                    id={"typeahead-async"}
                    className={"col-sm-10"}
                    ref={typeaheadRefAsync}
                    labelKey={"username"}
                    placeholder={"Search Users..."}
                    minLength={1}
                    delay={50}
                    promptText={"Press enter to wildcard search users..."}
                    isLoading={isLoading}
                    options={searchResults}
                    onSearch={handleAutocomplete}
                    onInputChange={(text) => {
                        setSearchTextAsync(text);
                        fromRefAsync.current = text;
                        handleAutocomplete(text, false);
                    }}
                    onKeyDown={handleSearchEnterAsync}
                    renderMenuItemChildren={(user) => (
                        <AsyncTypeaheadMenuItem
                            user={user}
                        />
                    )}
                />
                <div className="col-sm-12" id="output-async">
                    <p>output here...</p>
                </div>
            </div>
        </div>
    );
}

function AsyncTypeaheadMenuItem({ user }) {
    return (
        <>
            {user.id + " " + user.username + " " + user.details}
        </>
    );
}

export default Typeaheads;
