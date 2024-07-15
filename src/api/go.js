import axios from "axios";
import qs from "qs";

function get(url, config = false) {
    if (config !== false) {
        return axios.get(url, config);
    } else {
        return axios.get(url);
    }
}

function post(url, data, config = false) {
    const preparedData = data instanceof FormData ? data : qs.stringify(data);
    if (config !== false) {
        return axios.post(url, preparedData, config);
    } else {
        return axios.post(url, preparedData);
    }
}

const isCancel = (thrown) => {
    return axios.isCancel(thrown);
};

export default { get, post, isCancel };