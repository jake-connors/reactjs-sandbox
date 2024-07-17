import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

function PopperHelper(
    {
        referenceElement, // the "anchor" element the popper will position itself to
        children, // contents of the pop up
        popperClassName = "",
        popperStyle = {},
        externalClickCloses = true, // if true, any mouse click outside of the pop up will close the popper
        popperPlacement = "bottom", // top, left, right, bottom, bottom-start, etc.
        popperTrigger = "click", // change the event from click to hover
        portalId = "", // if the popper needs to use a separate dom element (see: https://popper.js.org/react-popper/v2/react-portals/)
        onOpen = null, // function called when popper opens
        onClose = null, // function called when popper closes
        onRefElemClick = null, // function called when the reference element is clicked
        onClickOutside = null, // function called when click outside of popper occurs
    },
    ref
) {
    const helperRef = useRef(null);

    const [isOpen, setIsOpen] = useState(-1);
    const [innerReferenceElement, setInnerReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);

    const { styles: generatedStyles, attributes: generatedAttributes } = usePopper(
        innerReferenceElement,
        popperElement,
        {
            placement: popperPlacement,
        }
    );

    useEffect(() => {
        if (onOpen !== null && isOpen === true) {
            onOpen();
        }
        if (onClose !== null && isOpen === false) {
            onClose();
        }
        return handleOpenCloseEvents();
    }, [isOpen]);

    // make functions available to the parent component
    useImperativeHandle(ref, () => ({
        close: () => {
            setIsOpen(false);
        },
        open: () => {
            setIsOpen(true);
        },
        isOpen: () => {
            return isOpen;
        },
    }));

    function handleOpenCloseEvents() {
        return handleWindowListeners();
    }

    function handleWindowListeners() {
        if (isOpen === true) {
            // set up a listener that will allow us to close the
            // the popper when the window is clicked outside of the popper
            // need a small timeout to prevent the original click registering
            setTimeout(() => {
                window.addEventListener("click", handleWindowClick);
            }, 100);
        }

        // useEffect cleanup function (needed to unset the listener)
        return function cleanup() {
            window.removeEventListener("click", handleWindowClick);
        };
    }

    function handleWindowClick(e) {
        // check whether the click was outside the popper. If so, close it.
        if (helperRef.current && !helperRef.current.contains(e.target)) {
            if (externalClickCloses === true) {
                setIsOpen(false);
            }

            if (onClickOutside !== null) {
                onClickOutside(e);
            }
        }
    }

    function renderPopperElement(child) {
        if (isOpen === false || isOpen === -1) return "";
        if (portalId !== "") {
            return createPortal(child, document.querySelector(`#${portalId}`));
        } else {
            return child;
        }
    }

    return (
        <span>
            <span
                ref={setInnerReferenceElement}
                onClick={
                    popperTrigger === "click"
                        ? () => {
                              let thisIsOpen = isOpen;
                              if (thisIsOpen === -1) {
                                  thisIsOpen = false;
                              }
                              if (onRefElemClick !== null) {
                                  onRefElemClick(thisIsOpen);
                              }
                              setIsOpen(!thisIsOpen);
                          }
                        : null
                }
                onMouseEnter={
                    popperTrigger === "hover"
                        ? () => {
                              if (onRefElemClick !== null) {
                                  onRefElemClick(true);
                              }
                              setIsOpen(true);
                          }
                        : null
                }
            >
                {referenceElement}
            </span>

            {renderPopperElement(
                <div
                    className="popper-container"
                    ref={setPopperElement}
                    style={{ ...generatedStyles.popper, ...popperStyle }}
                    {...generatedAttributes.popper}
                >
                    <div className={popperClassName} ref={helperRef}>
                        {children}
                    </div>
                </div>
            )}
        </span>
    );
}

export default forwardRef(PopperHelper);