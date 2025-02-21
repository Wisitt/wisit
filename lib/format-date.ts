export function formatDate(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ')
  }
  
  export function getInitialDate(): string {
    return "2025-02-21 19:33:15"
  }