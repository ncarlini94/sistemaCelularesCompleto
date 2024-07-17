import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    AddAdminPage,
    AddJurisdictionPage,
    AddNumberPage,
    AddRepartitionPage,
    AddUserPage,
    LoginPage,
    ManageAdministratorsPage,
    ManageJurisdictionsPage,
    ManageRepartitionsPage,
    NumbersSearchPage,
    ManageUsersPage,
    UpdateAdminPage,
    UpdateNumberPage,
    UploadFilePage,
    UpdateUserPage,
    ManagePlansPage,
    AddPlanPage,
    UpdatePlanPage,
    HomePage,
    NumberHistoryPage,
    UserHistoryPage,
    UpdateJurisdictionPage,
    ReceiptsPage,
    ChangeDevicePage,
    ManageProfilePage,
    ChangePasswordPage}
    from './pages/index';
import { AuthProvider } from './contexts/authContext';
import ProtectedLayout from './layouts/ProtectedLayout';


function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/' element={<ProtectedLayout/>}>
          <Route path='/Home' element={<HomePage/>}/>
          <Route path='/Profile' element={<ManageProfilePage/>}/>
          <Route path='/ChangePassword/:id' element={<ChangePasswordPage/>}/>
          <Route path='/Numbers' element={<NumbersSearchPage/>}/>
          <Route path='/AddNumber' element={<AddNumberPage/>}/>
          <Route path='/UpdateNumber/:id' element={<UpdateNumberPage />} />
          <Route path='/Plans' element={<ManagePlansPage/>}/>
          <Route path='/AddPlan' element={<AddPlanPage/>}/>
          <Route path='/UpdatePlan/:id' element={<UpdatePlanPage/>}/>
          <Route path='/Users' element={<ManageUsersPage />} />
          <Route path='/AddUser' element={<AddUserPage />} />
          <Route path='/UpdateUser/:id' element={<UpdateUserPage />} />
          <Route path='/Number/History' element={<NumberHistoryPage />} />
          <Route path='/User/History' element={<UserHistoryPage />} />
          <Route path='/Manage' element={<ManageAdministratorsPage/>}/>
          <Route path='/UpdateAdmin/:id' element={<UpdateAdminPage/>}/>
          <Route path='/Register' element={<AddAdminPage/>}/>
          <Route path='/Jurisdictions' element={<ManageJurisdictionsPage/>}/>
          <Route path='/AddJurisdiction' element={<AddJurisdictionPage/>}/>
          <Route path='/UpdateJurisdiction/:id' element={<UpdateJurisdictionPage/>}/>
          <Route path='/Repartitions' element={<ManageRepartitionsPage/>}/>
          <Route path='/AddRepartition' element={<AddRepartitionPage/>}/>
          <Route path='/Upload' element={<UploadFilePage />} />
          <Route path='/Receipts' element={<ReceiptsPage />} />
          <Route path='/ChangeDevice' element={<ChangeDevicePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
