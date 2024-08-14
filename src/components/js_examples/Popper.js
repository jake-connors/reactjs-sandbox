import { useState, useRef } from "react";
import PopperHelper from "../PopperHelper";

function Popper() {
    const [refClickStatus, setRefClickStatus] = useState("");
    const [windowClickStatus, setWindowClickStatus] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);

    function handleRefElemClick(isOpen) {
        setRefClickStatus(
            <p>
                The "Click Me!" button was clicked, causing the popper to:{" "}
                {isOpen === true ? "OPEN" : "CLOSE"}
            </p>
        );
    }

    function handleClickOutside() {
        setWindowClickStatus(true);
        setRefClickStatus("");
    }

    function handleClose() {
        setOpenStatus(false);
    }

    function handleOpen() {
        setWindowClickStatus(false);
        setOpenStatus(true);
    }

    return (
        <div id="popper-container-outer" className="row form-group">
            <label className="js-examples col-sm-12">Popper</label>
            <div id="popper-container-inner">
                <div id="popper-content">
                    <EventPopper
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                        handleRefElemClick={handleRefElemClick}
                        handleClickOutside={handleClickOutside}
                    />
                    <br />
                    <br />
                    <PortalPopper />
                    <br />
                    <br />
                    <NestedPopper />
                </div>
            </div>
            <small>
                <p>
                    The first popper is:{" "}
                    {openStatus === true ? "OPEN" : "CLOSED"}
                </p>
                {refClickStatus}
                {windowClickStatus === true && (
                    <p>
                        The first popper was closed by clicking in the window
                        outside of it.
                    </p>
                )}
            </small>
        </div>
    );
}

function EventPopper() {
    const myRef = useRef(null);

    function togglePopper() {
        const isOpen = myRef.current.isOpen();
        if (!isOpen) {
            myRef.current.open();
        } else {
            myRef.current.close();
        }
    }

    return (
        <>
            <PopperHelper
                referenceElement={<button className="btn btn-primary">Event Popper!</button>}
                ref={myRef}
                popperClassName="popper-basic"
                popperStyle={{ zIndex: 100 }}
                //popperArrowStyle={{ left: "-8px" }}
                popperPlacement="top"
                popperPlacementForce={false}
                onOpen={handleOpen}
                onClose={handleClose}
                onRefElemClick={handleRefElemClick}
                onClickOutside={handleClickOutside}
            >
                Test!
            </PopperHelper>{" "}
            <span onClick={togglePopper}>(Click to toggle)</span>
        </>
    );
}

function PortalPopper() {
    const myRef = useRef(null);

    return (
        <PopperHelper
            referenceElement={<button className="btn btn-primary">Portal Popper!</button>}
            ref={myRef}
            popperClassName="popper-basic popper-light"
            popperFadeBackground={true}
            popperStyle={{ zIndex: 101 }}
            popperPlacement="top"
            popperPlacementForce={true}
            portalId="portal"
        >
            <>
                I'm the second popper. I exist in a separate dom element using
                React.createPortal
                <div className="clear5" />
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="type in here"
                    />
                </div>
            </>
        </PopperHelper>
    );
}

function NestedPopper() {
    const ref1 = useRef(null);
    const ref2 = useRef(null);

    function createSubs() {
        let subs = [];
        for (let index = 0; index < 5; index++) {
            let msg = "hover over me" + "!".repeat(index);
            subs.push(
                <div key={index} style={{ padding: 5 }}>
                    <PopperHelper
                        referenceElement={<div>{msg}</div>}
                        ref={ref2}
                        popperClassName="popper-basic"
                        popperStyle={{ zIndex: 101 }}
                        popperPlacement="right"
                        popperTrigger="hover"
                        popperChild={ref2}
                        popperModifiers={[
                            { name: "offset", options: { offset: [10, 30] } },
                        ]}
                        portalId="portal"
                    >
                        sub value
                    </PopperHelper>
                </div>
            );
        }
        return subs;
    }
    
    return (
        <PopperHelper
            referenceElement={<button className="btn btn-primary">Nested Popper!</button>}
            ref={ref1}
            popperClassName="popper-basic"
            popperStyle={{ zIndex: 101 }}
            popperPlacement="bottom"
            popperPlacementForce={false}
            portalId="portal"
        >
            <>{createSubs()}</>
        </PopperHelper>
    );
}

export default Popper;
