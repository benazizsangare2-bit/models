// components/LivenessVerification.tsx (or same path)
"use client";
import { useRef, useState } from "react";
import { ModelRegistrationProps } from "./types";
import { useTranslations } from "next-intl";

export default function LivenessVerification({
  formData,
  setFormData,
}: ModelRegistrationProps) {
  const t = useTranslations();
  const [error, setError] = useState<string | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, etc.)");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setError(null);

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewURL(url);

    // Update form data
    setFormData((prev) => ({
      ...prev,
      selfie: file,
    }));
  };

  const removeFile = () => {
    if (previewURL) {
      URL.revokeObjectURL(previewURL);
    }
    setPreviewURL(null);
    setFormData((prev) => ({
      ...prev,
      selfie: null,
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {t("modelRegistration.form.livenessVerification.title") ||
          "Identity Verification"}
      </h2>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">📸</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              Take a Selfie with Your ID Document
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              Please upload a clear photo of yourself holding your ID document
              next to your face. This helps us verify your identity.
            </p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Hold your ID document next to your face</li>
              <li>• Ensure both your face and the ID are clearly visible</li>
              <li>• Use good lighting</li>
              <li>• File must be JPG, PNG, or similar image format</li>
              <li>• Maximum file size: 10MB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* File Upload */}
      <div className="text-center">
        {!previewURL ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-600 mb-4">
              Upload your selfie with ID document
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="selfie-upload"
            />
            <label
              htmlFor="selfie-upload"
              className="bg-rose-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-rose-600 transition-colors duration-200 inline-block"
            >
              Choose Photo
            </label>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-green-800 font-medium mb-4">
              Photo uploaded successfully!
            </p>
            <img
              src={previewURL}
              alt="Selfie with ID preview"
              className="mx-auto rounded-lg max-w-xs mb-4 border-2 border-green-300"
            />
            <div className="space-x-2">
              <button
                onClick={removeFile}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Remove Photo
              </button>
              <label
                htmlFor="selfie-upload"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200 inline-block"
              >
                Change Photo
              </label>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="selfie-upload"
            />
          </div>
        )}
      </div>

      {/* Validation Message */}
      {!formData.selfie && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 text-sm">
            <strong>Required:</strong> Please upload a selfie with your ID
            document to complete your verification.
          </p>
        </div>
      )}

      {/* Privacy Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800 text-sm">
          <strong>Privacy Note:</strong> Your photo will be securely stored and
          used only for identity verification purposes. We do not share your
          personal information with third parties.
        </p>
      </div>
    </div>
  );
}
