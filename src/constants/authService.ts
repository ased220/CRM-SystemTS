const createAuthService = () => {
  let accessToken: string | null = null;
  
  return {
    setAccessToken: (token: string) => {
      accessToken = token;
    },
    getAccessToken: () => accessToken,
    clearAccessToken: () => {
      accessToken = null;
    }
  };
};

export const authService = createAuthService();