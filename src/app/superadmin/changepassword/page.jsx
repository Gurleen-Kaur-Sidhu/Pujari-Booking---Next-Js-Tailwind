"use client";
import { useState } from "react";
import { Lock, Save, Pencil, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ChangePassword() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

 const showErrorToast = (message) => {
  toast.custom((t) => (
    <div className="flex items-start gap-3 bg-white border-l-4 border-red-500 text-red-700 shadow-lg rounded-lg px-4 py-3 max-w-sm w-full relative">
      
      <div className="text-sm">{message}</div>
    </div>
  ));
};

const showSuccessToast = (message) => {
  toast.custom((t) => (
    <div className="flex items-start gap-3 bg-white border-l-4 border-green-500 text-green-700 shadow-lg rounded-lg px-4 py-3 max-w-sm w-full relative">
      <div className="mt-1">
       
      </div>
      <div className="text-sm">{message}</div>
      
    </div>
  ));
};


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword && !newPassword && !confirmPassword) {
      showErrorToast("No changes made.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showErrorToast("New password and confirm password do not match.");
      return;
    }

    showSuccessToast("Password updated successfully!");
    setIsEditing(false);
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]";

  return (
    <div className="p-6 bg-[var(--card)] text-[var(--text)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--brown)] flex items-center gap-2">
          <Lock size={22} /> Change Password
        </h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex items-center gap-1 text-[var(--text)] hover:bg-[#7f1616] font-bold bg-[var(--brown)] py-2 px-5 rounded-full text-white text-sm transition"
        >
          {isEditing ? "Save" : "Edit"}{" "}
          {isEditing ? <Save size={18} /> : <Pencil size={15} />}
        </button>
      </div>

      <div className="space-y-5 max-w-xl">
        <div>
          <label className="block mb-1 text-sm font-bold text-[var(--text)]">
            Current Password
          </label>
          <input
            name="currentPassword"
            type="password"
            value={form.currentPassword}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter current password"
            className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-bold text-[var(--text)]">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            value={form.newPassword}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter new password"
            className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-bold text-[var(--text)]">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Re-enter new password"
            className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
          />
        </div>
      </div>
    </div>
  );
}
