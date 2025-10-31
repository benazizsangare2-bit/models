export interface HostessFormData {
  // Personal Info
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  whatsapp: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  street: string;
  city: string;
  residenceCountry: string;

  // Work Experience & Skills
  workExperience: string;
  languages: string[];
  skills: string[];
  availability: string;
  preferredEvents: string[];
  previousHostessWork: string;
  references: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };

  // Profile & Appearance
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  photo: File[];
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };

  // Document Verification
  documentIssuerCountry: string;
  documentType: string;
  documentFront: File | null;
  documentBack: File | null;
  // Identity check (selfie holding ID)
  selfie: File | null;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface HostessRegistrationProps {
  currentStep: number;
  formData: HostessFormData;
  setFormData: React.Dispatch<React.SetStateAction<HostessFormData>>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
