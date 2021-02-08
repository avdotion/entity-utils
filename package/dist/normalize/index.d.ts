import type { DefinedSchemaLike } from '../schema/types';
import type { DefinedSchemaInput, NormalizeReturnType } from './types';
export declare const normalize: <S extends DefinedSchemaLike>(schema: S) => (inputData: DefinedSchemaInput<S>) => {
    readonly result: Readonly<import("../schema/types").GetTypingsFromSDS<import("../schema/types").SchemaToSingleSchema<S>>["entityId"]>[];
    collections: import("../schema/types").GetStateFromSDS<import("../schema/types").SchemaToSingleSchema<S>>;
};
