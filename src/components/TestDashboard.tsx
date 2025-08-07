import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Headphones, Mic, ArrowRight, Clock, Target, Users } from 'lucide-react';

const TestDashboard: React.FC = () => {
  const skills = [
    {
      name: 'Reading',
      icon: BookOpen,
      path: '/test/reading',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      description: 'Improve comprehension with academic and general texts',
      duration: '60 minutes',
      questions: '40 questions',
      testTypes: ['Academic', 'General Training']
    },
    {
      name: 'Writing',
      icon: PenTool,
      path: '/test/writing',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Master essay writing and task response skills',
      duration: '60 minutes',
      questions: '2 tasks',
      testTypes: ['Task 1', 'Task 2']
    },
    {
      name: 'Listening',
      icon: Headphones,
      path: '/test/listening',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      description: 'Enhance listening skills with authentic audio',
      duration: '30 minutes',
      questions: '40 questions',
      testTypes: ['Conversations', 'Monologues']
    },
    {
      name: 'Speaking',
      icon: Mic,
      path: '/test/speaking',
      color: 'from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700',
      description: 'Practice speaking with AI-powered feedback',
      duration: '11-14 minutes',
      questions: '3 parts',
      testTypes: ['Interview', 'Long Turn', 'Discussion']
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            IELTS Practice Tests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master all four IELTS skills with our comprehensive practice tests. 
            Each section is designed to simulate real exam conditions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50K+</h3>
            <p className="text-gray-600">Students Trained</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
            <p className="text-gray-600">Practice Questions</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-r ${skill.color} p-8`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-white">
                        {skill.name}
                      </h2>
                    </div>
                  </div>
                  <p className="text-white text-opacity-90 text-lg">
                    {skill.description}
                  </p>
                </div>

                <div className="p-8">
                  {/* Test Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{skill.duration}</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Target className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Format</p>
                      <p className="font-semibold text-gray-900">{skill.questions}</p>
                    </div>
                  </div>

                  {/* Test Types */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Available Formats:</h4>
                    <div className="flex flex-wrap gap-2">
                      {skill.testTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Start Button */}
                  <Link
                    to={skill.path}
                    className={`w-full bg-gradient-to-r ${skill.color} ${skill.hoverColor} text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group`}
                  >
                    Start {skill.name} Practice
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Quick Tips for Success
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Time Management</h4>
              <p className="text-sm text-gray-600">Practice under timed conditions to improve speed and accuracy</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Regular Practice</h4>
              <p className="text-sm text-gray-600">Consistent daily practice yields better results than intensive cramming</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Analyze Mistakes</h4>
              <p className="text-sm text-gray-600">Review incorrect answers to understand patterns and improve</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Mock Tests</h4>
              <p className="text-sm text-gray-600">Take full-length practice tests to simulate exam conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;