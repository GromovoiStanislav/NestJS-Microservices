/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/todo/src/prisma.service.ts":
/*!*****************************************!*\
  !*** ./apps/todo/src/prisma.service.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),

/***/ "./apps/todo/src/todo.controller.ts":
/*!******************************************!*\
  !*** ./apps/todo/src/todo.controller.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const todo_1 = __webpack_require__(/*! proto/todo */ "./proto/todo.ts");
const todo_service_1 = __webpack_require__(/*! ./todo.service */ "./apps/todo/src/todo.service.ts");
let TodoController = exports.TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async postTodo(postTodoDTO) {
        return await this.todoService.postTodo(postTodoDTO);
    }
    async getTodos() {
        return await this.todoService.getTodos();
    }
};
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)(),
    (0, todo_1.TodoServiceControllerMethods)(),
    __metadata("design:paramtypes", [typeof (_a = typeof todo_service_1.TodoService !== "undefined" && todo_service_1.TodoService) === "function" ? _a : Object])
], TodoController);


/***/ }),

/***/ "./apps/todo/src/todo.module.ts":
/*!**************************************!*\
  !*** ./apps/todo/src/todo.module.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const todo_controller_1 = __webpack_require__(/*! ./todo.controller */ "./apps/todo/src/todo.controller.ts");
const todo_service_1 = __webpack_require__(/*! ./todo.service */ "./apps/todo/src/todo.service.ts");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/todo/src/prisma.service.ts");
let TodoModule = exports.TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            todo_controller_1.TodoController
        ],
        providers: [
            todo_service_1.TodoService,
            prisma_service_1.PrismaService
        ]
    })
], TodoModule);


/***/ }),

/***/ "./apps/todo/src/todo.service.ts":
/*!***************************************!*\
  !*** ./apps/todo/src/todo.service.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TodoService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/todo/src/prisma.service.ts");
let TodoService = exports.TodoService = class TodoService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async postTodo(postTodoDTO) {
        const todo = await this.prismaService.todo.create({
            data: postTodoDTO
        });
        return {
            id: todo.id,
            description: todo.description,
            isDone: todo.isDone
        };
    }
    async getTodos() {
        const todos = await this.prismaService.todo.findMany();
        return {
            Todos: todos.map((todo) => ({
                id: todo.id,
                description: todo.description,
                isDone: todo.isDone
            }))
        };
    }
};
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], TodoService);


/***/ }),

/***/ "./proto/todo.ts":
/*!***********************!*\
  !*** ./proto/todo.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TODO_SERVICE_NAME = exports.TodoServiceControllerMethods = exports.TODO_PACKAGE_NAME = exports.protobufPackage = void 0;
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
exports.protobufPackage = "todo";
exports.TODO_PACKAGE_NAME = "todo";
function TodoServiceControllerMethods() {
    return function (constructor) {
        const grpcMethods = ["postTodo", "getTodos"];
        for (const method of grpcMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcMethod)("TodoService", method)(constructor.prototype[method], method, descriptor);
        }
        const grpcStreamMethods = [];
        for (const method of grpcStreamMethods) {
            const descriptor = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
            (0, microservices_1.GrpcStreamMethod)("TodoService", method)(constructor.prototype[method], method, descriptor);
        }
    };
}
exports.TodoServiceControllerMethods = TodoServiceControllerMethods;
exports.TODO_SERVICE_NAME = "TodoService";


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*******************************!*\
  !*** ./apps/todo/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const node_path_1 = __webpack_require__(/*! node:path */ "node:path");
const todo_module_1 = __webpack_require__(/*! ./todo.module */ "./apps/todo/src/todo.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(todo_module_1.TodoModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            protoPath: (0, node_path_1.join)(__dirname, '../todo.proto'),
            package: 'todo',
        },
    });
    await app.listen();
    const logger = new common_1.Logger("Todo-service");
    logger.log(`Running...`);
}
bootstrap();

})();

/******/ })()
;