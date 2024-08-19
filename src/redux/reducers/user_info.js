function user_info(state = [], action) {
    switch (action.type) {
        case "SET_USER_INFO":
            var new_user_info = {
                ...state
            };
            for (const [key, value] of Object.entries(action.userInfo)) {
                new_user_info[key] = value;
            }
            return new_user_info;
        default:
            return state;
        }
}

export default user_info;