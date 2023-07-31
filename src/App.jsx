// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/modal';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './Components/Auth/Login';
import ProductMain from './Components/Product/ProductMain';
import ProductState from './context/Product/ProductState';
import Cart from './Components/Cart/Cart';
import Sidebar from "./Components/Sidebar/Sidebar";
import MyShopMain from './Components/MyShop/MyShopMain';

import UserBank from './Components/Dashboard/UserBank';
import UserBankUpdate from './Components/Dashboard/UserBankUpdate';


// Admin Imports
import axios from 'axios';
import AdminLogin from './AdminComponents/Auth/Login';
import Categories from './AdminComponents/Categories/Categories';
import EditCategory from './AdminComponents/Categories/EditCategory';
import Customers from './AdminComponents/Customers/Customers';
import Dropship from './AdminComponents/Customers/Dropship';
import EditCustomers from './AdminComponents/Customers/EditCustomers';
import Requests from './AdminComponents/Customers/Requests';
import Wholeseller from './AdminComponents/Customers/Wholeseller';
import Dashboard from "./AdminComponents/Dashboard/Dashboard";
import AddProduct from './AdminComponents/Product/AddProduct';
import EditProduct from './AdminComponents/Product/EditProduct';
import Featured from './AdminComponents/Product/Featured';
import OnSale from './AdminComponents/Product/OnSale';
import AdminProducts from './AdminComponents/Product/Products';
import SidebarLayout from './AdminComponents/Sidebar/SidebarLayout';
import Usercreation from './AdminComponents/Usercreation/Usercreation';
import Signup from './Components/Auth/Signup';
import NotFound from './Components/NotFound';
import RequestedDS from './Components/RequestedDS';
import User from './context/User/User';
import ProductDetail from './Components/Product/ProductDetail';
import UserDashboard from './Components/Dashboard/UserDashboard';
import OrderState from './context/Order/OrderState';
import UserProfile from './Components/Dashboard/UserProfile';
import MyOrders from './Components/Orders/MyOrders';
import PlaceOrder from './Components/Orders/PlaceOrder';
import Shippingcost from './AdminComponents/Shippingcost/Shippingcost'
import Addshippingcost from './AdminComponents/Shippingcost/Addshippingcost'
import WholesaleOrder from './AdminComponents/Orders/WholesaleOrder';
import DropshipOrder from './AdminComponents/Orders/DropshipOrder';
import FeaturedProducts from './Components/Product/Featured';
import Instock from './Components/Product/Instock';
import OutOfStock from './Components/Product/OutOfStock';
import OnSaleProducts from './Components/Product/OnSale';
import PendingOrders from './Components/Orders/PendingOrders';
import DeliveredOrders from './Components/Orders/DeliveredOrders';
import ShippedOrders from './Components/Orders/ShippedOrders';
import ReturnedOrders from './Components/Orders/ReturnedOrders';
import CategoryProducts from './Components/Product/CategoryProducts';
import OrderProductDetails from './AdminComponents/Orders/OrderProductDetails';
import UpdateShippingStatusW from './AdminComponents/Orders/UpdateShippingStatusW';
import UpdateShippingStatusD from './AdminComponents/Orders/UpdateShippingStatusD';
import UpdateShippingStatus from './AdminComponents/Orders/UpdateShippingStatus';
import EditOrderAdminW from './AdminComponents/Orders/EditOrderAdminW';
import EditOrderAdminD from './AdminComponents/Orders/EditOrderAdminD';
import OrderReport from './AdminComponents/Reports/OrderReport';
import DropshipPending from './AdminComponents/Dropshippersprofit/DropshipPending';
import PendingByOrder from './AdminComponents/Dropshippersprofit/PendingByOrder';
import DropshipPaid from './AdminComponents/Dropshippersprofit/DropshipPaid';
import Loader from './Loader/Loader';
import PaidPerUser from './AdminComponents/Dropshippersprofit/PaidPerUser';
import ProfitOrderDetails from './AdminComponents/Dropshippersprofit/ProfitOrderDetails';
import PendingOrderEdit from './Components/Orders/PendingOrderEdit';
import ImportProducts from './AdminComponents/Product/ImportProducts';
import Payments from './AdminComponents/Payments/Payments';
import MyPaidProfits from './Components/MyProfits/MyPaidProfits';
import MyPendingProfits from './Components/MyProfits/MyPendingProfits';
import MyOrderDetails from './Components/MyProfits/MyOrderDetails';
import MySingleProfit from './Components/MyProfits/MySingleProfit';


axios.defaults.withCredentials = true;
function App() {
  const host = process.env.REACT_APP_API_URL;
  let [user, setUser] = useState({});
  let [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  let [error, setError] = useState('');
  let DSrequest = false;
  let admin = false;
  let nouser = false;
  let request = false;

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        request = false;
        setLoading(true)
        const { data } = await axios.get(`${host}/api/auth/user`, { withCredentials: true });
        setUser(data);
        setLoading(false)
        request = true;
      } catch (e) {
        request = true;
        setLoading(false)
        setError('');
      }
    }
    getUserDetails();

    // eslint-disable-next-line
  }, [])


  if (user._id && user.isAdmin === false && user.role === "dropshipper" && user.dropShipperStatus === false) {
    DSrequest = true;
  }


  if (user._id && user.isAdmin === true) {
    admin = true;
  }
  if (!user._id && request) {
    nouser = true;
  }
  return (
    <>
      <div className='home'>
        {loading ? <Loader /> :
          <BrowserRouter>
            <ProductState>
              <User>
                <OrderState>
                  {admin && <SidebarLayout setuser={setUser} />}
                  {/* {DSrequest ? null : (user._id && user.isAdmin === false) ? <Sidebar setuser={setUser} /> : null} */}
                  {DSrequest ? null : (user._id && user.isAdmin === false) ? <Sidebar /> : null}
                  <Routes>
                    {/* <Login/> */}
                    <Route path="/" element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductMain data="fetchallproducts" /> : admin ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/login" element={DSrequest ? <Navigate to="/" /> : (user._id && user.isAdmin === false) ? <Navigate to="/" /> : admin ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={DSrequest ? <Navigate to="/" /> : (user._id && user.isAdmin === false) ? <Navigate to="/" /> : admin ? <Navigate to="/" /> : <Signup setuser={setUser} />} />
                    <Route path='/productMain' element={DSrequest ? <c setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductMain /> : <Navigate to="/login" />} />
                    {/* <Route path='/categories/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin == false) ? <CategoryProducts params={{ id: ':id' }} /> : null} /> */}
                    <Route path='/featured' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <FeaturedProducts /> : null} />
                    <Route path='/onsale' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <OnSaleProducts /> : null} />
                    <Route path='/instock' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <Instock /> : null} />
                    <Route path='/outOfStock' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <OutOfStock /> : null} />
                    <Route path='/cart' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <Cart /> : null} />
                    <Route path='/myshop' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyShopMain /> : null} />
                    <Route path='/product/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ProductDetail params={{ id: 'id' }} /> : null} />
                    <Route path='/user/dashboard' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserDashboard /> : null} />
                    <Route path='/user/profile' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserProfile /> : null} />
                    <Route path='/myOrders' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyOrders /> : null} />
                    <Route path='/orders/pending' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PendingOrders /> : null} />
                    <Route path='/orders/Pending/orderedit/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PendingOrderEdit /> : null} />
                    <Route path='/orders/delivered' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <DeliveredOrders /> : null} />
                    <Route path='/orders/shipped' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ShippedOrders /> : null} />
                    <Route path='/orders/returned' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <ReturnedOrders /> : null} />
                    <Route path='/category/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <CategoryProducts /> : null} />
                    <Route path='/checkout' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <PlaceOrder /> : null} />
                    <Route path='/user/addbankdetails' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserBank /> : null} />
                    <Route path='/user/updatebank' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <UserBankUpdate /> : null} />
                    <Route path='/user/myPaidProfits' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyPaidProfits /> : null} />
                    <Route path='/user/myPendingProfits' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyPendingProfits /> : null} />
                    <Route path='/user/mysingleProfit/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MySingleProfit /> : null} />
                    <Route path='/user/order/:id' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin === false) ? <MyOrderDetails /> : null} />
                    {/* <Route path='/checkout' element={DSrequest ? <RequestedDS setUser={setUser} /> : (user._id && user.isAdmin == false) ? <Checkout /> : null} /> */}



                    {/* Admin Routes */}
                    <Route exact path="/admin/" element={(user._id && user.isAdmin === false) ? <ProductMain data="fetchallproducts" /> : !admin ? <AdminLogin setUser={setUser} /> : <Dashboard />} />
                    <Route exact path="/admin/login" element={(user._id && user.isAdmin === false) ? <Navigate to='/' /> : !admin ? <AdminLogin setUser={setUser} /> : <Dashboard />} />
                    <Route path="/admin/usercreation" element={admin ? <Usercreation /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/dashboard" element={admin ? <Dashboard /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/customer" element={admin ? <Customers /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/customer/wholeseller" element={admin ? <Wholeseller /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/customer/dropshipper" element={admin ? <Dropship /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/customer/requests" element={admin ? <Requests /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/customer/edit/:id" element={admin ? <EditCustomers /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/products" element={admin ? <AdminProducts /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/featured" element={admin ? <Featured /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/onsale" element={admin ? <OnSale /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/categories" element={admin ? <Categories /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/payments" element={admin ? <Payments /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    {/* <Route path="/admin/allorders" element={admin ? <Order /> : <Navigate to="/admin/login" />} /> */}
                    <Route path="/admin/dropshiporders" element={admin ? <DropshipOrder /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/wholesaleorders" element={admin ? <WholesaleOrder /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/orderproduct/details/:id" element={admin ? <OrderProductDetails /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/updateshippingstatusW/:id" element={admin ? <UpdateShippingStatusW /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/updateshippingstatus/:id" element={admin ? <UpdateShippingStatus /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/updateshippingstatusD/:id" element={admin ? <UpdateShippingStatusD /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/editwholesaleorder/:id" element={admin ? <EditOrderAdminW /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/editdropshiporder/:id" element={admin ? <EditOrderAdminD /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/shippingcost" element={admin ? <Shippingcost /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    {/* <Route path="/admin/reports" element={admin ? <Reports /> : nouser ? <Navigate to='/admin/login' />:null} /> */}
                    <Route path="/admin/pendingprofits" element={admin ? <DropshipPending /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/pendingprofits/byorder/:id" element={admin ? <PendingByOrder /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/dropship-paid" element={admin ? <DropshipPaid /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/paidperUser/:id" element={admin ? <PaidPerUser /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/singleprofit/:userid/:id" element={admin ? <ProfitOrderDetails /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    {/* <Route path="/admin/products" element={admin ? <AddProduct /> : nouser ? <Navigate to='/admin/login' />:null} /> */}
                    <Route path="/admin/addProduct" element={admin ? <AddProduct /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/addProduct/importproducts" element={admin ? <ImportProducts /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/category/edit/:id" element={admin ? <EditCategory /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/product/edit/:id" element={admin ? <EditProduct /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/reports/order-report" element={admin ? <OrderReport /> : nouser ? <Navigate to='/admin/login' /> : null} />
                    <Route path="/admin/addshippingcost" element={admin ? <Addshippingcost /> : nouser ? <Navigate to='/admin/login' /> : null} />

                    <Route path='*' element={NotFound} />
                  </Routes>
                </OrderState>
              </User>
            </ProductState>
          </BrowserRouter>
        }</div>
    </>
  );
}

export default App;
