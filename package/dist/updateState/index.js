"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateState = void 0;
const updateCollection_1 = require("../updateCollection");
const updateState = (initialState, updatesState) => {
    const updatedState = Object.assign({}, initialState);
    for (const entityKey in updatedState) {
        if (!Object.prototype.hasOwnProperty.call(updatedState, entityKey)) {
            continue;
        }
        if (entityKey in initialState) {
            updatedState[entityKey] = updateCollection_1.updateCollection(initialState[entityKey], updatesState[entityKey]);
        }
        else {
            updatedState[entityKey] = updatesState[entityKey];
        }
    }
    return updatedState;
};
exports.updateState = updateState;
