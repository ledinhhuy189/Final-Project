import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../features/Admin';
import Auth from '../features/Auth';
import Cart from '../features/Cart';
import Home from '../features/Home';
import Message from '../features/Message';
import Order from '../features/Order';
import Profile from '../features/Profile';
import Search from '../features/Search';
import Food from '../features/Food';
import NotFoundPage from '../global/pages/NotFoundPage';
import Loader from '../layouts/Loader';
import Main from '../layouts/Main';
import Private from '../layouts/Private';
import Notification from '../features/Notification';
import Category from '../features/Category';

const Routers = () => {
   return (
      <Loader>
         <Routes>
            <Route path='/auth/*' element={<Auth />} />
            <Route path='/notification/*' element={<Notification />} />

            <Route element={<Main />}>
               <Route path='/home/*' element={<Home />} />
               <Route path='/search/*' element={<Search />} />
            </Route>
            <Route element={<Private />}>
               <Route path='/food/*' element={<Food />} />
               <Route path='/order/*' element={<Order />} />
               <Route path='/profile/*' element={<Profile />} />
               <Route path='/cart/*' element={<Cart />} />
               <Route path='/message/*' element={<Message />} />
               <Route path='/admin/*' element={<Admin />} />
               <Route path='/category/*' element={<Category />} />
            </Route>
            <Route path='*' element={<NotFoundPage />} />
         </Routes>
      </Loader>
   );
};

export default Routers;
