import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { capriwaycontext } from '../context/MainContext';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AddUsers from '../pages/Admin/AddUsers';
import ViewOneDesign from '../pages/Admin/ViewOneDesign'
import ApproveDesign from '../pages/Admin/ApproveDesign';
import DesignerUnapproved from '../pages/Admin/DesignerUnapproved'
import ApproveSingleDesign from '../pages/Admin/ApproveSingleDesign'
import ManagePayments from '../pages/Admin/ManagePayments';
import PostedDesigns from '../pages/Designer/PostedDesigns';
import ViewPurchased from '../pages/Store/ViewPurchased';

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

          <Route path="/design/:id" element={<PrivateRouter />}>
            <Route exact path="/design/:id" element={<ViewOneDesign />} />
          </Route>

          <Route path="/addusers" element={<PrivateRouter />}>
            <Route exact path="/addusers" element={<AddUsers />} />
          </Route>

          <Route path="/approvedesign" element={<PrivateRouter />}>
            <Route exact path="/approvedesign" element={<ApproveDesign />} />
          </Route>

          <Route path="/designer-unapproved/:id" element={<PrivateRouter />}>
            <Route exact path="/designer-unapproved/:id" element={<DesignerUnapproved />} />
          </Route>

          <Route path="/designer-unapproved/design/:id" element={<PrivateRouter />}>
            <Route exact path="/designer-unapproved/design/:id" element={<ApproveSingleDesign />} />
          </Route>

          <Route path="/managepayments" element={<PrivateRouter />}>
            <Route exact path="/managepayments" element={<ManagePayments />} />
          </Route>

          <Route path="/posteddesigns" element={<PrivateRouter />}>
            <Route exact path="/posteddesigns" element={<PostedDesigns />} />
          </Route>

          <Route path="/purchased" element={<PrivateRouter />}>
            <Route exact path="/purchased" element={<ViewPurchased />} />
          </Route>
        </Routes>
      </>
    )
}