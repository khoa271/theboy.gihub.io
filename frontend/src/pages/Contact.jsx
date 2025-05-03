import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'LIÊN HỆ'} text2={'VỚI CHÚNG TÔI'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>CỬA HÀNG</p>
          <p className=' text-gray-500'>Cao Đẳng FPT Polytechnic <br /> Tòa T, Công viên phần mềm Quang Trung</p>
          <p className=' text-gray-500'>Số điện thoại: 0364515118 <br /> Email: xdrake2710.siu@gmail.com</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>LIÊN HỆ</button>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
