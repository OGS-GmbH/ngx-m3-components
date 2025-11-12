export const shouldIgnoreKey = (accepts: string[], key: string): boolean => !accepts.includes(key);
export const isValueIgnored = (accepts: string[], value: string | null): boolean => {
  if (value === null)
    return true;

  // eslint-disable-next-line @unicorn/prefer-spread
  const splittedValue: string[] = value.split("");

  if (splittedValue.length === 0) return false;

  return !splittedValue.map((valueChar: string): boolean => accepts.includes(valueChar))
    .reduce((acc: boolean, state: boolean): boolean => acc && state);
};
