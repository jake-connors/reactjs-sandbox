import { connect } from "react-redux";
import { forwardRef } from "react";
import PopupNotify from "../components/frontend/PopupNotify";
import DragAndDrop from "../components/frontend/DragAndDrop";

function Frontend() {
    return (
        <div>
            <div className="row">
                <h2 className="col-sm-12">Frontend</h2>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <Typeahead />
                </div>
                <div className="col-sm-6">
                    <DragAndDrop />
                </div>
                <div className="col-sm-6">
                    <Popper />
                </div>
                <div className="col-sm-6">
                    <PopupNotify />
                </div>
            </div>
            <div className="row">
                <Table />
            </div>
        </div>
    );
}

function Typeahead() {
    return (
        <>
            <label>Typeahead</label>
        </>
    );
}

function Popper() {
    return (
        <>
            <label>Popper</label>
        </>
    );
}

function Table() {
    return (
        <>
            <label>Table</label>
        </>
    );
}

export default forwardRef(connect()(Frontend));