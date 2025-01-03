import process from 'node:process'
import { resolve } from 'node:path'
import * as dotenv from 'dotenv'

dotenv.config({ path: resolve(__dirname, '../.env') })

export const config = {
  telegramToken: process.env.TG_BOT_TOKEN || '',
  apiUrl: process.env.API_URL || '',
  chatId: process.env.TG_CHAT_ID || '',
}
