import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios'

import AdminLogin from './Pages/AdminLogin';
import RoomOrderList from './Pages/RoomOrderList';
import CalendarAdmin from './Pages/CalendarAdmin';
import CalendarTrainer from './Pages/CalendarTrainer';
import EditAdminProfile from './Pages/EditAdminProfile';
import EditTrainerProfile from './Pages/EditTrainerProfile';
import EditUserProfile from './Pages/EditUserProfile';
import EditRoomInfo from './Pages/EditRoomInfo';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Map from './Pages/Map';
import Registration from './Pages/Registration';
import School from './Pages/School';
import SearchRoomOrder from './Pages/SearchRoomOrder';
import SearchRoomTypes from './Pages/SearchRoomTypes';
import SkiPass from './Pages/SkiPass';
import TrainerOrders from './Pages/TrainerOrders';
import UserOrders from './Pages/UserOrders';


import BottomMenu from './components/Navbars/BottomMenu';
import TopMenu from './components/Navbars/TopMenu';

import { checkUser } from './redux/sagaCreators/userSagaCreators';
import { deleteUser } from './redux/actionCreators/userAC';



function App() {
  // автоматически в запросе отправляем заголовок с токеном
  axios.defaults.headers.common['authorization'] = `Bearer ${localStorage.getItem('auth_token')}`

  const dispatch = useDispatch()
  const { auth, role } = useSelector(state => state.userReducer)

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      dispatch(checkUser())
    } else {
      dispatch(deleteUser())
    }
  }, [dispatch])


  return (
    <BrowserRouter >
      {/* пока грузится инфа об авторизации - белый экран, чтобы не мерцало */}
      {(auth === undefined) ?
        ''
        :
        <>
          <TopMenu />
          <section className="mt-[72px] rounded-lg flex flex-col flex-1 items-center justify-end overflow-y-auto">
            <Routes>

              {role === undefined && [
                <Route path="/" key="home" element={<Home />} />,
                <Route path="/map" key="map" element={<Map />} />,
                <Route path="/login" key="login" element={<Login />} />,
                <Route path="/admin" key="adminLogin" element={<AdminLogin />} />,
                <Route path="/registration" key="registration" element={<Registration />} />,
                <Route path="/skipass" key="skiPass" element={<SkiPass />} />,
                <Route path="/search" key="searchRoomTypes" element={<SearchRoomTypes />} />,
                <Route path="/search/:type" key="searchRoomOrder" element={<SearchRoomOrder />} />,
                <Route path="/school" key="school" element={<School />} />,
                <Route path="/profile" key="editUserProfile" element={<EditUserProfile />} />
              ]}

              {role === 'user' && [
                <Route path="/" key="home" element={<Home />} />,
                <Route path="/map" key="map" element={<Map />} />,
                <Route path="/skipass" key="skiPass" element={<SkiPass />} />,
                <Route path="/school" key="school" element={<School />} />,
                <Route path="/orders" key="userOrders" element={<UserOrders />} />,
                <Route path="/search" key="searchRoomTypes" element={<SearchRoomTypes />} />,
                <Route path="/search/:type" key="searchRoomOrder" element={<SearchRoomOrder />} />,
                <Route path="/profile" key="editUserProfile" element={<EditUserProfile />} />
              ]}

              {role === "admin" && [
                <Route path="/" key="home" element={<Home />} />,
                <Route path="/map" key="map" element={<Map />} />,
                <Route path="/calendar" key="calendarAdmin" element={<CalendarAdmin />} />,
                <Route path="/orders" key="adminOrders" element={<RoomOrderList />} />,
                <Route path="/search" key="searchRoomTypes" element={<SearchRoomTypes />} />,
                <Route path="/search/:type" key="searchRoomOrder" element={<SearchRoomOrder />} />,
                <Route path="/edit/:type" key="editRoomInfo" element={<EditRoomInfo />} />,
                <Route path="/profile" key="editAdminProfile" element={<EditAdminProfile />} />,
              ]}

              {role === "trainer" && [
                <Route path="/" key="home" element={<Home />} />,
                <Route path="/map" key="map" element={<Map />} />,
                <Route path="/profile" key="editTrainerProfile" element={<EditTrainerProfile />} />,
                <Route path="/calendar" key="calendarTrainer" element={<CalendarTrainer />} />,
                <Route path="/orders" key="trainerOrders" element={<TrainerOrders />} />
              ]}

            </Routes>
          </section>

          <BottomMenu />
        </>
      }
    </BrowserRouter >
  );
}

export default App;
