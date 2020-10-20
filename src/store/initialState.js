import { storage } from "@core/utils";

const defaultState = {
    rowsState: {},
    colState: {},
    cellState: {},
    currentText: "",
};

export const initialState = storage("excel-state") ? storage("excel-state") : defaultState;
