export interface Meeting {
  id: number
  date: string
  leading: string
  speaker: string | null
  speech_title: string
  lead_wt: string
  reader: string
  closing_prayer: string
  special_program: string
  status_id: number
  service_id: number
  address_id: number
  address: string
  address_url: string
  status: string
}
