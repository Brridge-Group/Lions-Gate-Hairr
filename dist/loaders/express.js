"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const items_route_1 = __importDefault(require("../routes/items-route"));
const business_routes_1 = __importDefault(require("../routes/business-routes"));
const service_routes_1 = __importDefault(require("../routes/service-routes"));
const expressLoader = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json());
    // server static files from the React app
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/build")));
    app.use("/api/items", items_route_1.default);
    app.use("/api/businesses", business_routes_1.default);
    app.use("/api/services", service_routes_1.default);
    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get("*", (req, res) => {
        console.log(__dirname);
        res.sendFile(path_1.default.join(__dirname, "../client/build/index.html"));
    });
    app.enable("trust proxy");
    app.use((0, cors_1.default)());
    // ...More middlewares
    return app;
});
exports.default = expressLoader;
