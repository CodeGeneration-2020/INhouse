export const cleanLinkedInUrl = (raw: string): string => {
  const url = new URL(raw);

  return `${url.origin}${url.pathname}`;
};
