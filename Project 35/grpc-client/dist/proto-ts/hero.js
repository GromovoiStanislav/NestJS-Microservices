"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroServiceClient = exports.HeroServiceService = exports.Hero = exports.FindOneHeroConditions = exports.protobufPackage = void 0;
/* eslint-disable */
const grpc_js_1 = require("@grpc/grpc-js");
const _m0 = require("protobufjs/minimal");
exports.protobufPackage = "hero";
function createBaseFindOneHeroConditions() {
    return { id: undefined, type: undefined };
}
exports.FindOneHeroConditions = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== undefined) {
            writer.uint32(8).int32(message.id);
        }
        if (message.type !== undefined) {
            writer.uint32(18).string(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindOneHeroConditions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.type = reader.string();
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
            id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
            type: isSet(object.type) ? globalThis.String(object.type) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== undefined) {
            obj.id = Math.round(message.id);
        }
        if (message.type !== undefined) {
            obj.type = message.type;
        }
        return obj;
    },
    create(base) {
        return exports.FindOneHeroConditions.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFindOneHeroConditions();
        message.id = object.id ?? undefined;
        message.type = object.type ?? undefined;
        return message;
    },
};
function createBaseHero() {
    return { id: 0, name: "", type: "" };
}
exports.Hero = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.type !== "") {
            writer.uint32(26).string(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseHero();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.type = reader.string();
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
            id: isSet(object.id) ? globalThis.Number(object.id) : 0,
            name: isSet(object.name) ? globalThis.String(object.name) : "",
            type: isSet(object.type) ? globalThis.String(object.type) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.type !== "") {
            obj.type = message.type;
        }
        return obj;
    },
    create(base) {
        return exports.Hero.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseHero();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.type = object.type ?? "";
        return message;
    },
};
exports.HeroServiceService = {
    findOne: {
        path: "/hero.HeroService/FindOne",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.FindOneHeroConditions.encode(value).finish()),
        requestDeserialize: (value) => exports.FindOneHeroConditions.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Hero.encode(value).finish()),
        responseDeserialize: (value) => exports.Hero.decode(value),
    },
};
exports.HeroServiceClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.HeroServiceService, "hero.HeroService");
function isSet(value) {
    return value !== null && value !== undefined;
}
