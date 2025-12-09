"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";

// Format phone number as user types
const formatPhoneNumber = (value: string) => {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.length <= 3) {
    return phoneNumber;
  } else if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  }
};

export default function ScanForm() {
  const [formData, setFormData] = useState({
    practiceName: "",
    websiteUrl: "",
    email: "",
    phone: "",
    contactName: "",
    address: "",
    city: "",
    state: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const practiceNameInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isGoogleLoaded || !practiceNameInputRef.current) return;

    try {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        practiceNameInputRef.current,
        {
          types: ["establishment"],
          fields: ["name", "formatted_address", "address_components", "website", "formatted_phone_number"],
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place || !place.address_components) return;

        // Extract address components
        let streetNumber = "";
        let route = "";
        let city = "";
        let state = "";

        place.address_components.forEach((component) => {
          const types = component.types;
          if (types.includes("street_number")) {
            streetNumber = component.long_name;
          }
          if (types.includes("route")) {
            route = component.long_name;
          }
          if (types.includes("locality")) {
            city = component.long_name;
          }
          if (types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        });

        const address = `${streetNumber} ${route}`.trim();

        // Update form data
        setFormData({
          ...formData,
          practiceName: place.name || formData.practiceName,
          websiteUrl: place.website || formData.websiteUrl,
          phone: place.formatted_phone_number ? formatPhoneNumber(place.formatted_phone_number) : formData.phone,
          address: address || formData.address,
          city: city || formData.city,
          state: state || formData.state,
        });
      });
    } catch (error) {
      console.error("Error initializing Google Places:", error);
    }

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isGoogleLoaded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        window.location.href = `/processing?token=${data.token}`;
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to submit scan");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Load Google Maps JavaScript API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}&libraries=places`}
        onLoad={() => setIsGoogleLoaded(true)}
        strategy="lazyOnload"
      />

      <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-[#2C5F7C]/20 relative overflow-hidden">
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#F5C842]/20 to-[#2C5F7C]/10 rounded-bl-full"></div>

      <div className="relative">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get Your Free Scan</h2>
          <p className="text-gray-600 font-medium">No credit card required • 2-minute form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Practice Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Practice Name
            </label>
            <input
              ref={practiceNameInputRef}
              type="text"
              required
              value={formData.practiceName}
              onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
              placeholder="Main Street Dental"
              autoComplete="off"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Website URL
            </label>
            <input
              type="text"
              required
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
              placeholder="yourpractice.com"
            />
          </div>

          {/* Contact Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
              placeholder="Dr. John Smith"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Your Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Phone <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="(555) 123-4567"
                maxLength={14}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Practice Address
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
              placeholder="123 Main Street"
            />
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="Los Angeles"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                State
              </label>
              <input
                type="text"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2C5F7C] focus:border-[#2C5F7C] transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                placeholder="California"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#fbab3f] hover:bg-[#e89a2d] text-gray-900 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
          >
            {isSubmitting ? "Submitting..." : "Get My Free Score →"}
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">
            Your information is secure and will never be shared
          </p>
        </form>
      </div>
    </div>
    </>
  );
}
