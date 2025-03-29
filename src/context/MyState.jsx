import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  collection,
  fireDB,
  onSnapshot,
  orderBy,
  query,
} from "../firebase/FirebaseConfig";

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

  useEffect(() => {
    getAllProductFunction();
  }, []);
  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
