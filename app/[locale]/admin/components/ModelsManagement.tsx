"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import ModelModal from "./ModelModal";
import ModelCard from "./ModelCard";

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

export default function ModelsManagement() {
  const t = useTranslations();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch models from API
  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const params = new URLSearchParams();
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `https://modelshostesses.com/api/api/admin/models?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `Models API endpoint not available. Please implement /api/admin/models`
          );
        }
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data = await response.json();
      setModels(Array.isArray(data) ? data : data.data || data.models || []);
    } catch (err: any) {
      console.error("Error fetching models:", err);
      setError(err.message || "Failed to load models");
    } finally {
      setLoading(false);
    }
  };

  // Handle model action (approve/reject)
  const handleModelAction = async (
    modelId: string,
    action: "approve" | "reject"
  ) => {
    try {
      setActionLoading(modelId);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://modelshostesses.com/api/api/admin/models/${modelId}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Failed to ${action} model: ${response.status}`
        );
      }

      // Show success message
      alert(`Model ${action}d successfully!`);

      // Refresh the models list
      await fetchModels();
    } catch (err: any) {
      console.error(`Error ${action}ing model:`, err);
      alert(`Failed to ${action} model: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle model deletion
  const handleDeleteModel = async (modelId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this model? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://modelshostesses.com/api/api/models/${modelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete model: ${response.status}`);
      }

      // Refresh the models list
      await fetchModels();
    } catch (err: any) {
      console.error("Error deleting model:", err);
      alert(`Failed to delete model: ${err.message}`);
    }
  };

  // Handle model update
  const handleUpdateModel = async (
    modelId: string,
    updatedData: Partial<Model>
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://modelshostesses.com/api/api/models/${modelId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update model: ${response.status}`);
      }

      // Refresh the models list
      await fetchModels();
      setIsModalOpen(false);
      setSelectedModel(null);
    } catch (err: any) {
      console.error("Error updating model:", err);
      alert(`Failed to update model: ${err.message}`);
    }
  };

  // Filter models based on search term
  const filteredModels = models.filter((model) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      model.first_name.toLowerCase().includes(searchLower) ||
      model.last_name.toLowerCase().includes(searchLower) ||
      model.email.toLowerCase().includes(searchLower) ||
      model.username.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    fetchModels();
  }, [statusFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Models
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchModels}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            >
              <option value="all">All Models</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Models
            </label>
            <input
              type="text"
              placeholder="Search by name, email, or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>

          {/* Refresh Button */}
          <div className="flex items-end">
            <button
              onClick={fetchModels}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-gray-900">
            {models.length}
          </div>
          <div className="text-sm text-gray-600">Total Models</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-yellow-600">
            {models.filter((m) => m.status === "pending").length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {models.filter((m) => m.status === "approved").length}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-red-600">
            {models.filter((m) => m.status === "rejected").length}
          </div>
          <div className="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Models List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Models ({filteredModels.length})
          </h2>
        </div>

        {filteredModels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-4xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Models Found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "No models match your search criteria."
                : "No models have registered yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredModels.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                onView={() => {
                  setSelectedModel(model);
                  setIsModalOpen(true);
                }}
                onApprove={() => handleModelAction(model.id, "approve")}
                onReject={() => handleModelAction(model.id, "reject")}
                onDelete={() => handleDeleteModel(model.id)}
                onEdit={() => {
                  setSelectedModel(model);
                  setIsModalOpen(true);
                }}
                isActionLoading={actionLoading === model.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Model Modal */}
      {isModalOpen && selectedModel && (
        <ModelModal
          model={selectedModel}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedModel(null);
          }}
          onUpdate={handleUpdateModel}
        />
      )}
    </div>
  );
}
