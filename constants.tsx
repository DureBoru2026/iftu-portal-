import React from 'react';
import { Users, CheckSquare, Zap, Shield } from 'lucide-react';
import { Course, Grade, EducationLevel, Exam, Stream } from './types';

const getThumb = (subject: string, id: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=400&sig=${subject}`;

const CURRENT_YEAR = new Date().getFullYear();

export const NATIONAL_CENTER_INFO = {
  name: "IFTU National Digital Sovereign Education Center",
  shortName: "IFTU NDC",
  location: "Menelik II Square, Addis Ababa, Ethiopia",
  coordinates: { lat: 9.0336, lng: 38.7615 },
  mapsLink: "https://goo.gl/maps/KcLgTHsz6WKtSeda7/",
  authorizedBy: "Jemal Fano Haji"
};

export const MOCK_COURSES: Course[] = [
  { 
    id: 'g9-math-core', 
    title: 'Grade 9 Mathematics', 
    code: 'MATH-G9-C', 
    grade: Grade.G9, 
    stream: Stream.GENERAL, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('math', 1509228468517), 
    description: 'Foundational algebra, geometry, sets, and real numbers for Grade 9 national curriculum.', 
    instructor: 'Abebe Bikila', 
    instructorEmail: 'abebe.b@iftu.edu.et', 
    subject: 'Mathematics', 
    lessons: [
      { id: 'm9-l1', title: 'Set Theory & Real Numbers', duration: '25m', content: 'Comprehensive guide to sets and real number systems.', type: 'video', contentType: 'video', videoUrl: 'https://www.youtube.com/watch?v=5UfG_5iK_N8' },
      { id: 'm9-l2', title: 'Linear Equations & Inequalities', duration: '30m', content: 'Solving single and multi-variable linear equations.', type: 'reading', contentType: 'reading' }
    ]
  },
  { 
    id: 'g10-chem-core', 
    title: 'Grade 10 Chemistry & Energy', 
    code: 'CHEM-G10-C', 
    grade: Grade.G10, 
    stream: Stream.GENERAL, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('chemistry', 1532187863470), 
    description: 'Chemical reactions, periodic trends, stoichiometry, and organic chemistry foundations.', 
    instructor: 'Dr. Meron Tadesse', 
    instructorEmail: 'meron.t@iftu.edu.et', 
    subject: 'Chemistry', 
    lessons: [
      { id: 'c10-l1', title: 'Periodic Table & Atomic Structure', duration: '35m', content: 'Electron configuration and periodic trends.', type: 'video', contentType: 'video' }
    ]
  },
  { 
    id: 'g11-phys-core', 
    title: 'Grade 11 Core Physics', 
    code: 'PHYS-G11-C', 
    grade: Grade.G11, 
    stream: Stream.NATURAL_SCIENCE, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('physics', 1532094349884), 
    description: 'Foundational mechanics, vectors, and thermodynamics required for national stem streams.', 
    instructor: 'Dr. Tesfaye Wolde', 
    instructorEmail: 'dr.tesfaye@iftu.edu.et', 
    subject: 'Physics', 
    lessons: [
      { id: 'p11-l1', title: 'Kinematics & Vector Algebra', duration: '20m', content: 'Linear motion and 2D vector resolution basics.', type: 'video', contentType: 'video', videoUrl: 'https://www.youtube.com/watch?v=5UfG_5iK_N8' },
      { id: 'p11-l2', title: 'Newtonian Dynamics', duration: '40m', content: 'Forces, friction, and momentum conservation.', type: 'reading', contentType: 'reading' }
    ]
  },
  { 
    id: 'g11-hist-soc', 
    title: 'Grade 11 Ethiopian & World History', 
    code: 'HIST-G11-S', 
    grade: Grade.G11, 
    stream: Stream.SOCIAL_SCIENCE, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('history', 1461360370897), 
    description: 'Detailed study of Ethiopian state formation, African pan-nationalism, and world history.', 
    instructor: 'Ato Kassahun Tessema', 
    instructorEmail: 'kassahun.t@iftu.edu.et', 
    subject: 'History', 
    lessons: [
      { id: 'h11-l1', title: 'Ancient Horn of Africa Civilizations', duration: '30m', content: 'Aksumite kingdom and early trade networks.', type: 'reading', contentType: 'reading' }
    ]
  },
  { 
    id: 'g12-phys-adv', 
    title: 'Grade 12 Advanced Physics (EAES Prep)', 
    code: 'PHYS-G12-A', 
    grade: Grade.G12, 
    stream: Stream.NATURAL_SCIENCE, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('quantum', 1451810166861), 
    description: 'Quantum mechanics, electromagnetism, and modern physics for EAES National Examinations.', 
    instructor: 'Dr. Tesfaye Wolde', 
    instructorEmail: 'dr.tesfaye@iftu.edu.et', 
    subject: 'Physics', 
    prerequisites: ['g11-phys-core'],
    lessons: [
      { id: 'p12-l1', title: 'Electromagnetic Induction & Quantum Duality', duration: '45m', content: 'Advanced wave-particle duality and Faraday laws.', type: 'reading', contentType: 'reading', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
    ]
  },
  { 
    id: 'g12-ict-core', 
    title: 'Grade 12 Digital Sovereignty & ICT', 
    code: 'ICT-G12-C', 
    grade: Grade.G12, 
    stream: Stream.NATURAL_SCIENCE, 
    level: EducationLevel.SECONDARY, 
    thumbnail: getThumb('technology', 1518770660439), 
    description: 'Computerized networks, database systems, cybersecurity, and software engineering basics.', 
    instructor: 'Eng. Worku Alamu', 
    instructorEmail: 'worku.a@iftu.edu.et', 
    subject: 'ICT', 
    lessons: [
      { id: 'ict12-l1', title: 'Database Management Systems & SQL', duration: '35m', content: 'Relational data structures, keys, and cloud databases.', type: 'video', contentType: 'video' }
    ]
  },
  { 
    id: 'tvet-auto-l3', 
    title: 'Automotive Systems L3', 
    code: 'AUTO-L3', 
    grade: Grade.TVET_LEVEL_3, 
    stream: Stream.GENERAL, 
    level: EducationLevel.TVET, 
    thumbnail: getThumb('car', 1511919884224), 
    description: 'Advanced engine diagnostics, electronic control units, and hybrid vehicle maintenance.', 
    instructor: 'Kebede J.', 
    instructorEmail: 'kebede.j@iftu.edu.et', 
    subject: 'Automotive', 
    lessons: [
      { id: 'auto-l3-oral', title: 'Technical Interview: Hybrid Safety', duration: '15m', content: 'Participate in a live oral examination with an AI Auditor regarding High-Voltage safety protocols.', type: 'quiz', contentType: 'quiz' }
    ] 
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'exam-eaes-nat-g12',
    title: 'Grade 12 National EAES Simulation Exam',
    courseCode: 'EAES-G12-NAT',
    grade: Grade.G12,
    stream: Stream.NATURAL_SCIENCE,
    academicYear: CURRENT_YEAR,
    durationMinutes: 90,
    totalPoints: 100,
    status: 'published',
    type: 'mock-eaes',
    semester: 2,
    subject: 'General Science & Mathematics',
    categories: ['Physics', 'Mathematics', 'Chemistry'],
    questions: [
      { id: 'q12-1', text: 'Which equation represents Einstein\'s photoelectric effect relation?', type: 'multiple-choice', options: ['E = mc²', 'hf = Φ + KE_max', 'F = ma', 'pV = nRT'], correctAnswer: 1, points: 25, category: 'Physics' },
      { id: 'q12-2', text: 'What is the derivative of f(x) = 4x³ - 5x + 7 with respect to x?', type: 'multiple-choice', options: ['12x² - 5', '12x³ - 5x', '4x² - 5', '12x² + 7'], correctAnswer: 0, points: 25, category: 'Mathematics' },
      { id: 'q12-3', text: 'Which acid is predominantly found in battery fluid?', type: 'multiple-choice', options: ['Hydrochloric Acid', 'Sulfuric Acid', 'Nitric Acid', 'Acetic Acid'], correctAnswer: 1, points: 25, category: 'Chemistry' },
      { id: 'q12-4', text: 'What is the speed of electromagnetic waves in a vacuum?', type: 'multiple-choice', options: ['3 x 10^8 m/s', '3 x 10^6 m/s', '1.5 x 10^8 m/s', '340 m/s'], correctAnswer: 0, points: 25, category: 'Physics' }
    ]
  },
  {
    id: 'exam-math-g9',
    title: 'Grade 9 Mathematics Semester Mock',
    courseCode: 'MATH-G9',
    grade: Grade.G9,
    stream: Stream.GENERAL,
    academicYear: CURRENT_YEAR,
    durationMinutes: 60,
    totalPoints: 50,
    status: 'published',
    type: 'mock-eaes',
    semester: 1,
    subject: 'Mathematics',
    categories: ['Algebra', 'Geometry'],
    questions: [
      { id: 'q9m1', text: 'Solve for x: 3x - 12 = 0.', type: 'multiple-choice', options: ['2', '3', '4', '6'], correctAnswer: 2, points: 25, category: 'Algebra' },
      { id: 'q9m2', text: 'Which of the following numbers is prime?', type: 'multiple-choice', options: ['4', '9', '13', '15'], correctAnswer: 2, points: 25, category: 'Algebra' }
    ]
  }
];

export const MOCK_NEWS = [
  { id: 'n1', date: `Feb 22, ${CURRENT_YEAR}`, tag: 'Infrastructure', title: 'IFTU National Server Cluster Upgraded', summary: 'Improved latency for remote proctoring.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=600', content: 'The upgrade ensures stable connections for students in all regions.' }
];

export const SUMMER_STATS = [
  { label: 'ACTIVE LEARNERS', value: '450K+', color: '#3b82f6', icon: <Users size={48} /> },
  { label: 'MODULES COMPLETED', value: '1.2M', color: '#009b44', icon: <CheckSquare size={48} /> },
  { label: 'SYSTEM UPTIME', value: '99.9%', color: '#ffcd00', icon: <Zap size={48} /> },
  { label: 'EXAM INTEGRITY', value: '100%', color: '#ef3340', icon: <Shield size={48} /> }
];

export const SUMMER_ACTIVITIES = [
  { title: 'STEM Innovation Fair', date: 'August 15', desc: 'National exhibition of student projects.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600', tag: 'Innovation' },
  { title: 'Digital Bootcamps', date: 'July - Aug', desc: 'Coding and engineering for TVET.', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600', tag: 'Skills' }
];
