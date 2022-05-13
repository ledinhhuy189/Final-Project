const authApi = {
   isLogin: () => {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve({
               name: 'The Thanh',
               phone: '0762634797',
               gender: 'male',
               email: 'thethanhnguyen.662@gmail.com',
            });
         }, 1000);
      });
   },
};

export default authApi;
