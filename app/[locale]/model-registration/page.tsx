"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Footer from "../../components/footer";

export default function ModelRegistration() {
  const t = useTranslations();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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

    // Profile & Experience
    experience: "",
    height: "",
    weight: "",
    hairColor: "",
    eyeColor: "",
    waist: "",
    hips: "",
    photo: null as File | null,
    additionalPhotos: [] as File[],
    socialMedia: {
      instagram: "",
      facebook: "",
      twitter: "",
      linkedin: "",
    },

    // Document Verification
    documentIssuerCountry: "",
    documentType: "",
    documentFront: null as File | null,
    documentBack: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const africanCountries = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Congo",
    "Côte d'Ivoire",
    "Democratic Republic of the Congo",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "São Tomé and Príncipe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ];

  const hairColors = [
    "Black",
    "Brown",
    "Blonde",
    "Red",
    "Auburn",
    "Gray/Silver",
    "Other",
  ];
  const eyeColors = [
    "Brown",
    "Blue",
    "Green",
    "Hazel",
    "Gray",
    "Amber",
    "Other",
  ];
  const documentTypes = ["National ID Card", "Passport", "Driver's License"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const handleMultipleFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length <= 5) {
      setFormData((prev) => ({
        ...prev,
        additionalPhotos: files,
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startCamera = () => {
    setCameraActive(true);
  };

  const stopCamera = () => {
    setCameraActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Handle successful submission
    }, 2000);
  };

  const steps = [
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
      title: t("modelRegistration.steps.livenessVerification.title"),
      description: t(
        "modelRegistration.steps.livenessVerification.description"
      ),
    },
  ];

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
            <span className="font-dancing text-5xl text-rose-300"> Models</span>
            <span className="font-dancing text-5xl text-gray-400"> & </span>
            <span className="font-dancing text-5xl text-pink-600">
              {" "}
              Hostesses
            </span>{" "}
            {t("modelRegistration.title")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("modelRegistration.subtitle")}
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
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("modelRegistration.form.personalInfo.title")}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.lastName")}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.username")}
                  </label>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.whatsapp")}
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.dateOfBirth")}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.gender")}
                  </label>
                  <select
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {t(
                        "modelRegistration.form.personalInfo.genderOptions.select"
                      )}
                    </option>
                    <option value="Female">
                      {t(
                        "modelRegistration.form.personalInfo.genderOptions.female"
                      )}
                    </option>
                    <option value="Male">
                      {t(
                        "modelRegistration.form.personalInfo.genderOptions.male"
                      )}
                    </option>
                    <option value="Other">
                      {t(
                        "modelRegistration.form.personalInfo.genderOptions.other"
                      )}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.nationality")}
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    required
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.personalInfo.street")}
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("modelRegistration.form.personalInfo.city")}
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t(
                        "modelRegistration.form.personalInfo.residenceCountry"
                      )}
                    </label>
                    <select
                      name="residenceCountry"
                      required
                      value={formData.residenceCountry}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      <option value="">
                        {t("modelRegistration.form.personalInfo.selectCountry")}
                      </option>
                      {africanCountries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile & Experience */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("modelRegistration.form.profileExperience.title")}
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modelRegistration.form.profileExperience.experience")}
                </label>
                <textarea
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={t(
                    "modelRegistration.form.profileExperience.experiencePlaceholder"
                  )}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.height")}
                  </label>
                  <input
                    type="number"
                    name="height"
                    required
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.weight")}
                  </label>
                  <input
                    type="number"
                    name="weight"
                    required
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.hairColor")}
                  </label>
                  <select
                    name="hairColor"
                    required
                    value={formData.hairColor}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {t(
                        "modelRegistration.form.profileExperience.selectHairColor"
                      )}
                    </option>
                    {hairColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.eyeColor")}
                  </label>
                  <select
                    name="eyeColor"
                    required
                    value={formData.eyeColor}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {t(
                        "modelRegistration.form.profileExperience.selectEyeColor"
                      )}
                    </option>
                    {eyeColors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.waist")}
                  </label>
                  <input
                    type="number"
                    name="waist"
                    required
                    value={formData.waist}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("modelRegistration.form.profileExperience.hips")}
                  </label>
                  <input
                    type="number"
                    name="hips"
                    required
                    value={formData.hips}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("modelRegistration.form.profileExperience.profilePhoto")}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => handleFileChange(e, "photo")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t(
                    "modelRegistration.form.profileExperience.additionalPhotos"
                  )}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleMultipleFilesChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t(
                    "modelRegistration.form.profileExperience.additionalPhotosDescription"
                  )}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {t("modelRegistration.form.profileExperience.socialMedia")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("modelRegistration.form.profileExperience.instagram")}
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia.instagram}
                      onChange={(e) =>
                        handleSocialMediaChange("instagram", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("modelRegistration.form.profileExperience.facebook")}
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia.facebook}
                      onChange={(e) =>
                        handleSocialMediaChange("facebook", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("modelRegistration.form.profileExperience.twitter")}
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia.twitter}
                      onChange={(e) =>
                        handleSocialMediaChange("twitter", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("modelRegistration.form.profileExperience.linkedin")}
                    </label>
                    <input
                      type="url"
                      value={formData.socialMedia.linkedin}
                      onChange={(e) =>
                        handleSocialMediaChange("linkedin", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Document Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("modelRegistration.form.documentVerification.title")}
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium mb-2">
                  {t("modelRegistration.form.documentVerification.uploadInfo")}
                </p>
                <p className="text-blue-700 text-sm">
                  {t(
                    "modelRegistration.form.documentVerification.acceptedDocuments"
                  )}
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800 font-medium mb-2">
                  {t("modelRegistration.form.documentVerification.important")}
                </p>
                <ul className="text-red-700 text-sm space-y-1">
                  {t
                    .raw(
                      "modelRegistration.form.documentVerification.importantPoints"
                    )
                    .map((point: string, index: number) => (
                      <li key={index}>• {point}</li>
                    ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(
                      "modelRegistration.form.documentVerification.documentIssuerCountry"
                    )}
                  </label>
                  <select
                    name="documentIssuerCountry"
                    required
                    value={formData.documentIssuerCountry}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {t("modelRegistration.form.personalInfo.selectCountry")}
                    </option>
                    {africanCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(
                      "modelRegistration.form.documentVerification.documentType"
                    )}
                  </label>
                  <select
                    name="documentType"
                    required
                    value={formData.documentType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  >
                    <option value="">
                      {t(
                        "modelRegistration.form.documentVerification.selectDocumentType"
                      )}
                    </option>
                    {documentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(
                      "modelRegistration.form.documentVerification.frontOfDocument"
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => handleFileChange(e, "documentFront")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t(
                      "modelRegistration.form.documentVerification.backOfDocument"
                    )}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => handleFileChange(e, "documentBack")}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Liveness Verification */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {t("modelRegistration.form.livenessVerification.title")}
              </h2>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800">
                  {t("modelRegistration.form.livenessVerification.description")}
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800 font-medium">
                  {t(
                    "modelRegistration.form.livenessVerification.cameraRequired"
                  )}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-gray-100 rounded-lg p-8 mb-6">
                  {!cameraActive ? (
                    <div>
                      <div className="text-6xl mb-4">📷</div>
                      <p className="text-gray-600 mb-4">
                        {t(
                          "modelRegistration.form.livenessVerification.startCamera"
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
                      >
                        {t(
                          "modelRegistration.form.livenessVerification.startCameraButton"
                        )}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-6xl mb-4">✅</div>
                      <p className="text-green-600 mb-4">
                        {t(
                          "modelRegistration.form.livenessVerification.verifying"
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                      >
                        {t(
                          "modelRegistration.form.livenessVerification.stopCameraButton"
                        )}
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    <strong>
                      {t(
                        "modelRegistration.form.livenessVerification.privacyNote"
                      )}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                {t("modelRegistration.form.navigation.previous")}
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-rose-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200"
              >
                {t("modelRegistration.form.navigation.next")}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="ml-auto bg-rose-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
