import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Target, Users, Award, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nền tảng luyện thi
                <span className="text-blue-600 block">IELTS toàn diện</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Luyện tập 4 kỹ năng IELTS với hệ thống bài thi thực tế, 
                phản hồi chi tiết và lộ trình học tập cá nhân hóa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/test"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  Bắt đầu luyện thi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/auth"
                  className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                >
                  Tạo tài khoản miễn phí
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/image.png" 
                alt="IELTS Study Platform" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900">Band 8.5+</span>
                </div>
                <p className="text-sm text-gray-600">Mục tiêu đạt được</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Study Progress Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Theo dõi tiến độ học tập
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống phân tích chi tiết giúp bạn nắm rõ điểm mạnh, điểm yếu và cải thiện hiệu quả.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-gray-600">Tỷ lệ thành công</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Học viên đã tham gia</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Bài thi thực hành</p>
            </div>
          </div>
        </div>
      </section>

      {/* IELTS Skills Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Luyện tập 4 kỹ năng IELTS
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hệ thống luyện thi toàn diện cho từng phần thi IELTS với đề thi thực tế.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Reading',
                nameVi: 'Đọc hiểu',
                description: 'Luyện đọc hiểu với các dạng bài đa dạng',
                features: ['Bài đọc học thuật', 'Trắc nghiệm', 'True/False/Not Given', 'Ghép nối thông tin'],
                color: 'from-blue-500 to-blue-600'
              },
              {
                name: 'Writing',
                nameVi: 'Viết',
                description: 'Phát triển kỹ năng viết luận và mô tả',
                features: ['Task 1 & 2', 'Tiêu chí chấm điểm', 'Bài mẫu tham khảo', 'Phản hồi ngữ pháp'],
                color: 'from-green-500 to-green-600'
              },
              {
                name: 'Listening',
                nameVi: 'Nghe hiểu',
                description: 'Cải thiện khả năng nghe với âm thanh chuẩn',
                features: ['Nhiều giọng điệu', 'Bài giảng học thuật', 'Hội thoại thực tế', 'Luyện ghi chú'],
                color: 'from-purple-500 to-purple-600'
              },
              {
                name: 'Speaking',
                nameVi: 'Nói',
                description: 'Luyện nói với hệ thống phản hồi AI',
                features: ['3 phần thi nói', 'Phân tích phát âm', 'Đánh giá độ trôi chảy', 'Chuẩn bị chủ đề'],
                color: 'from-orange-500 to-orange-600'
              }
            ].map((skill, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-100">
                <div className={`bg-gradient-to-r ${skill.color} p-4 rounded-lg mb-4`}>
                  <h3 className="text-xl font-bold text-white">{skill.nameVi}</h3>
                  <p className="text-sm text-white opacity-90">{skill.name}</p>
                </div>
                <p className="text-gray-600 mb-4">{skill.description}</p>
                <ul className="space-y-2">
                  {skill.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tips Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bí quyết đạt điểm cao
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những chiến lược học tập hiệu quả được chứng minh bởi hàng nghìn học viên thành công.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quản lý thời gian</h4>
              <p className="text-sm text-gray-600">Luyện tập trong điều kiện có thời gian để cải thiện tốc độ và độ chính xác</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Luyện tập đều đặn</h4>
              <p className="text-sm text-gray-600">Học đều đặn mỗi ngày sẽ hiệu quả hơn việc học dồn ép</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Phân tích lỗi sai</h4>
              <p className="text-sm text-gray-600">Xem lại các câu trả lời sai để hiểu rõ nguyên nhân và cải thiện</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Thi thử định kỳ</h4>
              <p className="text-sm text-gray-600">Làm bài thi thử đầy đủ để làm quen với điều kiện thi thật</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng đạt mục tiêu IELTS của bạn?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Tham gia cùng hàng nghìn học viên đã chọn IELTS Sigma Boy để chuẩn bị cho kỳ thi.
          </p>
          <Link
            to="/test"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center"
          >
            Bắt đầu hành trình ngay
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;