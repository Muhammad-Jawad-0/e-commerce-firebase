import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
const products = [
  {
    id: 1,
    name: "Nike Air Force 1 07 LV8",
    imageSrc:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png",
    href: "#",
    price: "₹61,999",
    color: "Orange",
    imageAlt: "Nike Air Force 1 07 LV8",
    quantity: 1,
  },
];

const UserDashboard = () => {
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;
  let total = 0;
  getAllOrder.map((v) => (total += v.totalAmount));


  // user
  let user = JSON.parse(localStorage.getItem("users"));
  return (
    <Layout>
      <div className=" container !mx-auto !px-4 !py-5 lg:!py-8">
        {/* Top  */}
        <div className="top ">
          {/* main  */}
          <div className=" bg-pink-200 !py-5 rounded-xl border border-pink-100">
            {/* image  */}
            <div className="flex justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                alt=""
              />
            </div>
            {/* text  */}
            <div className="">
              {/* Name  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Name :</span> {user?.name}
              </h1>
              {/* Email  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Email :</span> {user?.email}
              </h1>
              {/* User Id  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">UserId :</span> {user?.uid}
              </h1>
              {/* Date  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Date : </span>
                {user?.date}
              </h1>
              {/* Role  */}
              <h1 className=" text-center text-lg">
                <span className=" font-bold">Role : </span>
                {user?.role}
              </h1>
            </div>
          </div>
        </div>

        {/* bottom  */}
        <div className="bottom">
          {/* main 1 */}
          <div className="!mx-auto !my-4 max-w-6xl !px-2 md:!my-6 md:!px-0">
            {/* text  */}
            <div className="flex justify-between">
              <h2 className="text-2xl lg:text-3xl font-bold">Order Details</h2>
              <div className="">
                <h2 className="text-2xl lg:text-3xl font-bold">Total Amount</h2>
                <p className="text-red-500 font-bold">$:{total}</p>
              </div>
            </div>

            {/* main 2 */}

            {getAllOrder
              .filter((obj) => obj.userid === user?.uid)
              .map((order, index) => {
                return (
                  <div className="" key={index}>
                    {order.cartItems.map((item, index) => {
                      const {
                        id,
                        date,
                        quantity,
                        price,
                        title,
                        productImageUrl,
                        category,
                      } = item;
                      return (
                        <div
                          key={index}
                          className="!mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
                        >
                          {/* main 3  */}
                          <div className="w-full border-r border-pink-100 bg-pink-200 md:max-w-xs">
                            {/* left  */}
                            <div className="!p-8">
                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                                <div className="!mb-4">
                                  <div className="text-sm font-semibold text-black">
                                    Order Id
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {id}
                                  </div>
                                </div>

                                <div className="!mb-4">
                                  <div className="text-sm font-semibold">
                                    Date
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {date}
                                  </div>
                                </div>

                                <div className="!mb-4">
                                  <div className="text-sm font-semibold">
                                    Total Amount
                                  </div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {price * quantity}
                                  </div>
                                </div>

                                <div className="!mb-4">
                                  <div className="text-sm font-semibold">
                                    Order Status
                                  </div>
                                  <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                                    {order.statue}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* right  */}
                          <div className="flex-1">
                            <div className="!p-8">
                              <ul className="!-my-7 divide-y divide-gray-200">
                                <li className="flex flex-col justify-between space-x-5 !py-7 md:flex-row">
                                  <div className="flex flex-1 items-stretch">
                                    <div className="flex-shrink-0">
                                      <img
                                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                        src={productImageUrl}
                                        alt={title}
                                      />
                                    </div>

                                    <div className="!ml-5 flex flex-col justify-between">
                                      <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-900">
                                          {title}
                                        </p>
                                        <p className="!mt-1.5 text-sm font-medium text-gray-500">
                                          {category}
                                        </p>
                                      </div>

                                      <p className="!mt-4 text-sm font-medium text-gray-500">
                                        x {quantity}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="!ml-auto flex flex-col items-end justify-between">
                                    <p className="text-right text-sm font-bold text-gray-900">
                                      $:{price}
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
