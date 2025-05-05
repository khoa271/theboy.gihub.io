import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!token) {
        toast.error("Vui lòng đăng nhập để đặt hàng!");
        navigate('/login');
        return;
      }

      // Tạo danh sách sản phẩm từ giỏ hàng
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Giỏ hàng của bạn đang trống!");
        return;
      }

      // Tạo dữ liệu đơn hàng
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // Thanh toán COD
        case "cod":
          const responseCod = await axios.post(
            `${backendUrl}/api/payments/pay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseCod.data.success) {
            setCartItems({});
            navigate("/orders");
            toast.success("Đặt hàng thành công!");
          } else {
            toast.error(responseCod.data.message);
          }
          break;

        // Thanh toán MoMo
        case "momo":
          const responseMomo = await axios.post(
            `${backendUrl}/api/payments/momo`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseMomo.data.success && responseMomo.data.payUrl) {
            // Chuyển hướng tới payUrl
            window.location.href = responseMomo.data.payUrl;
          } else {
            toast.error(responseMomo.data.message || "Không nhận được URL thanh toán từ MoMo");
          }
          break;

        // Thanh toán Visa (Razorpay)
        case "visa":
          const responseVisa = await axios.post(
            `${backendUrl}/api/payments/pay`,
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (responseVisa.data.success) {
            const options = {
              key: import.meta.env.VITE_RAZORPAY_KEY_ID,
              amount: responseVisa.data.order.amount,
              currency: responseVisa.data.order.currency,
              name: "Order Payment",
              description: "Order Payment",
              order_id: responseVisa.data.order.id,
              receipt: responseVisa.data.order.receipt,
              handler: async (response) => {
                try {
                  const verifyResponse = await axios.post(
                    `${backendUrl}/api/payments/verifyRazorpay`,
                    response,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  if (verifyResponse.data.success) {
                    setCartItems({});
                    navigate("/orders");
                    toast.success("Thanh toán thành công!");
                  }
                } catch (error) {
                  toast.error(error.response?.data?.message || "Lỗi xác thực thanh toán");
                }
              },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            toast.error(responseVisa.data.message || "Lỗi tạo đơn hàng Visa");
          }
          break;

        default:
          toast.error("Phương thức thanh toán không hợp lệ!");
          break;
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ------------- Left Side ---------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"THÔNG TIN"} text2={"GIAO HÀNG"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Họ"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Tên"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Địa chỉ email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Đường"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Thành phố"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Huyện"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Mã thư tín"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Xã"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Số điện thoại"
        />
      </div>

      {/* ------------- Right Side ------------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PHƯƠNG THỨC"} text2={"THANH TOÁN"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("momo")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "momo" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">MOMO</p>
            </div>
            <div
              onClick={() => setMethod("visa")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "visa" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">VISA</p>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;