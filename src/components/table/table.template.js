const CODES = {
    A: 65,
    Z: 90,
};

function createRow(index, content) {
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index || ""}
                ${index ? '<div class="row-resize" data-resize="row"/>' : ""}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

function createColumn(column, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${column}
            <div class="col-resize" data-resize="col"/>
        </div>
    `;
}

function createCell(row) {
    return function(_, col) {
        return `
            <div
                class="cell"
                contenteditable
                data-col="${col}"
                data-id="${row}:${col}"
            />
        `;
    };
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];
    const columns = new Array(colsCount)
        .fill("")
        .map(toChar)
        .map(createColumn)
        .join("");

    rows.push(createRow(null, columns));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill("").map(createCell(row)).join("");
        rows.push(createRow(row + 1, cells));
    }

    return rows.join("");
}
