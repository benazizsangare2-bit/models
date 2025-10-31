"use client";
import { parsePhotoArray } from "../../admin/utils/photoUtils";
import { useState, useEffect } from "react";
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

interface HostessModalProps {
  hostess: Hostess;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (hostessId: string, updatedData: Partial<Hostess>) => void;
}

export default function HostessModal({
  hostess,
  isOpen,
  onClose,
  onUpdate,
}: HostessModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHostess, setEditedHostess] = useState<Hostess>(hostess);
  const [activeTab, setActiveTab] = useState<
    "personal" | "physical" | "documents" | "social"
  >("personal");

  useEffect(() => {
    setEditedHostess(hostess);
  }, [hostess]);

  const getImageUrl = (photo: any) => {
    if (!photo) return "/Images/models/default.jpg";

    let photoPath = "";

    // If it's already an array, take the first element (for consistency)
    if (Array.isArray(photo)) {
      photoPath = photo[0];
    }
    // If it's a string, use it directly
    else if (typeof photo === "string") {
      photoPath = photo;
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
    onUpdate(hostess.id, editedHostess);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedHostess(hostess);
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
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Edit Hostess" : "Hostess Details"}
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
                    value={editedHostess.first_name}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                    value={editedHostess.last_name}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                    value={editedHostess.username}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                    value={editedHostess.email}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        email: e.target.value,
                      })
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
                    value={editedHostess.whatsapp}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                    value={editedHostess.date_of_birth}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                    value={editedHostess.gender}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        gender: e.target.value,
                      })
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
                    value={editedHostess.nationality}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
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
                  value={`${editedHostess.street}, ${editedHostess.city}, ${editedHostess.residence_country}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(", ");
                    setEditedHostess({
                      ...editedHostess,
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

              <div className="border-t pt-4">
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
                      value={editedHostess.emergency_contact.name}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
                          emergency_contact: {
                            ...editedHostess.emergency_contact,
                            name: e.target.value,
                          },
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
                      value={editedHostess.emergency_contact.relationship}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
                          emergency_contact: {
                            ...editedHostess.emergency_contact,
                            relationship: e.target.value,
                          },
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
                      value={editedHostess.emergency_contact.phone}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
                          emergency_contact: {
                            ...editedHostess.emergency_contact,
                            phone: e.target.value,
                          },
                        })
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "physical" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Work Experience
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.work_experience}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          work_experience: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Languages
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.languages}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          languages: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.skills}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          skills: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.availability}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          availability: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preffered Events
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.preferred_events}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          preferred_events: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Previous hostess work
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.previous_hostess_work}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          previous_hostess_work: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    References
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.reference_contact}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          reference_contact: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Height
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.height}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          height: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Weight
                  </label>
                  <input
                    type="text"
                    value={editedHostess.experience.weight}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          weight: e.target.value,
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
                    value={editedHostess.experience.hair_color}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
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
                    value={editedHostess.experience.eye_color}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
                          eye_color: e.target.value,
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
                  editedHostess.experience.photo
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Document Type
                  </label>
                  <input
                    type="text"
                    value={editedHostess.documents.document_type}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        documents: {
                          ...editedHostess.documents,
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
                    value={editedHostess.documents.document_issuer_country}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        documents: {
                          ...editedHostess.documents,
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
                {editedHostess.documents.document_front && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Front
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(
                          editedHostess.documents.document_front
                        )}
                        alt="Document Front"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {editedHostess.documents.document_back && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Back
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedHostess.documents.document_back)}
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
              {editedHostess.identity_check.selfie_with_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selfie with ID
                  </label>
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={getImageUrl(
                        editedHostess.identity_check.selfie_with_id
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
                    value={editedHostess.experience.social_instagram}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
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
                    value={editedHostess.experience.social_facebook}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
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
                    value={editedHostess.experience.social_twitter}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
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
                    value={editedHostess.experience.social_linkedin}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        experience: {
                          ...editedHostess.experience,
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
