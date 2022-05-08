const authApi = {
   isLogin: () => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(true);
         }, 500);
      });
   },
};

export default authApi;
