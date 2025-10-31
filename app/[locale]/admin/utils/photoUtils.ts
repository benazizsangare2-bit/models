// utils/photoUtils.ts
export const parsePhotoArray = (photoData: any): string[] => {
  if (!photoData) return [];

  // If it's already an array, return it
  if (Array.isArray(photoData)) {
    return photoData;
  }

  // If it's a string, parse it
  if (typeof photoData === "string") {
    // Handle PostgreSQL array format: {photo1.jpg,photo2.jpg,photo3.jpg}
    if (photoData.startsWith("{") && photoData.endsWith("}")) {
      // Remove curly braces and split by commas
      const cleaned = photoData.slice(1, -1);
      return cleaned
        .split(",")
        .map((photo) => photo.trim())
        .filter((photo) => photo !== "");
    }

    // Handle comma-separated string
    if (photoData.includes(",")) {
      return photoData
        .split(",")
        .map((photo) => photo.trim())
        .filter((photo) => photo !== "");
    }

    // Single photo
    return [photoData];
  }

  return [];
};
