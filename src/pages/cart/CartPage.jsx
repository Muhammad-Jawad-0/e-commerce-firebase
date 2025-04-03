import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from "lucide-react";
import {
  decrementQuantity,
  deleteFromCart,
  incrementQuantity,
} from "../../redux-toolkit/CartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import {
  addDoc,
  collection,
  fireDB,
  Timestamp,
} from "../../firebase/FirebaseConfig";
import Login from "../registration/Login";
import { Navigate } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     name: "Nike Air Force 1 07 LV8",
//     href: "#",
//     price: "₹47,199",
//     originalPrice: "₹48,900",
//     discount: "5% Off",
//     color: "Orange",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
//   },
//   {
//     id: 2,
//     name: "Nike Blazer Low 77 SE",
//     href: "#",
//     price: "₹1,549",
//     originalPrice: "₹2,499",
//     discount: "38% off",
//     color: "White",
//     leadTime: "3-4 weeks",
//     size: "8 UK",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e48d6035-bd8a-4747-9fa1-04ea596bb074/blazer-low-77-se-shoes-0w2HHV.png",
//   },
//   {
//     id: 3,
//     name: "Nike Air Max 90",
//     href: "#",
//     price: "₹2219 ",
//     originalPrice: "₹999",
//     discount: "78% off",
//     color: "Black",
//     imageSrc:
//       "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fd17b420-b388-4c8a-aaaa-e0a98ddf175f/dunk-high-retro-shoe-DdRmMZ.png",
//   },
// ];

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let discount = 0;
  // delete cart
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete cart");
  };

  // increment quantity
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  // decrement quantity
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  // cart item total
  const cartItemTotal = cartItems
    .map((item) => item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // cart total price
  const cartTotal = cartItems
    .map((item) => item.price * item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  console.log(cartTotal);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ======================================================
  // BUY AND NOW FUNCTION
  // ======================================================

  // user

  const user = JSON.parse(localStorage.getItem("users"));

  // addres info state

  const [addressInfo, setAddressInfo] = useState({
    name: "",
    address: "",
    pincode: "",
    mobileNumber: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // buy now function

  const buyNowFunction = async () => {
    // validation
    if (
      addressInfo.name === "" ||
      addressInfo.address === "" ||
      addressInfo.pincode === "" ||
      addressInfo.mobileNumber === ""
    ) {
      return toast.error("All Fields are required");
    }

    // order information
    const orderInfo = {
      cartItems,
      addressInfo,
      email: user.email,
      userid: user.uid,
      totalAmount: cartTotal,
      statue: "confirm",
      time: Timestamp.now(),
      date: new Date().toLocaleString({
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      await addDoc(orderRef, orderInfo);
      setAddressInfo({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
      });
      toast.success("order Placed Sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("card page err");
    }
  };
  return (
    <Layout>
      <div className="container !mx-auto !px-2 !max-w-7xl lg:!px-0">
        <div className="!mx-auto !max-w-2xl !py-8 lg:!max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl !mb-4">
            Shopping Cart
          </h1>
          <form className="!mt-12 lg:!grid lg:!grid-cols-12 lg:!items-start lg:!gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:!col-span-8 !px-2 !py-2"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((item, index) => {
                      const {
                        id,
                        title,
                        price,
                        productImageUrl,
                        quantity,
                        category,
                      } = item;
                      return (
                        <div key={id} className="!mb-2">
                          <li className="flex !py-6 sm:!py-6">
                            <div className="flex-shrink-0">
                              <img
                                src={productImageUrl}
                                alt={title}
                                className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                              />
                            </div>

                            <div className="!ml-4 flex flex-1 !flex-col !justify-between sm:!ml-6 !px-2 !py-2">
                              <div className="relative !pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:!pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <p className="font-semibold text-black">
                                        {title}
                                      </p>
                                    </h3>
                                  </div>
                                  <div className="!mt-1 flex text-sm">
                                    <p className="text-sm text-gray-500">
                                      {category}
                                    </p>
                                    {/* {product.size ? (
                                  <p className="!ml-4 border-l border-gray-200 !pl-4 text-sm text-gray-500">
                                    {product.size}
                                  </p>
                                ) : null} */}
                                  </div>
                                  <div className="!mt-1 flex items-end">
                                    <p className="text-xs font-medium text-gray-500 ">
                                      $ {price}
                                    </p>
                                    {/* <p className="text-sm font-medium text-gray-900">
                                  &nbsp;&nbsp;{product.price}
                                </p> */}
                                    {/* &nbsp;&nbsp;
                                <p className="text-sm font-medium text-green-500">
                                  {product.discount}
                                </p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="!mb-2 flex">
                            <div className="min-w-24 flex">
                              <button
                                onClick={() => handleDecrement(id)}
                                type="button"
                                className="h-7 !w-7 cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                disabled
                                type="text"
                                className="!mx-1 h-7 w-9 rounded-md border text-center"
                                value={quantity}
                              />
                              <button
                                onClick={() => handleIncrement(id)}
                                type="button"
                                className="flex h-7 w-7 items-center justify-center cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <div className="!ml-6 flex text-sm">
                              <button
                                onClick={() => deleteCart(item)}
                                type="button"
                                className="flex items-center space-x-1 !px-2 !py-1 !pl-0 cursor-pointer"
                              >
                                <Trash size={12} className="text-red-500" />
                                <span className="text-xs font-medium text-red-500">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <h1>not found</h1>
                )}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="!mt-16 rounded-md bg-white lg:col-span-4 lg:!mt-0 lg:!p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 !px-2 !py-3 text-lg font-medium text-gray-900 sm:!p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className="space-y-1 !px-2 !py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({cartItemTotal} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      $ {cartTotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between !pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700 line-through">
                      - $ {discount || "00.00"}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between !py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed !py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${cartTotal}
                    </dd>
                  </div>
                </dl>
                <div className="!px-2 !pb-4 font-medium text-green-700">
                  <div className="flex !gap-4 !mb-6">
                    {user ? (
                      <BuyNowModal
                        setAddressInfo={setAddressInfo}
                        addressInfo={addressInfo}
                        buyNowFunction={buyNowFunction}
                      />
                    ) : (
                      <Navigate to={"/login"} />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// import { useDispatch, useSelector } from "react-redux";
// import Layout from "../../components/layout/Layout";
// import { Trash } from "lucide-react";
// import {
//   decrementQuantity,
//   deleteFromCart,
//   incrementQuantity,
// } from "../../redux-toolkit/CartSlice";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
// import { Navigate } from "react-router";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const deleteCart = (item) => {
//     dispatch(deleteFromCart(item));
//     toast.success("Delete cart");
//   };

//   const handleIncrement = (id) => {
//     dispatch(incrementQuantity(id));
//   };

//   const handleDecrement = (id) => {
//     dispatch(decrementQuantity(id));
//   };

//   // const cartQuantity = cartItems.length;

//   const cartItemTotal = cartItems
//     .map((item) => item.quantity)
//     .reduce((prevValue, currValue) => prevValue + currValue, 0);

//   const cartTotal = cartItems
//     .map((item) => item.price * item.quantity)
//     .reduce((prevValue, currValue) => prevValue + currValue, 0);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // user
//   const user = JSON.parse(localStorage.getItem("users"));

//   // =====================================================
//   // Buy Now Function
//   // =====================================================

//   const [addressInfo, setAddressInfo] = useState({
//     name: "",
//     address: "",
//     pincode: "",
//     mobileNumber: "",
//     time: Timestamp.now(),
//     date: new Date().toLocaleString("en-US", {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }),
//   });

//   const buyNowFunction = () => {
//     // validation
//     if (
//       addressInfo.name === "" ||
//       addressInfo.address === "" ||
//       addressInfo.pincode === "" ||
//       addressInfo.mobileNumber === ""
//     ) {
//       return toast.error("All Fields are required");
//     }

//     // Order Info
//     const orderInfo = {
//       cartItems,
//       addressInfo,
//       email: user.email,
//       userid: user.uid,
//       status: "confirmed",
//       time: Timestamp.now(),
//       date: new Date().toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//     };
//     try {
//       const orderRef = collection(fireDB, "order");
//       addDoc(orderRef, orderInfo);
//       setAddressInfo({
//         name: "",
//         address: "",
//         pincode: "",
//         mobileNumber: "",
//       });
//       toast.success("Order Placed Successfull");
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className="container mx-auto px-4 max-w-7xl lg:px-0">
//         <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Shopping Cart
//           </h1>
//           <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//             <section
//               aria-labelledby="cart-heading"
//               className="rounded-lg bg-white lg:col-span-8"
//             >
//               <h2 id="cart-heading" className="sr-only">
//                 Items in your shopping cart
//               </h2>
//               <ul role="list" className="divide-y divide-gray-200">
//                 {cartItems.length > 0 ? (
//                   <>
//                     {cartItems.map((item, index) => {
//                       const {
//                         id,
//                         title,
//                         price,
//                         productImageUrl,
//                         quantity,
//                         category,
//                       } = item;
//                       return (
//                         <div key={index} className="">
//                           <li className="flex py-6 sm:py-6 ">
//                             <div className="flex-shrink-0">
//                               <img
//                                 src={productImageUrl}
//                                 alt="img"
//                                 className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
//                               />
//                             </div>

//                             <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
//                               <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
//                                 <div>
//                                   <div className="flex justify-between">
//                                     <h3 className="text-sm">
//                                       <div className="font-semibold text-black">
//                                         {title}
//                                       </div>
//                                     </h3>
//                                   </div>
//                                   <div className="mt-1 flex text-sm">
//                                     <p className="text-sm text-gray-500">
//                                       {category}
//                                     </p>
//                                   </div>
//                                   <div className="mt-1 flex items-end">
//                                     <p className="text-sm font-medium text-gray-900">
//                                       ₹{price}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </li>
//                           <div className="mb-2 flex">
//                             <div className="min-w-24 flex">
//                               <button
//                                 onClick={() => handleDecrement(id)}
//                                 type="button"
//                                 className="h-7 w-7"
//                               >
//                                 -
//                               </button>
//                               <input
//                                 type="text"
//                                 className="mx-1 h-7 w-9 rounded-md border text-center"
//                                 value={quantity}
//                               />
//                               <button
//                                 onClick={() => handleIncrement(id)}
//                                 type="button"
//                                 className="flex h-7 w-7 items-center justify-center"
//                               >
//                                 +
//                               </button>
//                             </div>
//                             <div className="ml-6 flex text-sm">
//                               <button
//                                 onClick={() => deleteCart(item)}
//                                 type="button"
//                                 className="flex items-center space-x-1 px-2 py-1 pl-0"
//                               >
//                                 <Trash size={12} className="text-red-500" />
//                                 <span className="text-xs font-medium text-red-500">
//                                   Remove
//                                 </span>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <h1>Not Found</h1>
//                 )}
//               </ul>
//             </section>
//             {/* Order summary */}
//             <section
//               aria-labelledby="summary-heading"
//               className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
//             >
//               <h2
//                 id="summary-heading"
//                 className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
//               >
//                 Price Details
//               </h2>
//               <div>
//                 <dl className=" space-y-1 px-2 py-4">
//                   <div className="flex items-center justify-between">
//                     <dt className="text-sm text-gray-800">
//                       Price ({cartItemTotal} item)
//                     </dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       ₹ {cartTotal}
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between py-4">
//                     <dt className="flex text-sm text-gray-800">
//                       <span>Delivery Charges</span>
//                     </dt>
//                     <dd className="text-sm font-medium text-green-700">Free</dd>
//                   </div>
//                   <div className="flex items-center justify-between border-y border-dashed py-4 ">
//                     <dt className="text-base font-medium text-gray-900">
//                       Total Amount
//                     </dt>
//                     <dd className="text-base font-medium text-gray-900">
//                       ₹ {cartTotal}
//                     </dd>
//                   </div>
//                 </dl>
//                 <div className="px-2 pb-4 font-medium text-green-700">
//                   <div className="flex gap-4 mb-6">
//                     {user ? (
//                       <BuyNowModal
//                         addressInfo={addressInfo}
//                         setAddressInfo={setAddressInfo}
//                         buyNowFunction={buyNowFunction}
//                       />
//                     ) : (
//                       <Navigate to={"/login"} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
