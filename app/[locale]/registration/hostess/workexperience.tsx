"use client";

import { useTranslations } from "next-intl";
import { HostessRegistrationProps } from "./types";

const languages = [
  "English",
  "French",
  "Spanish",
  "Portuguese",
  "Arabic",
  "Swahili",
  "Hausa",
  "Yoruba",
  "Zulu",
  "Amharic",
  "Other",
];

const skills = [
  "Customer Service",
  "Event Management",
  "Public Speaking",
  "Multilingual",
  "Hospitality",
  "Marketing",
  "Sales",
  "Photography",
  "Social Media Management",
  "Team Leadership",
  "Problem Solving",
  "Time Management",
  "Other",
];

const eventTypes = [
  "Corporate Events",
  "Weddings",
  "Conferences",
  "Trade Shows",
  "Product Launches",
  "Charity Events",
  "Private Parties",
  "Cultural Events",
  "Sports Events",
  "Other",
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

const eyeColors = ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber", "Other"];

export default function WorkExperience({
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

  const handleArrayChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t("hostessRegistration.form.workExperience.title")}
      </h2>

      {/* Work Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.workExperience")}
        </label>
        <textarea
          name="workExperience"
          required
          value={formData.workExperience}
          onChange={handleInputChange}
          rows={4}
          placeholder={t(
            "hostessRegistration.form.workExperience.workExperiencePlaceholder"
          )}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      {/* Languages */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.languages")}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {languages.map((language) => (
            <label key={language} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.languages.includes(language)}
                onChange={(e) =>
                  handleArrayChange("languages", language, e.target.checked)
                }
                className="mr-2"
              />
              <span className="text-sm">{language}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.skills")}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skills.map((skill) => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.skills.includes(skill)}
                onChange={(e) =>
                  handleArrayChange("skills", skill, e.target.checked)
                }
                className="mr-2"
              />
              <span className="text-sm">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.availability")}
        </label>
        <select
          name="availability"
          required
          value={formData.availability}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">
            {t("hostessRegistration.form.workExperience.selectAvailability")}
          </option>
          <option value="Full-time">
            {t("hostessRegistration.form.workExperience.fullTime")}
          </option>
          <option value="Part-time">
            {t("hostessRegistration.form.workExperience.partTime")}
          </option>
          <option value="Weekends only">
            {t("hostessRegistration.form.workExperience.weekendsOnly")}
          </option>
          <option value="Evenings only">
            {t("hostessRegistration.form.workExperience.eveningsOnly")}
          </option>
          <option value="Flexible">
            {t("hostessRegistration.form.workExperience.flexible")}
          </option>
        </select>
      </div>

      {/* Preferred Events */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.preferredEvents")}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {eventTypes.map((event) => (
            <label key={event} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.preferredEvents.includes(event)}
                onChange={(e) =>
                  handleArrayChange("preferredEvents", event, e.target.checked)
                }
                className="mr-2"
              />
              <span className="text-sm">{event}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Previous Hostess Work */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.previousHostessWork")}
        </label>
        <textarea
          name="previousHostessWork"
          value={formData.previousHostessWork}
          onChange={handleInputChange}
          rows={3}
          placeholder={t(
            "hostessRegistration.form.workExperience.previousHostessWorkPlaceholder"
          )}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      {/* References */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.references")}
        </label>
        <textarea
          name="references"
          value={formData.references}
          onChange={handleInputChange}
          rows={3}
          placeholder={t(
            "hostessRegistration.form.workExperience.referencesPlaceholder"
          )}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      {/* Physical Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("hostessRegistration.form.workExperience.height")}
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
            {t("hostessRegistration.form.workExperience.weight")}
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
            {t("hostessRegistration.form.workExperience.hairColor")}
          </label>
          <select
            name="hairColor"
            required
            value={formData.hairColor}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">
              {t("hostessRegistration.form.workExperience.selectHairColor")}
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
            {t("hostessRegistration.form.workExperience.eyeColor")}
          </label>
          <select
            name="eyeColor"
            required
            value={formData.eyeColor}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          >
            <option value="">
              {t("hostessRegistration.form.workExperience.selectEyeColor")}
            </option>
            {eyeColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Photos */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("hostessRegistration.form.workExperience.profilePhoto")}
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
          {t("hostessRegistration.form.workExperience.additionalPhotos")}
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
            "hostessRegistration.form.workExperience.additionalPhotosDescription"
          )}
        </p>
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">
          {t("hostessRegistration.form.workExperience.socialMedia")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("hostessRegistration.form.workExperience.instagram")}
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
              {t("hostessRegistration.form.workExperience.facebook")}
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
              {t("hostessRegistration.form.workExperience.twitter")}
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
              {t("hostessRegistration.form.workExperience.linkedin")}
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
  );
}
