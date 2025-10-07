export const formatDateUK = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};
