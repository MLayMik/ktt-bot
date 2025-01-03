import type { Message } from './Message'

export interface IMessageRepo {
  fetchMessage: () => Promise<Message>
}
