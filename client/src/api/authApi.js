const authApi = {
   isLogin: () => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({
               name: 'The Thanh',
               phone: '0762634797',
               gender: 'male',
            });
         }, 500);
      });
   },
};

export default authApi;
