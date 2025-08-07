import React, { useState } from 'react';
import { ArrowLeft, Clock, PenTool, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WritingSection: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const writingTasks = [
    {
      id: 'academic-task1',
      title: 'Academic Task 1',
      type: 'Academic',
      duration: 20,
      minWords: 150,
      description: 'Describe visual information (graphs, charts, diagrams, tables, or maps)',
      prompt: 'The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011.'
    },
    {
      id: 'academic-task2',
      title: 'Academic Task 2',
      type: 'Academic',
      duration: 40,
      minWords: 250,
      description: 'Write an essay in response to a point of view, argument, or problem',
      prompt: 'Some people believe that technology has made our lives too complicated. To what extent do you agree or disagree?'
    },
    {
      id: 'general-task1',
      title: 'General Training Task 1',
      type: 'General Training',
      duration: 20,
      minWords: 150,
      description: 'Write a letter (formal, semi-formal, or informal)',
      prompt: 'You recently bought a piece of equipment for your kitchen but it did not work. You phoned the shop but no action was taken. Write a letter to the shop manager.'
    },
    {
      id: 'general-task2',
      title: 'General Training Task 2',
      type: 'General Training',
      duration: 40,
      minWords: 250,
      description: 'Write an essay in response to a point of view, argument, or problem',
      prompt: 'In many countries, people are now living longer than ever before. Some people say an ageing population creates problems for governments. Other people think there are benefits if society has more elderly people.'
    }
  ];

  const assessmentCriteria = [
    {
      name: 'Task Achievement',
      description: 'How well you answer the question and fulfill the task requirements'
    },
    {
      name: 'Coherence and Cohesion',
      description: 'How well you organize ideas and use linking words'
    },
    {
      name: 'Lexical Resource',
      description: 'Range and accuracy of vocabulary usage'
    },
    {
      name: 'Grammatical Range and Accuracy',
      description: 'Variety and correctness of grammatical structures'
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
            <PenTool className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Writing Practice</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Task Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose a Writing Task</h2>
              <div className="space-y-6">
                {writingTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      selectedTask === task.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedTask(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">
                            {task.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            task.type === 'Academic'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {task.type}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{task.description}</p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-800 font-medium">Task Prompt:</p>
                          <p className="text-sm text-gray-700 mt-1">{task.prompt}</p>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {task.duration} minutes
                          </div>
                          <div className="flex items-center">
                            <PenTool className="w-4 h-4 mr-1" />
                            Min. {task.minWords} words
                          </div>
                        </div>
                      </div>
                      {selectedTask === task.id && (
                        <CheckCircle className="w-6 h-6 text-green-500 ml-4" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedTask && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready to Write?</h3>
                  <p className="text-green-100 mb-4">
                    You have selected a writing task. Make sure you understand the requirements before starting.
                  </p>
                  <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                    Begin Writing Task
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Format Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Test Format</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-medium">60 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tasks:</span>
                  <span className="font-medium">2 tasks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Task 1:</span>
                  <span className="font-medium">20 min, 150 words</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Task 2:</span>
                  <span className="font-medium">40 min, 250 words</span>
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
                    <p className="text-sm text-gray-600">{criteria.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Tips</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Plan your essay before writing
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Use a variety of sentence structures
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Support your arguments with examples
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Check grammar and spelling at the end
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Stay on topic and answer the question fully
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingSection;