import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            THEBOY là một website thời trang mang phong cách hiện đại, trẻ
            trung, được thiết kế để phục vụ nhu cầu mua sắm trực tuyến các sản
            phẩm quần áo dành cho cả nam và nữ. Với tiêu chí "Đẳng cấp – Phong
            cách – Cá tính", THEBOY hướng tới việc trở thành điểm đến đáng tin
            cậy cho các tín đồ thời trang.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://www.facebook.com/ducthang2710.siu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} className="w-6" alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/dthang.10/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={assets.instagram_icon}
                className="w-6"
                alt="Instagram"
              />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.youtube_icon} className="w-6" alt="YouTube" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">TẤT CẢ TRANG</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <a href="/">Trang chủ</a>
            <a href="about">Về chúng tôi</a>
            <a href="collection">Bộ sưu tập</a>
            <a href="contact">Đăng kí thành viên</a>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">THÔNG TIN LIÊN HỆ</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>0364 515 118</li>
            <li>xdrake2710.siu@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p></p>
      </div>
    </div>
  );
};

export default Footer;
