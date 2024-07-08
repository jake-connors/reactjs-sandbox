function user_info(state = [], action) {
    switch (action.type) {
        case "SET_USER_INFO":
            var userInfo = {
                ...state
            };
            for (const [key, value] of Object.entries(action.userInfo)) {
                userInfo[key] = value;
            }
            return userInfo;
        default:
            return state;
        }
};

export default user_info;