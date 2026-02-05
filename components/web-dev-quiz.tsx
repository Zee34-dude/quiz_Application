'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronRight, RotateCcw } from 'lucide-react'
import { QuizTimer } from './quiz-timer'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const webDevQuestions: Question[] = [
  {
    id: 1,
    question: 'What is computer science mainly focused on?',
    options: [
      'Studying computation and data processing',
      'Building physical computers',
      'Designing websites only',
      'Fixing hardware issues'
    ],
    correctAnswer: 0,
    explanation: 'Computer science studies computation, algorithms, and data.'
  },
  {
    id: 2,
    question: 'Which component executes instructions?',
    options: ['RAM', 'CPU', 'SSD', 'Power Supply'],
    correctAnswer: 1,
    explanation: 'The CPU executes instructions.'
  },
  {
    id: 3,
    question: 'Which memory is non-volatile?',
    options: ['RAM', 'Cache', 'Registers', 'ROM'],
    correctAnswer: 3,
    explanation: 'ROM retains data without power.'
  },
  {
    id: 4,
    question: 'What does an operating system do?',
    options: [
      'Manages hardware and software resources',
      'Compiles code',
      'Designs user interfaces',
      'Stores web pages'
    ],
    correctAnswer: 0,
    explanation: 'The OS manages system resources.'
  },
  {
    id: 5,
    question: 'Which is an example of system software?',
    options: ['Browser', 'Text editor', 'Operating system', 'Game'],
    correctAnswer: 2,
    explanation: 'Operating systems are system software.'
  },

  {
    id: 6,
    question: 'What is an algorithm?',
    options: [
      'A hardware device',
      'A step-by-step problem-solving procedure',
      'A programming language',
      'A database'
    ],
    correctAnswer: 1,
    explanation: 'Algorithms define structured problem-solving steps.'
  },
  {
    id: 7,
    question: 'Which language is closest to hardware?',
    options: ['JavaScript', 'Python', 'Assembly', 'HTML'],
    correctAnswer: 2,
    explanation: 'Assembly is closest to machine code.'
  },
  {
    id: 8,
    question: 'Which language is high-level?',
    options: ['Binary', 'Machine code', 'Assembly', 'JavaScript'],
    correctAnswer: 3,
    explanation: 'JavaScript is a high-level language.'
  },
  {
    id: 9,
    question: 'What does a flowchart help with?',
    options: [
      'Visualizing logic',
      'Compiling programs',
      'Debugging hardware',
      'Storing data'
    ],
    correctAnswer: 0,
    explanation: 'Flowcharts visually represent logic.'
  },
  {
    id: 10,
    question: 'Which flowchart symbol represents a decision?',
    options: ['Oval', 'Rectangle', 'Diamond', 'Arrow'],
    correctAnswer: 2,
    explanation: 'Diamonds represent decisions.'
  },

  {
    id: 11,
    question: 'What is JavaScript mainly used for?',
    options: [
      'Server hardware control',
      'Styling web pages',
      'Adding interactivity to web pages',
      'Database design'
    ],
    correctAnswer: 2,
    explanation: 'JavaScript adds interactivity.'
  },
  {
    id: 12,
    question: 'Which keyword declares a constant?',
    options: ['let', 'var', 'static', 'const'],
    correctAnswer: 3,
    explanation: '`const` creates constants.'
  },
  {
    id: 13,
    question: 'Which data type is NOT primitive?',
    options: ['Object', 'String', 'Number', 'Boolean'],
    correctAnswer: 0,
    explanation: 'Objects are non-primitive.'
  },
  {
    id: 14,
    question: 'What does === compare?',
    options: [
      'Only values',
      'Only types',
      'Value and type',
      'References only'
    ],
    correctAnswer: 2,
    explanation: '=== checks value and type.'
  },
  {
    id: 15,
    question: 'What does NaN mean?',
    options: [
      'Null and None',
      'Not a Number',
      'New assigned Number',
      'Negative Number'
    ],
    correctAnswer: 1,
    explanation: 'NaN means Not a Number.'
  },

  {
    id: 16,
    question: 'What is hoisting?',
    options: [
      'Moving declarations to the top of scope',
      'Deleting variables',
      'Optimizing loops',
      'Reducing memory'
    ],
    correctAnswer: 0,
    explanation: 'Hoisting moves declarations.'
  },
  {
    id: 17,
    question: 'Which keyword has block scope?',
    options: ['var', 'global', 'let', 'this'],
    correctAnswer: 2,
    explanation: '`let` is block scoped.'
  },
  {
    id: 18,
    question: 'What is a function?',
    options: [
      'A loop',
      'A reusable block of code',
      'A variable',
      'A class'
    ],
    correctAnswer: 1,
    explanation: 'Functions encapsulate reusable logic.'
  },
  {
    id: 19,
    question: 'What does return do?',
    options: [
      'Stops execution',
      'Logs output',
      'Returns a value',
      'Declares a variable'
    ],
    correctAnswer: 2,
    explanation: 'Return sends a value back.'
  },
  {
    id: 20,
    question: 'What is scope?',
    options: [
      'Memory size',
      'Execution speed',
      'Variable accessibility',
      'Code style'
    ],
    correctAnswer: 2,
    explanation: 'Scope defines where variables are accessible.'
  },

  {
    id: 21,
    question: 'What is the DOM?',
    options: [
      'Document Object Model',
      'Data Output Module',
      'Dynamic Object Manager',
      'Document Order Map'
    ],
    correctAnswer: 0,
    explanation: 'DOM represents the document structure.'
  },
  {
    id: 22,
    question: 'Which method selects by CSS selector?',
    options: [
      'getElementById',
      'querySelector',
      'getElementsByTagName',
      'selectElement'
    ],
    correctAnswer: 1,
    explanation: '`querySelector` uses CSS selectors.'
  },
  {
    id: 23,
    question: 'What is an event?',
    options: [
      'A variable',
      'A user or browser action',
      'A function',
      'A loop'
    ],
    correctAnswer: 1,
    explanation: 'Events are actions like clicks.'
  },
  {
    id: 24,
    question: 'What is event bubbling?',
    options: [
      'Events move top-down',
      'Events repeat',
      'Events stop',
      'Events move bottom-up'
    ],
    correctAnswer: 3,
    explanation: 'Bubbling propagates upward.'
  },
  {
    id: 25,
    question: 'What does preventDefault() do?',
    options: [
      'Stops propagation',
      'Stops browser default behavior',
      'Deletes events',
      'Reloads page'
    ],
    correctAnswer: 1,
    explanation: 'It prevents default browser actions.'
  },

  {
    id: 26,
    question: 'What is asynchronous programming?',
    options: [
      'Blocking execution',
      'Parallel task handling',
      'Single-thread execution',
      'Loop-based logic'
    ],
    correctAnswer: 1,
    explanation: 'Async allows non-blocking tasks.'
  },
  {
    id: 27,
    question: 'What problem do Promises solve?',
    options: [
      'Syntax errors',
      'Callback hell',
      'Memory leaks',
      'Slow rendering'
    ],
    correctAnswer: 1,
    explanation: 'Promises improve async readability.'
  },
  {
    id: 28,
    question: 'What does async/await do?',
    options: [
      'Blocks execution',
      'Simplifies asynchronous code',
      'Creates threads',
      'Improves performance automatically'
    ],
    correctAnswer: 1,
    explanation: 'Async/await simplifies async code.'
  },
  {
    id: 29,
    question: 'What is the call stack?',
    options: [
      'Memory storage',
      'Execution order of functions',
      'DOM tree',
      'Event queue'
    ],
    correctAnswer: 1,
    explanation: 'The call stack tracks function execution.'
  },
  {
    id: 30,
    question: 'What is a callback?',
    options: [
      'A returned value',
      'A function passed as argument',
      'A variable',
      'A loop'
    ],
    correctAnswer: 1,
    explanation: 'Callbacks are functions passed to other functions.'
  },

  {
    id: 31,
    question: 'What is version control?',
    options: [
      'Tracking file changes over time',
      'Optimizing code',
      'Running tests',
      'Deploying apps'
    ],
    correctAnswer: 0,
    explanation: 'Version control tracks changes.'
  },
  {
    id: 32,
    question: 'Why is version control important?',
    options: [
      'Improves UI',
      'Enables collaboration',
      'Speeds execution',
      'Prevents all bugs'
    ],
    correctAnswer: 1,
    explanation: 'It enables teamwork and history tracking.'
  },
  {
    id: 33,
    question: 'What is Git?',
    options: [
      'A database',
      'A browser',
      'A version control system',
      'An IDE'
    ],
    correctAnswer: 2,
    explanation: 'Git is a VCS.'
  },
  {
    id: 34,
    question: 'What is a repository?',
    options: [
      'A commit',
      'A Git-tracked project',
      'A branch',
      'A server'
    ],
    correctAnswer: 1,
    explanation: 'Repositories store project history.'
  },
  {
    id: 35,
    question: 'What is a commit?',
    options: [
      'Deleting code',
      'Saving a snapshot of changes',
      'Merging branches',
      'Pushing code'
    ],
    correctAnswer: 1,
    explanation: 'Commits save changes.'
  },

  {
    id: 36,
    question: 'What does git add do?',
    options: [
      'Commits files',
      'Stages changes',
      'Pushes to remote',
      'Creates branch'
    ],
    correctAnswer: 1,
    explanation: 'git add stages changes.'
  },
  {
    id: 37,
    question: 'What does git push do?',
    options: [
      'Uploads commits to remote',
      'Downloads commits',
      'Deletes history',
      'Resets branch'
    ],
    correctAnswer: 0,
    explanation: 'git push uploads commits.'
  },
  {
    id: 38,
    question: 'What does git pull do?',
    options: [
      'Deletes files',
      'Fetches and merges changes',
      'Creates commits',
      'Stages files'
    ],
    correctAnswer: 1,
    explanation: 'git pull updates local repo.'
  },
  {
    id: 39,
    question: 'What is a branch?',
    options: [
      'A folder',
      'An independent development line',
      'A commit hash',
      'A tag'
    ],
    correctAnswer: 1,
    explanation: 'Branches allow parallel work.'
  },
  {
    id: 40,
    question: 'What causes merge conflicts?',
    options: [
      'Slow network',
      'Different changes to same file',
      'Large files',
      'Too many commits'
    ],
    correctAnswer: 1,
    explanation: 'Conflicts occur on overlapping changes.'
  },

  {
    id: 41,
    question: 'What is a remote repository?',
    options: [
      'A deleted repo',
      'An online-hosted repo',
      'A branch',
      'A commit'
    ],
    correctAnswer: 1,
    explanation: 'Remote repos are hosted online.'
  },
  {
    id: 42,
    question: 'What is .gitignore used for?',
    options: [
      'Ignoring files from tracking',
      'Deleting commits',
      'Protecting branches',
      'Storing credentials'
    ],
    correctAnswer: 0,
    explanation: '.gitignore excludes files.'
  },
  {
    id: 43,
    question: 'What is HEAD in Git?',
    options: [
      'First commit',
      'Current commit pointer',
      'Remote branch',
      'Main server'
    ],
    correctAnswer: 1,
    explanation: 'HEAD points to current commit.'
  },
  {
    id: 44,
    question: 'What is a distributed VCS?',
    options: [
      'One central repo',
      'Each user has full history',
      'No backups',
      'Cloud-only'
    ],
    correctAnswer: 1,
    explanation: 'Distributed VCS gives full history to all users.'
  },
  {
    id: 45,
    question: 'What is refactoring?',
    options: [
      'Adding features',
      'Improving code without changing behavior',
      'Fixing bugs',
      'Deploying code'
    ],
    correctAnswer: 1,
    explanation: 'Refactoring improves code quality.'
  },

  {
    id: 46,
    question: 'What is debugging?',
    options: [
      'Writing tests',
      'Finding and fixing errors',
      'Deploying apps',
      'Compiling code'
    ],
    correctAnswer: 1,
    explanation: 'Debugging fixes bugs.'
  },
  {
    id: 47,
    question: 'What is Bitbucket?',
    options: [
      'A Git hosting service',
      'A programming language',
      'A browser',
      'A framework'
    ],
    correctAnswer: 0,
    explanation: 'Bitbucket hosts Git repositories.'
  },
  {
    id: 48,
    question: 'What is Bitbucket mainly used for?',
    options: [
      'Designing UI',
      'Hosting Git repositories',
      'Writing JavaScript',
      'Database management'
    ],
    correctAnswer: 1,
    explanation: 'Bitbucket hosts and manages Git repos.'
  },
  {
    id: 49,
    question: 'What is collaboration in Git?',
    options: [
      'Writing code alone',
      'Multiple developers working on same repo',
      'Deleting branches',
      'Resetting commits'
    ],
    correctAnswer: 1,
    explanation: 'Collaboration allows team workflows.'
  },
  {
    id: 50,
    question: 'Why are commits important?',
    options: [
      'They track changes',
      'They run code',
      'They improve UI',
      'They host projects'
    ],
    correctAnswer: 0,
    explanation: 'Commits preserve history.'
  }
];


const webDevQuestionsPart2: Question[] = [
  {
    id: 51,
    question: 'Which Git command creates a new branch?',
    options: ['git branch', 'git merge', 'git commit', 'git push'],
    correctAnswer: 0,
    explanation: '`git branch` creates a new branch.'
  },
  {
    id: 52,
    question: 'Which command shows commit history?',
    options: ['git log', 'git status', 'git diff', 'git fetch'],
    correctAnswer: 0,
    explanation: '`git log` displays the commit history.'
  },
  {
    id: 53,
    question: 'What is a merge in Git?',
    options: [
      'Combining changes from two branches',
      'Deleting a branch',
      'Creating a new branch',
      'Uploading code to remote'
    ],
    correctAnswer: 0,
    explanation: 'Merging integrates changes from branches.'
  },
  {
    id: 54,
    question: 'What is a tag in Git?',
    options: [
      'A branch pointer',
      'A label for a specific commit',
      'A remote repository',
      'A staged file'
    ],
    correctAnswer: 1,
    explanation: 'Tags mark specific commits, often for releases.'
  },
  {
    id: 55,
    question: 'Which Git command removes files from staging?',
    options: ['git reset', 'git revert', 'git rm', 'git checkout'],
    correctAnswer: 0,
    explanation: '`git reset` unstages files.'
  },

  {
    id: 56,
    question: 'What is the difference between git revert and git reset?',
    options: [
      'Revert undoes a commit safely, reset rewinds history',
      'Reset deletes files, revert stages files',
      'Revert stages changes, reset merges branches',
      'There is no difference'
    ],
    correctAnswer: 0,
    explanation: 'Revert creates a new commit undoing changes, reset rewinds history.'
  },
  {
    id: 57,
    question: 'Which Git command fetches changes without merging?',
    options: ['git pull', 'git fetch', 'git push', 'git merge'],
    correctAnswer: 1,
    explanation: '`git fetch` downloads changes without merging.'
  },
  {
    id: 58,
    question: 'What is a fork in Git?',
    options: [
      'Copy of a repo for independent work',
      'Merging a branch',
      'Deleting history',
      'Renaming a repo'
    ],
    correctAnswer: 0,
    explanation: 'A fork is an independent copy of a repository.'
  },
  {
    id: 59,
    question: 'Which Git command shows the status of files?',
    options: ['git status', 'git diff', 'git branch', 'git log'],
    correctAnswer: 0,
    explanation: '`git status` shows staged, modified, and untracked files.'
  },
  {
    id: 60,
    question: 'Which JavaScript keyword declares a variable that can be reassigned?',
    options: ['const', 'let', 'static', 'immutable'],
    correctAnswer: 1,
    explanation: '`let` declares variables that can be reassigned.'
  },

  {
    id: 61,
    question: 'Which operator is used for logical AND in JavaScript?',
    options: ['&&', '||', '!', '**'],
    correctAnswer: 0,
    explanation: '`&&` represents logical AND.'
  },
  {
    id: 62,
    question: 'Which operator is used for logical OR?',
    options: ['||', '&&', '==', '==='],
    correctAnswer: 0,
    explanation: '`||` represents logical OR.'
  },
  {
    id: 63,
    question: 'Which method adds an item to the end of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: '`push()` adds to the end of an array.'
  },
  {
    id: 64,
    question: 'Which method removes the last item from an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 1,
    explanation: '`pop()` removes the last element.'
  },
  {
    id: 65,
    question: 'Which keyword creates a class in JavaScript?',
    options: ['function', 'object', 'class', 'let'],
    correctAnswer: 2,
    explanation: '`class` defines a class in ES6.'
  },

  {
    id: 66,
    question: 'What is the purpose of a constructor in a class?',
    options: [
      'Stores data globally',
      'Initializes object properties',
      'Executes static code',
      'Manages memory'
    ],
    correctAnswer: 1,
    explanation: 'Constructors initialize object properties.'
  },
  {
    id: 67,
    question: 'What does JSON stand for?',
    options: [
      'Java Simple Object Notation',
      'JavaScript Object Notation',
      'Java Standard Object Network',
      'JavaScript Online Notation'
    ],
    correctAnswer: 1,
    explanation: 'JSON is JavaScript Object Notation.'
  },
  {
    id: 68,
    question: 'Which method converts an object to a JSON string?',
    options: ['JSON.stringify()', 'JSON.parse()', 'Object.toJSON()', 'toString()'],
    correctAnswer: 0,
    explanation: 'JSON.stringify() converts objects to strings.'
  },
  {
    id: 69,
    question: 'Which method parses a JSON string to an object?',
    options: ['JSON.stringify()', 'JSON.parse()', 'Object.parse()', 'JSON.convert()'],
    correctAnswer: 1,
    explanation: 'JSON.parse() converts JSON strings to objects.'
  },
  {
    id: 70,
    question: 'Which CSS property changes the text color?',
    options: ['color', 'background-color', 'font-size', 'text-style'],
    correctAnswer: 0,
    explanation: '`color` sets text color.'
  },

  {
    id: 71,
    question: 'Which CSS property sets the space outside an element?',
    options: ['margin', 'padding', 'border', 'outline'],
    correctAnswer: 0,
    explanation: 'Margin sets the space outside an element.'
  },
  {
    id: 72,
    question: 'Which CSS property sets the space inside an element?',
    options: ['margin', 'padding', 'border', 'gap'],
    correctAnswer: 1,
    explanation: 'Padding sets inner spacing.'
  },
  {
    id: 73,
    question: 'Which property makes a flex container?',
    options: ['display: flex', 'display: block', 'display: grid', 'position: flex'],
    correctAnswer: 0,
    explanation: 'display: flex enables Flexbox layout.'
  },
  {
    id: 74,
    question: 'Which method adds an event listener?',
    options: ['on()', 'addEventListener()', 'attachEvent()', 'listen()'],
    correctAnswer: 1,
    explanation: 'addEventListener() attaches an event listener.'
  },
  {
    id: 75,
    question: 'Which event fires when a user clicks an element?',
    options: ['keydown', 'click', 'mouseover', 'submit'],
    correctAnswer: 1,
    explanation: 'The click event fires on user clicks.'
  },

  {
    id: 76,
    question: 'Which method prevents default form submission?',
    options: ['stopPropagation()', 'preventDefault()', 'return false', 'halt()'],
    correctAnswer: 1,
    explanation: 'preventDefault() stops default behavior.'
  },
  {
    id: 77,
    question: 'Which HTTP method retrieves data?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 0,
    explanation: 'GET requests retrieve data.'
  },
  {
    id: 78,
    question: 'Which HTTP method updates existing data?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 2,
    explanation: 'PUT updates existing resources.'
  },
  {
    id: 79,
    question: 'Which HTTP method deletes a resource?',
    options: ['POST', 'PUT', 'DELETE', 'GET'],
    correctAnswer: 2,
    explanation: 'DELETE removes a resource.'
  },
  {
    id: 80,
    question: 'What is a Promise in JavaScript?',
    options: [
      'A function',
      'An object representing future completion',
      'A variable',
      'A loop'
    ],
    correctAnswer: 1,
    explanation: 'Promises represent async operations that may complete later.'
  },

  {
    id: 81,
    question: 'What is the difference between let and var?',
    options: [
      'var is block-scoped, let is function-scoped',
      'let is block-scoped, var is function-scoped',
      'var is constant, let is mutable',
      'No difference'
    ],
    correctAnswer: 1,
    explanation: 'let is block-scoped, var is function-scoped.'
  },
  {
    id: 82,
    question: 'Which method removes the first element from an array?',
    options: ['shift()', 'pop()', 'push()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'shift() removes the first element.'
  },
  {
    id: 83,
    question: 'Which method adds an element to the beginning of an array?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 3,
    explanation: 'unshift() adds elements to the start.'
  },
  {
    id: 84,
    question: 'Which Git command shows differences between commits?',
    options: ['git diff', 'git log', 'git status', 'git fetch'],
    correctAnswer: 0,
    explanation: 'git diff shows changes.'
  },
  {
    id: 85,
    question: 'Which Git command discards local changes in a file?',
    options: ['git checkout', 'git reset', 'git revert', 'git clone'],
    correctAnswer: 0,
    explanation: 'git checkout reverts file changes.'
  },

  {
    id: 86,
    question: 'What is a fork used for?',
    options: [
      'Collaborating on a separate copy of a repo',
      'Merging branches',
      'Deleting commits',
      'Resetting history'
    ],
    correctAnswer: 0,
    explanation: 'Forks allow independent development.'
  },
  {
    id: 87,
    question: 'Which platform hosts Git repositories and integrates CI/CD?',
    options: ['Bitbucket', 'Node.js', 'Chrome', 'React'],
    correctAnswer: 0,
    explanation: 'Bitbucket hosts Git repos and supports CI/CD pipelines.'
  },
  {
    id: 88,
    question: 'What does CI/CD stand for?',
    options: [
      'Continuous Integration / Continuous Deployment',
      'Code Integration / Code Distribution',
      'Continuous Input / Continuous Design',
      'Code Interface / Continuous Debugging'
    ],
    correctAnswer: 0,
    explanation: 'CI/CD automates building, testing, and deployment.'
  },
  {
    id: 89,
    question: 'Which Git command renames a branch?',
    options: ['git rename', 'git branch -m', 'git mv', 'git change'],
    correctAnswer: 1,
    explanation: 'git branch -m renames a branch.'
  },
  {
    id: 90,
    question: 'What is the default branch name in Git?',
    options: ['main', 'master', 'origin', 'dev'],
    correctAnswer: 0,
    explanation: 'Modern Git uses "main" as default.'
  },

  {
    id: 91,
    question: 'Which JavaScript method converts string to number?',
    options: ['parseInt()', 'toString()', 'Number.toInt()', 'parseString()'],
    correctAnswer: 0,
    explanation: 'parseInt() converts strings to integers.'
  },
  {
    id: 92,
    question: 'Which method repeats a string N times?',
    options: ['repeat()', 'append()', 'copy()', 'concat()'],
    correctAnswer: 0,
    explanation: 'repeat() repeats a string.'
  },
  {
    id: 93,
    question: 'Which keyword handles errors in JavaScript?',
    options: ['try', 'catch', 'throw', 'All of the above'],
    correctAnswer: 3,
    explanation: 'try, catch, and throw manage exceptions.'
  },
  {
    id: 94,
    question: 'Which method removes whitespace from both ends of a string?',
    options: ['trim()', 'slice()', 'substr()', 'replace()'],
    correctAnswer: 0,
    explanation: 'trim() removes surrounding whitespace.'
  },
  {
    id: 95,
    question: 'Which property gets the text content of an element?',
    options: ['innerHTML', 'textContent', 'value', 'nodeValue'],
    correctAnswer: 1,
    explanation: 'textContent returns visible text.'
  },

  {
    id: 96,
    question: 'Which JavaScript array method creates a new array with results of a function?',
    options: ['map()', 'forEach()', 'filter()', 'reduce()'],
    correctAnswer: 0,
    explanation: 'map() applies a function to each element.'
  },
  {
    id: 97,
    question: 'Which array method filters elements based on a condition?',
    options: ['filter()', 'map()', 'reduce()', 'find()'],
    correctAnswer: 0,
    explanation: 'filter() returns elements meeting a condition.'
  },
  {
    id: 98,
    question: 'Which Git command deletes a branch locally?',
    options: ['git branch -d', 'git branch -D', 'git rm', 'git delete'],
    correctAnswer: 0,
    explanation: 'git branch -d deletes a local branch safely.'
  },
  {
    id: 99,
    question: 'Which Git command deletes a branch forcefully?',
    options: ['git branch -d', 'git branch -D', 'git remove', 'git reset'],
    correctAnswer: 1,
    explanation: 'git branch -D forces branch deletion.'
  },
  {
    id: 100,
    question: 'Which JavaScript keyword is used for asynchronous functions?',
    options: ['async', 'await', 'defer', 'yield'],
    correctAnswer: 0,
    explanation: '`async` marks a function as asynchronous.'
  }
];




interface QuizProps {
  onComplete: (score: number, total: number) => void
  questionState: boolean
  setQuestionState:React.Dispatch<React.SetStateAction<boolean>>
}

export function WebDevQuiz({ onComplete,questionState,setQuestionState }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const currentWebDevQuestions= questionState==false?webDevQuestions:webDevQuestionsPart2
  const question = currentWebDevQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / webDevQuestions.length) * 100

  const handleAnswer = (answerIndex: number) => {
    if (answered) return

    setSelectedAnswer(answerIndex)
    setAnswered(true)
    setShowExplanation(true)

    if (answerIndex === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < webDevQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === question.correctAnswer ? 1 : 0), webDevQuestions.length)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswered(false)
    setQuestionState((prev:boolean)=>!prev)
  }

  const handleTimeUp = () => {
    const finalScore = score + (answered && selectedAnswer === question.correctAnswer ? 1 : 0)
    onComplete(finalScore, webDevQuestions.length)
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-foreground">Web Development Quiz</h1>
            <div className="text-right flex flex-col items-end gap-2">
              <QuizTimer initialMinutes={10} onTimeUp={handleTimeUp} />
              <p className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {webDevQuestions.length}</p>
              <p className="text-lg font-semibold text-primary">Score: {score}</p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 border-2 border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">{question.question}</h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={answered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-950 text-foreground'
                      : 'border-red-500 bg-red-50 dark:bg-red-950 text-foreground'
                    : 'border-border hover:border-primary/50 bg-card'
                  } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center ${selectedAnswer === index
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500'
                          : 'border-red-500 bg-red-500'
                        : 'border-border'
                      }`}
                  >
                    {selectedAnswer === index && <span className="text-white text-sm">✓</span>}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-lg mb-8 ${selectedAnswer === question.correctAnswer
                ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800'
              }`}>
              <p className="font-semibold text-foreground mb-2">
                {selectedAnswer === question.correctAnswer ? '✓ Correct!' : 'Explanation:'}
              </p>
              <p className="text-foreground">{question.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentQuestion(currentQuestion - 1)
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                  setAnswered(false)
                }}
              >
                Previous
              </Button>
            )}
            {answered && (
              <Button
                onClick={handleNext}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {currentQuestion === webDevQuestions.length - 1 ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
