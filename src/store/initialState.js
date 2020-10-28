import { defaultStyles, defaultTitle } from "@/constants";
import { clone } from "@core/utils";

const defaultState = {
    rowsState: {},
    colState: {},
    cellState: {},
    stylesState: {},
    currentText: "",
    title: defaultTitle,
    currentStyles: defaultStyles,
    openDate: new Date().toJSON(),
};

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: "",
});

export const normalizeInitialState = state => state ? normalize(state) : clone(defaultState);
