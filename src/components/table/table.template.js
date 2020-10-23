import { toInlineStyles } from "@core/utils";
import { defaultStyles } from "@/constants";
import { parse } from "@core/parse";

const CODES = {
    A: 65,
    Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

function createRow(index, content, state = {}) {
    const height = getHeight(state, index);

    return `
        <div class="row" data-type="resizable" data-row="${index}" style="height: ${height}">
            <div class="row-info">
                ${index || ""}
                ${index ? '<div class="row-resize" data-resize="row"></div>' : ""}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function createColumn({ column, index, width }) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            ${column}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function createCell(state, row) {
    return function(_, col) {
        const id = `${row}:${col}`;
        const data = state.cellState[id];
        const styles = toInlineStyles({ ...state.stylesState[id], ...defaultStyles });

        return `
            <div
                class="cell"
                contenteditable
                data-col="${col}"
                data-id="${id}"
                data-type="cell"
                data-value="${data || ""}"
                style="${styles}; width: ${getWidth(state.colState, col)}"
            >${parse(data) || ""}</div>
        `;
    };
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
    return (state[index] || DEFAULT_WIDTH) + "px";
}

function getHeight(state, index) {
    return (state[index] || DEFAULT_HEIGHT) + "px";
}

function withWidthFromState(state) {
    return function(column, index) {
        return {
            column, index, width: getWidth(state.colState, index),
        };
    };
}

export function createTable(rowsCount = 15, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const columns = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(withWidthFromState(state))
        .map(createColumn)
        .join("");

    rows.push(createRow(null, columns));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill("").map(createCell(state, row)).join("");
        rows.push(createRow(row + 1, cells, state.rowsState));
    }

    return rows.join("");
}
