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
const dotenv_1 = __importDefault(require("dotenv"));
const GetNearestMeetingUseCase_1 = require("./app/GetNearestMeetingUseCase");
const ExternalAPI_1 = require("./services/ExternalAPI");
const TelegramBotService_1 = require("./services/TelegramBotService");
const config_1 = require("./shared/config");
dotenv_1.default.config();
const apiUrl = config_1.config.apiUrl;
const botToken = config_1.config.telegramToken;
const chatId = config_1.config.chatId;
const meetingRepo = new ExternalAPI_1.ExternalAPI(apiUrl);
const getNearestMeetingUseCase = new GetNearestMeetingUseCase_1.GetNearestMeetingUseCase(meetingRepo);
const botService = new TelegramBotService_1.TelegramBotService(botToken);
// Прослушивание команды "/nearestMeeting"
botService.onNearestMeetingCommand(getNearestMeetingUseCase);
// Для периодической отправки ближайшего собрания
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const nearestMeeting = yield getNearestMeetingUseCase.execute();
    const content = nearestMeeting
        ? `**Ближайшее собрание**:
Дата: ${nearestMeeting.date}
Место: ${nearestMeeting.address}
Ведущий: ${nearestMeeting.leading}`
        : 'No upcoming meetings';
    yield botService.sendMessage(chatId, content);
}), 1000);
