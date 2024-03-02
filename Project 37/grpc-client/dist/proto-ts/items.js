"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsServiceClient = exports.ItemsServiceService = exports.Item = exports.CreateItemRequest = exports.GetItemRequest = exports.Empty = exports.Items = exports.protobufPackage = void 0;
/* eslint-disable */
const grpc_js_1 = require("@grpc/grpc-js");
const _m0 = require("protobufjs/minimal");
exports.protobufPackage = "items";
function createBaseItems() {
    return { items: [] };
}
exports.Items = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.items) {
            exports.Item.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseItems();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.items.push(exports.Item.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { items: globalThis.Array.isArray(object?.items) ? object.items.map((e) => exports.Item.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.items?.length) {
            obj.items = message.items.map((e) => exports.Item.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.Items.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseItems();
        message.items = object.items?.map((e) => exports.Item.fromPartial(e)) || [];
        return message;
    },
};
function createBaseEmpty() {
    return {};
}
exports.Empty = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEmpty();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return exports.Empty.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseEmpty();
        return message;
    },
};
function createBaseGetItemRequest() {
    return { id: "" };
}
exports.GetItemRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGetItemRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        return obj;
    },
    create(base) {
        return exports.GetItemRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGetItemRequest();
        message.id = object.id ?? "";
        return message;
    },
};
function createBaseCreateItemRequest() {
    return { name: "", quantity: 0 };
}
exports.CreateItemRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.quantity !== 0) {
            writer.uint32(16).int32(message.quantity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreateItemRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.quantity = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            name: isSet(object.name) ? globalThis.String(object.name) : "",
            quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.quantity !== 0) {
            obj.quantity = Math.round(message.quantity);
        }
        return obj;
    },
    create(base) {
        return exports.CreateItemRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseCreateItemRequest();
        message.name = object.name ?? "";
        message.quantity = object.quantity ?? 0;
        return message;
    },
};
function createBaseItem() {
    return { id: "", name: "", quantity: 0 };
}
exports.Item = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.quantity !== 0) {
            writer.uint32(24).int32(message.quantity);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseItem();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.id = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.quantity = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            id: isSet(object.id) ? globalThis.String(object.id) : "",
            name: isSet(object.name) ? globalThis.String(object.name) : "",
            quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== "") {
            obj.id = message.id;
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.quantity !== 0) {
            obj.quantity = Math.round(message.quantity);
        }
        return obj;
    },
    create(base) {
        return exports.Item.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseItem();
        message.id = object.id ?? "";
        message.name = object.name ?? "";
        message.quantity = object.quantity ?? 0;
        return message;
    },
};
exports.ItemsServiceService = {
    createItem: {
        path: "/items.ItemsService/CreateItem",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.CreateItemRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.CreateItemRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Item.encode(value).finish()),
        responseDeserialize: (value) => exports.Item.decode(value),
    },
    getItem: {
        path: "/items.ItemsService/GetItem",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.GetItemRequest.encode(value).finish()),
        requestDeserialize: (value) => exports.GetItemRequest.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Item.encode(value).finish()),
        responseDeserialize: (value) => exports.Item.decode(value),
    },
    streamItems: {
        path: "/items.ItemsService/StreamItems",
        requestStream: false,
        responseStream: true,
        requestSerialize: (value) => Buffer.from(exports.Empty.encode(value).finish()),
        requestDeserialize: (value) => exports.Empty.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Items.encode(value).finish()),
        responseDeserialize: (value) => exports.Items.decode(value),
    },
};
exports.ItemsServiceClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.ItemsServiceService, "items.ItemsService");
function isSet(value) {
    return value !== null && value !== undefined;
}
