"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Footer from "../../../components/footer";
import PersonalInfo from "./personalinfo";
import WorkExperience from "./workexperience";
import DocumentVerification from "./documentverification";
import LivenessVerification from "./livenessverification";
import { HostessFormData, Step, HostessRegistrationProps } from "./types";

export default function HostessRegistrationLayout() {
  const t = useTranslations();
  const locale = useLocale();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hostessId, setHostessId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data
  const [formData, setFormData] = useState<HostessFormData>({
    // Personal Info
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    whatsapp: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    street: "",
    city: "",
    residenceCountry: "",

    // Work Experience & Skills
    workExperience: "",
    languages: [],
    skills: [],
    availability: "",
    preferredEvents: [],
    previousHostessWork: "",
    references: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phone: "",
    },

    // Profile & Appearance
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
    photo: [],
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },

    // Document Verification
    documentIssuerCountry: "",
    documentType: "",
    documentFront: null,
    documentBack: null,
    selfie: null,
  });

  // ✅ Load existing hostess ID & step if available
  useEffect(() => {
    const storedHostessId = localStorage.getItem("hostessId");
    const storedCurrentStep = localStorage.getItem("hostessCurrentStep");

    if (storedHostessId) setHostessId(storedHostessId);
    if (storedCurrentStep) {
      const stepNum = parseInt(storedCurrentStep, 10);
      if (stepNum >= 1 && stepNum <= 4) setCurrentStep(stepNum);
    }
  }, []);

  // ✅ Persist current step whenever it changes
  useEffect(() => {
    localStorage.setItem("hostessCurrentStep", currentStep.toString());
  }, [currentStep]);

  // ✅ Sync progress with backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Check if we already have local progress
    const storedStep = localStorage.getItem("hostessCurrentStep");
    const storedHostessId = localStorage.getItem("hostessId");

    // If we have local progress, use it and sync with backend in background
    if (storedStep && storedHostessId) {
      setCurrentStep(parseInt(storedStep, 10));
      setHostessId(storedHostessId);

      // Sync with backend in background without overriding local state
      fetch("https://modelshostesses.com/api/api/hostesses/progress", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            // Only update if backend has more progress than local
            if (
              data.current_step &&
              data.current_step > parseInt(storedStep, 10)
            ) {
              setCurrentStep(data.current_step);
              localStorage.setItem(
                "hostessCurrentStep",
                data.current_step.toString()
              );
            }
          }
        })
        .catch(() => {
          // Keep using local progress if backend fails
          console.log("Using local hostess progress as fallback");
        });
      return;
    }

    // If no local progress, check backend
    fetch("https://modelshostesses.com/api/api/hostesses/progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No hostess found");
        const data = await res.json();

        if (data.hostess_id) {
          localStorage.setItem("hostessId", data.hostess_id);
          localStorage.setItem(
            "hostessCurrentStep",
            data.current_step.toString()
          );
          setHostessId(data.hostess_id);
          setCurrentStep(data.current_step);
        }
      })
      .catch(() => {
        // No backend progress, start from step 1
        console.log("No backend hostess progress found, starting from step 1");
      });
  }, []);

  // ✅ Validation functions for each step
  const validateStep1 = (): boolean => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.username,
      formData.email,
      formData.whatsapp,
      formData.dateOfBirth,
      formData.gender,
      formData.nationality,
      formData.street,
      formData.city,
      formData.residenceCountry,
      formData.emergencyContact.name,
      formData.emergencyContact.relationship,
      formData.emergencyContact.phone,
    ];

    if (requiredFields.some((field) => !field || field.trim() === "")) {
      alert("Please fill in all required personal information fields.");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // WhatsApp validation (basic phone number check)
    // const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    // if (!phoneRegex.test(formData.whatsapp.replace(/[\s\-\(\)]/g, ""))) {
    //   alert("Please enter a valid WhatsApp number.");
    //   return false;
    // }

    return true;
  };

  const validateStep2 = (): boolean => {
    // Check required fields
    if (!formData.workExperience || !formData.availability) {
      alert("Please fill in work experience and availability fields.");
      return false;
    }

    // Check photo requirements (minimum 5 photos)
    if (formData.photo.length < 5) {
      alert("Minimum 5 photos are required for your profile.");
      return false;
    }

    // Check basic profile info
    if (
      !formData.height ||
      !formData.weight ||
      !formData.hairColor ||
      !formData.eyeColor
    ) {
      alert("Please fill in all profile and appearance fields.");
      return false;
    }

    return true;
  };

  const validateStep3 = (): boolean => {
    if (!formData.documentIssuerCountry || !formData.documentType) {
      alert("Please select document issuer country and document type.");
      return false;
    }

    if (!formData.documentFront) {
      alert("Please upload the front side of your document.");
      return false;
    }

    if (!formData.documentBack) {
      alert("Please upload the back side of your document.");
      return false;
    }

    return true;
  };

  const validateStep4 = (): boolean => {
    if (!formData.selfie) {
      alert("Please upload a selfie with your ID document.");
      return false;
    }
    return true;
  };

  // ✅ Go back
  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      localStorage.setItem("hostessCurrentStep", newStep.toString());
    }
  };

  // ✅ Start Over
  const startOver = () => {
    if (
      !confirm(
        "Are you sure you want to start over? Your progress will be lost."
      )
    )
      return;

    localStorage.removeItem("hostessId");
    localStorage.removeItem("hostessCurrentStep");
    setHostessId(null);
    setCurrentStep(1);

    // Reset form data
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      whatsapp: "",
      dateOfBirth: "",
      gender: "",
      nationality: "",
      street: "",
      city: "",
      residenceCountry: "",
      workExperience: "",
      languages: [],
      skills: [],
      availability: "",
      preferredEvents: [],
      previousHostessWork: "",
      references: "",
      emergencyContact: { name: "", relationship: "", phone: "" },
      height: "",
      weight: "",
      hairColor: "",
      eyeColor: "",
      photo: [],
      socialMedia: { instagram: "", facebook: "", twitter: "", linkedin: "" },
      documentIssuerCountry: "",
      documentType: "",
      documentFront: null,
      documentBack: null,
      selfie: null,
    });

    alert("Registration reset. You can now start fresh.");
  };

  // ✅ Submit handler (last step)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await nextStep();
  };

  // ✅ Next Step Function
  const nextStep = async () => {
    try {
      setIsSubmitting(true);

      // ✅ Step 1: Personal Info
      if (currentStep === 1) {
        if (!validateStep1()) {
          setIsSubmitting(false);
          return;
        }

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: JSON.stringify({
              first_name: formData.firstName,
              last_name: formData.lastName,
              username: formData.username,
              email: formData.email,
              whatsapp: formData.whatsapp,
              date_of_birth: formData.dateOfBirth,
              gender: formData.gender,
              nationality: formData.nationality,
              street: formData.street,
              city: formData.city,
              residence_country: formData.residenceCountry,
              emergency_contact_name: formData.emergencyContact.name,
              emergency_contact_relationship:
                formData.emergencyContact.relationship,
              emergency_contact_phone: formData.emergencyContact.phone,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok || !data.id) {
          console.error("❌ Step 1 error:", data);
          alert(data.error || "Failed to save personal info");
          setIsSubmitting(false);
          return;
        }

        // ✅ Success
        setHostessId(data.id);
        localStorage.setItem("hostessId", data.id);
        alert("✅ Step 1 completed! Proceeding to the next step...");

        // ✅ Move forward immediately
        setCurrentStep(2);
        localStorage.setItem("hostessCurrentStep", "2");
        return;
      }

      // ✅ Step 2: Work Experience & Profile
      if (currentStep === 2) {
        if (!validateStep2()) {
          setIsSubmitting(false);
          return;
        }

        const hostess_id = hostessId || localStorage.getItem("hostessId");
        if (!hostess_id) throw new Error("Missing hostess ID. Please restart.");

        const formDataObj = new FormData();
        formDataObj.append("hostess_id", hostess_id);
        formDataObj.append("work_experience", formData.workExperience);
        formDataObj.append("languages", JSON.stringify(formData.languages));
        formDataObj.append("skills", JSON.stringify(formData.skills));
        formDataObj.append("availability", formData.availability);
        formDataObj.append(
          "preferred_events",
          JSON.stringify(formData.preferredEvents)
        );
        formDataObj.append(
          "previous_hostess_work",
          formData.previousHostessWork
        );
        formDataObj.append("references", formData.references);
        formDataObj.append("height", formData.height);
        formDataObj.append("weight", formData.weight);
        formDataObj.append("hair_color", formData.hairColor);
        formDataObj.append("eye_color", formData.eyeColor);
        formDataObj.append("social_instagram", formData.socialMedia.instagram);
        formDataObj.append("social_facebook", formData.socialMedia.facebook);
        formDataObj.append("social_twitter", formData.socialMedia.twitter);
        formDataObj.append("social_linkedin", formData.socialMedia.linkedin);

        // Append photos
        if (formData.photo) {
          formData.photo.forEach((file) => formDataObj.append("photo", file));
        }

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/experience",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: formDataObj,
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save experience");

        alert("✅ Step 2 completed!");
        setCurrentStep(3);
        localStorage.setItem("hostessCurrentStep", "3");
        return;
      }

      // ✅ Step 3: Document Verification
      if (currentStep === 3) {
        if (!validateStep3()) {
          setIsSubmitting(false);
          return;
        }

        const hostess_id = hostessId || localStorage.getItem("hostessId");
        if (!hostess_id) throw new Error("Missing hostess ID. Please restart.");

        const formDataObj = new FormData();
        formDataObj.append("hostess_id", hostess_id);
        formDataObj.append(
          "documentIssuerCountry",
          formData.documentIssuerCountry
        );
        formDataObj.append("documentType", formData.documentType);
        if (formData.documentFront)
          formDataObj.append("documentFront", formData.documentFront);
        if (formData.documentBack)
          formDataObj.append("documentBack", formData.documentBack);

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/documents",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: formDataObj,
          }
        );

        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to upload documents");

        alert("✅ Step 3 completed!");
        setCurrentStep(4);
        localStorage.setItem("hostessCurrentStep", "4");
        return;
      }

      // ✅ Step 4: Identity Verification
      if (currentStep === 4) {
        if (!validateStep4()) {
          setIsSubmitting(false);
          return;
        }

        const hostess_id = hostessId || localStorage.getItem("hostessId");
        if (!hostess_id) throw new Error("Missing hostess ID. Please restart.");

        const formDataObj = new FormData();
        formDataObj.append("hostess_id", hostess_id);
        formDataObj.append("selfie_with_id", formData.selfie!);

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/identity-check",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
            body: formDataObj,
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed identity check");

        // ✅ Completed
        localStorage.removeItem("hostessId");
        localStorage.removeItem("hostessCurrentStep");
        alert("🎉 Hostess registration submitted successfully!");
        window.location.href = `/${locale}/account`;
        return;
      }
    } catch (err: any) {
      console.error("Error submitting step:", err);
      alert(err.message || "Network error, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps: Step[] = [
    {
      number: 1,
      title: t("hostessRegistration.steps.personalInfo.title"),
      description: t("hostessRegistration.steps.personalInfo.description"),
    },
    {
      number: 2,
      title: t("hostessRegistration.steps.workExperience.title"),
      description: t("hostessRegistration.steps.workExperience.description"),
    },
    {
      number: 3,
      title: t("hostessRegistration.steps.documentVerification.title"),
      description: t(
        "hostessRegistration.steps.documentVerification.description"
      ),
    },
    {
      number: 4,
      title: t("hostessRegistration.steps.livenessVerification.title"),
      description: t(
        "hostessRegistration.steps.livenessVerification.description"
      ),
    },
  ];

  const commonProps: HostessRegistrationProps = {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    isSubmitting,
    setIsSubmitting,
  };
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 font-delius">
          <Link
            href="/"
            className="inline-flex items-center text-rose-600 hover:text-rose-700 mb-4"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t("hostessRegistration.backToHome")}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="font-dancing text-5xl text-pink-600">
              {" "}
              Hostesses
            </span>{" "}
            {t("hostessRegistration.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("hostessRegistration.subtitle")}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 font-delius font-bold">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.number ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.number ? "bg-rose-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <p
                  className={`text-sm font-medium ${
                    currentStep === step.number
                      ? "text-rose-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-8 font-delius">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && <PersonalInfo {...commonProps} />}

          {/* Step 2: Work Experience */}
          {currentStep === 2 && <WorkExperience {...commonProps} />}

          {/* Step 3: Document Verification */}
          {currentStep === 3 && <DocumentVerification {...commonProps} />}

          {/* Step 4: Liveness Verification */}
          {currentStep === 4 && <LivenessVerification {...commonProps} />}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                {t("hostessRegistration.form.navigation.previous")}
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
              >
                {t("hostessRegistration.form.navigation.next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-rose-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("hostessRegistration.form.navigation.submitting")
                  : t("hostessRegistration.form.navigation.submitApplication")}
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
