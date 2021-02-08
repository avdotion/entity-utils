"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSelectors = exports.constructGetters = exports.itselfSchema = exports.declareSchema = exports.normalize = exports.updateState = exports.updateCollection = void 0;
var updateCollection_1 = require("./updateCollection");
Object.defineProperty(exports, "updateCollection", { enumerable: true, get: function () { return updateCollection_1.updateCollection; } });
var updateState_1 = require("./updateState");
Object.defineProperty(exports, "updateState", { enumerable: true, get: function () { return updateState_1.updateState; } });
var normalize_1 = require("./normalize");
Object.defineProperty(exports, "normalize", { enumerable: true, get: function () { return normalize_1.normalize; } });
var schema_1 = require("./schema");
Object.defineProperty(exports, "declareSchema", { enumerable: true, get: function () { return schema_1.declareSchema; } });
Object.defineProperty(exports, "itselfSchema", { enumerable: true, get: function () { return schema_1.itselfSchema; } });
var constructGetters_1 = require("./constructGetters");
Object.defineProperty(exports, "constructGetters", { enumerable: true, get: function () { return constructGetters_1.constructGetters; } });
var constructSelectors_1 = require("./constructSelectors");
Object.defineProperty(exports, "constructSelectors", { enumerable: true, get: function () { return constructSelectors_1.constructSelectors; } });
