export const adminLogout = (locale: string = "en") => {
  // Show confirmation dialog
  const confirmed = confirm("Are you sure you want to log out?");

  if (!confirmed) {
    return; // User cancelled, do nothing
  }

  // Remove admin tokens/data
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");

  // Show success message
  //   alert("Logged out successfully!");

  // Redirect to home page instead of login page
  window.location.href = `/${locale}`;
};
