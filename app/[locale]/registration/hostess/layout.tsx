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
    photo: null,
    additionalPhotos: [],
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hostessId, setHostessId] = useState<string | null>(null);

  // Initialize from localStorage and backend progress
  useEffect(() => {
    const storedId = localStorage.getItem("hostessId");
    const storedStep = localStorage.getItem("hostessCurrentStep");
    if (storedId) setHostessId(storedId);
    if (storedStep) setCurrentStep(parseInt(storedStep, 10));

    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://modelshostesses.com/api/api/hostesses/progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (data.hostess_id) {
          setHostessId(data.hostess_id);
          localStorage.setItem("hostessId", data.hostess_id);
        }
        if (data.current_step) {
          setCurrentStep(data.current_step);
          localStorage.setItem(
            "hostessCurrentStep",
            data.current_step.toString()
          );
        }
      })
      .catch(() => {
        // ignore, rely on local
      });
  }, []);

  const nextStep = async () => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token") || "";

      if (currentStep === 1) {
        // Create hostess
        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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
        if (!res.ok || !data.id)
          throw new Error(data.error || "Failed to create hostess");
        setHostessId(data.id);
        localStorage.setItem("hostessId", data.id);
        setCurrentStep(2);
        localStorage.setItem("hostessCurrentStep", "2");
        return;
      }

      if (currentStep === 2) {
        // Experience + profile & photos
        const id = hostessId || localStorage.getItem("hostessId") || "";
        if (!id) throw new Error("Missing hostess id");

        const fd = new FormData();
        fd.append("hostess_id", id);
        fd.append("work_experience", formData.workExperience);
        fd.append("languages", JSON.stringify(formData.languages));
        fd.append("skills", JSON.stringify(formData.skills));
        fd.append("availability", formData.availability);
        fd.append("preferred_events", JSON.stringify(formData.preferredEvents));
        fd.append("previous_hostess_work", formData.previousHostessWork);
        fd.append("references", formData.references);

        fd.append("height", formData.height);
        fd.append("weight", formData.weight);
        fd.append("hair_color", formData.hairColor);
        fd.append("eye_color", formData.eyeColor);
        if (formData.photo) fd.append("photo", formData.photo);
        formData.additionalPhotos.forEach((file) =>
          fd.append("additionalPhotos", file)
        );
        fd.append("social_instagram", formData.socialMedia.instagram);
        fd.append("social_facebook", formData.socialMedia.facebook);
        fd.append("social_twitter", formData.socialMedia.twitter);
        fd.append("social_linkedin", formData.socialMedia.linkedin);

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/experience",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to save experience");
        setCurrentStep(3);
        localStorage.setItem("hostessCurrentStep", "3");
        return;
      }

      if (currentStep === 3) {
        const id = hostessId || localStorage.getItem("hostessId") || "";
        if (!id) throw new Error("Missing hostess id");
        const fd = new FormData();
        fd.append("hostess_id", id);
        fd.append("documentIssuerCountry", formData.documentIssuerCountry);
        fd.append("documentType", formData.documentType);
        if (formData.documentFront)
          fd.append("documentFront", formData.documentFront);
        if (formData.documentBack)
          fd.append("documentBack", formData.documentBack);

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/documents",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          }
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.error || "Failed to upload documents");
        setCurrentStep(4);
        localStorage.setItem("hostessCurrentStep", "4");
        return;
      }

      if (currentStep === 4) {
        const id = hostessId || localStorage.getItem("hostessId") || "";
        if (!id) throw new Error("Missing hostess id");
        if (!formData.selfie) throw new Error("Please upload selfie with ID");
        const fd = new FormData();
        fd.append("hostess_id", id);
        fd.append("selfie_with_id", formData.selfie);

        const res = await fetch(
          "https://modelshostesses.com/api/api/hostesses/identity-check",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fd,
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed identity check");

        // Completed
        localStorage.removeItem("hostessId");
        localStorage.removeItem("hostessCurrentStep");
        alert("🎉 Hostess registration submitted successfully!");
        window.location.href = `/${locale}/account`;
        return;
      }
    } catch (err: any) {
      alert(err.message || "Submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      localStorage.setItem("hostessCurrentStep", newStep.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await nextStep();
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
