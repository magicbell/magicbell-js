const yearFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  day: 'numeric',
});

const longFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  // hour: 'numeric',
  // minute: '2-digit',
});

const dayFormat = new Intl.DateTimeFormat('en', {
  hour: 'numeric',
  minute: '2-digit',
});

export function formatDate(date: Date | number | string | null): string | null {
  if (!date) return null;
  const dateInstance = date instanceof Date ? date : new Date(date);
  const now = new Date();

  const format =
    dateInstance.getFullYear() !== now.getFullYear()
      ? yearFormat
      : dateInstance.getMonth() !== now.getMonth() || dateInstance.getDate() !== now.getDate()
      ? longFormat
      : dayFormat;

  return format.format(date instanceof Date ? date : new Date(date));
}
