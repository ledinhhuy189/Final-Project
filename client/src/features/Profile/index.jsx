import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';

const Profile = () => {
   return (
      <>
         <Routes>
            <Route path='/:email' element={<ProfilePage />} />
         </Routes>
      </>
   );
};

export default Profile;
