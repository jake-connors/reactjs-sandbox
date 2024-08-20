// set state in the store to default values
const initial = {
    user_info: {
        site_style: "",
        cookie_settings: {
            allowed_cookies: [],
            allow_all: false,
            deny_all: false
        },
        show_cookies_popup: true
    }
};

export default initial;