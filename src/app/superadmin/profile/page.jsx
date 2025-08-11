"use client";

import { useState } from "react";
import { Pencil, Save, XCircle, Trash2, UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "Pandit Harsh Vyas",
    email: "harsh@gmail.com",
    phone: "9876543210",
    location: "Ujjain, Madhya Pradesh",
    language: "Hindi, Sanskrit",
    about:
      "Specialist in Vedic rituals & Grah Shanti pujas with 15+ years of experience.",
  });

  const [initialForm, setInitialForm] = useState(form);
  const defaultImage = "/images/5856.jpg";
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setNewImage(null);
    setProfileImage(defaultImage); // or use a true default placeholder like "/avatar.png"
    showSuccessToast("Profile image removed");
  };

const handleSave = () => {
  if (JSON.stringify(form) === JSON.stringify(initialForm) && !newImage) {
    showErrorToast("No changes made.");
    setIsEditing(false); // ✅ ensure it exits edit mode
    return;
  }

  // Simulate save logic here (e.g., API call to upload image and update profile)
  setInitialForm(form);
  setNewImage(null);
  showSuccessToast("Profile updated successfully!");
  setIsEditing(false);
};


  const toggleEdit = () => {
    isEditing ? handleSave() : setIsEditing(true);
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-2xl text-sm border border-[#ccc] text-[var(--text)] outline-none focus:ring focus:ring-[var(--brown)]";

  const showErrorToast = (message) => {
    toast.custom((t) => (
      <div className="flex items-start gap-3 bg-white border-l-4 border-red-500 text-red-700 shadow-lg rounded-lg px-4 py-3 max-w-sm w-full relative">
        <div className="text-sm pr-6">{message}</div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute right-2 top-2"
        >
         
        </button>
      </div>
    ));
  };

  const showSuccessToast = (message) => {
    toast.custom((t) => (
      <div className="flex items-start gap-3 bg-white border-l-4 border-green-500 text-green-700 shadow-lg rounded-lg px-4 py-3 max-w-sm w-full relative">
        <div className="text-sm pr-6">{message}</div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="absolute right-2 top-2"
        >
         
        </button>
      </div>
    ));
  };

  return (
    <div className="p-6 bg-[var(--card)] text-[var(--text)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--brown)]">My Profile</h2>
        <button
          onClick={toggleEdit}
          className="flex items-center gap-1 text-[var(--text)] hover:bg-[#7f1616] font-bold bg-[var(--brown)] py-2 px-5 rounded-full text-white text-sm transition"
        >
          {isEditing ? "Save" : "Edit"}
          {isEditing ? <Save size={18} /> : <Pencil size={15} />}
        </button>
      </div>

      {/* Profile Photo Section */}
      <div className="mb-6 flex items-center gap-6">
        <img
          src={profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border border-[#ccc]"
        />
        {isEditing && (
          <div className="flex flex-col gap-2">
            <label className="cursor-pointer text-sm text-[var(--brown)] font-semibold flex items-center gap-1">
              <UploadCloud size={16} /> Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button
              onClick={handleImageDelete}
              className="text-red-600 flex items-center text-sm gap-1 hover:underline"
            >
              <Trash2 size={16} /> Delete Photo
            </button>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-bold text-[var(--text)]">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            disabled={!isEditing}
            className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-bold text-[var(--text)]">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-bold text-[var(--text)]">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
            />
          </div>
        </div>


        <div>
          <label className="block mb-1 text-sm font-bold text-[var(--text)]">About You</label>
          <textarea
            name="about"
            rows={4}
            value={form.about}
            onChange={handleChange}
            disabled={!isEditing}
            className={`${inputStyle} ${!isEditing && "opacity-80 cursor-not-allowed"}`}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
