import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router-dom";

// Search Data
// const searchData = [
//   {
//     name: "Fashion",
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//   },
//   {
//     name: "Shirt",
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//   },
//   {
//     name: "Jacket",
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//   },
//   {
//     name: "Mobile",
//     image:
//       "https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg",
//   },
//   {
//     name: "Laptop",
//     image:
//       "https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg",
//   },
//   {
//     name: "Home",
//     image:
//       "https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg",
//   },
//   {
//     name: "book",
//     image:
//       "https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg",
//   },
// ];

const SearchBar = () => {
  // Search State
  const [search, setSearch] = useState("");

  // navigate

  const navigate = useNavigate();

  // context api
  const context = useContext(myContext);
  const { getAllProduct } = context;

  console.log(getAllProduct, "getAllProduct");

  const filterSearchData = getAllProduct
    .filter((obj) => obj.title.toLowerCase().includes(search))
    .slice(0, 8);

  // let filterSearchData;

  // if (
  //   getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)) ||
  //   getAllProduct.filter((obj) =>
  //     obj.description.toLowerCase().includes(search)
  //   )
  // ) {
  //   filterSearchData = getAllProduct
  //     .filter((obj) => obj.title.toLowerCase().includes(search))
  //     .slice(0, 8);

  //   if (
  //     getAllProduct.filter((obj) =>
  //       obj.description.toLowerCase().includes(search)
  //     )
  //   ) {
  //     filterSearchData = getAllProduct
  //       .filter((obj) => obj.description.toLowerCase().includes(search))
  //       .slice(0, 8);
  //   }
  // }

  // // Filter Search Data
  // const filterSearchData = searchData
  //   .filter((obj) => obj.name.toLowerCase().includes(search))
  //   .slice(0, 8);
  return (
    <div className="">
      {/* search input  */}
      <div className="input flex justify-center">
        <input
          value={search}
          type="text"
          placeholder="Search here"
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-gray-200 placeholder-gray-400 rounded-lg !px-2 !py-2 w-96 lg:w-96 md:w-96 outline-none text-black "
        />
      </div>

      {/* search drop-down  */}
      <div className=" flex justify-center">
        {search && (
          <div className="block absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 !my-1 rounded-lg !px-2 !py-2">
            {filterSearchData.length > 0 ? (
              <>
                {filterSearchData.map((item, index) => {
                  return (
                    <div
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      key={index}
                      className="!py-2 !px-2 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          className="w-10"
                          src={item.productImageUrl}
                          alt=""
                        />
                        {item.title}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    className=" w-20"
                    src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                    alt="img"
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
