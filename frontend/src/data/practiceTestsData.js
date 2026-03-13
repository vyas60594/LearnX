export const PRACTICE_TESTS_CATEGORIES = [
  'All', 'Python', 'SQL', 'DSA', 'Aptitude'
];

export const PRACTICE_TESTS_LEVELS = [
  'All', 'Beginner', 'Intermediate', 'Advanced'
];

export const PRACTICE_TESTS = [
  {
    id: 1,
    title: 'Python Basics Practice',
    category: 'Python',
    level: 'Beginner',
    description: 'Test your knowledge of Python syntax, variables, and basic operations.',
    duration: '20 min',
    isPractice: true,
    courseSlug: 'python-developer',
    questions: [
      {
        id: 1,
        question: 'Which of the following is the correct way to define a function in Python?',
        code: 'def my_func():',
        options: ['function my_func():', 'def my_func():', 'create my_func():', 'method my_func():'],
        correct: 1
      },
      {
        id: 2,
        question: 'What is the correct file extension for Python files?',
        options: ['.pt', '.py', '.pyt', '.pw'],
        correct: 1
      },
      {
        id: 3,
        question: 'Which statement is used to stop a loop?',
        options: ['stop', 'exit', 'break', 'return'],
        correct: 2
      },
      {
        id: 4,
        question: 'How do you create a variable with the numeric value 5?',
        options: ['x = 5', 'x = num(5)', 'x = int(5)', 'Both A and C are correct'],
        correct: 3
      },
      {
        id: 5,
        question: 'What is the output of print(2 ** 3)?',
        options: ['5', '6', '8', '9'],
        correct: 2
      }
    ]
  },
  {
    id: 2,
    title: 'SQL Query Practice',
    category: 'SQL',
    level: 'Beginner',
    description: 'Practice writing SELECT, WHERE, and ORDER BY queries.',
    duration: '18 min',
    isPractice: true,
    courseSlug: 'sql-developer',
    questions: [
      {
        id: 1,
        question: 'Which SQL statement is used to extract data from a database?',
        options: ['SELECT', 'GET', 'EXTRACT', 'OPEN'],
        correct: 0
      },
      {
        id: 2,
        question: 'Which SQL statement is used to update data in a database?',
        options: ['MODIFY', 'SAVE', 'UPDATE', 'CHANGE'],
        correct: 2
      },
      {
        id: 3,
        question: 'With SQL, how can you return all the records from a table named "Persons" where the "FirstName" is "Peter"?',
        options: [
          'SELECT * FROM Persons WHERE FirstName="Peter"',
          'SELECT [all] FROM Persons WHERE FirstName="Peter"',
          'SELECT * FROM Persons WHERE FirstName<>"Peter"',
          'SELECT Persons WHERE FirstName="Peter"'
        ],
        correct: 0
      }
    ]
  },
  {
    id: 3,
    title: 'Arrays & Strings',
    category: 'DSA',
    level: 'Intermediate',
    description: 'Solve array manipulation and string processing problems.',
    duration: '25 min',
    isPractice: true,
    courseSlug: 'data-structures-&-algorithms',
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of accessing an element in an array using an index?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        correct: 0
      },
      {
        id: 2,
        question: 'Which data structure follows the LIFO (Last In First Out) principle?',
        options: ['Queue', 'Stack', 'Linked List', 'Array'],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: 'Quantitative Aptitude',
    category: 'Aptitude',
    level: 'Beginner',
    description: 'Practice number systems, percentages, and ratio problems.',
    duration: '30 min',
    isPractice: true,
    courseSlug: 'aptitude-preparation',
    questions: [
      {
        id: 1,
        question: 'If a man buys an article for $25 and sells it for $30, what is his profit percentage?',
        options: ['10%', '20%', '25%', '15%'],
        correct: 1
      }
    ]
  },
  {
    id: 5,
    title: 'OOP in Python',
    category: 'Python',
    level: 'Intermediate',
    description: 'Test your understanding of classes, objects, and inheritance.',
    duration: '20 min',
    isPractice: true,
    courseSlug: 'python-developer',
    questions: [
      {
        id: 1,
        question: 'Which keyword is used to create a class in Python?',
        options: ['className', 'class', 'struct', 'object'],
        correct: 1
      }
    ]
  },
  {
    id: 6,
    title: 'Logical Reasoning',
    category: 'Aptitude',
    level: 'Intermediate',
    description: 'Patterns, series, and logical deduction problems.',
    duration: '20 min',
    isPractice: true,
    courseSlug: 'aptitude-preparation',
    questions: [
      {
        id: 1,
        question: 'Find the next number in the series: 2, 4, 8, 16, ?',
        options: ['24', '30', '32', '36'],
        correct: 2
      }
    ]
  }
];
