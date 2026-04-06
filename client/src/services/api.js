const BASE_URL = "http://localhost:5000";

export const getMenu = async () => {
  const res = await fetch(`${BASE_URL}/menu`);
  return res.json();
};
