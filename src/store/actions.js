import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_OPEN_DATE } from "@/store/types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data,
    };
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data,
    };
}

export function changeCurrentStyles(data) {
    return {
        type: CHANGE_STYLES,
        data,
    };
}

export function applyStyles(data) {
    return {
        type: APPLY_STYLE,
        data,
    };
}
export function changeTitle(data) {
    return {
        type: CHANGE_TITLE,
        data,
    };
}

export function updateOpenDate() {
    return {
        type: UPDATE_OPEN_DATE,
    };
}
