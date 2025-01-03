import type { IMessageRepo } from '../domain/IMessageRepo'
import type { TelegramBotService } from '../services/TelegramBotService'

export class SendMessageUseCase {
  private messageRepo: IMessageRepo
  private botService: TelegramBotService

  constructor(messageRepo: IMessageRepo, botService: TelegramBotService) {
    this.messageRepo = messageRepo
    this.botService = botService
  }

  async execute(): Promise<void> {
    const message = await this.messageRepo.fetchMessage()
    await this.botService.sendMessage(message.chatId, message.content)
  }
}
