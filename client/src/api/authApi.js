const authApi = {
   isLogin: () => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve(true);
         }, 5000);
      });
   },
};

export default authApi;
