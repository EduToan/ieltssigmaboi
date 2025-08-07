import React, { useState } from 'react';
import { ArrowLeft, Clock, Headphones, CheckCircle, Play } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ListeningSection: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const navigate = useNavigate();

  const listeningTests = [
    {
      id: 'listening-1',
      title: 'Listening Practice Test 1',
      difficulty: 'Intermediate',
      sections: 4,
      duration: 30,
      description: 'Complete listening test with conversations and monologues',
      topics: ['Social conversation', 'University lecture', 'Job interview', 'Academic discussion']
    },
    {
      id: 'listening-2',
      title: 'Listening Practice Test 2',
      difficulty: 'Advanced',
      sections: 4,
      duration: 30,
      description: 'Challenging listening test with complex academic content',
      topics: ['Travel booking', 'Research presentation', 'Campus tour', 'Scientific discussion']
    },
    {
      id: 'listening-3',
      title: 'Listening Practice Test 3',
      difficulty: 'Beginner',
      sections: 4,
      duration: 30,
      description: 'Foundational listening test for building skills',
      topics: ['Phone conversation', 'Information talk', 'Study discussion', 'History lecture']
    }
  ];

  const sectionTypes = [
    {
      section: 'Section 1',
      context: 'Social Context',
      speakers: '2 people',
      description: 'Conversation between two people in everyday social context'
    },
    {
      section: 'Section 2',
      context: 'Social Context',
      speakers: '1 person',
      description: 'Monologue in everyday social context (e.g., speech about local facilities)'
    },
    {
      section: 'Section 3',
      context: 'Academic Context',
      speakers: '2-4 people',
      description: 'Conversation between up to 4 people in educational context'
    },
    {
      section: 'Section 4',
      context: 'Academic Context',
      speakers: '1 person',
      description: 'Monologue on academic subject (e.g., university lecture)'
    }
  ];

  const questionTypes = [
    'Multiple Choice',
    'Matching',
    'Plan/Map/Diagram Labelling',
    'Form/Note/Table/Flow Chart/Summary Completion',
    'Sentence Completion',
    'Short Answer Questions'
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
            Back to Tests
          </Link>
          <div className="flex items-center">
            <Headphones className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Listening Practice</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Test Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Listening Test</h2>
              <div className="space-y-6">
                {listeningTests.map((test) => (
                  <div
                    key={test.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedTest === test.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
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
                            test.difficulty === 'Beginner'
                              ? 'bg-green-100 text-green-700'
                              : test.difficulty === 'Intermediate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {test.difficulty}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{test.description}</p>
                        
                        {/* Topics */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Section Topics:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {test.topics.map((topic, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-700">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {test.duration} minutes
                          </div>
                          <div className="flex items-center">
                            <Headphones className="w-4 h-4 mr-1" />
                            {test.sections} sections
                          </div>
                          <div className="flex items-center">
                            <Play className="w-4 h-4 mr-1" />
                            Audio included
                          </div>
                        </div>
                      </div>
                      {selectedTest === test.id && (
                        <CheckCircle className="w-6 h-6 text-purple-500 ml-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTest && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready to Listen?</h3>
                  <p className="text-purple-100 mb-4">
                    You have selected a listening test. Make sure you have good headphones and a quiet environment.
                  </p>
                  <button 
                    onClick={() => navigate('/test/listening/practice')}
                    className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                  >
                    Begin Listening Test
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Format Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Listening Test Format</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions:</span>
                  <span className="font-medium">40 questions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sections:</span>
                  <span className="font-medium">4 sections</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Extra Time:</span>
                  <span className="font-medium">10 min transfer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scoring:</span>
                  <span className="font-medium">Band 1-9</span>
                </div>
              </div>
            </div>

            {/* Section Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Sections</h3>
              <div className="space-y-4">
                {sectionTypes.map((section, index) => (
                  <div key={index} className="border-l-4 border-purple-500 pl-3">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-gray-900">{section.section}</h4>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {section.speakers}
                      </span>
                    </div>
                    <p className="text-xs text-purple-600 mb-1">{section.context}</p>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Question Types */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Types</h3>
              <div className="space-y-2">
                {questionTypes.map((type, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Listening Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Listening Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Read questions before listening
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Listen for specific information and keywords
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Don't panic if you miss an answer
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Write answers as you listen
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check spelling and grammar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningSection;