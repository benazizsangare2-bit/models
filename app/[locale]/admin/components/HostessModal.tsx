"use client";

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

  const getImageUrl = (photo: string) => {
    if (!photo) return "/Images/models/default.jpg";
    if (photo.startsWith("http")) return photo;
    return `https://modelshostesses.com/api${
      photo.startsWith("/") ? "" : "/"
    }${photo}`;
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
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
                      value={editedHostess.emergency_contact_name}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
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
                      value={editedHostess.emergency_contact_relationship}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
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
                      value={editedHostess.emergency_contact_phone}
                      onChange={(e) =>
                        setEditedHostess({
                          ...editedHostess,
                          emergency_contact_phone: e.target.value,
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
                    Height
                  </label>
                  <input
                    type="text"
                    value={editedHostess.height}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        height: e.target.value,
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
                    value={editedHostess.weight}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        weight: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shoe Size
                  </label>
                  <input
                    type="text"
                    value={editedHostess.shoe_size}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        shoe_size: e.target.value,
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
                    value={editedHostess.hair_color}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        hair_color: e.target.value,
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
                    value={editedHostess.eye_color}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        eye_color: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Profile Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={getImageUrl(editedHostess.photo)}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Additional Photos */}
              {editedHostess.additional_photos &&
                editedHostess.additional_photos.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Photos
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {editedHostess.additional_photos.map((photo, index) => (
                        <div
                          key={index}
                          className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200"
                        >
                          <Image
                            src={getImageUrl(photo)}
                            alt={`Additional photo ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={editedHostess.document_number}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        document_number: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Document Type
                  </label>
                  <input
                    type="text"
                    value={editedHostess.document_type}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        document_type: e.target.value,
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
                    value={editedHostess.document_issuer_country}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        document_issuer_country: e.target.value,
                      })
                    }
                    disabled={!isEditing}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100"
                  />
                </div>
              </div>

              {/* Document Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editedHostess.document_front && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Front
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedHostess.document_front)}
                        alt="Document Front"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {editedHostess.document_back && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Back
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedHostess.document_back)}
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
              {editedHostess.selfie_with_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selfie with ID
                  </label>
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={getImageUrl(editedHostess.selfie_with_id)}
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
                    value={editedHostess.social_instagram}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        social_instagram: e.target.value,
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
                    value={editedHostess.social_facebook}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        social_facebook: e.target.value,
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
                    value={editedHostess.social_twitter}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        social_twitter: e.target.value,
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
                    value={editedHostess.social_linkedin}
                    onChange={(e) =>
                      setEditedHostess({
                        ...editedHostess,
                        social_linkedin: e.target.value,
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
