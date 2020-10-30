import { createStore } from "./createStore";

describe("test", () => {
    test("define store", () => {
        const store = createStore(() => {}, {});
        expect(store).toBeDefined();
    });
});
