export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function nowISO(): string {
  return new Date().toISOString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
