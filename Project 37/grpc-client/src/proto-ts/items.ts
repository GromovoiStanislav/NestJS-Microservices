/* eslint-disable */
import {
  ChannelCredentials,
  Client,
  ClientReadableStream,
  handleServerStreamingCall,
  makeGenericClientConstructor,
  Metadata,
} from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "items";

export interface Items {
  items: Item[];
}

export interface Empty {
}

export interface GetItemRequest {
  id: string;
}

export interface CreateItemRequest {
  name: string;
  quantity: number;
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
}

function createBaseItems(): Items {
  return { items: [] };
}

export const Items = {
  encode(message: Items, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Items {
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

          message.items.push(Item.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Items {
    return { items: globalThis.Array.isArray(object?.items) ? object.items.map((e: any) => Item.fromJSON(e)) : [] };
  },

  toJSON(message: Items): unknown {
    const obj: any = {};
    if (message.items?.length) {
      obj.items = message.items.map((e) => Item.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Items>, I>>(base?: I): Items {
    return Items.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Items>, I>>(object: I): Items {
    const message = createBaseItems();
    message.items = object.items?.map((e) => Item.fromPartial(e)) || [];
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
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

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

function createBaseGetItemRequest(): GetItemRequest {
  return { id: "" };
}

export const GetItemRequest = {
  encode(message: GetItemRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetItemRequest {
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

  fromJSON(object: any): GetItemRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: GetItemRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetItemRequest>, I>>(base?: I): GetItemRequest {
    return GetItemRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetItemRequest>, I>>(object: I): GetItemRequest {
    const message = createBaseGetItemRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseCreateItemRequest(): CreateItemRequest {
  return { name: "", quantity: 0 };
}

export const CreateItemRequest = {
  encode(message: CreateItemRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.quantity !== 0) {
      writer.uint32(16).int32(message.quantity);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateItemRequest {
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

  fromJSON(object: any): CreateItemRequest {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: CreateItemRequest): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.quantity !== 0) {
      obj.quantity = Math.round(message.quantity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateItemRequest>, I>>(base?: I): CreateItemRequest {
    return CreateItemRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateItemRequest>, I>>(object: I): CreateItemRequest {
    const message = createBaseCreateItemRequest();
    message.name = object.name ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

function createBaseItem(): Item {
  return { id: "", name: "", quantity: 0 };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
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

  fromJSON(object: any): Item {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      quantity: isSet(object.quantity) ? globalThis.Number(object.quantity) : 0,
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<Item>, I>>(base?: I): Item {
    return Item.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.quantity = object.quantity ?? 0;
    return message;
  },
};

export type ItemsServiceService = typeof ItemsServiceService;
export const ItemsServiceService = {
  createItem: {
    path: "/items.ItemsService/CreateItem",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: CreateItemRequest) => Buffer.from(CreateItemRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => CreateItemRequest.decode(value),
    responseSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  getItem: {
    path: "/items.ItemsService/GetItem",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: GetItemRequest) => Buffer.from(GetItemRequest.encode(value).finish()),
    requestDeserialize: (value: Buffer) => GetItemRequest.decode(value),
    responseSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  streamItems: {
    path: "/items.ItemsService/StreamItems",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Items) => Buffer.from(Items.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Items.decode(value),
  },
} as const;

export interface ItemsServiceServer extends UntypedServiceImplementation {
  createItem: handleUnaryCall<CreateItemRequest, Item>;
  getItem: handleUnaryCall<GetItemRequest, Item>;
  streamItems: handleServerStreamingCall<Empty, Items>;
}

export interface ItemsServiceClient extends Client {
  createItem(
    request: CreateItemRequest,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  createItem(
    request: CreateItemRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  createItem(
    request: CreateItemRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  getItem(request: GetItemRequest, callback: (error: ServiceError | null, response: Item) => void): ClientUnaryCall;
  getItem(
    request: GetItemRequest,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  getItem(
    request: GetItemRequest,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  streamItems(request: Empty, options?: Partial<CallOptions>): ClientReadableStream<Items>;
  streamItems(request: Empty, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Items>;
}

export const ItemsServiceClient = makeGenericClientConstructor(
  ItemsServiceService,
  "items.ItemsService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ItemsServiceClient;
  service: typeof ItemsServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
