/* eslint-disable max-len */
import TelegramBot from 'node-telegram-bot-api'
import type { GetNearestMeetingUseCase } from '../app/GetNearestMeetingUseCase'

export class TelegramBotService {
  private bot: TelegramBot

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true })
  }

  onNearestMeetingCommand(getNearestMeetingUseCase: GetNearestMeetingUseCase): void {
    this.bot.onText(/\/nearestMeeting/, async (msg) => {
      const nearestMeeting = await getNearestMeetingUseCase.execute()

      const chatId = msg.chat.id
      const content = nearestMeeting
        ? `Ближайшее собрание:
Дата: ${nearestMeeting.date}
Место: ${nearestMeeting.address}
Ведущий: ${nearestMeeting.leading}`
        : 'No upcoming meetings'

      this.sendMessage(String(chatId), content)
    })
  }

  async sendMessage(chatId: string, content: string): Promise<void> {
    await this.bot.sendMessage(chatId, content)
  }
}
