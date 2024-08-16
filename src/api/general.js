import go from "./go";

export function autocomplete(getObj) {
    return go.get("/api/autocomplete/autocomplete", { params: getObj });
}
