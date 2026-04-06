import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    Fullname: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventdefault();
    setIsSubmitting(true);

    try {
      const res = await register(formData);
      Navigate("/dashbord");
    } catch (err) {
      setIsSubmitting(false);
      console.log("error durring registration process ", err);
    }
  };
}
