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
exports.ExternalAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_retry_1 = __importDefault(require("axios-retry"));
class ExternalAPI {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.apiClient = axios_1.default.create({
            baseURL: apiUrl,
            timeout: 5000,
        });
        (0, axios_retry_1.default)(this.apiClient, {
            retries: 3,
            retryDelay: retryCount => retryCount * 2000,
            retryCondition: (error) => {
                var _a;
                return (axios_retry_1.default.isNetworkError(error)
                    || ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 500
                    || error.code === 'ECONNABORTED');
            },
        });
    }
    fetchMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.apiUrl);
                return {
                    chatId: response.data.chatId,
                    content: response.data.content,
                };
            }
            catch (error) {
                console.error('Ошибка при получении сообщения:', error);
                throw new Error('Не удалось загрузить сообщение.');
            }
        });
    }
    fetchMeeting() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.apiUrl);
                return response.data;
            }
            catch (error) {
                console.error('Ошибка при загрузке встреч:', error);
                throw new Error('Не удалось загрузить встречи.');
            }
        });
    }
}
exports.ExternalAPI = ExternalAPI;
