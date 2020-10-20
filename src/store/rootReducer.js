import { CHANGE_TEXT, TABLE_RESIZE } from "@/store/types";

export function rootReducer(state, action) {
    let prevState;
    let field;

    switch (action.type) {
    case TABLE_RESIZE:
        field = action.data.type === "col" ? "colState" : "rowState";
        prevState = state[field] || {};
        prevState[action.data.id] = action.data.value;

        return { ...state, [field]: prevState };
    case CHANGE_TEXT:
        prevState = state["cellState"] || {};
        prevState[action.data.id] = action.data.value;
        return { ...state, currentText: action.data.value, cellState: prevState };
    default:
        return state;
    }
}
