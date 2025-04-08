// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './AdminHome';
import AdminLogin from './AdminLogin';
import AdminProfile from './AdminProfile';
import Artworks from './Artworks';
import Orders from './Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin' element={<AdminHome />}></Route>
        <Route path='/admin-login' element={<AdminLogin />}></Route>
        <Route path='/admin-profile' element={<AdminProfile />}></Route>
        <Route path='/artworks' element={<Artworks />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
