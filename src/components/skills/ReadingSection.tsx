import React, { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReadingSection: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const practiceTests = [
    {
      id: 'academic-1',
      title: 'Bài thi đọc hiểu học thuật 1',
      type: 'Học thuật',
      difficulty: 'Trung bình',
      passages: 3,
      duration: 60,
      description: 'Luyện tập với các văn bản học thuật về công nghệ, môi trường và khoa học xã hội.'
    },
    {
      id: 'general-1',
      title: 'Bài thi đọc hiểu tổng quát 1',
      type: 'Tổng quát',
      difficulty: 'Cơ bản',
      passages: 3,
      duration: 60,
      description: 'Văn bản thực tế bao gồm quảng cáo, mô tả công việc và bài báo.'
    },
    {
      id: 'academic-2',
      title: 'Bài thi đọc hiểu học thuật 2',
      type: 'Học thuật',
      difficulty: 'Nâng cao',
      passages: 3,
      duration: 60,
      description: 'Các đoạn văn học thuật phức tạp với từ vựng và khái niệm khó.'
    }
  ];

  const questionTypes = [
    'Trắc nghiệm',
    'Đúng/Sai/Không đề cập',
    'Có/Không/Không đề cập',
    'Ghép tiêu đề',
    'Ghép thông tin',
    'Ghép đặc điểm',
    'Hoàn thành câu',
    'Hoàn thành tóm tắt',
    'Hoàn thành ghi chú',
    'Hoàn thành bảng',
    'Hoàn thành sơ đồ',
    'Gắn nhãn biểu đồ',
    'Câu hỏi trả lời ngắn'
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/test"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại bài thi
          </Link>
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Luyện đọc hiểu</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Test Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Chọn bài thi luyện tập</h2>
              <div className="space-y-6">
                {practiceTests.map((test) => (
                  <div
                    key={test.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedTest === test.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTest(test.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">
                            {test.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            test.type === 'Academic'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {test.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{test.description}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                           {test.duration} phút
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="w-4 h-4 mr-1" />
                           {test.passages} đoạn văn
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                           test.difficulty === 'Cơ bản'
                              ? 'bg-green-100 text-green-700'
                             : test.difficulty === 'Trung bình'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {test.difficulty}
                          </span>
                        </div>
                      </div>
                      {selectedTest === test.id && (
                        <CheckCircle className="w-6 h-6 text-blue-500 ml-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTest && (
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Sẵn sàng bắt đầu?</h3>
                  <p className="text-blue-100 mb-4">
                    Bạn đã chọn một bài thi luyện tập. Hãy đảm bảo bạn có 60 phút để hoàn thành bài thi.
                  </p>
                  <Link
                    to="/test/reading/practice"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    Bắt đầu bài thi đọc
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Format Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Định dạng bài thi đọc</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-medium">60 phút</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Câu hỏi:</span>
                  <span className="font-medium">40 câu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Đoạn văn:</span>
                  <span className="font-medium">3 đoạn</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thang điểm:</span>
                  <span className="font-medium">Band 1-9</span>
                </div>
              </div>
            </div>

            {/* Question Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dạng câu hỏi</h3>
              <div className="space-y-2">
                {questionTypes.map((type, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mẹo đọc hiểu</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Đọc lướt đoạn văn trước để nắm ý chính
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Tìm từ khóa trong câu hỏi và đoạn văn
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Quản lý thời gian: 20 phút mỗi đoạn văn
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Không dành quá nhiều thời gian cho câu khó
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSection;