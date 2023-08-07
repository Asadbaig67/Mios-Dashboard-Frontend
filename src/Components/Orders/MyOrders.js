import React, { useContext, useEffect } from 'react'
import OrderContext from '../../context/Order/OrderContext'
import Loader from '../../Loader/Loader';
import UserContext from '../../context/User/UserContext';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const { getMyOrders, userOrders, orderLoading } = useContext(OrderContext);
  const { loading } = useContext(UserContext);
  useEffect(() => {
    getMyOrders()
  }, []);


  return (
    <>
      {orderLoading || loading ? <Loader /> : <div>
        <h1 style={{ textAlign: 'center' }}>My Orders</h1>
        <table className='table table-striped table-responsive table-hover' width={'90%'}>
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Sr#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Shipping Charges</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              {/* <th>Detail</th> */}
            </tr>
          </thead>
          <tbody>
            {userOrders && userOrders.map((item, ind) => {
              var date = new Date(item.date);
              var d = date.getDate();
              var m = date.getMonth() + 1;
              var y = date.getFullYear();
              var h = date.getHours();
              var min = date.getMinutes();
              return (
                <tr key={ind}>
                  <td>{ind + 1}</td>
                  {/* <td>{item.id}</td> */}
                  <td>{item.shippingDetails.name}</td>
                  <td>{item.shippingDetails.phone}</td>
                  <td>{item.shippingDetails.address}</td>
                  <td>{item.shippingDetails.city}</td>
                  <td>{item.shippingPrice}</td>
                  <td>{item.orderAmount}</td>
                  <td>{`${d}/${m}/${y} at ${h}:${min}`}</td>
                  <td>{item.orderStatus}</td>
                  {/* <td><Link to={`/user/order/${item._id}`}>Detail</Link></td> */}
                </tr>
              )
            })}
          </tbody>

        </table>

      </div>}
    </>)
}

export default MyOrders