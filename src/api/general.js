import go from "./go";

export function autocomplete(q, mode) {
    var getObj = {
        mode: mode,
        q
    };
    return go.get("/api/autocomplete/autocomplete", { params: getObj });
}
