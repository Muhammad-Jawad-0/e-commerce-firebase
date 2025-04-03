import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  fireDB,
  onSnapshot,
  orderBy,
  query,
} from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const MyState = ({ children }) => {
  // Loading State
  const [loading, setLoading] = useState(false);
  // user State
  const [getAllProduct, setGetAllProduct] = useState([]);

  /**========================================================================
   *                Get All Product Function
   *========================================================================**/

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        const productArray = [];
        querySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
          setGetAllProduct(productArray);
          setLoading(false);
        });
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Order State
  const [getAllOrder, setGetAllOrder] = useState([]);

  /**========================================================================
   *                Get All Order Function
   *========================================================================**/

  const getAllOrderFunction = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "order"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        const orderArray = [];
        querySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllOrder(orderArray);

        // toast.success("All Order Get Sucessfully");
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      toast.error("getAllOrderFunction Error");
      setLoading(false);
    }
  };

  /**========================================================================
   *                Delete Order Function
   *========================================================================**/

  const orderDelete = async (id) => {
    setLoading(true);

    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order Deleted successfully");
      getAllOrderFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("deleteOrderFunction error");
      setLoading(false);
    }
  };

  /**========================================================================
   *                GET ALL USER Function
   *========================================================================**/

  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFunction = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));
      const data = onSnapshot(q, (querySnapshot) => {
        const userArray = [];
        querySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("getAllUserFunction error");
    }
  };

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        // loading
        loading,
        setLoading,
        //getAllProduct
        getAllProduct,
        getAllProductFunction,
        // getAllOrder
        getAllOrder,
        //deleteOrderFunction
        orderDelete,
        //get user
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
