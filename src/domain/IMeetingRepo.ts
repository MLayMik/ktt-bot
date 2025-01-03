import type { Meeting } from '../shared/types'

export interface IMeetingRepo {
  fetchMeeting: () => Promise<Meeting[]>
}
