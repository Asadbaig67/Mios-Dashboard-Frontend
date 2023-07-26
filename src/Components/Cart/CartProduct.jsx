import { useState, useContext, useEffect } from 'react';
import ProductContext from "../../context/Product/ProductContext";
import UserContext from '../../context/User/UserContext';


export const CartProduct = ({ Data }) => {

    const context = useContext(ProductContext);
    const { user } = useContext(UserContext);
    const { removeCartProduct, updateCartProductQty, cartLoading } = context;
    const [Qty, setQty] = useState(Data.quantity);
    const [currPrice, setCurrPrice] = useState(user.role === "wholeseller" ? Data?.product?.wholesalePrice : user.role === "dropshipper" ? Data.product.dropshipperPrice : 0);
    useEffect(() => {
        if (user.isAdmin === false) {
            if (user.role === "wholeseller") {
                if (Data.product.onSale) {
                    setCurrPrice(Data.product.discountedPriceW)
                } else {
                    setCurrPrice(Data.product.wholesalePrice)
                }
            } else if (user.role === "dropshipper") {
                if (Data.product.onSale) {
                    setCurrPrice(Data.product.discountedPriceD)
                } else {
                    setCurrPrice(Data.product.dropshipperPrice)
                }
            }
        }
    }, [cartLoading, user])// eslint-disable-line react-hooks/exhaustive-deps


    // useEffect(() => {
    //     if (Qty >= 1) {
    //         // updateCartProductQty(Data.product._id, Qty);
    //     }
    // }, [Qty])// eslint-disable-line react-hooks/exhaustive-deps

    const addOne = () => {
        updateCartProductQty(Data.product._id, Qty + 1);
        setQty(Qty + 1);

    }

    const minusOne = () => {
        if (Qty >= 2) {
            setQty(Qty - 1);
            updateCartProductQty(Data.product._id, Qty - 1);
        }
    }

    const handleRemove = (id) => {
        removeCartProduct(id);
    }

    const handleChange = (e) => {
        const newQty = parseInt(e.target.value);
        if (!isNaN(newQty)) {
            setQty(newQty);
            // updateCartProductQty(Data.product._id, newQty)
        } else {
            setQty(0);
        }
    }

    return (
        <>

            {/* {
                        price = Data.product.disQtyedPrice ? Data.product.disQtyedPrice : Data.product.wholesalePrice
                        price = price * Qty} */}

            <tr >
                <td scope="row" style={{ width: "15%" }}>
                    <img src={Data.product.photo?.url || "https://i.imgur.com/xdbHo4E.png"} style={{ maxHeight: '50px', maxWidth: '50px' }} alt={Data.product.title} />
                </td>

                <td style={{ width: '40%' }}>
                    <p style={{ fontSize: "13px" }}>{Data.product.title}</p>
                </td>

                <td>
                    <p style={{ fontSize: "13px" }}>Rs. {currPrice && currPrice}</p>
                </td>

                <td className='d-flex justify-content-between'>
                    <div>
                        <button style={{ border: "1px solid lightgrey" }} onClick={minusOne}>
                            -
                        </button>
                        <input disabled style={{ border: "1px solid lightgrey", width: "40px", background: "white", }} value={Qty} type="number" onChange={handleChange} name="quantity" min="1" />

                        <button style={{ border: "1px solid lightgrey" }} onClick={addOne}>
                            +
                        </button>
                    </div>
                    <div>
                        <button style={{ border: "1px solid lightgrey" }} onClick={() => handleRemove(Data.product._id)}>
                            X
                        </button>
                    </div>
                </td>

                <td>
                    <p style={{ fontSize: "13px" }}>Rs. {currPrice * Qty}</p>
                </td>
            </tr>



        </>
    )
}