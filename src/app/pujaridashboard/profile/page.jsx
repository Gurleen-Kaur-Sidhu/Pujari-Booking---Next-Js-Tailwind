"use client";

import { useState, useEffect } from "react";
import { Pencil, Save, XCircle, Trash2, UploadCloud } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import api from "@/app/lib/axios";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    location: "",
    languages: "",
    about: "",
    profileImage: "",
    qualification: "",
    mobileNumber: "",
    pujaOffered: "",
    experience: "",
  });
  const [loading, setLoading] = useState(true);
  const [initialForm, setInitialForm] = useState(form);
  const defaultImage = "/images/5856.jpg";
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [newImage, setNewImage] = useState(null);
  const [editImage, setEditImage] = useState(false);
  const { setUser } = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie("token");
        const res = await api.get(
          "/profile",
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("responsee", res);

        const user = res?.data?.pujariData;
        console.log("Fetched profile:", user);

        const userForm = {
          fullName: user.fullName || "",
          email: user.email || "",
          mobileNumber: user.mobileNumber || "",
          location: user.location || "",
          languages: Array.isArray(user.languages)
            ? user.languages.join(", ")
            : user.languages || "",
          about: user.about || "",
          qualification: user.qualification || "",
          pujaOffered: user.pujaOffered || "",
          experience: user.experience || "",
        };

        console.log("user.profileImage", typeof user.profileImage);

        setForm(userForm);
        setInitialForm(userForm);
        // setProfileImage(user.profileImage !== "" ? user.profileImage : "");
        setProfileImage(
          user.profileImage && user.profileImage !== ""
            ? `https://pujari-app-backend-production.up.railway.app/uploads/${user.profileImage}`
            : defaultImage
        );
      } catch (err) {
        showErrorToast("Failed to load profile data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    setEditImage(true);
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setNewImage(null);
    setProfileImage(defaultImage);
    showSuccessToast("Profile image removed");
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();

    if (JSON.stringify(form) === JSON.stringify(initialForm) && !newImage) {
      showErrorToast("No changes made.");
      setIsEditing(false);
      return;
    }

    try {
      const token = getCookie("token");
      const formData = new FormData();

      formData.append("fullName", form.fullName);
      formData.append("email", form.email);
      formData.append("mobileNumber", form.phone);
      formData.append("location", form.location);
      formData.append(
        "languages",
        form.languages
          .split(",")
          .map((lang) => lang.trim())
          .filter(Boolean)
      );
      formData.append("about", form.about);
      if (newImage) {
        formData.append("profileImage", newImage);
      }
      formData.append("pujaOffered", form.pujaOffered);
      formData.append("experience", form.experience);
      formData.append("qualification", form.qualification);

      console.log("newImage", newImage);

      const res = await api.put(
        "/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedFileName = res.data.pujariData?.profileImage;
      if (uploadedFileName) {
        const updatedUrl = `https://pujari-app-backend-production.up.railway.app/uploads/${uploadedFileName}`;
        setProfileImage(updatedUrl);
      }

      // ✅ Update context
      const updatedUser = res.data.pujariData;
      if (updatedUser) {
        setUser(updatedUser); // 👈 add this
      }

      console.log("Profile updated:", res.data);
      setInitialForm(form);
      setNewImage(null);
      showSuccessToast("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to update profile.");
    }

    setIsEditing(false);
  };

  const toggleEdit = (e) => {
    if (isEditing) {
      handleSave(e);
    } else {
      setIsEditing(true);
    }
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
        ></button>
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
        ></button>
      </div>
    ));
  };

  return (
    <div className="h-screen w-full bg-[var(--card)] p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--brown)]">My Profile</h2>
        <button
          onClick={toggleEdit}
          className="flex items-center gap-1 text-white font-semibold bg-[var(--brown)] hover:bg-[#7f1616] py-2 px-5 rounded-full text-sm"
        >
          {isEditing ? "Save" : "Edit"}{" "}
          {isEditing ? <Save size={18} /> : <Pencil size={15} />}
        </button>
      </div>

      {/* Profile Photo */}
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

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Name + Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Full Name
            </label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Phone, Location, Experience */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">Phone</label>
            <input
              name="mobileNumber"
              value={form.mobileNumber}
              onChange={handleChange}
              // disabled={!isEditing}
              disabled
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Add location"
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Experience
            </label>
            <input
              type="number"
              name="experience"
              value={form.experience}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Add experience"
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* Qualification */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Qualification
          </label>
          <input
            name="qualification"
            value={form.qualification}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Add Qualification"
            className={`${inputStyle} ${
              !isEditing && "opacity-80 cursor-not-allowed"
            }`}
          />
        </div>

        {/* Languages + Puja */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Languages Known
            </label>
            <input
              name="languages"
              value={form.languages}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Add languages"
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Puja Offered
            </label>
            <input
              name="pujaOffered"
              value={form.pujaOffered}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Add Puja"
              className={`${inputStyle} ${
                !isEditing && "opacity-80 cursor-not-allowed"
              }`}
            />
          </div>
        </div>

        {/* About */}
        <div>
          <label className="block mb-1 text-sm font-semibold">About You</label>
          <textarea
            name="about"
            rows={4}
            value={form.about}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Add something about yourself"
            className={`${inputStyle} resize-none ${
              !isEditing && "opacity-80 cursor-not-allowed"
            }`}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
