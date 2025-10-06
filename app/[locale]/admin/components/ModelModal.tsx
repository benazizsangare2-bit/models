"use client";

import { useState, useEffect } from "react";
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

  const getImageUrl = (photo: string) => {
    if (!photo) return "/Images/models/default.jpg";
    if (photo.startsWith("http")) return photo;
    return `http://192.168.137.223:6060${
      photo.startsWith("/") ? "" : "/"
    }${photo}`;
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
                    value={editedModel.height}
                    onChange={(e) =>
                      setEditedModel({ ...editedModel, height: e.target.value })
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
                    value={editedModel.weight}
                    onChange={(e) =>
                      setEditedModel({ ...editedModel, weight: e.target.value })
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
                    value={editedModel.shoe_size}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.hair_color}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.eye_color}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    src={getImageUrl(editedModel.photo)}
                    alt="Profile"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Additional Photos */}
              {editedModel.additional_photos &&
                editedModel.additional_photos.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Photos
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {editedModel.additional_photos.map((photo, index) => (
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
                    value={editedModel.document_number}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.document_type}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.document_issuer_country}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                {editedModel.document_front && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Front
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedModel.document_front)}
                        alt="Document Front"
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {editedModel.document_back && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Back
                    </label>
                    <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                      <Image
                        src={getImageUrl(editedModel.document_back)}
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
              {editedModel.selfie_with_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selfie with ID
                  </label>
                  <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={getImageUrl(editedModel.selfie_with_id)}
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
                    value={editedModel.social_instagram}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.social_facebook}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.social_twitter}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
                    value={editedModel.social_linkedin}
                    onChange={(e) =>
                      setEditedModel({
                        ...editedModel,
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
