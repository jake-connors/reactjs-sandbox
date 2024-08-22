import { connect } from "react-redux";

function Location({ user_info }) {

    const showLocation = user_info.ip != undefined && user_info.ip_address != undefined && user_info.ip.ip_address !== "";
    
    return (
        <>
        {showLocation && (
            <span id="location-container"> 
                <i className="fa fa-location-dot"></i>Location: {user_info.ip.display_location}
            </span>
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