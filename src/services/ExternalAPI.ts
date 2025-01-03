import axios from 'axios'
import axiosRetry from 'axios-retry'
import type { IMessageRepo } from '../domain/IMessageRepo'
import type { Message } from '../domain/Message'
import type { Meeting } from '../shared/types'

export class ExternalAPI implements IMessageRepo {
  private readonly apiUrl: string
  private readonly apiClient

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl

    this.apiClient = axios.create({
      baseURL: apiUrl,
      timeout: 5000,
    })

    axiosRetry(this.apiClient, {
      retries: 3,
      retryDelay: retryCount => retryCount * 2000,
      retryCondition: (error) => {
        return (
          axiosRetry.isNetworkError(error)
          || error.response?.status === 500
          || error.code === 'ECONNABORTED'
        )
      },
    })
  }

  async fetchMessage(): Promise<Message> {
    try {
      const response = await axios.get(this.apiUrl)
      return {
        chatId: response.data.chatId,
        content: response.data.content,
      }
    }
    catch (error) {
      console.error('Ошибка при получении сообщения:', error)
      throw new Error('Не удалось загрузить сообщение.')
    }
  }

  async fetchMeeting(): Promise<Meeting[]> {
    try {
      const response = await axios.get(this.apiUrl)
      return response.data
    }
    catch (error) {
      console.error('Ошибка при загрузке встреч:', error)
      throw new Error('Не удалось загрузить встречи.')
    }
  }
}
