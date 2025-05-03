import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
    
    const {currency} = useContext(ShopContext);

  return (
    <Link onClick={()=>scrollTo(0,0)} className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className=' overflow-hidden'>
      <img
  className="hover:scale-110 transition ease-in-out"
  src={image.startsWith("http") ? image : `http://localhost:3001${image}`}
  alt={name}
/>


      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className=' text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}


export default ProductItem
// import React, { useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Link } from 'react-router-dom';

// const ProductItem = ({ id, image, name, price }) => {
//     const { currency } = useContext(ShopContext);

//     return (
//         <Link to={`/product/${id}`} className="block text-gray-700 cursor-pointer">
//             <div className="overflow-hidden">
//                 <img className="hover:scale-110 transition ease-in-out w-full rounded-md" src={image} alt={name} />
//             </div>
//             <p className="pt-3 pb-1 text-sm">{name}</p>
//             <p className="text-sm font-medium">{currency}{price}</p>
//         </Link>
//     );
// };

// export default ProductItem;
