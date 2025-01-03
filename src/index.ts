import dotenv from 'dotenv'
import { GetNearestMeetingUseCase } from './app/GetNearestMeetingUseCase'
import { ExternalAPI } from './services/ExternalAPI'
import { TelegramBotService } from './services/TelegramBotService'
import { config } from './shared/config'

dotenv.config()

const apiUrl = config.apiUrl
const botToken = config.telegramToken
const chatId = config.chatId

const meetingRepo = new ExternalAPI(apiUrl)
const getNearestMeetingUseCase = new GetNearestMeetingUseCase(meetingRepo)

const botService = new TelegramBotService(botToken)

// Прослушивание команды "/nearestMeeting"
botService.onNearestMeetingCommand(getNearestMeetingUseCase)

// Для периодической отправки ближайшего собрания
setInterval(async () => {
  const nearestMeeting = await getNearestMeetingUseCase.execute()
  const content = nearestMeeting
    ? `**Ближайшее собрание**:
Дата: ${nearestMeeting.date}
Место: ${nearestMeeting.address}
Ведущий: ${nearestMeeting.leading}`
    : 'No upcoming meetings'

  await botService.sendMessage(chatId, content)
}, 1000 * 60)
