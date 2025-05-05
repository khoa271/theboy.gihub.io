// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// export const ShopContext = createContext();

// const ShopContextProvider = ({ children }) => {
//     const currency = 'VND';
//     const delivery_fee = 0;
//     const backendUrl = "http://localhost:3001";

//     const [search, setSearch] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const [latestProducts, setLatestProducts] = useState([]);
//     const [bestSellerProducts, setBestSellerProducts] = useState([]);
//     const [token, setToken] = useState(localStorage.getItem('token') || '');
//     const navigate = useNavigate();
    

//     // 
//     useEffect(() => {
//         const savedToken = localStorage.getItem("token");
//         if (savedToken && !token) {
//             setToken(savedToken);
//         }
//     }, []);
//     // ✅ Lấy danh sách sản phẩm
//     const getProductsData = async () => {
//         try {
//             const response = await axios.get(`${backendUrl}/api/product/list`);
//             if (response.data.success) {
//                 setProducts(response.data.products.reverse());
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // ✅ Lấy sản phẩm mới nhất
//     const getLatestProducts = async () => {
//         try {
//             const response = await axios.get(`${backendUrl}/api/product/latest`);
//             if (response.data.success) {
//                 setLatestProducts(response.data.products);
//             }
//         } catch (error) {
//             toast.error("Lỗi khi lấy sản phẩm mới nhất");
//         }
//     };

//     // ✅ Lấy sản phẩm bán chạy nhất
//     const getBestSellerProducts = async () => {
//         try {
//             const response = await axios.get(`${backendUrl}/api/product/best`);
//             if (response.data.success) {
//                 setBestSellerProducts(response.data.products);
//             }
//         } catch (error) {
//             toast.error("Lỗi khi lấy sản phẩm bán chạy nhất");
//         }
//     };

//     // ✅ Lấy giỏ hàng từ backend khi đăng nhập
    
//     const getUserCart = async () => {
//         try {
//             const token = localStorage.getItem("token"); // 🔥 Kiểm tra token
//             console.log("🛠 Token gửi đi:", token);
    
//             if (!token) {
//                 throw new Error("Không tìm thấy token!");
//             }
    
//             const response = await fetch(`${backendUrl}/api/cart/get`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}` // 🔥 Đảm bảo có "Bearer "
//                 }
//             });
    
//             console.log("📤 Phản hồi từ server:", response.status, response.statusText);
    
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Lỗi lấy giỏ hàng!");
//             }
    
//             const data = await response.json();
//             console.log("✅ Dữ liệu giỏ hàng nhận được:", data);
//             setCartItems(data.cart); // 🛠 Cập nhật giỏ hàng vào state
//         } catch (error) {
//             console.error("❌ Lỗi khi lấy giỏ hàng:", error.message);
//             toast.error(error.message);
//         }
//     };
    

//     // ✅ Load dữ liệu khi component mount
//     useEffect(() => {
//         getProductsData();
//         getLatestProducts();
//         getBestSellerProducts();
//         getUserCart();
//     }, [token]);

//     // ✅ Thêm sản phẩm vào giỏ hàng (API)
//     const addToCart = async (itemId, size) => {
//         if (!size) {
//             toast.error('Chọn kích thước sản phẩm!');
//             return;
//         }
    
//         let cartData = structuredClone(cartItems);
//         cartData[itemId] = cartData[itemId] || {};
//         cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    
//         setCartItems(cartData);
//         localStorage.setItem('cartItems', JSON.stringify(cartData));
//         toast.success('Đã thêm vào giỏ hàng!');
    
//         const token = localStorage.getItem("token");
//         console.log("🛠 Token gửi đi:", token); // 🔥 Debug token frontend
    
//         if (!token) {
//             toast.error("Bạn chưa đăng nhập!");
//             return;
//         }
    
//         try {
//             const response = await fetch(`${backendUrl}/api/cart/update`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ itemId, size, quantity: 1 }),
//             });
    
//             const data = await response.json();
//             console.log("📤 Phản hồi từ server:", data); // 🔥 Debug response từ backend
    
//             if (!data.success) throw new Error(data.message);
//         } catch (error) {
//             console.log("❌ Lỗi:", error.message);
//             toast.error(error.message);
//         }
//     };
    

//     // ✅ Cập nhật số lượng sản phẩm
//     const updateQuantity = async (itemId, size, quantity) => {
//         if (!token) return;
//         if (quantity < 1) return removeItemFromCart(itemId, size);

//         try {
//             const response = await axios.post(
//                 `${backendUrl}/api/cart/update`,
//                 { itemId, size, quantity },
//                 {headers: {
//                     "Authorization": `Bearer ${token}`
//                   }
//                 }
//             );
//             if (response.data.success) {
//                 setCartItems(response.data.cart);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // ✅ Xóa sản phẩm khỏi giỏ hàng
//     const removeItemFromCart = async (itemId, size) => {
//         if (!token) return;

//         try {
//             const response = await axios.post(
//                 `${backendUrl}/api/cart/update`,
//                 { itemId, size, quantity: 0 },
//                 { headers: {
//                     "Authorization": `Bearer ${token}`
//                   } }
//             );
//             if (response.data.success) {
//                 setCartItems(response.data.cart);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // ✅ Xóa toàn bộ giỏ hàng
//     const clearCart = async () => {
//         if (!token) return;
//         try {
//             const response = await axios.delete(`${backendUrl}/api/cart/clear`, { headers: {
//                 "Authorization": `Bearer ${token}`
//               } });
//             if (response.data.success) {
//                 setCartItems({});
//                 toast.success("Giỏ hàng đã được làm trống!");
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // ✅ Đếm tổng số sản phẩm trong giỏ hàng
//     const getCartCount = () => {
//         return Object.values(cartItems).reduce(
//             (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
//             0
//         );
//     };

//     // ✅ Tính tổng giá trị giỏ hàng
//     const getCartAmount = () => {
//         return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
//           const itemInfo = products.find((p) => p._id === itemId);
//           return total + (itemInfo
//             ? Object.values(sizes).reduce((sum, qty) => sum + Number(itemInfo.price) * qty, 0)
//             : 0);
//         }, 0);
//       };

//     // ✅ Đăng xuất => Xóa token & giỏ hàng
//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken("");
//         setCartItems({});
//     };

//     // ✅ Cung cấp dữ liệu cho các component con
//     const value = {
//         products, latestProducts, bestSellerProducts, currency, delivery_fee,
//         search, setSearch, showSearch, setShowSearch,
//         cartItems, addToCart, updateQuantity, removeItemFromCart, clearCart,
//         getCartCount, getCartAmount, token, setToken, logout,
//         navigate, backendUrl
//     };

//     return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
// };

// export default ShopContextProvider;

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const currency = 'VND';
    const delivery_fee = 0;
    const backendUrl = "http://localhost:3001";

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    // Đồng bộ token từ localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken && savedToken !== token) {
            setToken(savedToken);
        }
    }, []);

    // Lấy danh sách sản phẩm
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Lấy sản phẩm mới nhất
    const getLatestProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/latest`);
            if (response.data.success) {
                setLatestProducts(response.data.products);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy sản phẩm mới nhất");
        }
    };

    // Lấy sản phẩm bán chạy nhất
    const getBestSellerProducts = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/best`);
            if (response.data.success) {
                setBestSellerProducts(response.data.products);
            }
        } catch (error) {
            toast.error("Lỗi khi lấy sản phẩm bán chạy nhất");
        }
    };

    // Lấy giỏ hàng của người dùng
    const getUserCart = async (currentToken) => {
        try {
            if (!currentToken) {
                throw new Error("Không tìm thấy token! Vui lòng đăng nhập lại.");
            }

            const response = await fetch(`${backendUrl}/api/cart/get`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (response.status === 401) {
                    throw new Error("Token không hợp lệ hoặc đã hết hạn!");
                }
                throw new Error(errorData.message || "Lỗi lấy giỏ hàng!");
            }

            const data = await response.json();
            setCartItems(data.cart || {});
        } catch (error) {
            console.error("Lỗi khi lấy giỏ hàng:", error.message);
            toast.error(error.message);
            if (error.message.includes("Token không hợp lệ")) {
                localStorage.removeItem("token");
                setToken("");
                navigate('/login');
            }
        }
    };

    // Tải dữ liệu khi component khởi tạo
    useEffect(() => {
        getProductsData();
        getLatestProducts();
        getBestSellerProducts();
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
            getUserCart(currentToken);
        }
    }, [token]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Chọn kích thước sản phẩm!');
            return;
        }

        const currentToken = localStorage.getItem("token");
        if (!currentToken) {
            toast.error("Vui lòng đăng nhập để thêm sản phẩm!");
            navigate('/login');
            return;
        }

        // Cập nhật giỏ hàng cục bộ
        let cartData = structuredClone(cartItems);
        cartData[itemId] = cartData[itemId] || {};
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData));
        toast.success('Đã thêm vào giỏ hàng!');

        try {
            const response = await fetch(`${backendUrl}/api/cart/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${currentToken}`
                },
                body: JSON.stringify({ itemId, size, quantity: cartData[itemId][size] }),
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || "Lỗi khi cập nhật giỏ hàng!");
            }
            setCartItems(data.cart || cartData);
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
            toast.error(error.message);
            if (error.message.includes("Token không hợp lệ")) {
                localStorage.removeItem("token");
                setToken("");
                navigate('/login');
            }
            getUserCart(currentToken);
        }
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = async (itemId, size, quantity) => {
        const currentToken = localStorage.getItem("token");
        if (!currentToken) {
            toast.error("Vui lòng đăng nhập!");
            navigate('/login');
            return;
        }
        if (quantity < 1) {
            return removeItemFromCart(itemId, size);
        }

        let cartData = structuredClone(cartItems);
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        localStorage.setItem('cartItems', JSON.stringify(cartData));

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity },
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`
                    }
                }
            );

            if (response.data.success) {
                setCartItems(response.data.cart || cartData);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật số lượng:", error.message);
            toast.error(error.message);
            if (error.message.includes("Token không hợp lệ")) {
                localStorage.removeItem("token");
                setToken("");
                navigate('/login');
            }
            getUserCart(currentToken);
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeItemFromCart = async (itemId, size) => {
        const currentToken = localStorage.getItem("token");
        if (!currentToken) {
            toast.error("Vui lòng đăng nhập!");
            navigate('/login');
            return;
        }

        let cartData = structuredClone(cartItems);
        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
            setCartItems(cartData);
            localStorage.setItem('cartItems', JSON.stringify(cartData));
        }

        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/update`,
                { itemId, size, quantity: 0 },
                {
                    headers: {
                        "Authorization": `Bearer ${currentToken}`
                    }
                }
            );

            if (response.data.success) {
                setCartItems(response.data.cart || cartData);
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng!");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error.message);
            toast.error(error.message);
            if (error.message.includes("Token không hợp lệ")) {
                localStorage.removeItem("token");
                setToken("");
                navigate('/login');
            }
            getUserCart(currentToken);
        }
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = async () => {
        const currentToken = localStorage.getItem("token");
        if (!currentToken) {
            toast.error("Vui lòng đăng nhập!");
            navigate('/login');
            return;
        }
        try {
            const response = await axios.delete(`${backendUrl}/api/cart/clear`, {
                headers: {
                    "Authorization": `Bearer ${currentToken}`
                }
            });
            if (response.data.success) {
                setCartItems({});
                localStorage.removeItem('cartItems');
                toast.success("Giỏ hàng đã được làm trống!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa giỏ hàng:", error.message);
            toast.error(error.message);
            if (error.message.includes("Token không hợp lệ")) {
                localStorage.removeItem("token");
                setToken("");
                navigate('/login');
            }
        }
    };

    // Đếm tổng số sản phẩm trong giỏ hàng
    const getCartCount = () => {
        return Object.values(cartItems).reduce(
            (total, sizes) => total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
            0
        );
    };

    // Tính tổng giá trị giỏ hàng
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
            const itemInfo = products.find((p) => p._id === itemId);
            return total + (itemInfo
                ? Object.entries(sizes).reduce((sum, [size, qty]) => sum + Number(itemInfo.price) * qty, 0)
                : 0);
        }, 0);
    };

    // Đăng xuất
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("cartItems");
        setToken("");
        setCartItems({});
        toast.success("Đã đăng xuất!");
        navigate('/login');
    };

    // Cung cấp dữ liệu cho các component con
    const value = {
        products, latestProducts, bestSellerProducts, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, updateQuantity, removeItemFromCart, clearCart,
        getCartCount, getCartAmount, token, setToken, logout,
        navigate, backendUrl
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;