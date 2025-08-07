import React, { useState } from 'react';
import { ArrowLeft, Clock, Mic, CheckCircle, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpeakingSection: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const speakingParts = [
    {
      id: 'part-1',
      title: 'Part 1: Introduction and Interview',
      duration: '4-5 minutes',
      description: 'General questions about yourself and familiar topics',
      format: 'Questions and answers',
      topics: ['Home', 'Family', 'Work/Study', 'Hobbies', 'Daily routine', 'Food preferences'],
      sampleQuestions: [
        'Where do you come from?',
        'What do you do for work/study?',
        'Do you enjoy cooking?',
        'What do you like to do in your free time?'
      ]
    },
    {
      id: 'part-2',
      title: 'Part 2: Long Turn',
      duration: '3-4 minutes',
      description: 'Speak for 1-2 minutes on a given topic after 1 minute preparation',
      format: 'Individual long turn',
      topics: ['Describe a person', 'Describe a place', 'Describe an experience', 'Describe an object'],
      sampleQuestions: [
        'Describe a teacher who has influenced you',
        'Describe a place you would like to visit',
        'Describe a memorable experience from your childhood',
        'Describe something you own which is important to you'
      ]
    },
    {
      id: 'part-3',
      title: 'Part 3: Discussion',
      duration: '4-5 minutes',
      description: 'Discussion of abstract ideas related to Part 2 topic',
      format: 'Questions and answers',
      topics: ['Abstract concepts', 'Social issues', 'Future predictions', 'Comparisons'],
      sampleQuestions: [
        'What qualities make a good teacher?',
        'How has tourism changed in your country?',
        'What role do childhood experiences play in adult life?',
        'How important are possessions in modern society?'
      ]
    }
  ];

  const assessmentCriteria = [
    {
      name: 'Fluency and Coherence',
      description: 'Ability to speak at length and organize ideas logically',
      tips: ['Speak without long pauses', 'Use linking words', 'Stay on topic']
    },
    {
      name: 'Lexical Resource',
      description: 'Range and appropriate use of vocabulary',
      tips: ['Use varied vocabulary', 'Avoid repetition', 'Use idiomatic language']
    },
    {
      name: 'Grammatical Range and Accuracy',
      description: 'Range and correct use of grammar structures',
      tips: ['Use complex sentences', 'Minimize errors', 'Use various tenses']
    },
    {
      name: 'Pronunciation',
      description: 'Clarity of speech and use of phonetic features',
      tips: ['Speak clearly', 'Use natural intonation', 'Stress words correctly']
    }
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
            <Mic className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Speaking Practice</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Part Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Speaking Part</h2>
              <div className="space-y-6">
                {speakingParts.map((part) => (
                  <div
                    key={part.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedPart === part.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPart(part.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">
                            {part.title}
                          </h3>
                          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            {part.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{part.description}</p>
                        
                        {/* Topics */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Common Topics:</h4>
                          <div className="flex flex-wrap gap-2">
                            {part.topics.map((topic, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Sample Questions */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Sample Questions:</h4>
                          <ul className="space-y-1">
                            {part.sampleQuestions.map((question, index) => (
                              <li key={index} className="text-sm text-gray-700">
                                • {question}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {part.duration}
                          </div>
                          <div className="flex items-center">
                            <Volume2 className="w-4 h-4 mr-1" />
                            {part.format}
                          </div>
                        </div>
                      </div>
                      {selectedPart === part.id && (
                        <CheckCircle className="w-6 h-6 text-orange-500 ml-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPart && (
                <div className="mt-8 p-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready to Speak?</h3>
                  <p className="text-orange-100 mb-4">
                    You have selected a speaking part. Make sure you have a working microphone and quiet environment.
                  </p>
                  <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                    Begin Speaking Practice
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Format Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Speaking Test Format</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-medium">11-14 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parts:</span>
                  <span className="font-medium">3 parts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Face-to-face</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recording:</span>
                  <span className="font-medium">Audio recorded</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Scoring:</span>
                  <span className="font-medium">Band 1-9</span>
                </div>
              </div>
            </div>

            {/* Assessment Criteria */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Criteria</h3>
              <div className="space-y-4">
                {assessmentCriteria.map((criteria, index) => (
                  <div key={index} className="pb-3 border-b border-gray-100 last:border-b-0">
                    <h4 className="font-medium text-gray-900 mb-1">{criteria.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{criteria.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {criteria.tips.map((tip, tipIndex) => (
                        <span
                          key={tipIndex}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded"
                        >
                          {tip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speaking Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Speaking Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Speak clearly and at a natural pace
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Don't worry about perfect grammar
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use examples to support your points
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  It's okay to ask for clarification
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  Practice expressing opinions confidently
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingSection;