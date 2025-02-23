// แยกฟังก์ชันจัดการเวลาออกมา
export const TIME_FORMAT = {
  initialTime: "2025-02-22 00:35:29",
  updateInterval: 1000,
  timezone: "UTC"
} as const

export function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}