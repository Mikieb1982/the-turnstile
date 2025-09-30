const BERLIN_TZ = 'Europe/Berlin';

const normalise = (dateISO: string, timeHHMM?: string) =>
  timeHHMM ? `${dateISO}T${timeHHMM}` : dateISO;

export const formatDateTimeDE = (dateISO: string, timeHHMM?: string) => {
  if (!dateISO) return '';
  const iso = normalise(dateISO, timeHHMM);
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const datePart = new Intl.DateTimeFormat('de-DE', {
    timeZone: BERLIN_TZ,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

  if (!timeHHMM) {
    return datePart;
  }

  const timePart = new Intl.DateTimeFormat('de-DE', {
    timeZone: BERLIN_TZ,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  return `${datePart} ${timePart}`;
};
