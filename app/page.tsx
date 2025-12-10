"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import Footer from "@/components/Footer";

interface PlaceSuggestion {
  name: string;
  address: string;
  fullAddress: string;
  phone: string;
  website: string;
  city: string;
  state: string;
}

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

export default function HomePage() {
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

  // Initialize Google Places Autocomplete
  useEffect(() => {
    if (!isGoogleLoaded || !practiceNameInputRef.current) return;

    if (typeof google === 'undefined' || !google.maps || !google.maps.places) {
      console.error("Google Places API not loaded properly");
      return;
    }

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Start the submission
      const response = await fetch("/api/submit-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect immediately - the processing page will trigger the scan and handle the waiting
        window.location.href = `/processing?token=${data.token}&scanId=${data.scanId}`;
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
        strategy="afterInteractive"
      />

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <Image
                src="/hr4sight-logo.png"
                alt="HR4Sight"
                width={240}
                height={60}
                className="h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/how-it-works"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200"
              >
                How It Works
              </a>
              <a
                href="/about-taps"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200"
              >
                About TAPS
              </a>
              <button
                onClick={() => {
                  document.getElementById('scan-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold px-6 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl hover:scale-105 relative overflow-hidden group bg-[#fbab3f] text-gray-900"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  FREE SCAN
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column - Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                FREE DIGITAL AUTHORITY SCAN
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                What's{" "}
                <span className="text-primary relative inline-block">
                  Blocking
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8C40 4 80 2 120 4C160 6 180 8 200 7" stroke="#fbab3f" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                High-Value Clients From Finding You?
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Find out your <span className="font-bold text-gray-900">Digital Authority Score</span> and discover why{" "}
                <span className="font-bold text-primary">95% of businesses</span> are invisible to clients searching for their expertise, certifications, and authority online.
              </p>

              {/* Benefits List */}
              <div className="space-y-5 mb-10">
                <div
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(44, 95, 124, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">Complete Online Presence Analysis</p>
                    <p className="text-gray-600">Scan 47 data points across your digital footprint</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(41, 55, 127, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">Results in Minutes</p>
                    <p className="text-gray-600">Get your detailed Digital Authority report delivered via email</p>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-300 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(41, 55, 127, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-primary/20 transition-colors duration-300">
                    <svg className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">Actionable Improvement Plan</p>
                    <p className="text-gray-600">Know exactly what to fix to attract more high-value clients</p>
                  </div>
                </div>
              </div>

              {/* Social Proof Stats */}
              <div
                className="bg-gradient-to-br from-[#1e2654] to-[#29377f] text-white grid grid-cols-3 gap-6 p-8 rounded-2xl shadow-xl group cursor-default border-2 border-secondary/30"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgb(0 0 0 / 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="text-center transition-transform duration-300 hover:scale-110">
                  <div className="text-5xl font-extrabold mb-2 text-white transition-colors duration-300 group-hover:text-secondary">200+</div>
                  <div className="text-sm font-medium text-white/90">Businesses Scanned</div>
                </div>
                <div className="text-center border-x border-white/30 transition-transform duration-300 hover:scale-110">
                  <div className="text-5xl font-extrabold mb-2 text-white transition-colors duration-300 group-hover:text-secondary">95%</div>
                  <div className="text-sm font-medium text-white/90">Score Below 80%</div>
                </div>
                <div className="text-center transition-transform duration-300 hover:scale-110">
                  <div className="text-5xl font-extrabold mb-2 text-white transition-colors duration-300 group-hover:text-secondary">2.4x</div>
                  <div className="text-sm font-medium text-white/90">Higher Conversion</div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="order-1 lg:order-2">
              <div id="scan-form" className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border-2 border-primary/20 relative overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-bl-full"></div>

                <div className="relative">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get Your Free Assessment</h2>
                    <p className="text-gray-600 font-medium">No credit card required • 2-minute form</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Company Name
                      </label>
                      <input
                        ref={practiceNameInputRef}
                        type="text"
                        required
                        value={formData.practiceName}
                        onChange={(e) => setFormData({ ...formData, practiceName: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
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
                        type="url"
                        required
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="yourbusiness.com"
                        autoComplete="url"
                      />
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="your@email.com"
                          autoComplete="email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="(555) 123-4567"
                          maxLength={14}
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Company Address
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="123 Main Street"
                        autoComplete="street-address"
                      />
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="Austin"
                          autoComplete="address-level2"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          State
                        </label>
                        <select
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 hover:border-gray-300"
                        >
                          <option value="">Select State</option>
                          <option value="AL">Alabama</option>
                          <option value="AK">Alaska</option>
                          <option value="AZ">Arizona</option>
                          <option value="AR">Arkansas</option>
                          <option value="CA">California</option>
                          <option value="CO">Colorado</option>
                          <option value="CT">Connecticut</option>
                          <option value="DE">Delaware</option>
                          <option value="FL">Florida</option>
                          <option value="GA">Georgia</option>
                          <option value="HI">Hawaii</option>
                          <option value="ID">Idaho</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="IA">Iowa</option>
                          <option value="KS">Kansas</option>
                          <option value="KY">Kentucky</option>
                          <option value="LA">Louisiana</option>
                          <option value="ME">Maine</option>
                          <option value="MD">Maryland</option>
                          <option value="MA">Massachusetts</option>
                          <option value="MI">Michigan</option>
                          <option value="MN">Minnesota</option>
                          <option value="MS">Mississippi</option>
                          <option value="MO">Missouri</option>
                          <option value="MT">Montana</option>
                          <option value="NE">Nebraska</option>
                          <option value="NV">Nevada</option>
                          <option value="NH">New Hampshire</option>
                          <option value="NJ">New Jersey</option>
                          <option value="NM">New Mexico</option>
                          <option value="NY">New York</option>
                          <option value="NC">North Carolina</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="OK">Oklahoma</option>
                          <option value="OR">Oregon</option>
                          <option value="PA">Pennsylvania</option>
                          <option value="RI">Rhode Island</option>
                          <option value="SC">South Carolina</option>
                          <option value="SD">South Dakota</option>
                          <option value="TN">Tennessee</option>
                          <option value="TX">Texas</option>
                          <option value="UT">Utah</option>
                          <option value="VT">Vermont</option>
                          <option value="VA">Virginia</option>
                          <option value="WA">Washington</option>
                          <option value="WV">West Virginia</option>
                          <option value="WI">Wisconsin</option>
                          <option value="WY">Wyoming</option>
                        </select>
                      </div>
                    </div>

                    {/* Your Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="Dr. John Smith"
                        autoComplete="name"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg relative overflow-hidden group bg-[#fbab3f] text-gray-900 hover:bg-[#e89a2d]"
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.2), 0 8px 10px -6px rgb(0 0 0 / 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = '';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? "Analyzing Your Company..." : "Get My Free Assessment Now"}
                        {!isSubmitting && (
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                    </button>

                    {/* Trust Badges */}
                    <div className="pt-6 flex items-center justify-center gap-5 text-xs text-gray-600 border-t border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">HIPAA Compliant</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">Data Secured</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="font-medium">No Obligations</span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our Digital Authority Assessment analyzes your business's online presence across all key platforms and ranking factors
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Step 1 */}
              <div className="text-center group cursor-default">
                <div
                  style={{ backgroundColor: '#29377f', width: '64px', height: '64px' }}
                  className="rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbab3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#29377f';
                  }}
                >
                  <span style={{ color: '#FFFFFF' }} className="text-3xl font-bold transition-transform duration-300 group-hover:scale-110">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-primary">Enter Your Info</h3>
                <p className="text-gray-600">
                  Fill out the simple form with your company name, website, and contact details. Takes less than 2 minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center group cursor-default">
                <div
                  style={{ backgroundColor: '#29377f', width: '64px', height: '64px' }}
                  className="rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbab3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#29377f';
                  }}
                >
                  <span style={{ color: '#FFFFFF' }} className="text-3xl font-bold transition-transform duration-300 group-hover:scale-110">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-primary">We Analyze Your Digital Presence</h3>
                <p className="text-gray-600">
                  Our system scans 47 data points across your online presence, including Google Business Profile, reviews, directories, and website authority.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center group cursor-default">
                <div
                  style={{ backgroundColor: '#29377f', width: '64px', height: '64px' }}
                  className="rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#fbab3f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#29377f';
                  }}
                >
                  <span style={{ color: '#FFFFFF' }} className="text-3xl font-bold transition-transform duration-300 group-hover:scale-110">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-primary">Get Your Report</h3>
                <p className="text-gray-600">
                  Receive your Digital Authority Score and detailed TAPS framework breakdown via email with actionable recommendations.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                  See How HR4Sight Works
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Watch this short video to understand how HR4Sight keeps you ahead of changing employment laws
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/en4BUemNH0c?si=3fdg0i7Fza6mfS2O"
                    title="HR4Sight Explanation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* TAPS Framework */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 border-2 border-gray-100">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                  The TAPS Framework
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A comprehensive 5-pillar system that measures your business's digital authority and online visibility
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {/* Trust */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.borderColor = '#29377f';
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderWidth = '';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Trust</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Google reviews, ratings, review velocity, and sentiment analysis that build credibility and patient confidence
                  </p>
                </div>

                {/* Accessibility */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.borderColor = '#29377f';
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderWidth = '';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Accessibility</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    NAP consistency, directory presence, and GBP optimization that make it easy for patients to find you
                  </p>
                </div>

                {/* Positioning */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.borderColor = '#29377f';
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderWidth = '';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Positioning</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    GBP categories, services, messaging clarity, and local relevance that differentiate your business
                  </p>
                </div>

                {/* Site Authority */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.borderColor = '#29377f';
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderWidth = '';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Site Authority</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Technical SEO, page speed, mobile optimization, and content quality that boost search rankings
                  </p>
                </div>

                {/* Strategic SEO */}
                <div
                  className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 group cursor-default"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05) translateY(-8px)';
                    e.currentTarget.style.borderColor = '#29377f';
                    e.currentTarget.style.borderWidth = '2px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = '';
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.borderWidth = '';
                  }}
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">Strategic SEO</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    High-value content, semantic analysis, and service pages that attract patients searching for profitable procedures
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-6">
                  Discover your Digital Authority Score and see where you rank
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-block font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg bg-secondary text-gray-900 hover:bg-secondary/90 hover:shadow-xl transform hover:scale-105"
                >
                  Get Your Free Scan Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
