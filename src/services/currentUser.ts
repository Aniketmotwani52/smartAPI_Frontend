const USER_ID_STORAGE_KEY = "smartapi.userId";

export const getCurrentUserId = () => {
  const storedUserId = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  const envUserId = import.meta.env.VITE_USER_ID;

  return storedUserId ?? envUserId ?? "";
};

export const initializeCurrentUser = () => {
  const storedUserId = window.localStorage.getItem(USER_ID_STORAGE_KEY);
  const envUserId = import.meta.env.VITE_USER_ID;

  if (!storedUserId && envUserId) {
    window.localStorage.setItem(USER_ID_STORAGE_KEY, envUserId);
  }
};
