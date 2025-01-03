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
exports.TelegramBotService = void 0;
/* eslint-disable max-len */
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
class TelegramBotService {
    constructor(token) {
        this.bot = new node_telegram_bot_api_1.default(token, { polling: true });
    }
    onNearestMeetingCommand(getNearestMeetingUseCase) {
        this.bot.onText(/\/nearestMeeting/, (msg) => __awaiter(this, void 0, void 0, function* () {
            const nearestMeeting = yield getNearestMeetingUseCase.execute();
            const chatId = msg.chat.id;
            const content = nearestMeeting
                ? `Ближайшее собрание:
Дата: ${nearestMeeting.date}
Место: ${nearestMeeting.address}
Ведущий: ${nearestMeeting.leading}`
                : 'No upcoming meetings';
            this.sendMessage(String(chatId), content);
        }));
    }
    sendMessage(chatId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bot.sendMessage(chatId, content);
        });
    }
}
exports.TelegramBotService = TelegramBotService;
