"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCollection = void 0;
const updateCollection = (initialCollection, updatesCollection) => {
    const updatedCollection = Object.assign({}, initialCollection);
    for (const collectionId in updatedCollection) {
        if (!Object.prototype.hasOwnProperty.call(updatedCollection, collectionId)) {
            continue;
        }
        if (collectionId in initialCollection) {
            updatedCollection[collectionId] = Object.assign({}, updatedCollection[collectionId], updatesCollection[collectionId]);
        }
        else {
            updatedCollection[collectionId] = updatesCollection[collectionId];
        }
    }
    return updatedCollection;
};
exports.updateCollection = updateCollection;
