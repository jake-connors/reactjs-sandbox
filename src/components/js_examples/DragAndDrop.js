import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PopupNotifyHelper from "../PopupNotifyHelper";

function DragAndDrop() {
    const [option, setOption] = useState({});
    const [draggableItems1, setDraggableItems1] = useState([]);
    const [draggableItems2, setDraggableItems2] = useState([]);

    useEffect(() => {
        setDraggableItems1([{ id: "1", name: "123" },{ id: "2", name: "593" },{ id: "3", name: "3293" }]);
        setDraggableItems2([{ id: "4", name: "ABC" },{ id: "5", name: "99_777" },{ id: "6", name: "ZYZ" }]);
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
        const startDroppableId = result.source.droppableId;
        const endDroppableId = result.destination.droppableId;
        const startIndex = result.source.index;
        const endIndex = result.source.index;
        const endDraggableId = result.destination.index;
        if (!result.destination || (startIndex == endIndex && startDroppableId == endDroppableId)) {
            // if dropped outside the list
            return;
        }
        reorderItems(startDroppableId, endDroppableId, endDraggableId, startIndex, endIndex);
    }

    function reorderItems(startDroppableId, endDroppableId, endDraggableId, startIndex, endIndex) {       
        console.log('start drop id ', startDroppableId);
        console.log('end drop id ', endDraggableId);
        var tempDraggableItems1 = [...draggableItems1];
        var tempDraggableItems2 = [...draggableItems2];
        if (startDroppableId === endDroppableId) {
            if (startDroppableId == "1") {
                // UPPER to UPPER 
                let tempMoved = tempDraggableItems1[endDraggableId];
                tempDraggableItems1.splice(startIndex, 1);
                tempDraggableItems1.splice(endIndex, 0, tempMoved);
                setDraggableItems1[tempDraggableItems1];
            } else if (startDroppableId == "2") {
                // LOWER to LOWER
                let tempMoved = tempDraggableItems2[endDraggableId];
                tempDraggableItems2.splice(startIndex, 1);
                tempDraggableItems2.splice(endIndex, 0, tempMoved);
                setDraggableItems2[tempDraggableItems2];
            }
        } else {
            if (startDroppableId == "1") {
                // UPPER to LOWER
                let tempMoved = tempDraggableItems1[endDraggableId];
                tempDraggableItems1.splice(startIndex, 1);
                tempDraggableItems2.splice(endIndex, 0, tempMoved);
            } else if (startDroppableId == "2") {
                // LOWER to UPPER
                let tempMoved = tempDraggableItems2[endDraggableId];
                tempDraggableItems1.splice(endIndex, 0, tempMoved);
                tempDraggableItems2.splice(startIndex, 1);
            }
            setDraggableItems1[tempDraggableItems1];
            setDraggableItems2[tempDraggableItems2];
        }
    }

    return (
        <div id="drag-and-drop-container" className="form-group">
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
                                                // left:"auto !important",
                                                // top:"auto !important"
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
                                    {(providedDraggable2, snapshotDraggable2) => (
                                        <div
                                            ref={providedDraggable2.innerRef}
                                            {...providedDraggable2.draggableProps}
                                            {...providedDraggable2.dragHandleProps}
                                            style={{
                                                // some basic styles to make the items look a bit nicer
                                                userSelect: "none",

                                                // change background colour if dragging
                                                background: snapshotDraggable2.isDragging
                                                    ? "lightgreen"
                                                    : "grey",

                                                // styles we need to apply on draggables
                                                ...providedDraggable2.draggableProps.style,
                                                // left:"auto !important",
                                                // top:"auto !important"
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
