export interface ModelFormData {
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

  // Profile & Experience
  experience: string;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  waist: string;
  hips: string;
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
  selfie: File | null; // ✅ Add this new field
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface ModelRegistrationProps {
  currentStep: number;
  formData: ModelFormData;
  setFormData: React.Dispatch<React.SetStateAction<ModelFormData>>;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
