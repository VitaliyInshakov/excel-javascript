import { range } from "@core/utils";

export function shouldResize(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return event.target.dataset.type === "cell";
}

export function matrix($target, $current) {
    const target = $target.id(true);
    const current = $current.id(true);

    const columns = range(current.col, target.col);
    const rows = range(current.row, target.row);

    return columns.reduce((acc, column) => {
        rows.forEach(row => acc.push(`${row}:${column}`));

        return acc;
    }, []);
}


export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0;

    /* eslint-disable */
    switch (key) {
        case "Enter":
        case "ArrowDown":
            row++;
            break;
        case "Tab":
        case "ArrowRight":
            col++;
            break;
        case "ArrowUp":
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
            break;
        case "ArrowLeft":
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
            break;
    }
    /* eslint-enable */

    return `[data-id="${row}:${col}"]`;
}
