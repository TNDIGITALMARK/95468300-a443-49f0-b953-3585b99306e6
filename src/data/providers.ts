export interface Provider {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  experience: string;
  education: string[];
  languages: string[];
  availability: {
    [key: string]: string[]; // day: time slots
  };
  about: string;
  services: string[];
  consultationFee: number;
  nextAvailable: string;
  location: string;
  isOnline: boolean;
}

export interface Appointment {
  id: string;
  providerId: string;
  patientId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  type: 'video' | 'phone' | 'in-person';
  notes?: string;
  duration: number; // in minutes
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
}

export const mockProviders: Provider[] = [
  {
    id: 'dr-sarah-chen',
    name: 'Dr. Sarah Chen',
    title: 'MD, FACC',
    specialty: 'Cardiology',
    image: '/generated/dr-sarah-chen.jpg',
    rating: 4.9,
    reviewCount: 127,
    experience: '15 years',
    education: [
      'MD - Harvard Medical School',
      'Residency - Johns Hopkins Hospital',
      'Fellowship - Mayo Clinic'
    ],
    languages: ['English', 'Mandarin', 'Spanish'],
    availability: {
      'Monday': ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
      'Tuesday': ['9:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
      'Wednesday': ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'],
      'Thursday': ['9:00 AM', '10:00 AM', '1:00 PM', '2:00 PM'],
      'Friday': ['9:00 AM', '11:00 AM', '12:00 PM']
    },
    about: 'Dr. Chen specializes in preventive cardiology and heart disease management. She has over 15 years of experience treating patients with cardiovascular conditions and is board-certified in internal medicine and cardiology.',
    services: [
      'Heart Disease Consultation',
      'Preventive Cardiology',
      'Hypertension Management',
      'Cholesterol Management',
      'Cardiac Risk Assessment'
    ],
    consultationFee: 200,
    nextAvailable: '2024-01-15T09:00:00Z',
    location: 'San Francisco, CA',
    isOnline: true
  },
  {
    id: 'dr-michael-rodriguez',
    name: 'Dr. Michael Rodriguez',
    title: 'MD, MHPE',
    specialty: 'Family Medicine',
    image: '/generated/dr-michael-rodriguez.jpg',
    rating: 4.8,
    reviewCount: 203,
    experience: '12 years',
    education: [
      'MD - University of California, San Francisco',
      'Residency - UCSF Family Medicine',
      'MHPE - University of Illinois at Chicago'
    ],
    languages: ['English', 'Spanish'],
    availability: {
      'Monday': ['8:00 AM', '9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM'],
      'Tuesday': ['8:00 AM', '9:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
      'Wednesday': ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM'],
      'Thursday': ['8:00 AM', '9:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
      'Friday': ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM']
    },
    about: 'Dr. Rodriguez is a board-certified family medicine physician with expertise in comprehensive primary care for patients of all ages. He focuses on preventive care, chronic disease management, and building long-term patient relationships.',
    services: [
      'Annual Physical Exams',
      'Chronic Disease Management',
      'Preventive Care',
      'Minor Procedures',
      'Family Planning',
      'Wellness Counseling'
    ],
    consultationFee: 150,
    nextAvailable: '2024-01-14T08:00:00Z',
    location: 'Los Angeles, CA',
    isOnline: true
  },
  {
    id: 'dr-lisa-thompson',
    name: 'Dr. Lisa Thompson',
    title: 'MD, FAAD',
    specialty: 'Dermatology',
    image: '/generated/dr-lisa-thompson.jpg',
    rating: 4.9,
    reviewCount: 156,
    experience: '10 years',
    education: [
      'MD - Stanford University School of Medicine',
      'Residency - Stanford Dermatology',
      'Fellowship - Mohs Surgery, UCSF'
    ],
    languages: ['English', 'French'],
    availability: {
      'Monday': ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
      'Tuesday': ['9:00 AM', '10:00 AM', '1:00 PM', '3:00 PM'],
      'Wednesday': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
      'Thursday': ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
      'Friday': ['9:00 AM', '10:00 AM', '11:00 AM']
    },
    about: 'Dr. Thompson is a board-certified dermatologist specializing in medical dermatology, cosmetic procedures, and skin cancer prevention. She is committed to providing comprehensive skin care with a focus on early detection and treatment.',
    services: [
      'Skin Cancer Screening',
      'Acne Treatment',
      'Cosmetic Dermatology',
      'Psoriasis Management',
      'Eczema Treatment',
      'Mole Evaluation'
    ],
    consultationFee: 175,
    nextAvailable: '2024-01-16T10:00:00Z',
    location: 'Seattle, WA',
    isOnline: true
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-001',
    providerId: 'dr-sarah-chen',
    patientId: 'patient-001',
    date: '2024-01-20',
    time: '10:00 AM',
    status: 'scheduled',
    type: 'video',
    duration: 30,
    notes: 'Follow-up consultation for hypertension management'
  },
  {
    id: 'apt-002',
    providerId: 'dr-michael-rodriguez',
    patientId: 'patient-001',
    date: '2024-01-25',
    time: '2:00 PM',
    status: 'scheduled',
    type: 'video',
    duration: 45,
    notes: 'Annual physical examination'
  },
  {
    id: 'apt-003',
    providerId: 'dr-lisa-thompson',
    patientId: 'patient-001',
    date: '2024-01-18',
    time: '11:00 AM',
    status: 'completed',
    type: 'video',
    duration: 20,
    notes: 'Skin consultation completed successfully'
  }
];

export const mockPatient: Patient = {
  id: 'patient-001',
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '(555) 123-4567',
  dateOfBirth: '1985-06-15',
  emergencyContact: {
    name: 'Jane Doe',
    phone: '(555) 987-6543',
    relationship: 'Spouse'
  },
  medicalHistory: [
    'Hypertension (2019)',
    'Type 2 Diabetes (2020)',
    'High Cholesterol (2018)'
  ],
  allergies: [
    'Penicillin',
    'Shellfish'
  ],
  currentMedications: [
    'Lisinopril 10mg daily',
    'Metformin 500mg twice daily',
    'Atorvastatin 20mg daily'
  ]
};

export const specialties = [
  'All Specialties',
  'Cardiology',
  'Dermatology',
  'Family Medicine',
  'Internal Medicine',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics',
  'Neurology',
  'Obstetrics & Gynecology'
];

export const consultationTypes = [
  'All Types',
  'Video Call',
  'Phone Call',
  'In-Person'
];