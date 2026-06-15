export function formatDate(dateString, mode = 'month') {
  const date = new Date(dateString);

  const options = mode === 'day'
    ? {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }
    : {
        month: 'long',
        day: 'numeric'
      };

  return date.toLocaleDateString('en-US', options);
}

