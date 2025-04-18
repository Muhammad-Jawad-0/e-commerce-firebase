import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux-toolkit/CartSlice";
import toast from "react-hot-toast";
// productData
// const productData = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 150,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//     title: "Kaushalam kalash Copper Pot",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 130,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 150,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//     title: "Kaushalam kalash Copper Pot",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 130,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
//     title: "Hand Painted Blue Kaushalam Tea Pot in Aluminium",
//     desc: "Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.",
//     price: 120,
//     trendingProductName: "Featured",
//     quantity: 1,
//   },
// ];

const AllProduct = () => {
  const context = useContext(myContext);
  const { getAllProduct, loading } = context;
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Add to Cart");
  };
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Delete Cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <Layout>
      <div className="!py-8">
        {/* Heading  */}
        <div className="!mb-5">
          <h1 className="text-center !mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>

        {/* main  */}
        <section className="text-gray-600 body-font">
          <div className="container !px-5 lg:!px-0 !py-5 !mx-auto">
            <div className="flex justify-center">{loading && <Loader />}</div>
            <div className="flex flex-wrap !-m-4">
              {getAllProduct.map((item, index) => {
                const { id, title, price, productImageUrl } = item;
                return (
                  <div key={index} className="!p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="lg:h-80 h-96 w-full"
                        src={productImageUrl}
                        alt={title}
                      />
                      <div className="!p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 !mb-1">
                          E-bharat
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 !mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 !mb-3">
                          ₹{price}
                        </h1>

                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-pink-500 hover:bg-pink-600 w-full text-white !py-[4px] rounded-lg font-bold"
                            >
                              Delete From Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-pink-500 hover:bg-pink-600 w-full text-white !py-[4px] rounded-lg font-bold"
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
