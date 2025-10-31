"use client";
import { parsePhotoArray } from "../../admin/utils/photoUtils";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Model {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string; //    IMPLEMENT THE UPDATE FUNCTIONALITY AND ALSO THE APPROVE FUNCTIONALITY FOR HOSTESSES
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
  registration_step: number;
  deleted: boolean;
  created_at: string;
  updated_at: string;

  // Nested objects
  user_info: {
    fullname: string;
    email: string;
    phone: string;
  };

  measurements: {
    experience: string;
    height: number;
    weight: number;
    hips: number;
    waist: number;
    hair_color: string;
    eye_color: string;
    photo: string[]; // This might be a string array if multiple photos
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

interface ModelModalProps {
  model: Model;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (modelId: string, updatedData: Partial<Model>) => void;
}

export default function ModelModal({
  model,
  isOpen,
  onClose,
  onUpdate,
}: ModelModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedModel, setEditedModel] = useState<Model>(model);
  const [activeTab, setActiveTab] = useState<
    "personal" | "physical" | "documents" | "social"
  >("personal");

  useEffect(() => {
    setEditedModel(model);
  }, [model]);

  const getImageUrl = (photo: any) => {
    if (!photo) return "/Images/models/default.jpg";

    let photoPath = "";

    // Case 1: Already an array - take first element
    if (Array.isArray(photo)) {
      photoPath = photo[0];
    }
    // Case 2: String that might contain multiple photos
    else if (typeof photo === "string") {
      // Check if it's a JSON array string like '{"path1","path2"}'
      if (photo.startsWith("{")) {
        try {
          // Convert PostgreSQL array format to JSON array
          const jsonStr = photo
            .replace(/{/g, '["')
            .replace(/}/g, '"]')
            .replace(/,/g, '","');
          const parsed = JSON.parse(jsonStr);
          photoPath = Array.isArray(parsed) ? parsed[0] : parsed;
        } catch {
          // If JSON parsing fails, try comma separation
          photoPath = photo.split(",")[0].replace(/[{}"]/g, "").trim();
        }
      }
      // Case 3: Comma-separated string
      else if (photo.includes(",")) {
        photoPath = photo.split(",")[0].trim();
      }
      // Case 4: Single string
      else {
        photoPath = photo;
      }
    }

    // Clean up the path
    photoPath = photoPath.replace(/[{}"]/g, "").trim();

    if (!photoPath) return "/Images/models/default.jpg";
    if (photoPath.startsWith("http")) return photoPath;

    return `https://modelshostesses.com/api${
      photoPath.startsWith("/") ? "" : "/"
    }${photoPath}`;
  };

  const handleSave = () => {
    onUpdate(model.id, editedModel);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedModel(model);
    setIsEditing(false);
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "physical", label: "Physical Details", icon: "📏" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "social", label: "Social Media", icon: "📱" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Model" : "Model Details"}
          </h2>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-2 border-b">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-rose-500 text-rose-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "personal" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editedModel.first_name}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        first_name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editedModel.last_name}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        last_name: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editedModel.username}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        username: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editedModel.email}
                    onChange={(e) =>
                      setEditedModel({ ...editedModel, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={editedModel.whatsapp}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        whatsapp: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={editedModel.date_of_birth}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        date_of_birth: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    value={editedModel.gender}
                    onChange={(e) =>
                      setEditedModel({ ...editedModel, gender: e.target.value })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nationality
                  </label>
                  <input
                    type="text"
                    value={editedModel.nationality}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        nationality: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  value={`${editedModel.street}, ${editedModel.city}, ${editedModel.residence_country}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(", ");
                    setEditedModel({
                      ...editedModel,
                      street: parts[0] || "",
                      city: parts[1] || "",
                      residence_country: parts[2] || "",
                    });
                  }}
                  disabled={!isEditing}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  rows={2}
                />
              </div>

              {/* <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editedModel.emergency_contact_name}
                      onChange={(e) =>
                        setEditedModel({
                          ...editedModel,
                          emergency_contact_name: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={editedModel.emergency_contact_relationship}
                      onChange={(e) =>
                        setEditedModel({
                          ...editedModel,
                          emergency_contact_relationship: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editedModel.emergency_contact_phone}
                      onChange={(e) =>
                        setEditedModel({
                          ...editedModel,
                          emergency_contact_phone: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {activeTab === "physical" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={editedModel.measurements.height || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          height: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={editedModel.measurements.weight || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          weight: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hips (cm)
                  </label>
                  <input
                    type="number"
                    value={editedModel.measurements.hips || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          hips: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    value={editedModel.measurements.waist || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          waist: parseInt(e.target.value) || 0,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hair Color
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.hair_color || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          hair_color: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Eye Color
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.eye_color || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          eye_color: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.experience || ""}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          experience: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Profile Photos */}
              {(() => {
                // Parse the photos into an array using the imported function
                const photoArray = parsePhotoArray(
                  editedModel.measurements.photo
                );

                return photoArray.length > 0 ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Photos ({photoArray.length} photos)
                    </label>

                    {/* Display multiple photos in a grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {photoArray.map((photoPath, index) => (
                        <div
                          key={index}
                          className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-200 border group"
                        >
                          <Image
                            src={getImageUrl(photoPath)}
                            alt={`Profile photo ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                            onError={(e) => {
                              e.currentTarget.src =
                                "/Images/models/default.jpg";
                            }}
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center transition-opacity group-hover:opacity-0">
                            Photo {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    No profile photos uploaded yet
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={editedModel.documents.document_type}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        document_number: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div> */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Document Type
                  </label>
                  <input
                    type="text"
                    value={editedModel.documents.document_type}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        documents: {
                          ...editedModel.documents,
                          document_type: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Issuer Country
                  </label>
                  <input
                    type="text"
                    value={editedModel.documents.document_issuer_country}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        documents: {
                          ...editedModel.documents,
                          document_issuer_country: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Document Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editedModel.documents.document_front && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Front
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedModel.documents.document_front)}
                        alt="Document Front"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {editedModel.documents.document_back && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Back
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedModel.documents.document_back)}
                        alt="Document Back"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Selfie with ID */}
              {editedModel.identity_check.selfie_with_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selfie with ID
                  </label>
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={getImageUrl(
                        editedModel.identity_check.selfie_with_id
                      )}
                      alt="Selfie with ID"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.social_instagram}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          social_instagram: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Facebook
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.social_facebook}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          social_facebook: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.social_twitter}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          social_twitter: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={editedModel.measurements.social_linkedin}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
                        measurements: {
                          ...editedModel.measurements,
                          social_linkedin: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
