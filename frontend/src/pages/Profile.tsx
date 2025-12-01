import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, isLoading, logout, login } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.name || user?.email || "";
  const initial = displayName?.charAt(0)?.toUpperCase() ?? "?";
  const [editingName, setEditingName] = useState(displayName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameStatus, setNameStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [nameError, setNameError] = useState<string | null>(null);

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading || !user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleNameSave = async () => {
    const trimmed = editingName.trim();
    if (!trimmed) {
      setNameError("Name is required");
      setNameStatus("error");
      return;
    }

    const token = window.localStorage.getItem("auth:token");
    if (!token) {
      setNameError("You are not authenticated.");
      setNameStatus("error");
      return;
    }

    setNameStatus("saving");
    setNameError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/profile/update-name",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: trimmed }),
        }
      );

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await response.json() : null;
      const text = !isJson ? await response.text() : null;

      if (!response.ok) {
        throw new Error(data?.message || text || "Failed to update name");
      }

      const updatedUser = data.user;

      // Update auth context with new user data
      login({
        id: String(updatedUser.id),
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatar || undefined,
        phoneNumber: updatedUser.phoneNumber || undefined,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth || undefined,
        languages: updatedUser.languages,
        createdAt: updatedUser.createdAt,
      });

      setEditingName(updatedUser.name || "");
      setNameStatus("success");
      setIsEditingName(false);
    } catch (error: any) {
      console.error(error);
      setNameError(error?.message || "Failed to update name");
      setNameStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-light-100 px-[20px]">
      <ResponsiveNavbar />

      <main className="w-full py-[20px] sm:py-[30px] space-y-[16px] sm:space-y-[24px] [@media(min-width:950px)]:max-w-[900px] [@media(min-width:950px)]:mx-auto [@media(min-width:950px)]:px-[25px]">
        {/* Page heading */}
        <header className="flex flex-col gap-[4px]">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gray-500">
            Your space
          </p>
          <h1 className="text-[clamp(22px,5vw,32px)] font-bold text-logo-heading">
            Your Profile
          </h1>
          <p className="text-[12px] sm:text-[13px] text-light-text max-w-[520px]">
            Manage your personal details and keep your account information up to
            date.
          </p>
        </header>

        {/* Hero / header */}
        <section className="bg-gradient-to-r from-[hsl(194,27%,21%)] to-[hsl(187,73%,24%)] rounded-[16px] sm:rounded-[20px] p-[16px] sm:p-[28px] text-light-100 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-[16px] sm:gap-[20px]">
          <div className="flex items-center gap-[12px] sm:gap-[16px] shadow-m-profile rounded-[30px] sm:rounded-[25px] p-[12px] sm:p-[18px]">
            <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-full bg-light-100/10 border border-light-100/40 flex items-center justify-center text-[22px] sm:text-[26px] font-semibold overflow-hidden flex-shrink-0">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.12em] opacity-80">
                Account
              </p>
              <h1 className="text-[clamp(18px,4vw,28px)] font-semibold leading-tight truncate">
                {displayName}
              </h1>
              <p className="text-xs sm:text-sm opacity-80 break-all">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="self-start shadow-m-profile sm:self-auto w-full sm:w-auto cursor-pointer border border-light-100/70 text-light-100 rounded-full px-[18px] py-[10px] sm:py-[8px] text-sm font-medium hover:bg-light-100 hover:text-[hsl(187,73%,16%)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
          >
            Logout
          </button>
        </section>

        {/* Info sections */}
        <section className="grid gap-[14px] sm:gap-[18px] sm:grid-cols-2">
          <div className="bg-[hsl(0,0%,87%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
              Basic info
            </p>
            <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
              <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
                <p className="text-xs text-gray-500">Name</p>
                {isEditingName ? (
                  <div className="flex flex-col gap-[6px] mt-[6px]">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => {
                        setEditingName(e.target.value);
                        if (nameStatus !== "idle") {
                          setNameStatus("idle");
                          setNameError(null);
                        }
                      }}
                      className="border border-border-light rounded-full px-[12px] py-[8px] sm:py-[6px] text-[13px] sm:text-[14px] bg-input-bg placeholder:text-input-placeholder outline-none focus:ring-2 focus:ring-primary/30 w-full"
                      placeholder="Enter your full name"
                    />
                    <div className="flex items-center gap-[8px] sm:gap-[10px] flex-wrap">
                      <button
                        type="button"
                        onClick={handleNameSave}
                        disabled={
                          nameStatus === "saving" || !editingName.trim()
                        }
                        className="cursor-pointer bg-primary text-light-100 text-[11px] sm:text-xs font-medium rounded-full px-[12px] sm:px-[14px] py-[8px] sm:py-[6px] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      >
                        {nameStatus === "saving" ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingName(displayName);
                          setIsEditingName(false);
                          setNameStatus("idle");
                          setNameError(null);
                        }}
                        className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[8px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)]"
                      >
                        Cancel
                      </button>
                      {nameStatus === "success" && (
                        <span className="text-xs text-green-600">
                          Name updated
                        </span>
                      )}
                      {nameError && (
                        <span className="text-xs text-red-600">
                          {nameError}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-[8px] sm:gap-[10px] mt-[-2px]">
                    <p className="font-medium truncate flex-1 min-w-0">
                      {displayName}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingName(displayName);
                        setIsEditingName(true);
                        setNameStatus("idle");
                        setNameError(null);
                      }}
                      className="cursor-pointer text-[11px] sm:text-xs font-medium rounded-full px-[10px] sm:px-[12px] py-[6px] sm:py-[6px] border border-border-light text-light-text hover:bg-hover-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] flex-shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
                <p className="text-[11px] sm:text-xs text-gray-500">Role</p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  {user.role || "USER"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[hsl(0,0%,87%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px]">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
              Contact
            </p>
            <div className="space-y-[6px] sm:space-y-[8px] text-[13px] sm:text-[14px] text-light-text">
              <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
                <p className="text-[11px] sm:text-xs text-gray-500">Email</p>
                <p className="font-medium break-all text-[13px] sm:text-[14px]">
                  {user.email}
                </p>
              </div>
              <div className="bg-white px-[12px] sm:px-4 py-[8px] sm:py-[10px] rounded-[16px] sm:rounded-[20px]">
                <p className="text-[11px] sm:text-xs text-gray-500">Phone</p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  {user.phoneNumber || "Not added"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[hsl(0,0%,87%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px] sm:col-span-2">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
              Account activity
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-[8px] sm:gap-[10px] text-[13px] sm:text-[14px] text-light-text">
              <div className="bg-white px-[16px] sm:px-[20px] py-[12px] sm:py-[15px] rounded-[16px] sm:rounded-[20px] flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-500">
                  Member since
                </p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div className="bg-white px-[16px] sm:px-[20px] py-[12px] sm:py-[15px] rounded-[16px] sm:rounded-[20px] flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-500">
                  Last updated
                </p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  {formatDate(
                    // @ts-expect-error backend may provide updatedAt even if not in type
                    user.updatedAt || user.createdAt
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[hsl(0,0%,87%)] shadow-m rounded-[12px] sm:rounded-[16px] p-[12px] sm:p-[18px] sm:col-span-2">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-gray-500 mb-[6px]">
              Security & preferences
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-[8px] sm:gap-[10px] text-[13px] sm:text-[14px] text-light-text">
              <div className="bg-white px-[12px] sm:px-4 py-[10px] sm:py-[10px] rounded-[16px] sm:rounded-[20px] flex flex-col gap-[4px] flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-500">Login</p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  Email & password
                </p>
                <p className="text-[11px] sm:text-xs text-gray-500">
                  Contact support if you'd like to change your email.
                </p>
              </div>
              <div className="bg-white px-[12px] sm:px-4 py-[10px] sm:py-[10px] rounded-[16px] sm:rounded-[20px] flex flex-col gap-[4px] flex-1 min-w-0">
                <p className="text-[11px] sm:text-xs text-gray-500">Language</p>
                <p className="font-medium text-[13px] sm:text-[14px]">
                  Controlled from the top navigation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
