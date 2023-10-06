export const getBaseUrl = (): string => {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL || " http://localhostL3030/api/v1"
  );
};
