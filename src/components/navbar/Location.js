export default function Location({ displayLocation, isDesktop }) {
    
    return (
        <div id="location-container" className={isDesktop ? "vertical-middle" : ""}>
            <span>
                <i className="fa fa-location-dot" style={{ marginRight: "5px" }}></i>Location: {displayLocation}
            </span>
        </div>
    );
}