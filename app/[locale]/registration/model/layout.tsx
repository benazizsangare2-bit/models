"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Footer from "../../../components/footer";
import PersonalInfo from "./personalinfo";
import ProfileExperience from "./profileexperience";
import DocumentVerification from "./documentverification";
import LivenessVerification from "./livenessverification";
import { ModelFormData, Step, ModelRegistrationProps } from "./types";

export default function ModelRegistrationLayout() {
  const t = useTranslations();

  // ✅ Load existing model ID & step if available
  const [modelId, setModelId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const locale = useLocale();
  // ✅ Load saved progress from localStorage
  useEffect(() => {
    const storedModelId = localStorage.getItem("modelId");
    const storedCurrentStep = localStorage.getItem("currentStep");

    if (storedModelId) setModelId(storedModelId);
    if (storedCurrentStep) {
      const stepNum = parseInt(storedCurrentStep, 10);
      if (stepNum >= 1 && stepNum <= 4) setCurrentStep(stepNum);
    }
  }, []);

  // ✅ Persist current step whenever it changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  // ✅ Default form data
  const [formData, setFormData] = useState<ModelFormData>({
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
    experience: "",
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
    waist: "",
    hips: "",
    photo: null,
    additionalPhotos: [],
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    documentIssuerCountry: "",
    documentType: "",
    documentFront: null,
    documentBack: null,
    selfie: null,
  });

  // ✅ Go back
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // ✅ Start Over
  const startOver = () => {
    if (
      !confirm(
        "Are you sure you want to start over? Your progress will be lost."
      )
    )
      return;
    localStorage.removeItem("modelId");
    localStorage.removeItem("currentStep");
    setModelId(null);
    setCurrentStep(1);
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
        const res = await fetch(
          "https://modelshostesses.com/api/api/models/create",
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
        setModelId(data.id);
        localStorage.setItem("modelId", data.id);
        alert("✅ Step 1 completed! Proceeding to the next step...");

        // ✅ Move forward immediately
        setCurrentStep(2);
        localStorage.setItem("currentStep", "2");

        console.log("➡️ Current step before:", currentStep);
        console.log("🗄️ Model ID:", modelId);
        console.log("🧾 Response data:", data);
        return;
      }

      // ✅ Step 2: Profile & Experience
      if (currentStep === 2) {
        const model_id = modelId || localStorage.getItem("modelId");
        if (!model_id) throw new Error("Missing model ID. Please restart.");

        const formDataObj = new FormData();
        formDataObj.append("model_id", model_id);
        formDataObj.append("experience", formData.experience);
        formDataObj.append("height", formData.height);
        formDataObj.append("weight", formData.weight);
        formDataObj.append("hair_color", formData.hairColor);
        formDataObj.append("eye_color", formData.eyeColor);
        formDataObj.append("waist", formData.waist);
        formDataObj.append("hips", formData.hips);

        if (formData.photo) formDataObj.append("photo", formData.photo);
        formData.additionalPhotos.forEach((file) =>
          formDataObj.append("additionalPhotos", file)
        );

        const res = await fetch(
          "https://modelshostesses.com/api/api/models/measurements",
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
          throw new Error(data.error || "Failed to save measurements");
        alert("✅ Step 2 completed!");

        // Move to next step
        setCurrentStep(3);
        localStorage.setItem("currentStep", "3");
        return;
      }

      // ✅ Step 3: Document Verification
      if (currentStep === 3) {
        const model_id = modelId || localStorage.getItem("modelId");
        const formDataObj = new FormData();
        formDataObj.append("model_id", model_id || "");
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
          "https://modelshostesses.com/api/api/models/documents",
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

        // Move to next step
        setCurrentStep(4);
        localStorage.setItem("currentStep", "4");
        return;
      }

      // ✅ Step 4: Identity Verification
      if (currentStep === 4) {
        // Validate that selfie is captured
        if (!formData.selfie) {
          alert(
            "Please upload a selfie with your ID document before submitting."
          );
          return;
        }

        const model_id = modelId || localStorage.getItem("modelId");
        const formDataObj = new FormData();
        formDataObj.append("model_id", model_id || "");
        formDataObj.append("selfie_with_id", formData.selfie);

        const res = await fetch(
          "https://modelshostesses.com/api/api/models/identity-check",
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
          throw new Error(
            data.error || "Failed to upload identity verification"
          );

        alert("🎉 Identity verification submitted successfully!");
        localStorage.removeItem("modelId");
        localStorage.removeItem("currentStep");
        setModelId(null);
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
      title: t("modelRegistration.steps.personalInfo.title"),
      description: t("modelRegistration.steps.personalInfo.description"),
    },
    {
      number: 2,
      title: t("modelRegistration.steps.profileExperience.title"),
      description: t("modelRegistration.steps.profileExperience.description"),
    },
    {
      number: 3,
      title: t("modelRegistration.steps.documentVerification.title"),
      description: t(
        "modelRegistration.steps.documentVerification.description"
      ),
    },
    {
      number: 4,
      title:
        t("modelRegistration.steps.identityVerification.title") ||
        "Identity Verification",
      description:
        t("modelRegistration.steps.identityVerification.description") ||
        "Upload a selfie with your ID document",
    },
  ];

  const commonProps: ModelRegistrationProps = {
    currentStep,
    formData,
    setFormData,
    nextStep,
    prevStep,
    isSubmitting,
    setIsSubmitting,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Check if we already have local progress
    const storedStep = localStorage.getItem("currentStep");
    const storedModelId = localStorage.getItem("modelId");

    // If we have local progress, use it and sync with backend in background
    if (storedStep && storedModelId) {
      setCurrentStep(parseInt(storedStep, 10));
      setModelId(storedModelId);

      // Sync with backend in background without overriding local state
      fetch("https://modelshostesses.com/api/api/models/progress", {
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
              localStorage.setItem("currentStep", data.current_step.toString());
            }
          }
        })
        .catch(() => {
          // Keep using local progress if backend fails
          console.log("Using local progress as fallback");
        });
      return;
    }

    // If no local progress, check backend
    fetch("https://modelshostesses.com/api/api/models/progress", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("No model found");
        const data = await res.json();

        if (data.model_id) {
          localStorage.setItem("modelId", data.model_id);
          localStorage.setItem("currentStep", data.current_step.toString());
          setModelId(data.model_id);
          setCurrentStep(data.current_step);
        }
      })
      .catch(() => {
        // No backend progress, start from step 1
        console.log("No backend progress found, starting from step 1");
      });
  }, []);

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
            {t("modelRegistration.backToHome")}
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="font-dancing text-5xl text-rose-300">Models </span>
            {t("modelRegistration.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("modelRegistration.subtitle")}
          </p>
        </div>

        {/* Steps */}
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
                  {currentStep > step.number ? "✓" : step.number}
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
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl p-8 font-delius">
          {currentStep === 1 && <PersonalInfo {...commonProps} />}
          {currentStep === 2 && <ProfileExperience {...commonProps} />}
          {currentStep === 3 && <DocumentVerification {...commonProps} />}
          {currentStep === 4 && <LivenessVerification {...commonProps} />}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  {t("modelRegistration.form.navigation.previous")}
                </button>
              )}
              {modelId && (
                <button
                  type="button"
                  onClick={startOver}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
                >
                  Start Over
                </button>
              )}
            </div>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="ml-auto bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 disabled:opacity-50"
              >
                {t("modelRegistration.form.navigation.next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 disabled:opacity-50"
              >
                {isSubmitting
                  ? t("modelRegistration.form.navigation.submitting")
                  : t("modelRegistration.form.navigation.submitApplication")}
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
