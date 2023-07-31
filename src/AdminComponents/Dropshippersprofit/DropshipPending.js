import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Notification from "../../Notifications/Notifications";
import { ReactNotifications } from "react-notifications-component";
import Loader from "../../Loader/Loader";
const image = window.location.origin + "/Assets/no-data.svg";
const DropshipPending = () => {
  const host = process.env.REACT_APP_API_URL;
  const [allProfits, setAllProfits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getAllProfits()
  }, [])
  const getAllProfits = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${host}/api/profitrecords/allprofits`);
      setAllProfits(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }
  const payAllProfits = async (user, amount) => {
    try {
      setLoading(true)
      const { data } = await axios.post(`${host}/api/profitrecords/payAllProfits`, { userId: user, amount });
      Notification('Success', data.message, 'success')
      await getAllProfits();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      Notification('Error', error.message, 'danger')
    }
  }

  const filter = () => {
    if (
      to &&
      from &&
      new Date(from).toISOString() <= new Date(to).toISOString()
    ) {
      const startUTC = new Date(from).toISOString();
      let endUTC = new Date(to);
      endUTC.setUTCHours(23, 59, 59, 999);
      endUTC = endUTC.toISOString();
      if (startUTC && endUTC) {
        const filtered = orders?.filter((record) => {
          let recordDate = new Date(record.date);
          recordDate.setUTCHours(recordDate.getUTCHours() + 5);
          recordDate = recordDate.toISOString();
          return recordDate >= startUTC && recordDate <= endUTC;
        });
        setFilteredRecords(filtered);
      } else {
        Notification("Error", "Enter Valid Dates", "danger");
      }
    } else {
      Notification("Error", "Enter Valid Dates", "danger");
    }
  };

  console.log(allProfits);

  return (
    <>
      <ReactNotifications />{loading ? <Loader /> :
        <>
          <div className="d-flex w-80 align-items-center justify-content-evenly mb-3 mt-3">
            <div>
              <label for="" className="form-label">
                Starting From: &nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="Date"
                className="p-1"
                onChange={(e) => setFrom(e.target.value)}
                value={from}
                name="from"
                placeholder=""
              />
            </div>
            <div>
              <label for="" className="form-label">
                Till Date:&nbsp;&nbsp;&nbsp;{" "}
              </label>
              <input
                type="Date"
                className="p-1"
                name="to"
                onChange={(e) => setTo(e.target.value)}
                value={to}
                placeholder=""
              />
            </div>
            <button className="btn btn-sm btn-info text-light" onClick={filter}>
              Filter
            </button>
            <button
              className="btn btn-sm btn-info text-light"
              onClick={() => setFilteredRecords(orders)}
            >
              Fetch All
            </button>
          </div>
          <div className="main">
            <div className="container-fluid">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="table-dark">
                    <th colSpan="1" >Sr.</th>
                    <th colSpan="1" className="text-center">Customer Name</th>
                    <th colSpan="1" className="text-center">Company Name</th>
                    <th colSpan="1" className="text-center">Contact</th>
                    <th colSpan="1" className="text-center">Pending Profit</th>
                    <th colSpan="1" className="text-center">Pay Profit</th>
                    <th colSpan="1" className="text-center">Profit Detail</th>
                  </tr>
                </thead>
                <tbody>

                  {allProfits && allProfits?.map((item, key) => {
                    return (<tr key={key}>
                      <td colSpan="1" className="text-center">{key + 1}</td>
                      <td colSpan="1" className="text-center">{item?.name}</td>
                      <td colSpan="1" className="text-center">{item?.company}</td>
                      <td colSpan="1" className="text-center">{item?.city}</td>
                      <td colSpan="1" className="text-center">{item?.totalProfit}</td>
                      <td colSpan="1" className="text-center"><button disabled={item?.totalProfit <= 0} onClick={() => payAllProfits(item?.id, item?.totalProfit)} className="btn btn-primary">Pay Profit </button></td>
                      <td colSpan="1" className="text-center"><Link to={`/admin/pendingprofits/byorder/${item?.id}`}><button className="btn btn-primary">Detail</button></Link></td>
                    </tr>)
                  })}
                </tbody>
              </table>
              {allProfits?.length <= 0 && <div className='no_data'>
                <img className='no_data-img' src={image} alt='No Data' ></img>
              </div>}
            </div>
          </div></>}
    </>
  );
}

export default DropshipPending;

