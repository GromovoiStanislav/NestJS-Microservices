/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "hero";

export interface HeroByIdOrType {
  id?: number | undefined;
  type?: string | undefined;
}

export interface HeroesByType {
  type?: string | undefined;
}

export interface Hero {
  id: number;
  name: string;
  type: string;
}

export interface Heroes {
  heroes: Hero[];
}

function createBaseHeroByIdOrType(): HeroByIdOrType {
  return { id: undefined, type: undefined };
}

export const HeroByIdOrType = {
  encode(message: HeroByIdOrType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined) {
      writer.uint32(8).int32(message.id);
    }
    if (message.type !== undefined) {
      writer.uint32(18).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeroByIdOrType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeroByIdOrType();
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

  fromJSON(object: any): HeroByIdOrType {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : undefined,
      type: isSet(object.type) ? globalThis.String(object.type) : undefined,
    };
  },

  toJSON(message: HeroByIdOrType): unknown {
    const obj: any = {};
    if (message.id !== undefined) {
      obj.id = Math.round(message.id);
    }
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HeroByIdOrType>, I>>(base?: I): HeroByIdOrType {
    return HeroByIdOrType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HeroByIdOrType>, I>>(object: I): HeroByIdOrType {
    const message = createBaseHeroByIdOrType();
    message.id = object.id ?? undefined;
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseHeroesByType(): HeroesByType {
  return { type: undefined };
}

export const HeroesByType = {
  encode(message: HeroesByType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== undefined) {
      writer.uint32(10).string(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeroesByType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeroesByType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): HeroesByType {
    return { type: isSet(object.type) ? globalThis.String(object.type) : undefined };
  },

  toJSON(message: HeroesByType): unknown {
    const obj: any = {};
    if (message.type !== undefined) {
      obj.type = message.type;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HeroesByType>, I>>(base?: I): HeroesByType {
    return HeroesByType.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HeroesByType>, I>>(object: I): HeroesByType {
    const message = createBaseHeroesByType();
    message.type = object.type ?? undefined;
    return message;
  },
};

function createBaseHero(): Hero {
  return { id: 0, name: "", type: "" };
}

export const Hero = {
  encode(message: Hero, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): Hero {
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

  fromJSON(object: any): Hero {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
    };
  },

  toJSON(message: Hero): unknown {
    const obj: any = {};
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

  create<I extends Exact<DeepPartial<Hero>, I>>(base?: I): Hero {
    return Hero.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Hero>, I>>(object: I): Hero {
    const message = createBaseHero();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.type = object.type ?? "";
    return message;
  },
};

function createBaseHeroes(): Heroes {
  return { heroes: [] };
}

export const Heroes = {
  encode(message: Heroes, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.heroes) {
      Hero.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Heroes {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeroes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.heroes.push(Hero.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Heroes {
    return { heroes: globalThis.Array.isArray(object?.heroes) ? object.heroes.map((e: any) => Hero.fromJSON(e)) : [] };
  },

  toJSON(message: Heroes): unknown {
    const obj: any = {};
    if (message.heroes?.length) {
      obj.heroes = message.heroes.map((e) => Hero.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Heroes>, I>>(base?: I): Heroes {
    return Heroes.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Heroes>, I>>(object: I): Heroes {
    const message = createBaseHeroes();
    message.heroes = object.heroes?.map((e) => Hero.fromPartial(e)) || [];
    return message;
  },
};

export type HeroesServiceService = typeof HeroesServiceService;
export const HeroesServiceService = {
  findOne: {
    path: "/hero.HeroesService/findOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HeroByIdOrType) => Buffer.from(HeroByIdOrType.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HeroByIdOrType.decode(value),
    responseSerialize: (value: Hero) => Buffer.from(Hero.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Hero.decode(value),
  },
  findMany: {
    path: "/hero.HeroesService/findMany",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: HeroesByType) => Buffer.from(HeroesByType.encode(value).finish()),
    requestDeserialize: (value: Buffer) => HeroesByType.decode(value),
    responseSerialize: (value: Heroes) => Buffer.from(Heroes.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Heroes.decode(value),
  },
} as const;

export interface HeroesServiceServer extends UntypedServiceImplementation {
  findOne: handleUnaryCall<HeroByIdOrType, Hero>;
  findMany: handleUnaryCall<HeroesByType, Heroes>;
}

export interface HeroesServiceClient extends Client {
  findOne(request: HeroByIdOrType, callback: (error: ServiceError | null, response: Hero) => void): ClientUnaryCall;
  findOne(
    request: HeroByIdOrType,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Hero) => void,
  ): ClientUnaryCall;
  findOne(
    request: HeroByIdOrType,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Hero) => void,
  ): ClientUnaryCall;
  findMany(request: HeroesByType, callback: (error: ServiceError | null, response: Heroes) => void): ClientUnaryCall;
  findMany(
    request: HeroesByType,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Heroes) => void,
  ): ClientUnaryCall;
  findMany(
    request: HeroesByType,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Heroes) => void,
  ): ClientUnaryCall;
}

export const HeroesServiceClient = makeGenericClientConstructor(
  HeroesServiceService,
  "hero.HeroesService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): HeroesServiceClient;
  service: typeof HeroesServiceService;
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
