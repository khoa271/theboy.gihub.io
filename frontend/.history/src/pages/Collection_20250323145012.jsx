// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {

//   const { products , search , showSearch } = useContext(ShopContext);
//   const [showFilter,setShowFilter] = useState(false);
//   const [filterProducts,setFilterProducts] = useState([]);
//   const [category,setCategory] = useState([]);
//   const [subCategory,setSubCategory] = useState([]);
//   const [sortType,setSortType] = useState('relavent')

//   const toggleCategory = (e) => {

//     if (category.includes(e.target.value)) {
//         setCategory(prev=> prev.filter(item => item !== e.target.value))
//     }
//     else{
//       setCategory(prev => [...prev,e.target.value])
//     }

//   }

//   const toggleSubCategory = (e) => {

//     if (subCategory.includes(e.target.value)) {
//       setSubCategory(prev=> prev.filter(item => item !== e.target.value))
//     }
//     else{
//       setSubCategory(prev => [...prev,e.target.value])
//     }
//   }

//   const applyFilter = () => {

//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter(item => category.includes(item.category));
//     }

//     if (subCategory.length > 0 ) {
//       productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
//     }

//     setFilterProducts(productsCopy)

//   }

//   const sortProduct = () => {

//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
//         break;

//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
//         break;

//       default:
//         applyFilter();
//         break;
//     }

//   }

//   useEffect(()=>{
//       applyFilter();
//   },[category,subCategory,search,showSearch,products])

//   useEffect(()=>{
//     sortProduct();
//   },[sortType])

//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
//       {/* Filter Options */}
//       <div className='min-w-60'>
//         <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>BỘ LỌC
//           <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//         </p>
//         {/* Category Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>DANH MỤC</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Nam'} onChange={toggleCategory}/> Nam
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Nu'} onChange={toggleCategory}/> Nữ
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'PhuKien'} onChange={toggleCategory}/> Phụ Kiện
//             </p>
//           </div>
//         </div>
//         {/* SubCategory Filter */}
//         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
//           <p className='mb-3 text-sm font-medium'>LOẠI</p>
//           <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'AoKhoacNgoai'} onChange={toggleSubCategory}/> Áo Khoác Ngoài
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'Dam'} onChange={toggleSubCategory}/> Đầm
//             </p>
//             <p className='flex gap-2'>
//               <input className='w-3' type="checkbox" value={'QuanDai'} onChange={toggleSubCategory}/> Quần Dài
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className='flex-1'>

//         <div className='flex justify-between text-base sm:text-2xl mb-4'>
//             <Title text1={'TẤT CẢ'} text2={'BỘ SƯU TẬP'} />
//             {/* Porduct Sort */}
//             <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//               <option value="relavent">Sắp xếp theo: Liên quan</option>
//               <option value="low-high">Sắp xếp theo: Giá thấp tới cao</option>
//               <option value="high-low">Sắp xếp theo: Giá cao tới thấp</option>
//             </select>
//         </div>

//         {/* Map Products */}
//         <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//           {
//             filterProducts.map((item,index)=>(
//               <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//             ))
//           }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Collection


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  // ✅ Toggle chọn danh mục
  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  // ✅ Toggle chọn loại sản phẩm
  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value) ? prev.filter((item) => item !== e.target.value) : [...prev, e.target.value]
    );
  };

  // ✅ Lọc sản phẩm dựa trên danh mục, loại, và tìm kiếm
  const applyFilter = () => {
    let productsCopy = [...products];

    // Lọc theo từ khóa tìm kiếm
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Lọc theo danh mục (Nam, Nữ, Phụ Kiện)
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Lọc theo loại sản phẩm (Áo Khoác, Đầm, Quần Dài)
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.some((sub) => item.subCategory.includes(sub))
      );
    }

    setFilterProducts(productsCopy);
  };

  // ✅ Sắp xếp sản phẩm theo giá
  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }

    setFilterProducts(sortedProducts);
  };

  // ✅ Cập nhật danh sách sản phẩm khi filter thay đổi
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  // ✅ Cập nhật sắp xếp khi thay đổi kiểu sắp xếp
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Bộ lọc */}
      <div className="min-w-60">
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">
          BỘ LỌC
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Lọc theo danh mục */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">DANH MỤC</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Nam" onChange={toggleCategory} /> Nam
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Nu" onChange={toggleCategory} /> Nữ
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="PhuKien" onChange={toggleCategory} /> Phụ Kiện
            </p>
          </div>
        </div>

        {/* Lọc theo loại sản phẩm */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">LOẠI</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="AoKhoacNgoai" onChange={toggleSubCategory} /> Áo Khoác Ngoài
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="Dam" onChange={toggleSubCategory} /> Đầm
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value="QuanDai" onChange={toggleSubCategory} /> Quần Dài
            </p>
          </div>
        </div>
      </div>

      {/* Sản phẩm hiển thị */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="TẤT CẢ" text2="BỘ SƯU TẬP" />

          {/* Bộ lọc sắp xếp */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sắp xếp theo: Liên quan</option>
            <option value="low-high">Sắp xếp theo: Giá thấp tới cao</option>
            <option value="high-low">Sắp xếp theo: Giá cao tới thấp</option>
          </select>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
