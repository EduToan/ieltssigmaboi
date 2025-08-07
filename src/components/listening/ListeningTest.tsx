import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2, HelpCircle, Eye, EyeOff } from 'lucide-react';
// No router links needed here

interface Answer {
  id: string;
  value: string;
  isUsed: boolean;
}

interface Question {
  id: number;
  type: 'fill' | 'drag' | 'table' | 'map';
  answer: string;
  userAnswer: string;
}

const ListeningTest: React.FC = () => {
  const [currentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(58 * 60); // 58 minutes in seconds
  const [volume, setVolume] = useState(75);
  // Audio playback state can be added when implementing audio controls
  const [reviewQuestions, setReviewQuestions] = useState<number[]>([]);
  const [showHeader, setShowHeader] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample answers for drag and drop
  const [availableAnswers, setAvailableAnswers] = useState<Answer[]>([
    { id: '1', value: 'Cookery Room', isUsed: false },
    { id: '2', value: 'Games Room', isUsed: false },
    { id: '3', value: 'Kitchen', isUsed: false },
    { id: '4', value: 'Pottery Room', isUsed: false },
    { id: '5', value: 'Sports Complex', isUsed: false },
    { id: '6', value: 'Staff Accommodation', isUsed: false }
  ]);

  // Sample questions data
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, type: 'fill', answer: 'round', userAnswer: '' },
    { id: 2, type: 'fill', answer: '2', userAnswer: '' },
    { id: 3, type: 'fill', answer: '3', userAnswer: '' },
    { id: 4, type: 'fill', answer: '4', userAnswer: '' },
    { id: 5, type: 'fill', answer: '5', userAnswer: '' },
    { id: 6, type: 'fill', answer: '6', userAnswer: '' },
    { id: 7, type: 'fill', answer: '7', userAnswer: '' },
    { id: 8, type: 'fill', answer: '8', userAnswer: '' },
    { id: 9, type: 'fill', answer: '9', userAnswer: '' },
    { id: 10, type: 'fill', answer: '10', userAnswer: '' },
    // Part 2 - Map questions
    { id: 16, type: 'drag', answer: 'Cookery Room', userAnswer: '' },
    { id: 17, type: 'drag', answer: 'Games Room', userAnswer: '' },
    { id: 18, type: 'drag', answer: 'Kitchen', userAnswer: '' },
    { id: 19, type: 'drag', answer: 'Pottery Room', userAnswer: '' },
    { id: 20, type: 'drag', answer: 'Sports Complex', userAnswer: '' },
    // Part 3 - Table questions
    { id: 21, type: 'table', answer: 'C', userAnswer: '' },
    { id: 22, type: 'table', answer: 'A', userAnswer: '' },
    { id: 23, type: 'table', answer: 'H', userAnswer: '' },
    { id: 24, type: 'table', answer: 'F', userAnswer: '' },
    // Part 3 - Drag to gap
    { id: 25, type: 'drag', answer: 'Funnel Cake Factory', userAnswer: '' },
    { id: 26, type: 'drag', answer: 'Buggy Ride', userAnswer: '' },
    { id: 27, type: 'drag', answer: 'Balloon Ride', userAnswer: '' },
    { id: 28, type: 'drag', answer: 'Water Park', userAnswer: '' }
  ]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, userAnswer: value } : q
    ));
  };

  const handleDragStart = (e: React.DragEvent, answer: Answer) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(answer));
  };

  const handleDrop = (e: React.DragEvent, questionId: number) => {
    e.preventDefault();
    const answerData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    // Update question answer
    setQuestions(prev => prev.map(q => 
      q.id === questionId ? { ...q, userAnswer: answerData.value } : q
    ));
    
    // Mark answer as used
    setAvailableAnswers(prev => prev.map(a => 
      a.id === answerData.id ? { ...a, isUsed: true } : a
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getPartQuestions = (part: number) => {
    switch (part) {
      case 1: return Array.from({ length: 10 }, (_, i) => i + 1);
      case 2: return Array.from({ length: 10 }, (_, i) => i + 11);
      case 3: return Array.from({ length: 10 }, (_, i) => i + 21);
      case 4: return Array.from({ length: 10 }, (_, i) => i + 31);
      default: return [];
    }
  };

  const renderPart1 = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Part 1</h2>
        <p className="text-gray-600">Listen and answer questions 1 – 10</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Phone call about second-hand furniture</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Items</h4>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span>Dining table:</span>
                <span>-</span>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 w-20 text-center bg-blue-100"
                  value={questions.find(q => q.id === 1)?.userAnswer || ''}
                  onChange={(e) => handleAnswerChange(1, e.target.value)}
                  placeholder="1"
                />
                <span>shape</span>
              </div>
              
              <div className="ml-8 space-y-2">
                <div>- medium size</div>
                <div className="flex items-center space-x-2">
                  <span>-</span>
                  <input
                    type="text"
                    className="border border-gray-300 px-2 py-1 w-16 text-center bg-blue-100"
                    value={questions.find(q => q.id === 2)?.userAnswer || ''}
                    onChange={(e) => handleAnswerChange(2, e.target.value)}
                    placeholder="2"
                  />
                  <span>old</span>
                </div>
                <div>- $25.00</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Dining chairs</span>
                  <span>- set of</span>
                  <input
                    type="text"
                    className="border border-gray-300 px-2 py-1 w-16 text-center bg-blue-100"
                    value={questions.find(q => q.id === 3)?.userAnswer || ''}
                    onChange={(e) => handleAnswerChange(3, e.target.value)}
                    placeholder="3"
                  />
                  <span>chairs</span>
                </div>
                
                <div className="ml-8 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span>- seats covered in</span>
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 w-20 text-center bg-blue-100"
                      value={questions.find(q => q.id === 4)?.userAnswer || ''}
                      onChange={(e) => handleAnswerChange(4, e.target.value)}
                      placeholder="4"
                    />
                    <span>material</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>- in</span>
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 w-20 text-center bg-blue-100"
                      value={questions.find(q => q.id === 5)?.userAnswer || ''}
                      onChange={(e) => handleAnswerChange(5, e.target.value)}
                      placeholder="5"
                    />
                    <span>condition</span>
                  </div>
                  <div>- $20.00</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span>Desk:</span>
                  <span>- length:</span>
                  <input
                    type="text"
                    className="border border-gray-300 px-2 py-1 w-16 text-center bg-blue-100"
                    value={questions.find(q => q.id === 6)?.userAnswer || ''}
                    onChange={(e) => handleAnswerChange(6, e.target.value)}
                    placeholder="6"
                  />
                </div>
                <div className="ml-8">
                  <div className="flex items-center space-x-2">
                    <span>- 3 drawers. Top drawer has a</span>
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 w-20 text-center bg-blue-100"
                      value={questions.find(q => q.id === 7)?.userAnswer || ''}
                      onChange={(e) => handleAnswerChange(7, e.target.value)}
                      placeholder="7"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Address</h4>
            <div className="flex items-center space-x-2">
              <span>-</span>
              <input
                type="text"
                className="border border-gray-300 px-2 py-1 w-16 text-center bg-blue-100"
                value={questions.find(q => q.id === 8)?.userAnswer || ''}
                onChange={(e) => handleAnswerChange(8, e.target.value)}
                placeholder="8"
              />
              <span>River Lane, Stonethorne</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Directions:</h4>
            <div className="space-y-2">
              <div>Take the Hawcroft road out of Stonethorne. Go past the secondary</div>
              <div className="flex items-center space-x-2">
                <span>school, then turn</span>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 w-16 text-center bg-blue-100"
                  value={questions.find(q => q.id === 9)?.userAnswer || ''}
                  onChange={(e) => handleAnswerChange(9, e.target.value)}
                  placeholder="9"
                />
                <span>at the crossroads</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>House is down this road, opposite the</span>
                <input
                  type="text"
                  className="border border-gray-300 px-2 py-1 w-20 text-center bg-blue-100"
                  value={questions.find(q => q.id === 10)?.userAnswer || ''}
                  onChange={(e) => handleAnswerChange(10, e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPart2 = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Part 2</h2>
        <p className="text-gray-600">Listen and answer questions 11 – 20</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Questions 16 – 20</h3>
        <p className="text-gray-600 mb-4">The map has five gaps. Choose the correct answer and move it into the gap.</p>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Map */}
          <div className="border rounded-lg p-4">
            <div className="relative">
              {/* Simplified map representation */}
              <div className="bg-gray-100 p-4 rounded border-2 border-dashed min-h-96">
                <div className="grid grid-cols-3 gap-4 h-full">
                  {/* Top row */}
                  <div className="border bg-white p-2 text-center text-sm">
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-h-12 bg-blue-50"
                      onDrop={(e) => handleDrop(e, 18)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === 18)?.userAnswer || '18'}
                    </div>
                  </div>
                  <div className="border bg-white p-2 text-center text-sm">Staff Lounge</div>
                  <div className="border bg-white p-2 text-center text-sm">
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-h-12 bg-blue-50"
                      onDrop={(e) => handleDrop(e, 19)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === 19)?.userAnswer || '19'}
                    </div>
                  </div>
                  
                  {/* Middle row */}
                  <div className="border bg-white p-2 text-center text-sm">Girls' Accommodation</div>
                  <div className="border bg-white p-2 text-center text-sm">
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-h-12 bg-blue-50"
                      onDrop={(e) => handleDrop(e, 16)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === 16)?.userAnswer || '16'}
                    </div>
                  </div>
                  <div className="border bg-white p-2 text-center text-sm">Art Room</div>
                  
                  {/* Bottom row */}
                  <div className="border bg-white p-2 text-center text-sm">Boys' Accommodation</div>
                  <div className="border bg-white p-2 text-center text-sm">
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-h-12 bg-blue-50"
                      onDrop={(e) => handleDrop(e, 17)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === 17)?.userAnswer || '17'}
                    </div>
                  </div>
                  <div className="border bg-white p-2 text-center text-sm">
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-h-12 bg-blue-50"
                      onDrop={(e) => handleDrop(e, 20)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === 20)?.userAnswer || '20'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* List of Rooms */}
          <div>
            <h4 className="font-semibold mb-4">List of Rooms</h4>
            <div className="space-y-2">
              {availableAnswers.map(answer => (
                <div
                  key={answer.id}
                  draggable={!answer.isUsed}
                  onDragStart={(e) => handleDragStart(e, answer)}
                  className={`p-3 border rounded cursor-move ${
                    answer.isUsed 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {answer.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPart3 = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Part 3</h2>
        <p className="text-gray-600">Listen and answer questions 21 – 30</p>
      </div>

      <div className="space-y-8">
        {/* Questions 21-24 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Questions 21 – 24</h3>
          <p className="text-gray-600 mb-4">The map has eight labels (A – H). Choose the correct label for each building.</p>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Map */}
            <div className="border rounded-lg p-4">
              <div className="bg-gray-100 p-4 rounded">
                <div className="text-center mb-2 font-semibold">Oak Street</div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-gray-300 p-2 text-center text-xs">D</div>
                  <div className="bg-gray-300 p-2 text-center text-xs">C</div>
                  <div className="bg-gray-300 p-2 text-center text-xs">B</div>
                  <div className="bg-gray-300 p-2 text-center text-xs">E</div>
                </div>
                <div className="text-center mb-2 font-semibold">Ash Street</div>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-gray-300 p-2 text-center text-xs">A</div>
                  <div className="bg-white border p-2 text-center text-xs">Bank</div>
                  <div className="bg-gray-300 p-2 text-center text-xs">G</div>
                  <div className="bg-white border p-2 text-center text-xs">Gift Shop</div>
                </div>
                <div className="text-center mb-2 font-semibold">Elm Street</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white border p-2 text-center text-xs">Welcome Center</div>
                  <div className="bg-gray-300 p-2 text-center text-xs">H</div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 p-2 text-left">Building</th>
                    <th className="border border-gray-300 p-2 text-center">A</th>
                    <th className="border border-gray-300 p-2 text-center">B</th>
                    <th className="border border-gray-300 p-2 text-center">C</th>
                    <th className="border border-gray-300 p-2 text-center">D</th>
                    <th className="border border-gray-300 p-2 text-center">E</th>
                    <th className="border border-gray-300 p-2 text-center">F</th>
                    <th className="border border-gray-300 p-2 text-center">G</th>
                    <th className="border border-gray-300 p-2 text-center">H</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 21, name: 'Quilt Shop' },
                    { id: 22, name: 'Handicrafts Museum' },
                    { id: 23, name: 'School House' },
                    { id: 24, name: 'Funnel Cake Shop' }
                  ].map(item => (
                    <tr key={item.id}>
                      <td className="border border-gray-300 p-2">{item.name}</td>
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(letter => (
                        <td key={letter} className="border border-gray-300 p-2 text-center">
                          <input
                            type="radio"
                            name={`question-${item.id}`}
                            value={letter}
                            checked={questions.find(q => q.id === item.id)?.userAnswer === letter}
                            onChange={(e) => handleAnswerChange(item.id, e.target.value)}
                            className="w-4 h-4"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Questions 25-30 */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Questions 25 – 30</h3>
          <p className="text-gray-600 mb-4">Which attraction does each of the following towns have? Choose the correct answer for each town and move it into the gap.</p>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Towns</h4>
              <div className="space-y-4">
                {[
                  { id: 25, name: 'Paradise' },
                  { id: 26, name: 'Strasburg' },
                  { id: 27, name: 'Birdtown' },
                  { id: 28, name: 'Hershey' }
                ].map(town => (
                  <div key={town.id} className="flex items-center space-x-2">
                    <span>{town.name}</span>
                    <div
                      className="border-2 border-dashed border-blue-300 p-2 min-w-32 bg-blue-50"
                      onDrop={(e) => handleDrop(e, town.id)}
                      onDragOver={handleDragOver}
                    >
                      {questions.find(q => q.id === town.id)?.userAnswer || town.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Attractions</h4>
              <div className="space-y-2">
                {[
                  'Funnel Cake Factory',
                  'Buggy Ride',
                  'Balloon Ride',
                  'Water Park'
                ].map((attraction, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, { id: `attr-${index}`, value: attraction, isUsed: false })}
                    className="p-3 border rounded cursor-move bg-gray-100 hover:bg-gray-200"
                  >
                    {attraction}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPart = () => {
    switch (currentPart) {
      case 1: return renderPart1();
      case 2: return renderPart2();
      case 3: return renderPart3();
      case 4: return <div className="bg-white rounded-lg p-6"><h2>Part 4 - Coming Soon</h2></div>;
      default: return renderPart1();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {showHeader ? (
        <div className="bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm">XXXX XXXXXXXX - 123456</span>
              <div className="w-4 h-4 bg-gray-600 rounded"></div>
            </div>

            <div className="flex items-center space-x-4">
              {showTimer && <span className="text-sm">{formatTime(timeLeft)}</span>}
              <button
                onClick={() => setShowTimer(!showTimer)}
                className="p-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                {showTimer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500">
                Settings
              </button>
              <button className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500 flex items-center space-x-1">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </button>
              <button
                onClick={() => setShowHeader(false)}
                className="px-3 py-1 bg-gray-600 rounded text-sm hover:bg-gray-500"
              >
                Hide
              </button>
              {/* Volume Control */}
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowHeader(true)}
          className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
        >
          Show Header
        </button>
      )}

      {/* Main Content */}
      <div className="p-6">
        {renderCurrentPart()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center justify-between">
          {/* Question Numbers */}
          <div className="flex items-center space-x-2">
            {/* Part 1 */}
            <span className="text-sm font-medium">Part 1</span>
            {getPartQuestions(1).map(num => (
              <button
                key={num}
                onClick={() => setCurrentQuestion(num)}
                className={`w-8 h-8 text-xs rounded ${
                  currentQuestion === num
                    ? 'bg-blue-600 text-white'
                    : reviewQuestions.includes(num)
                    ? 'bg-yellow-400 text-white'
                    : questions.find(q => q.id === num)?.userAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
            
            {/* Part 2 */}
            <span className="text-sm font-medium ml-4">Part 2</span>
            {getPartQuestions(2).map(num => (
              <button
                key={num}
                onClick={() => setCurrentQuestion(num)}
                className={`w-8 h-8 text-xs rounded ${
                  currentQuestion === num
                    ? 'bg-blue-600 text-white'
                    : reviewQuestions.includes(num)
                    ? 'bg-yellow-400 text-white'
                    : questions.find(q => q.id === num)?.userAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
            
            {/* Part 3 */}
            <span className="text-sm font-medium ml-4">Part 3</span>
            {getPartQuestions(3).map(num => (
              <button
                key={num}
                onClick={() => setCurrentQuestion(num)}
                className={`w-8 h-8 text-xs rounded ${
                  currentQuestion === num
                    ? 'bg-blue-600 text-white'
                    : reviewQuestions.includes(num)
                    ? 'bg-yellow-400 text-white'
                    : questions.find(q => q.id === num)?.userAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
            
            {/* Part 4 */}
            <span className="text-sm font-medium ml-4">Part 4</span>
            {getPartQuestions(4).map(num => (
              <button
                key={num}
                onClick={() => setCurrentQuestion(num)}
                className={`w-8 h-8 text-xs rounded ${
                  currentQuestion === num
                    ? 'bg-blue-600 text-white'
                    : reviewQuestions.includes(num)
                    ? 'bg-yellow-400 text-white'
                    : questions.find(q => q.id === num)?.userAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={reviewQuestions.includes(currentQuestion)}
                onChange={() =>
                  setReviewQuestions(prev =>
                    prev.includes(currentQuestion)
                      ? prev.filter(id => id !== currentQuestion)
                      : [...prev, currentQuestion]
                  )
                }
              />
              <span className="text-sm">Review</span>
            </label>

            <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button className="p-2 bg-gray-200 rounded hover:bg-gray-300">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Audio Element */}
      <audio ref={audioRef} controls className="hidden">
        <source src="/path-to-audio-file.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default ListeningTest;