import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Clock, Eye, EyeOff, Menu, Wifi, Bell, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  type: 'true-false-not-given' | 'fill-in-blank' | 'multiple-choice' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer: string;
  passage: number;
}

interface TestData {
  passages: {
    id: number;
    title: string;
    content: string;
  }[];
  questions: Question[];
}

interface Explanation {
  keywords: { word: string; translation: string; source: string }[];
  explanation: string;
  keysentence: string;
  reasoning: string[];
}

const ReadingTest: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  const [currentPart, setCurrentPart] = useState(1);
  const [showHeader, setShowHeader] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);
  const [explanations, setExplanations] = useState<Record<number, Explanation>>({});
  const [isGeneratingExplanations, setIsGeneratingExplanations] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [highlightedText, setHighlightedText] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [testData, setTestData] = useState<TestData>({
    passages: [
      {
        id: 1,
        title: "The World's First Cities",
        content: `The inhabitants of Mesopotamia — which now forms part of eastern Syria, southeastern Turkey and Iraq — lived for thousands of years on individual farms or in small, isolated communities, working relentlessly just to meet their basic needs. Then, about 6,000 years ago, something remarkable happened: people left the security of their family homes and villages and came together to create something far more complex — the world's first city, called Uruk. Today, there is not much left of Uruk, which is about 250 kilometres south of Baghdad, but enough remains to show that this first experiment in urban living was extraordinarily successful. At its height, around 5,000 years ago, Uruk was home to more than 40,000 people, and the outlines of the city walls indicate an enclosed area of about 600 hectares.

The archaeological record of Uruk reveals intensive building and rebuilding over four or five centuries after the city's establishment. The people built a dozen or so large public buildings, carefully levelling the previous structures and often experimenting with different materials or innovative techniques. This suggests they were searching for ways in which architecture could express the revolutionary new social structures that had emerged. Soon Uruk was not the only Mesopotamian city. By about 4,500 years ago, 80 per cent of the population lived in cities over 40 hectares in size, with populations between 15,000 and 30,000. These thriving communities, mostly made up of individuals and groups with no blood ties, were unprecedented in human history.

Smaller communities in Mesopotamia sometimes united to make it easier to defend themselves from enemies, but the main reason for creating cities lay in the harshness of the environment. This was a place of extremes, where narrow fertile river valleys were bordered by vast desert and unproductive wetlands. The limited rainfall could only support very restricted agriculture, so sophisticated irrigation was essential to keep small patches of land fertile. The Tigris and Euphrates rivers provided water for irrigation and acted as communication channels that spread new farming concepts.

In such a region, the only way for humans to prosper was by forming cooperative groups. The threat of famine — from prolonged drought or a sudden change in a river's course — forced people to work beyond their families, creating elaborate systems of dams, channels and canals to manage water. These projects required skills and labour from outside the farmer's household, reinforcing the patterns of dependence that lie at the heart of civilisation.

The intensive farming that developed in Mesopotamia was more efficient and productive, generating a surplus of food. Crops from good harvests could be stored for protection against lean years, and more land could be used for a wider range of crops. This created a need for traders and skilled craftsmen, marking the beginnings of industry and consumerism. Specialisation emerged — more soldiers, builders, musicians, doctors, fortune tellers — all supported directly or indirectly by agriculture. This increased the control of powerful institutions over the urban population, freeing many from subsistence farming but making them dependent on the institutions that employed them.

The earliest and most powerful of these institutions were centred on temples. Ever larger temples were built in the form of massive pyramids, with enormous storerooms for produce from farming estates. Over time, the temples acquired farms, appointed large numbers of staff to manage them, and stored produce. Every citizen was expected to give time to work for the temple, enabling it to store vast quantities of agricultural goods, buy more land, and act as a primitive bank, lending to those in need.

We know much about this period thanks to the development of writing. In Mesopotamia, records were inscribed in wet clay, unlike the fragile papyrus used in Egypt and Greece. Initially, writing was mostly lists for bookkeeping, but within a few hundred years, it could record concepts. Clay tablets were tough, and fires that destroyed archives usually baked them for preservation.`
      },
      {
        id: 2,
        title: "Australia's Camouflaged Creatures",
        content: `Many species of animal in Australia protect themselves by blending into their surroundings. If they are convincing, they survive and pass their genes on to the next generation. Over generations of natural selection, animals develop astonishingly complex camouflage by manipulating shape, colour and movement. The principle is to make it uneconomical for a predator to pursue a certain prey, explains Professor Mark Elgar of the University of Melbourne. Camouflage increases the predator's search time, so it either fails to see the camouflaged prey or finds something else to hunt.

The easiest form of disguise is invisibility within the surroundings. Stick and leaf insects have evolved to look like sticks, dry leaves or living foliage, sometimes even imitating veins or disease spots on leaves. Their convincing appearance works only if they also behave like leaves — staying still or swaying in the breeze. If disturbed, they drop to the ground and remain motionless. Paul Zborowski, an entomologist who has photographed many inconspicuous creatures, says the desert insects of Central Australia are the most convincingly disguised, as the ancient habitat has given them a long time to adapt. They behave like stones, staying still by day and feeding only at night.

A tawny frogmouth sitting motionless on a stump also shows the importance of matching appearance with behaviour. According to Professor Gisela Kaplan, the bird's pose may be reflexive in chicks, but the ability to choose the right backdrop develops only after four to six months. Until then, the young are conspicuous, and their parents try to signal them to move to safer locations.

Some animals, such as the cuttlefish, have evolved adaptable camouflage, instantly changing colour, pattern and texture to match surroundings using specialised cells and muscles. On Queensland's reefs, Dr Karen Cheney has studied the bluestriped fangblenny, which changes colour to mimic other fish and gain safety in numbers. Its most remarkable impersonation is of the cleaner wrasse, which eats parasites off larger fish. This lets the fangblenny enjoy protection and get close to prey, darting out from the cleaning station to nip passing fish — though it leaves fish that come for cleaning alone.

The most famous form of mimicry is for defence, not attack: Batesian mimicry, where harmless animals imitate dangerous ones, often using bold colours. Named after Henry Bates, who noticed similar-looking Amazonian butterflies, this technique is seen in the harmless harlequin snake eel, which mimics the toxic yellow-lipped sea krait. Batesian mimicry's success depends on the ratio of mimics to originals — too many mimics, and predators learn the pattern is safe.

Imitation needn't be exact; it just needs to make predators hesitate. The hawk moth caterpillar has markings like snake eyes on its abdomen; when threatened, it retracts its head so the "eyes" appear suddenly, startling predators.

In Queensland's tablelands, the chameleon gecko uses another tactic. Its body is brown, but its tail has black and white bands. If attacked, it drops the tail, which wriggles and squeaks due to bones rubbing together. The predator focuses on the tail while the gecko escapes. The regrown tail is brown, showing this is a one-time trick.`
      },
      {
        id: 3,
        title: "The Effectiveness of an Online Course",
        content: `As internet access has grown, so has web-based learning. About 2 million US students take post-secondary courses fully online, and millions more at all levels take part in online education. Yet the effectiveness of online courses for individual needs and outcomes is questioned.

In classrooms, social and communicative interactions between students and teachers are fundamental. In online courses, successful interaction requires adjustment; discussion boards allow exchanges, but web-based learning is non-linear, with multiple threads active at once. Students respond to teachers and peers in varied ways.

Sproull and Kiesler warn that misinformation can persist online because instructors cannot correct it immediately. This requires students to evaluate sources carefully. Online discussions may also create "information overload" as comments are longer and more numerous than in face-to-face classes.

The concept of "presence" — a sense of belonging to a group — is different online. In classrooms, presence is assumed from physical attendance, but some still feel alienated. Online, presence refers to belonging without physical contact, and can include telepresence, cognitive, social, and teaching presence. Interaction does not always mean presence.

Anthony Picciano studied student attitudes toward interaction, presence, and course objectives, finding that while perceived interaction correlates with perceived learning, the link between actual interaction and performance is mixed. How interaction affects learning outcomes remains an area for further study.`
      }
    ],
    questions: [
      // Passage 1 Questions (1-13)
      { id: 1, type: 'true-false-not-given', question: 'Some physical evidence of Uruk still exists in Iraq.', correctAnswer: 'TRUE', userAnswer: '', passage: 1 },
      { id: 2, type: 'true-false-not-given', question: 'The people of Uruk lived in large apartment buildings.', correctAnswer: 'NOT GIVEN', userAnswer: '', passage: 1 },
      { id: 3, type: 'true-false-not-given', question: 'Builders in Uruk frequently experimented with new construction methods.', correctAnswer: 'TRUE', userAnswer: '', passage: 1 },
      { id: 4, type: 'true-false-not-given', question: 'Urban settlements were unusual in Mesopotamia 4,500 years ago.', correctAnswer: 'FALSE', userAnswer: '', passage: 1 },
      { id: 5, type: 'true-false-not-given', question: 'The Tigris and the Euphrates rivers were important for the interchange of ideas.', correctAnswer: 'TRUE', userAnswer: '', passage: 1 },
      { id: 6, type: 'true-false-not-given', question: 'When there were food shortages, farmers relied mainly on the help of their relatives.', correctAnswer: 'FALSE', userAnswer: '', passage: 1 },
      { id: 7, type: 'fill-in-blank', question: 'The intensive farming that developed in Mesopotamia generated a _______ of food.', correctAnswer: 'surplus', userAnswer: '', passage: 1 },
      { id: 8, type: 'fill-in-blank', question: 'Temples were built in the shape of large _______.', correctAnswer: 'pyramids', userAnswer: '', passage: 1 },
      { id: 9, type: 'fill-in-blank', question: 'They had large _______ where produce was kept.', correctAnswer: 'storerooms', userAnswer: '', passage: 1 },
      { id: 10, type: 'fill-in-blank', question: 'Many _______ were needed to manage the farms.', correctAnswer: 'staff', userAnswer: '', passage: 1 },
      { id: 11, type: 'fill-in-blank', question: 'They acted as _______ in hard economic periods.', correctAnswer: 'banks', userAnswer: '', passage: 1 },
      { id: 12, type: 'fill-in-blank', question: 'People wrote on surfaces made of _______.', correctAnswer: 'clay', userAnswer: '', passage: 1 },
      { id: 13, type: 'fill-in-blank', question: 'Written records remained undamaged after _______ in archives.', correctAnswer: 'fires', userAnswer: '', passage: 1 },
      
      // Passage 2 Questions (14-26)
      { id: 14, type: 'matching', question: 'A species that signals its young to move somewhere safer.', correctAnswer: 'C', userAnswer: '', passage: 2 },
      { id: 15, type: 'matching', question: 'An instance where sound helps an animal escape.', correctAnswer: 'G', userAnswer: '', passage: 2 },
      { id: 16, type: 'matching', question: 'A creature that can adapt its camouflage to match many backgrounds.', correctAnswer: 'D', userAnswer: '', passage: 2 },
      { id: 17, type: 'matching', question: 'A claim that most animals disguise themselves.', correctAnswer: 'A', userAnswer: '', passage: 2 },
      { id: 18, type: 'matching', question: 'Examples of animals that look like plants.', correctAnswer: 'B', userAnswer: '', passage: 2 },
      { id: 19, type: 'matching', question: 'One species has camouflage not present from birth.', correctAnswer: 'C', userAnswer: '', passage: 2 },
      { id: 20, type: 'matching', question: 'Species in ancient environments have become highly effective at camouflage.', correctAnswer: 'B', userAnswer: '', passage: 2 },
      { id: 21, type: 'matching', question: 'Part of an animal is left behind to distract predators.', correctAnswer: 'G', userAnswer: '', passage: 2 },
      { id: 22, type: 'matching', question: 'If finding one prey type takes too long, predators switch.', correctAnswer: 'A', userAnswer: '', passage: 2 },
      { id: 23, type: 'matching', question: 'Camouflage can involve copying a threatening animal.', correctAnswer: 'E', userAnswer: '', passage: 2 },
      { id: 24, type: 'fill-in-blank', question: 'The bluestriped fangblenny lives on _______ off Queensland\'s coast.', correctAnswer: 'reefs', userAnswer: '', passage: 2 },
      { id: 25, type: 'fill-in-blank', question: 'It imitates the cleaner wrasse, which removes _______ from other fish.', correctAnswer: 'parasites', userAnswer: '', passage: 2 },
      { id: 26, type: 'fill-in-blank', question: 'This allows it to approach its _______ unnoticed.', correctAnswer: 'prey', userAnswer: '', passage: 2 },
      
      // Passage 3 Questions (27-40)
      { id: 27, type: 'multiple-choice', question: 'Classroom-based learning involves:', options: ['A. Individual study', 'B. Online forums', 'C. Video lectures', 'D. Exchange of ideas'], correctAnswer: 'D', userAnswer: '', passage: 3 },
      { id: 28, type: 'multiple-choice', question: 'Online learning requires:', options: ['A. Single focus', 'B. Linear progression', 'C. Face-to-face contact', 'D. Following multiple discussions'], correctAnswer: 'D', userAnswer: '', passage: 3 },
      { id: 29, type: 'multiple-choice', question: 'Sproull & Kiesler warn that:', options: ['A. Students are lazy', 'B. Technology fails', 'C. Information overload occurs', 'D. Feedback to students can be delayed'], correctAnswer: 'D', userAnswer: '', passage: 3 },
      { id: 30, type: 'multiple-choice', question: 'Online presence means:', options: ['A. Physical attendance', 'B. Feeling part of a group', 'C. Video calls', 'D. Chat participation'], correctAnswer: 'B', userAnswer: '', passage: 3 },
      { id: 31, type: 'multiple-choice', question: 'Picciano\'s study:', options: ['A. Examined relationship between presence and course outcomes', 'B. Proved online learning is better', 'C. Focused on technology', 'D. Studied only face-to-face classes'], correctAnswer: 'A', userAnswer: '', passage: 3 },
      { id: 32, type: 'true-false-not-given', question: 'Ability to meet individual needs is unclear.', correctAnswer: 'YES', userAnswer: '', passage: 3 },
      { id: 33, type: 'true-false-not-given', question: 'Researchers warn against strong online relationships.', correctAnswer: 'NOT GIVEN', userAnswer: '', passage: 3 },
      { id: 34, type: 'true-false-not-given', question: 'Assumptions about face-to-face benefits have proved correct.', correctAnswer: 'NO', userAnswer: '', passage: 3 },
      { id: 35, type: 'true-false-not-given', question: 'Meaning of presence is still evolving.', correctAnswer: 'YES', userAnswer: '', passage: 3 },
      { id: 36, type: 'true-false-not-given', question: 'Research on interaction impacts has been consistent.', correctAnswer: 'NO', userAnswer: '', passage: 3 },
      { id: 37, type: 'matching', question: 'The ability to succeed in an online course', correctAnswer: 'A', userAnswer: '', passage: 3 },
      { id: 38, type: 'matching', question: 'Need to be mindful of comment sources', correctAnswer: 'D', userAnswer: '', passage: 3 },
      { id: 39, type: 'matching', question: 'In online courses, presence', correctAnswer: 'C', userAnswer: '', passage: 3 },
      { id: 40, type: 'matching', question: 'The link between interaction and achievement', correctAnswer: 'B', userAnswer: '', passage: 3 }
    ]
  });

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || isTestComplete) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTestComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setTestData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === questionId ? { ...q, userAnswer: value } : q
      )
    }));
  };

  const generateExplanations = async () => {
    setIsGeneratingExplanations(true);
    const newExplanations: Record<number, Explanation> = {};

    for (const question of testData.questions) {
      if (question.userAnswer) {
        try {
          const passage = testData.passages.find(p => p.id === question.passage);
          const isCorrect = question.userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
          
          const prompt = `
You are an IELTS Reading expert. Analyze this question and provide a detailed explanation in the exact format requested.

PASSAGE EXCERPT: "${passage?.content.substring(0, 1000)}..."

QUESTION: "${question.question}"
CORRECT ANSWER: ${question.correctAnswer}
USER ANSWER: ${question.userAnswer}
RESULT: ${isCorrect ? 'CORRECT' : 'INCORRECT'}

Please provide:
1. Keywords with Vietnamese translations (identify 2-3 key words from the question and passage)
2. A detailed explanation following this exact format:

For Question ${question.id} — "${question.question}" — the answer is ${question.correctAnswer} because [reason].

The key sentence is: "[exact quote from passage]"

Here's why it's ${question.correctAnswer}:
• [Point 1]
• [Point 2] 
• [Point 3]

Format your response as JSON:
{
  "keywords": [
    {"word": "word1", "translation": "Vietnamese translation", "source": "question/passage"},
    {"word": "word2", "translation": "Vietnamese translation", "source": "question/passage"}
  ],
  "explanation": "For Question X explanation...",
  "keysentence": "exact quote from passage",
  "reasoning": ["Point 1", "Point 2", "Point 3"]
}
`;

          const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': 'AIzaSyD1EMFaOQcXddKKmcCAQWA5g85qh4hZptw'
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: prompt
                }]
              }]
            })
          });

          const data = await response.json();
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          
          if (content) {
            try {
              const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
              const parsed = JSON.parse(cleanContent);
              newExplanations[question.id] = parsed;
            } catch (parseError) {
              console.error('Parse error for question', question.id, parseError);
              // Fallback explanation
              newExplanations[question.id] = {
                keywords: [
                  { word: "evidence", translation: "bằng chứng", source: "question" },
                  { word: "remains", translation: "còn lại", source: "passage" }
                ],
                explanation: `For Question ${question.id} — the answer is ${question.correctAnswer}.`,
                keysentence: "Key information from the passage supports this answer.",
                reasoning: ["The passage provides clear evidence", "The question matches the text", "This is the most logical answer"]
              };
            }
          }
        } catch (error) {
          console.error('Error generating explanation for question', question.id, error);
        }
      }
    }

    setExplanations(newExplanations);
    setIsGeneratingExplanations(false);
  };

  const handleSubmitTest = async () => {
    setIsTestComplete(true);
    setShowResults(true);
    await generateExplanations();
  };

  const calculateScore = () => {
    const correctAnswers = testData.questions.filter(q => 
      q.userAnswer.toLowerCase() === q.correctAnswer.toLowerCase()
    ).length;
    return { correct: correctAnswers, total: testData.questions.length };
  };

  const getPartQuestions = (part: number) => {
    switch (part) {
      case 1: return testData.questions.filter(q => q.passage === 1);
      case 2: return testData.questions.filter(q => q.passage === 2);
      case 3: return testData.questions.filter(q => q.passage === 3);
      default: return [];
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setHighlightedText(selection.toString());
    }
  };

  if (showTutorial) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8">
          <div className="text-center mb-8">
            <div className="text-red-600 text-2xl font-bold mb-4">IELTS</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to the IELTS on computer Reading test tutorial
            </h1>
          </div>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              In the Academic Reading and General Training Reading tests the text appears on the left 
              and the questions on the right. To see all the text and the questions you will need to use both scroll bars.
            </p>
            <p>
              You can change the size of the two parts of the screen. Each part of the test has 
              more than one type of question. Each type of question has its own instructions.
            </p>
            <p>
              For some questions you need to write your answer in the gap. For some questions you need to choose an answer. 
              For some questions you need to choose more than one answer. For some questions you need to click 
              on an answer and move it into the gap.
            </p>
            <p>
              You can also highlight text and make notes. See how to do this in the Quick Guide to the 
              IELTS on computer Listening, Reading, and Writing tests video.
            </p>
            <p className="font-semibold">
              The test will automatically stop when the time finishes.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setShowTutorial(false)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
              <button
                onClick={() => navigate('/test/reading')}
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Reading Section
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{score.correct}/{score.total}</div>
                <div className="text-gray-600">Correct Answers</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {Math.round((score.correct / score.total) * 100)}%
                </div>
                <div className="text-gray-600">Accuracy</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {score.correct >= 36 ? '8.5' : score.correct >= 32 ? '7.5' : score.correct >= 28 ? '6.5' : '5.5'}
                </div>
                <div className="text-gray-600">Estimated Band</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowExplanations(!showExplanations)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mr-4"
                disabled={isGeneratingExplanations}
              >
                {isGeneratingExplanations ? 'Generating Explanations...' : 
                 showExplanations ? 'Hide Explanations' : 'Show AI Explanations'}
              </button>
            </div>
          </div>

          {/* Explanations */}
          {showExplanations && (
            <div className="space-y-6">
              {testData.questions.map(question => {
                const isCorrect = question.userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
                const explanation = explanations[question.id];
                
                return (
                  <div key={question.id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-lg font-semibold mr-3">Question {question.id}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{question.question}</p>
                        <div className="text-sm text-gray-600">
                          <span className="mr-4">Your answer: <strong>{question.userAnswer || 'Not answered'}</strong></span>
                          <span>Correct answer: <strong>{question.correctAnswer}</strong></span>
                        </div>
                      </div>
                    </div>

                    {explanation && (
                      <div className="border-t pt-4 mt-4">
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Keywords cần biết:</h4>
                          <div className="space-y-1">
                            {explanation.keywords.map((keyword, idx) => (
                              <div key={idx} className="text-sm">
                                <strong>{keyword.word}:</strong> {keyword.translation} 
                                <span className="text-gray-500 ml-2">({keyword.source})</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-800 mb-3">{explanation.explanation}</p>
                          
                          <div className="bg-blue-50 p-3 rounded-lg mb-3">
                            <p className="text-sm font-medium text-blue-900 mb-1">Key sentence:</p>
                            <p className="text-blue-800 italic">"{explanation.keysentence}"</p>
                          </div>

                          <div>
                            <p className="font-medium text-gray-900 mb-2">Here's why it's {question.correctAnswer}:</p>
                            <ul className="space-y-1">
                              {explanation.reasoning.map((reason, idx) => (
                                <li key={idx} className="text-gray-700 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* IELTS Header */}
      {showHeader && (
        <div className="bg-white border-b shadow-sm">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4">
              <div className="text-red-600 text-xl font-bold">IELTS</div>
              <div className="text-gray-600">48887345</div>
              <div className="text-gray-600 text-sm">{formatTime(timeLeft)} minutes remaining</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Wifi className="w-5 h-5 text-gray-600" />
              <Bell className="w-5 h-5 text-gray-600" />
              <Menu className="w-5 h-5 text-gray-600" />
              <Edit3 className="w-5 h-5 text-gray-600" />
              <button
                onClick={() => setShowTimer(!showTimer)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                {showTimer ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Test Content */}
      <div className="flex h-screen">
        {/* Left Panel - Passage */}
        <div 
          className="bg-white border-r overflow-y-auto"
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div className="p-6">
            <div className="bg-gray-100 p-3 rounded mb-4">
              <h2 className="font-semibold">Part {currentPart}</h2>
              <p className="text-sm text-gray-600">
                Read the text and answer questions {currentPart === 1 ? '1–13' : currentPart === 2 ? '14–26' : '27–40'}.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4">
                {testData.passages.find(p => p.id === currentPart)?.title}
              </h3>
              <div 
                className="prose max-w-none text-gray-800 leading-relaxed"
                onMouseUp={handleTextSelection}
                style={{ userSelect: 'text' }}
              >
                {testData.passages.find(p => p.id === currentPart)?.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div 
          className="w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = leftPanelWidth;
            
            const handleMouseMove = (e: MouseEvent) => {
              const diff = e.clientX - startX;
              const newWidth = Math.max(30, Math.min(70, startWidth + (diff / window.innerWidth) * 100));
              setLeftPanelWidth(newWidth);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />

        {/* Right Panel - Questions */}
        <div 
          className="bg-white overflow-y-auto"
          style={{ width: `${100 - leftPanelWidth}%` }}
        >
          <div className="p-6">
            {/* Questions for current part */}
            <div className="space-y-6">
              {getPartQuestions(currentPart).map((question) => (
                <div key={question.id} className="border-b pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium min-w-[2rem] text-center">
                      {question.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 mb-3">{question.question}</p>
                      
                      {question.type === 'true-false-not-given' && (
                        <div className="space-y-2">
                          {['TRUE', 'FALSE', 'NOT GIVEN'].map(option => (
                            <label key={option} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={question.userAnswer === option}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="w-4 h-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'fill-in-blank' && (
                        <input
                          type="text"
                          value={question.userAnswer}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          className="border border-gray-300 px-3 py-2 rounded w-full max-w-xs"
                          placeholder="Enter your answer"
                        />
                      )}
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2">
                          {question.options.map(option => (
                            <label key={option} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option.charAt(0)}
                                checked={question.userAnswer === option.charAt(0)}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="w-4 h-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {question.type === 'matching' && (
                        <div className="space-y-2">
                          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(option => (
                            <label key={option} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={question.userAnswer === option}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="w-4 h-4"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Part 1</span>
              {Array.from({length: 13}, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPart(1)}
                  className={`w-8 h-8 text-xs rounded ${
                    currentPart === 1 && num <= 13
                      ? 'bg-blue-600 text-white'
                      : testData.questions.find(q => q.id === num)?.userAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Part 2</span>
              {Array.from({length: 13}, (_, i) => i + 14).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPart(2)}
                  className={`w-8 h-8 text-xs rounded ${
                    currentPart === 2 && num >= 14 && num <= 26
                      ? 'bg-blue-600 text-white'
                      : testData.questions.find(q => q.id === num)?.userAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Part 3</span>
              {Array.from({length: 14}, (_, i) => i + 27).map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentPart(3)}
                  className={`w-8 h-8 text-xs rounded ${
                    currentPart === 3 && num >= 27
                      ? 'bg-blue-600 text-white'
                      : testData.questions.find(q => q.id === num)?.userAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPart(Math.max(1, currentPart - 1))}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPart === 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setCurrentPart(Math.min(3, currentPart + 1))}
              className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              disabled={currentPart === 3}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleSubmitTest}
              className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition-colors"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>

      {/* Notes Panel */}
      {highlightedText && (
        <div className="fixed top-20 right-4 bg-white border shadow-lg rounded-lg p-4 max-w-sm">
          <h4 className="font-semibold mb-2">Highlighted Text:</h4>
          <p className="text-sm text-gray-700 mb-3">"{highlightedText}"</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes..."
            className="w-full border rounded p-2 text-sm"
            rows={3}
          />
          <button
            onClick={() => setHighlightedText('')}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadingTest;