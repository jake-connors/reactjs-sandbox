import { connect } from "react-redux";

function Location({ user_info }) {

    const showLocation = user_info.ip != undefined && user_info.ip.ip_address != undefined && user_info.ip.ip_address !== "";
    
    return (
        <>
        {showLocation && (
            <div id="location-container" className="vertical-middle">
                <span>
                    <i className="fa fa-location-dot" style={{ marginRight: "5px" }}></i>Location: {user_info.ip.display_location}
                </span>
            </div>
        )}
        </>
    );
}

function mapStateToProps(state) {
    return {
        user_info: state.user_info
    }
}

export default connect(mapStateToProps)(Location);