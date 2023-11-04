import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { capriwaycontext } from '../context/MainContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddUsers from '../pages/Admin/AddUsers';
import ApproveDesign from '../pages/Admin/ApproveDesign';
import PostedDesigns from '../pages/Designer/PostedDesigns';

export default function MainRouter() {
    const { user, setUser, setOpen } = useContext(capriwaycontext)
    function PrivateRouter() {
        return user !== null ? <>
            <Outlet />
        </> : <>
            {
                JSON.parse(localStorage.getItem("capriwayUser")) === null && <Navigate to="/login" />
            }
        </>
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('capriwayUser')))
    }, [])

    return (
      <>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />

          <Route path="/" element={<PrivateRouter />}>
            <Route exact path="/" element={<DashboardPage />} />
          </Route>

          <Route path="/addusers" element={<PrivateRouter />}>
            <Route exact path="/addusers" element={<AddUsers />} />
          </Route>

          <Route path="/approvedesign" element={<PrivateRouter />}>
            <Route exact path="/approvedesign" element={<ApproveDesign />} />
          </Route>

          <Route path="/posteddesigns" element={<PrivateRouter />}>
            <Route exact path="/posteddesigns" element={<PostedDesigns />} />
          </Route>
        </Routes>
      </>
    )
}