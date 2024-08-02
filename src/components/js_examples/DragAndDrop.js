import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PopupNotifyHelper from "../PopupNotifyHelper";

function DragAndDrop() {
    const [draggableItems1, setDraggableItems1] = useState([]);
    const [draggableItems2, setDraggableItems2] = useState([]);

    useEffect(() => {
        const tempDraggableItems1 = [
            { id: "1", name: "123" },
            { id: "2", name: "593" },
            { id: 3, name: "xyz" }
        ];
        const tempDraggableItems2 = [
            { id: "4", name: "1111" },
            { id: "5", name: "999" },
            { id: 6, name:"abc" }
        ];
        setDraggableItems1(tempDraggableItems1);
        setDraggableItems2(tempDraggableItems2);
    }, []);

    function handleDropdownChange(opt) {
        console.log('opt ', opt);
        setOption(opt.target.value);
        PopupNotifyHelper.create_notification("test", "text-success");
    }

    const dropdownReact = (
        <select onChange={handleDropdownChange} value={option.value}>
            <option value={"123"}>{"123 dis"}</option>
            <option value={"456"}>{"456 dis"}</option>
            <option value={"789"}>{"789 dis"}</option>
        </select>
    );

    function onDragEnd(result) {
        console.log('result : ' ,result);
        if (
            !result.destination ||
            (result.source.index == result.destination.index &&
                result.source.droppableId == result.destination.droppableId)
        ) {
            // if dropped outside the list
            return;
        }

        const start = result.source.droppableId;
        const end = result.destination.droppableId;
        // If start is the same as end, we're in the same column
        if (start === end) {
            if (start == "droppable-1") {
                console.log('start 1 (start == end)');
            } else if (start == "droppable-2") {
                console.log('start 2 (start == end)');
            }
        } else {
            if (start == "droppable-1") {
                console.log('start 1 (start != end)');
            } else if (start == "droppable-2") {
                console.log('start 2 (start != end)');
            }
        }
    }

    return (
        <div className="form-group">
            <label>DragAndDrop</label>
            {dropdownReact}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="1">
                    {(providedDroppable, snapshotDroppable) => (
                        <div
                            {...providedDroppable.droppableProps}
                            ref={providedDroppable.innerRef}
                            style={{
                                background: snapshotDroppable.isDraggingOver ? "lightblue" : "lightgrey",
                                border: "1px solid black"
                            }}
                        >
                            {draggableItems1.map((item, i) => (
                                <Draggable key={i} index={parseInt(item.id)} draggableId={item.id.toString()}>
                                    {(providedDraggable, snapshotDraggable) => (
                                        <div
                                            ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps}
                                            {...providedDraggable.dragHandleProps}
                                            style={{
                                                // some basic styles to make the items look a bit nicer
                                                userSelect: "none",

                                                // change background colour if dragging
                                                background: snapshotDraggable.isDragging
                                                    ? "lightgreen"
                                                    : "grey",

                                                // styles we need to apply on draggables
                                                ...providedDraggable.draggableProps.style,
                                                left:"auto !important",
                                                top:"auto !important"
                                            }}
                                        >
                                            {"Name: " + item.name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {providedDroppable.placeholder}
                        </div>
                    )}
                </Droppable>
                <Droppable droppableId="2">
                    {(providedDroppable2, snapshotDroppable2) => (
                        <div
                            {...providedDroppable2.droppableProps}
                            ref={providedDroppable2.innerRef}
                            style={{
                                background: snapshotDroppable2.isDraggingOver ? "lightblue" : "lightgrey",
                                border: "1px solid black"
                            }}
                        >
                            {draggableItems2.map((item, i) => (
                                <Draggable key={i} index={parseInt(item.id)} draggableId={item.id.toString()}>
                                    {(providedDraggable, snapshotDraggable) => (
                                        <div
                                            ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps}
                                            {...providedDraggable.dragHandleProps}
                                            style={{
                                                // some basic styles to make the items look a bit nicer
                                                userSelect: "none",

                                                // change background colour if dragging
                                                background: snapshotDraggable.isDragging
                                                    ? "lightgreen"
                                                    : "grey",

                                                // styles we need to apply on draggables
                                                ...providedDraggable.draggableProps.style,
                                                left:"auto !important",
                                                top:"auto !important"
                                            }}
                                        >
                                            {"Name: " + item.name}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {providedDroppable2.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
export default DragAndDrop;
