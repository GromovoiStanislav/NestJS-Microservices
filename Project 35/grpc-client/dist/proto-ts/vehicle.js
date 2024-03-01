"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleServiceClient = exports.VehicleServiceService = exports.Vehicle = exports.Vehicles = exports.FindOneVehicleConditions = exports.FindVehicleConditions = exports.vehicleTypeToJSON = exports.vehicleTypeFromJSON = exports.VehicleType = exports.protobufPackage = void 0;
/* eslint-disable */
const grpc_js_1 = require("@grpc/grpc-js");
const _m0 = require("protobufjs/minimal");
exports.protobufPackage = "vehicle";
var VehicleType;
(function (VehicleType) {
    VehicleType[VehicleType["VEHICLE_TYPE_UNSPECIFIED"] = 0] = "VEHICLE_TYPE_UNSPECIFIED";
    VehicleType[VehicleType["VEHICLE_TYPE_SUV"] = 1] = "VEHICLE_TYPE_SUV";
    VehicleType[VehicleType["VEHICLE_TYPE_MINIVAN"] = 2] = "VEHICLE_TYPE_MINIVAN";
    VehicleType[VehicleType["VEHICLE_TYPE_COUPE"] = 3] = "VEHICLE_TYPE_COUPE";
    VehicleType[VehicleType["VEHICLE_TYPE_SEDAN"] = 4] = "VEHICLE_TYPE_SEDAN";
    VehicleType[VehicleType["VEHICLE_TYPE_PICKUP"] = 5] = "VEHICLE_TYPE_PICKUP";
    VehicleType[VehicleType["VEHICLE_TYPE_TRUNK"] = 6] = "VEHICLE_TYPE_TRUNK";
    VehicleType[VehicleType["VEHICLE_TYPE_VAN"] = 7] = "VEHICLE_TYPE_VAN";
    VehicleType[VehicleType["VEHICLE_TYPE_LIMOUSINE"] = 8] = "VEHICLE_TYPE_LIMOUSINE";
    VehicleType[VehicleType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
function vehicleTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "VEHICLE_TYPE_UNSPECIFIED":
            return VehicleType.VEHICLE_TYPE_UNSPECIFIED;
        case 1:
        case "VEHICLE_TYPE_SUV":
            return VehicleType.VEHICLE_TYPE_SUV;
        case 2:
        case "VEHICLE_TYPE_MINIVAN":
            return VehicleType.VEHICLE_TYPE_MINIVAN;
        case 3:
        case "VEHICLE_TYPE_COUPE":
            return VehicleType.VEHICLE_TYPE_COUPE;
        case 4:
        case "VEHICLE_TYPE_SEDAN":
            return VehicleType.VEHICLE_TYPE_SEDAN;
        case 5:
        case "VEHICLE_TYPE_PICKUP":
            return VehicleType.VEHICLE_TYPE_PICKUP;
        case 6:
        case "VEHICLE_TYPE_TRUNK":
            return VehicleType.VEHICLE_TYPE_TRUNK;
        case 7:
        case "VEHICLE_TYPE_VAN":
            return VehicleType.VEHICLE_TYPE_VAN;
        case 8:
        case "VEHICLE_TYPE_LIMOUSINE":
            return VehicleType.VEHICLE_TYPE_LIMOUSINE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return VehicleType.UNRECOGNIZED;
    }
}
exports.vehicleTypeFromJSON = vehicleTypeFromJSON;
function vehicleTypeToJSON(object) {
    switch (object) {
        case VehicleType.VEHICLE_TYPE_UNSPECIFIED:
            return "VEHICLE_TYPE_UNSPECIFIED";
        case VehicleType.VEHICLE_TYPE_SUV:
            return "VEHICLE_TYPE_SUV";
        case VehicleType.VEHICLE_TYPE_MINIVAN:
            return "VEHICLE_TYPE_MINIVAN";
        case VehicleType.VEHICLE_TYPE_COUPE:
            return "VEHICLE_TYPE_COUPE";
        case VehicleType.VEHICLE_TYPE_SEDAN:
            return "VEHICLE_TYPE_SEDAN";
        case VehicleType.VEHICLE_TYPE_PICKUP:
            return "VEHICLE_TYPE_PICKUP";
        case VehicleType.VEHICLE_TYPE_TRUNK:
            return "VEHICLE_TYPE_TRUNK";
        case VehicleType.VEHICLE_TYPE_VAN:
            return "VEHICLE_TYPE_VAN";
        case VehicleType.VEHICLE_TYPE_LIMOUSINE:
            return "VEHICLE_TYPE_LIMOUSINE";
        case VehicleType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
exports.vehicleTypeToJSON = vehicleTypeToJSON;
function createBaseFindVehicleConditions() {
    return { brand: "" };
}
exports.FindVehicleConditions = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.brand !== "") {
            writer.uint32(10).string(message.brand);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindVehicleConditions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.brand = reader.string();
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
        return { brand: isSet(object.brand) ? globalThis.String(object.brand) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.brand !== "") {
            obj.brand = message.brand;
        }
        return obj;
    },
    create(base) {
        return exports.FindVehicleConditions.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFindVehicleConditions();
        message.brand = object.brand ?? "";
        return message;
    },
};
function createBaseFindOneVehicleConditions() {
    return { id: 0 };
}
exports.FindOneVehicleConditions = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseFindOneVehicleConditions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.id = reader.int32();
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
        return { id: isSet(object.id) ? globalThis.Number(object.id) : 0 };
    },
    toJSON(message) {
        const obj = {};
        if (message.id !== 0) {
            obj.id = Math.round(message.id);
        }
        return obj;
    },
    create(base) {
        return exports.FindOneVehicleConditions.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseFindOneVehicleConditions();
        message.id = object.id ?? 0;
        return message;
    },
};
function createBaseVehicles() {
    return { vehicles: [] };
}
exports.Vehicles = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.vehicles) {
            exports.Vehicle.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVehicles();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.vehicles.push(exports.Vehicle.decode(reader, reader.uint32()));
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
            vehicles: globalThis.Array.isArray(object?.vehicles) ? object.vehicles.map((e) => exports.Vehicle.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.vehicles?.length) {
            obj.vehicles = message.vehicles.map((e) => exports.Vehicle.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return exports.Vehicles.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVehicles();
        message.vehicles = object.vehicles?.map((e) => exports.Vehicle.fromPartial(e)) || [];
        return message;
    },
};
function createBaseVehicle() {
    return { id: 0, name: "", brand: "", type: 0 };
}
exports.Vehicle = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.id !== 0) {
            writer.uint32(8).int32(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.brand !== "") {
            writer.uint32(26).string(message.brand);
        }
        if (message.type !== 0) {
            writer.uint32(32).int32(message.type);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseVehicle();
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
                    message.brand = reader.string();
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.type = reader.int32();
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
            brand: isSet(object.brand) ? globalThis.String(object.brand) : "",
            type: isSet(object.type) ? vehicleTypeFromJSON(object.type) : 0,
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
        if (message.brand !== "") {
            obj.brand = message.brand;
        }
        if (message.type !== 0) {
            obj.type = vehicleTypeToJSON(message.type);
        }
        return obj;
    },
    create(base) {
        return exports.Vehicle.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseVehicle();
        message.id = object.id ?? 0;
        message.name = object.name ?? "";
        message.brand = object.brand ?? "";
        message.type = object.type ?? 0;
        return message;
    },
};
exports.VehicleServiceService = {
    findOne: {
        path: "/vehicle.VehicleService/FindOne",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.FindOneVehicleConditions.encode(value).finish()),
        requestDeserialize: (value) => exports.FindOneVehicleConditions.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Vehicle.encode(value).finish()),
        responseDeserialize: (value) => exports.Vehicle.decode(value),
    },
    find: {
        path: "/vehicle.VehicleService/Find",
        requestStream: false,
        responseStream: false,
        requestSerialize: (value) => Buffer.from(exports.FindVehicleConditions.encode(value).finish()),
        requestDeserialize: (value) => exports.FindVehicleConditions.decode(value),
        responseSerialize: (value) => Buffer.from(exports.Vehicles.encode(value).finish()),
        responseDeserialize: (value) => exports.Vehicles.decode(value),
    },
};
exports.VehicleServiceClient = (0, grpc_js_1.makeGenericClientConstructor)(exports.VehicleServiceService, "vehicle.VehicleService");
function isSet(value) {
    return value !== null && value !== undefined;
}
