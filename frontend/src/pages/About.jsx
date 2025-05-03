import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'VỀ'} text2={'CHÚNG TÔI'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <p>THEBOY ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có thể dễ dàng khám phá, khám phá và mua nhiều loại sản phẩm một cách thoải mái ngay tại nhà của họ.</p>
              <p>Kể từ khi thành lập, chúng tôi đã làm việc không mệt mỏi để tuyển chọn đa dạng các sản phẩm chất lượng cao đáp ứng mọi sở thích và sở thích. Từ thời trang và làm đẹp đến đồ điện tử và đồ gia dụng thiết yếu, chúng tôi cung cấp bộ sưu tập phong phú có nguồn gốc từ các thương hiệu và nhà cung cấp đáng tin cậy.</p>
              <b className='text-gray-800'>SỨ MỆNH CỦA CHÚNG TÔI </b>
              <p>Sứ mệnh của chúng tôi tại THEBOY là trao quyền cho khách hàng với sự lựa chọn, sự thuận tiện và sự tự tin. Chúng tôi tận tâm cung cấp trải nghiệm mua sắm liền mạch vượt quá mong đợi, từ duyệt và đặt hàng đến giao hàng và hơn thế nữa.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'TẠI SAO'} text2={'NÊN CHỌN CHÚNG TÔI'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>ĐẢM BẢO CHẤT LƯỢNG: </b>
            <p className=' text-gray-600'>Chúng tôi lựa chọn và kiểm tra tỉ mỉ từng sản phẩm để đảm bảo đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>TIỆN LỢI: </b>
            <p className=' text-gray-600'>Với giao diện thân thiện với người dùng và quy trình đặt hàng đơn giản, việc mua sắm chưa bao giờ dễ dàng hơn thế.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>DỊCH VỤ KHÁCH HÀNG ĐẶC BIỆT: </b>
            <p className=' text-gray-600'>Đội ngũ chuyên gia tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
