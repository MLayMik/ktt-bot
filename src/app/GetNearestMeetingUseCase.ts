import type { IMeetingRepo } from '../domain/IMeetingRepo'
import type { Meeting } from '../shared/types'

export class GetNearestMeetingUseCase {
  private meetingRepo: IMeetingRepo

  constructor(meetingRepo: IMeetingRepo) {
    this.meetingRepo = meetingRepo
  }

  async execute(): Promise<Meeting | null> {
    const meeting = await this.meetingRepo.fetchMeeting()
    return meeting.length > 0 ? meeting[0] : null
  }
}
