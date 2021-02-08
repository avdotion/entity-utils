"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructGetters = void 0;
const constructGetters = () => (map) => Object.freeze(Object.assign(Object.assign({}, map), { id: (entity) => entity.id, entity: (entity) => entity.entity }));
exports.constructGetters = constructGetters;
