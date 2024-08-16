import { useState, useEffect, useCallback, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';

function Typeaheads({ scrollToTable }) {
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const [typeaheadOptions, setTypeaheadOptions] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const typeaheadRef = useRef(null);
    const fromRef = useRef(null);

    useEffect(() => {
        setTypeaheadOptions([{ id: "1", value: "123"}, {id: "2", value: "abc"}, {id: "3", value: "zyx"}]);
    }, []);

    const handleSearchEnter = useCallback(
        (e) => {
            if (e.keyCode === 13 && activeIndex === -1) {
                if (searchText.trim() !== "") {
                    if (typeaheadRef.current.state.initialItem !== undefined) {
                        let foundOption = typeaheadRef.current.state.initialItem;
                        if (!selectedOptions.some((opt) => opt.id == foundOption.id)) {
                            let newSelectedOptions = [...selectedOptions, foundOption];
                            setSelectedOptions(newSelectedOptions);
                            setTypeaheadOptions(typeaheadOptions.filter((opt) => opt.id != foundOption.id));
                        }
                    } else {
                        renderNotFound();
                    }
                }
                setSearchText("");
                typeaheadRef.current.clear();
            }
        },
        [activeIndex, searchText, selectedOptions]
    );

    const ActiveIndexWatcher = ({ update }) => {
        useEffect(update);
        return null;
    };

    function handleOnChange(newSelected) {
        console.log('e ' , newSelected);
        if (newSelected.length && newSelected[0].id != undefined) {
            if (!selectedOptions.some((opt) => opt.id == newSelected[0].id)) {
                let newSelectedOptions = [...selectedOptions, newSelected[0]];
                setSelectedOptions(newSelectedOptions);
                setTypeaheadOptions(typeaheadOptions.filter((opt) => opt.id != newSelected[0].id));
            }   
        }
        setSearchText("");
        typeaheadRef.current.clear();
        typeaheadRef.current.focus();
    }

    function handleDeleteSelectedOption(option) {
        console.log('del opt ' , option);
        let newSelectedOptions = selectedOptions.filter((opt) => opt.id != option.id);
        setSelectedOptions(newSelectedOptions);
        let newTypeaheadOptions = [...typeaheadOptions, option];
        setTypeaheadOptions(newTypeaheadOptions);
    }

    function renderNotFound() {
        setNotFound(true);
        setTimeout(() => {
            setNotFound(false);
        }, 1250);
    }

    return (
        <div id="typeahead-container" className="row form-group">
            <label className="js-examples col-sm-12">Typeahead</label>
            <Typeahead
                id="typeahead1"
                className="col-sm-12"
                labelKey={"value"}
                ref={typeaheadRef}
                options={typeaheadOptions}
                placeholder="Search..."
                onChange={handleOnChange}
                onInputChange={(text) => {
                    setSearchText(text);
                    fromRef.current = text;
                }}
                onKeyDown={handleSearchEnter}
            />
            <ActiveIndexWatcher update={() => setActiveIndex(activeIndex)} />
            <div className="col-sm-12" id="output">
                {notFound && <span style={{color: "red"}}>Not Found!</span>}
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
                    <small style={{ fontSize: "12px" }}>(Database `users` lookup + autocomplete)</small>
                </label>
                <input type="text" readOnly />
            </div>
        </div>
    );
}
export default Typeaheads;
