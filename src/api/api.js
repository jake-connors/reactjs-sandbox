import go from "./go";

export function test_api_get() {
    var getObj = {
        mode: "test",
        data: "test_data_123"
    };
    return go.get("/api/test", getObj);
}
export function test_api_post() {
    var postObj = {
        mode: "test",
        data: "test_data_12345"
    };
    return go.post("/api/test", postObj);
}