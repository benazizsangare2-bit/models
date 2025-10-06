"use client";

import { useTranslations } from "next-intl";
import { HostessRegistrationProps } from "./types";

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

const documentTypes = ["National ID Card", "Passport", "Driver's License"];

export default function DocumentVerification({
  formData,
  setFormData,
}: HostessRegistrationProps) {
  const t = useTranslations();

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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t("hostessRegistration.form.documentVerification.title")}
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800 font-medium mb-2">
          {t("hostessRegistration.form.documentVerification.uploadInfo")}
        </p>
        <p className="text-blue-700 text-sm">
          {t("hostessRegistration.form.documentVerification.acceptedDocuments")}
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-800 font-medium mb-2">
          {t("hostessRegistration.form.documentVerification.important")}
        </p>
        <ul className="text-red-700 text-sm space-y-1">
          {t
            .raw(
              "hostessRegistration.form.documentVerification.importantPoints"
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
              "hostessRegistration.form.documentVerification.documentIssuerCountry"
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
              {t("hostessRegistration.form.personalInfo.selectCountry")}
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
            {t("hostessRegistration.form.documentVerification.documentType")}
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
                "hostessRegistration.form.documentVerification.selectDocumentType"
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
            {t("hostessRegistration.form.documentVerification.frontOfDocument")}
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
            {t("hostessRegistration.form.documentVerification.backOfDocument")}
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
  );
}
