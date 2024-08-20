import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function DragDrop() {
    
    const [draggableItems1, setDraggableItems1] = useState([]);
    const [draggableItems2, setDraggableItems2] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        initDraggableLists();
    }, []);

    function initDraggableLists() {
        let list1 = [
            { id: "1", name: "1" },
            { id: "2", name: "2" },
            { id: "3", name: "3" }
        ];
        let list2 = [
            { id: "4", name: "ABC" },
            { id: "5", name: "XYZ" }
        ];
        setDraggableItems1(list1);
        setDraggableItems2(list2);
    }

    function onDragEnd(result) {
        console.log('result : ' ,result);
        setIsDragging(false);
        if (!result.destination || 
            (result.source.index == result.destination.index &&
                result.source.droppableId == result.destination.droppableId)
            ) {
            // if dropped outside the list
            return;
        }
        reorder(result);
    }

    function reorder(result) {
        const startDroppableId = result.source.droppableId;
        const endDroppableId = result.destination.droppableId;
        const startIndex = result.source.index ;
        const endIndex = result.destination.index;
        var tempDraggableItems1 = [...draggableItems1];
        var tempDraggableItems2 = [...draggableItems2];
        
        var tempMovedArray = [];
        if (startDroppableId == "1") {
            tempMovedArray = tempDraggableItems1.splice(startIndex, 1);
        } else if (startDroppableId == "2") {
            tempMovedArray = tempDraggableItems2.splice(startIndex, 1);
        }
        let tempMoved = tempMovedArray.length ? tempMovedArray[0] : {};
        if (endDroppableId == "1") {
            tempDraggableItems1.splice(endIndex, 0, tempMoved);
        } else if (endDroppableId == "2") {
            tempDraggableItems2.splice(endIndex, 0, tempMoved);
        }
        
        setDraggableItems1(tempDraggableItems1);
        setDraggableItems2(tempDraggableItems2);
    }

    return (
        <div id="drag-drop-container" className="row form-group">
            <h4 className="js-examples col-sm-12">Drag And Drop</h4>
            <button className="col-sm-12 btn btn-primary" onClick={initDraggableLists} style={{ marginLeft: "15px", fontSize: "12px" }}>Reset</button>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setIsDragging(true)}>
                <div className="col-sm-6">
                <Droppable droppableId="1">
                    {(providedDroppable, snapshotDroppable) => (
                        <div
                            {...providedDroppable.droppableProps}
                            ref={providedDroppable.innerRef}
                            style={{
                                background: snapshotDroppable.isDraggingOver || isDragging ? "lightblue" : "lightgrey",
                                border: "1px solid black"
                            }}
                        >
                            {draggableItems1.map((item, i) => (
                                <Draggable key={item.id} index={i} draggableId={item.id.toString()}>
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
                                                    : "transparent",

                                                // styles we need to apply on draggables
                                                ...providedDraggable.draggableProps.style,

                                                border: "2px solid"
                                            }}
                                        >
                                            <span>{item.name}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {providedDroppable.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
                <div className="col-sm-6">
                <Droppable droppableId="2">
                    {(providedDroppable2, snapshotDroppable2) => (
                        <div
                            {...providedDroppable2.droppableProps}
                            ref={providedDroppable2.innerRef}
                            style={{
                                background: snapshotDroppable2.isDraggingOver || isDragging ? "lightblue" : "lightgrey",
                                border: "1px solid black"
                            }}
                        >
                            {draggableItems2.map((item, i) => (
                                <Draggable key={item.id} index={i} draggableId={item.id.toString()}>
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
                                                    : "transparent",

                                                // styles we need to apply on draggables
                                                ...providedDraggable2.draggableProps.style,

                                                border: "2px solid"
                                            }}
                                        >
                                            <span style={{ padding: "4px", margin: "2px" }}>{item.name}</span>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {providedDroppable2.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}
export default DragDrop;