"use client";

import { useState } from "react";
import Image from "next/image";

interface Model {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  whatsapp: string;
  date_of_birth: string;
  gender: string;
  nationality: string;
  street: string;
  city: string;
  residence_country: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_phone: string;
  height: string;
  weight: string;
  shoe_size: string;
  hair_color: string;
  eye_color: string;
  photo: string;
  additional_photos: string[];
  social_instagram: string;
  social_facebook: string;
  social_twitter: string;
  social_linkedin: string;
  document_number: string;
  document_issuer_country: string;
  document_type: string;
  document_front: string;
  document_back: string;
  selfie_with_id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
}

interface ModelCardProps {
  model: Model;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isActionLoading?: boolean;
}

export default function ModelCard({
  model,
  onView,
  onApprove,
  onReject,
  onDelete,
  onEdit,
  isActionLoading = false,
}: ModelCardProps) {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getImageUrl = (photo: string) => {
    if (!photo) return "/Images/models/default.jpg";
    if (photo.startsWith("http")) return photo;
    return `http://192.168.137.223:6060${
      photo.startsWith("/") ? "" : "/"
    }${photo}`;
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
            {!imageError ? (
              <Image
                src={getImageUrl(model.photo)}
                alt={`${model.first_name} ${model.last_name}`}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <span className="text-2xl">👤</span>
              </div>
            )}
          </div>
        </div>

        {/* Model Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {model.first_name} {model.last_name}
              </h3>
              <p className="text-sm text-gray-600">@{model.username}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  model.status
                )}`}
              >
                {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Email:</span> {model.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {model.whatsapp}
            </div>
            <div>
              <span className="font-medium">Location:</span> {model.city},{" "}
              {model.residence_country}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {model.gender}
            </div>
            <div>
              <span className="font-medium">Nationality:</span>{" "}
              {model.nationality}
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span>{" "}
              {new Date(model.date_of_birth).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Height:</span>{" "}
              {model.height || "N/A"}
            </div>
            <div>
              <span className="font-medium">Weight:</span>{" "}
              {model.weight || "N/A"}
            </div>
            <div>
              <span className="font-medium">Hair Color:</span>{" "}
              {model.hair_color || "N/A"}
            </div>
            <div>
              <span className="font-medium">Eye Color:</span>{" "}
              {model.eye_color || "N/A"}
            </div>
            <div>
              <span className="font-medium">Document Type:</span>{" "}
              {model.document_type}
            </div>
            <div>
              <span className="font-medium">Instagram:</span>{" "}
              {model.social_instagram ? "@" + model.social_instagram : "N/A"}
            </div>
            <div>
              <span className="font-medium">Facebook:</span>{" "}
              {model.social_facebook || "N/A"}
            </div>
            <div>
              <span className="font-medium">Twitter:</span>{" "}
              {model.social_twitter || "N/A"}
            </div>
            <div>
              <span className="font-medium">LinkedIn:</span>{" "}
              {model.social_linkedin || "N/A"}
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Registered: {new Date(model.created_at).toLocaleDateString()}
          </div>

          {/* Document and Selfie Images */}
          <div className="mt-3 flex space-x-2">
            {model.document_front && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(model.document_front)}
                  alt="Document Front"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {model.document_back && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(model.document_back)}
                  alt="Document Back"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {model.selfie_with_id && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(model.selfie_with_id)}
                  alt="Selfie with ID"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {model.additional_photos && model.additional_photos.length > 0 && (
              <div className="relative w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(model.additional_photos[0])}
                  alt="Additional Photo"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
                {model.additional_photos.length > 1 && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    +{model.additional_photos.length - 1}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex-shrink-0">
          <div className="flex flex-col space-y-2">
            <button
              onClick={onView}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              View Details
            </button>

            {model.status === "pending" && (
              <>
                <button
                  onClick={onApprove}
                  disabled={isActionLoading}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isActionLoading ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={onReject}
                  disabled={isActionLoading}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isActionLoading ? "Processing..." : "Reject"}
                </button>
              </>
            )}

            <button
              onClick={onEdit}
              className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Edit
            </button>

            <button
              onClick={onDelete}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
