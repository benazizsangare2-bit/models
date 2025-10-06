"use client";

import { useTranslations } from "next-intl";
import { ModelRegistrationProps } from "./types";

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

export default function ProfileExperience({
  formData,
  setFormData,
}: ModelRegistrationProps) {
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

  return (
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
              {t("modelRegistration.form.profileExperience.selectHairColor")}
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
              {t("modelRegistration.form.profileExperience.selectEyeColor")}
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
          {t("modelRegistration.form.profileExperience.additionalPhotos")}
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
  );
}
