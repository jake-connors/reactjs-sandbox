import { useState, useEffect, useCallback, useRef } from "react";
import { Typeahead as NormalTypeahead, AsyncTypeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { autocomplete } from "../../api/general";

function Typeahead({ scrollToTable, isLoading, setIsLoading }) {
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTextNormal, setSearchTextNormal] = useState("");
    const [searchTextAsync, setSearchTextAsync] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [typeaheadOptions, setTypeaheadOptions] = useState([]);
    const [typeaheadNormalNotFound, setTypeaheadNormalNotFound] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchBy, setSearchBy] = useState("username");

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
        let newSelectedOptions = selectedOptions.filter((opt) => opt.id != option.id);
        setSelectedOptions(newSelectedOptions);
        let newTypeaheadOptions = [...typeaheadOptions, option];
        setTypeaheadOptions(newTypeaheadOptions);
        typeaheadRefNormal.current.clear();
        typeaheadRefNormal.current.focus();
    }

    function renderTypeaheadNormalNotFound() {
        setTypeaheadNormalNotFound(true);
        setTimeout(() => {
            setTypeaheadNormalNotFound(false);
        }, 1250);
    }

    async function handleAutocomplete(q, onEnterPress) {
        setIsLoading(true);
        let getObj = {
            mode: "users",
            q,
            searchBy
        };
        let resp = await autocomplete(getObj);
        console.log('resp ' , resp);
        console.log('on enter press ' , onEnterPress);
        setSearchResults(resp.data.results);
        setIsLoading(false);
    }

    function handleRadioSearchBy(value) {
        setSearchBy(value);
        setSearchTextAsync("");
        typeaheadRefAsync.current.clear();
        typeaheadRefAsync.current.focus();
    }

    return (
        <div id="typeahead-container" className="row form-group">
            <h4 className="js-examples col-sm-12">Normal Typeahead</h4>
            <NormalTypeahead
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
            <div className="clear10"></div>
            <div className="col-sm-12">
                <h4 className="js-examples col-sm-12">Async Typeahead
                    <button className="btn btn-primary" onClick={scrollToTable} style={{ marginLeft: "15px", fontSize: "12px" }}>Edit `Users`</button>
                </h4>
                <label className="col-sm-12" style={{ marginBottom: "5px" }}>
                    <small style={{ fontSize: "12px" }}>
                        <span>(Database `users` lookup + autocomplete)</span>
                    </small>
                </label>
                <div className="col-sm-12 form-group" style={{ marginBottom: "10px" }}>
                    <span className="radio-inline" style={{ fontWeight: "bold", paddingLeft: "5px", marginRight: "10px" }}>Search by:</span>
                    <label className="radio-inline" style={{ marginRight: "8px" }}>
                        <input 
                            type="radio"
                            value="username"
                            checked={searchBy === "username"}
                            onChange={() => handleRadioSearchBy("username")}
                            disabled={isLoading}
                            style={{ marginRight: "5px" }}
                        />
                        <span>Username</span>
                    </label>
                    <label className="radio-inline" style={{ marginRight: "8px" }}>
                        <input 
                            type="radio"
                            value="details"
                            checked={searchBy === "details"}
                            onChange={() => handleRadioSearchBy("details")}
                            disabled={isLoading}
                            style={{ marginRight: "5px" }}
                        />
                        <span>Details</span>
                    </label>
                    <label className="radio-inline" style={{ marginRight: "8px" }}>
                        <input 
                            type="radio"
                            value="username_or_details"
                            checked={searchBy === "username_or_details"}
                            onChange={() => handleRadioSearchBy("username_and_details")}
                            disabled={isLoading}
                            style={{ marginRight: "5px" }}
                        />
                        <span>Username or Details</span>
                    </label>
                </div>
                <AsyncTypeahead
                    id={"typeahead-async"}
                    className={"col-sm-12"}
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
                {isLoading && <span>is loading...</span>}
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

export default Typeahead;