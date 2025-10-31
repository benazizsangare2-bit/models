"use client";

import { useState } from "react";
import Image from "next/image";

interface Hostess {
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
  status: "pending" | "approved" | "rejected";
  registration_step: boolean;
  deleted: boolean;
  created_at: string;
  updated_at: string;

  emergency_contact: {
    name: string;
    relationship: string;
    phone: string;
  };

  user_info: {
    fullname: string;
    email: string;
    phone: string;
  };
  experience: {
    work_experience: string;
    languages: string;
    skills: string;
    availability: string;
    preferred_events: string;
    previous_hostess_work: string;
    reference_contact: string;
    height: string;
    weight: string;
    hair_color: string;
    eye_color: string;
    photo: string | string[]; // Change this to accept both string and array
    social_instagram: string;
    social_facebook: string;
    social_twitter: string;
    social_linkedin: string;
  };
  documents: {
    document_issuer_country: string;
    document_type: string;
    document_front: string;
    document_back: string;
  };
  identity_check: {
    selfie_with_id: string;
    verified: boolean;
  };
}

interface HostessCardProps {
  hostess: Hostess;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
  onEdit: () => void;
  isActionLoading?: boolean;
}

export default function HostessCard({
  hostess,
  onView,
  onApprove,
  onReject,
  onDelete,
  onEdit,
  isActionLoading = false,
}: HostessCardProps) {
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

  const getImageUrl = (photo: string | string[]) => {
    if (!photo) return "/Images/models/default.jpg";

    let photoPath = "";

    // Case 1: array
    if (Array.isArray(photo)) {
      photoPath = photo[0];
    }
    // Case 2: serialized JSON string like '{"uploads/...jpg","uploads/...jpg"}'
    else if (photo.startsWith("{")) {
      try {
        const parsed = JSON.parse(photo.replace(/'/g, '"')); // make sure JSON is valid
        photoPath = Array.isArray(parsed) ? parsed[0] : parsed;
      } catch {
        // fallback: clean manually
        photoPath = photo.split(",")[0].replace(/[{}"]/g, "").trim();
      }
    }
    // Case 3: normal string
    else {
      photoPath = photo;
    }

    if (photoPath.startsWith("http")) return photoPath;
    // return `https://modelshostesses.com/api${ photo.startsWith("/") ? "" : "/" }${photo}`;
    return `https://modelshostesses.com/api${
      photoPath.startsWith("/") ? "" : "/"
    }${photoPath}`;
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
            {!imageError ? (
              <Image
                src={getImageUrl(hostess.experience.photo)}
                alt={`${hostess.first_name} ${hostess.last_name}`}
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

        {/* Hostess Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {hostess.first_name} {hostess.last_name}
              </h3>
              <p className="text-sm text-gray-600">@{hostess.username}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  hostess.status
                )}`}
              >
                {hostess.status.charAt(0).toUpperCase() +
                  hostess.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-medium">Email:</span> {hostess.email}
            </div>
            <div>
              <span className="font-medium">Phone:</span> {hostess.whatsapp}
            </div>
            <div>
              <span className="font-medium">Location:</span> {hostess.city},{" "}
              {hostess.residence_country}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {hostess.gender}
            </div>
            <div>
              <span className="font-medium">Nationality:</span>{" "}
              {hostess.nationality}
            </div>
            <div>
              <span className="font-medium">Date of Birth:</span>{" "}
              {new Date(hostess.date_of_birth).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Height:</span>{" "}
              {hostess.experience.height || "N/A"}
            </div>
            <div>
              <span className="font-medium">Weight:</span>{" "}
              {hostess.experience.weight || "N/A"}
            </div>
            <div>
              <span className="font-medium">Hair Color:</span>{" "}
              {hostess.experience.hair_color || "N/A"}
            </div>
            <div>
              <span className="font-medium">Eye Color:</span>{" "}
              {hostess.experience.eye_color || "N/A"}
            </div>
            <div>
              <span className="font-medium">Document Type:</span>{" "}
              {hostess.documents.document_type}
            </div>
            <div>
              <span className="font-medium">Instagram:</span>{" "}
              {hostess.experience.social_instagram
                ? "@" + hostess.experience.social_instagram
                : "N/A"}
            </div>
            <div>
              <span className="font-medium">Facebook:</span>{" "}
              {hostess.experience.social_facebook || "N/A"}
            </div>
            <div>
              <span className="font-medium">Twitter:</span>{" "}
              {hostess.experience.social_twitter || "N/A"}
            </div>
            <div>
              <span className="font-medium">LinkedIn:</span>{" "}
              {hostess.experience.social_linkedin || "N/A"}
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Registered: {new Date(hostess.created_at).toLocaleDateString()}
          </div>

          {/* Document and Selfie Images */}
          <div className="mt-3 flex space-x-2">
            {hostess.documents.document_front && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(hostess.documents.document_front)}
                  alt="Document Front"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {hostess.documents.document_back && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(hostess.documents.document_back)}
                  alt="Document Back"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {hostess.identity_check.selfie_with_id && (
              <div className="w-16 h-12 rounded border overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(hostess.identity_check.selfie_with_id)}
                  alt="Selfie with ID"
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Additional Photos */}
            {hostess.experience.photo &&
              hostess.experience.photo.length > 0 && (
                <div className="relative w-16 h-12 rounded border overflow-hidden bg-gray-100">
                  <Image
                    src={getImageUrl(hostess.experience.photo)}
                    alt="Additional Photo"
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                  {hostess.experience.photo.length > 1 && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      +{hostess.experience.photo.length - 1}
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

            {hostess.status === "pending" && (
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
