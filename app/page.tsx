"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search for places when user types practice name
  const handlePracticeNameChange = (value: string) => {
    setFormData({ ...formData, practiceName: value });

    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Only search if there's actual text (at least 3 characters)
    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Debounce the search
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch("/api/search-places", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: value,
            city: formData.city || undefined,
            state: formData.state || undefined,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.places || []);
          setShowSuggestions(data.places && data.places.length > 0);
        }
      } catch (error) {
        console.error("Error searching places:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // Wait 500ms after user stops typing
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (place: PlaceSuggestion) => {
    setFormData({
      ...formData,
      practiceName: place.name,
      address: place.address,
      phone: place.phone ? formatPhoneNumber(place.phone) : "",
      websiteUrl: place.website,
      city: place.city,
      state: place.state,
    });
    setShowSuggestions(false);
    setSuggestions([]);
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <Image
                src="/hr4sight-logo.png"
                alt="HR4Sight"
                width={200}
                height={50}
                className="h-12 w-auto transform group-hover:scale-105 transition-transform duration-300"
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
                href="/about-hr4sight"
                className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200"
              >
                About HR4Sight
              </a>
              <button
                onClick={() => {
                  document.getElementById('scan-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold px-6 py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl hover:scale-105 relative overflow-hidden group bg-secondary text-gray-900"
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
                FREE HR COMPLIANCE ASSESSMENT
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Is Your Company{" "}
                <span className="text-primary relative inline-block">
                  Fully Compliant
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8C40 4 80 2 120 4C160 6 180 8 200 7" stroke="#fbab3f" strokeWidth="4" strokeLinecap="round"/>
                  </svg>
                </span>{" "}
                With Employment Laws?
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Get your <span className="font-bold text-gray-900">HR Compliance Score</span> and discover if{" "}
                <span className="font-bold text-primary">your organization is at risk</span> from the ever-changing landscape of federal and state employment laws.
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
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">Comprehensive Compliance Check</p>
                    <p className="text-gray-600">Analysis across federal and state employment laws</p>
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
                    <p className="text-gray-600">Get your detailed compliance report delivered via email</p>
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
                    <p className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors duration-300">Risk Mitigation Guidance</p>
                    <p className="text-gray-600">Know exactly what needs attention to reduce employer risk</p>
                  </div>
                </div>
              </div>

              {/* Social Proof Stats */}
              <div
                className="bg-primary text-white grid grid-cols-3 gap-6 p-8 rounded-2xl shadow-xl group cursor-default"
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
                  <div className="text-5xl font-extrabold mb-2 transition-colors duration-300 group-hover:text-secondary">100K+</div>
                  <div className="text-sm font-medium">Bills & Regulations Tracked</div>
                </div>
                <div className="text-center border-x border-white/30 transition-transform duration-300 hover:scale-110">
                  <div className="text-5xl font-extrabold mb-2 transition-colors duration-300 group-hover:text-secondary">50+</div>
                  <div className="text-sm font-medium">State Jurisdictions</div>
                </div>
                <div className="text-center transition-transform duration-300 hover:scale-110">
                  <div className="text-5xl font-extrabold mb-2 transition-colors duration-300 group-hover:text-secondary">24/7</div>
                  <div className="text-sm font-medium">Compliance Monitoring</div>
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
                    <div className="relative" ref={suggestionsRef}>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={formData.practiceName}
                          onChange={(e) => handlePracticeNameChange(e.target.value)}
                          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                          placeholder="Acme Corporation"
                          autoComplete="off"
                        />
                        {isSearching && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Suggestions Dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-primary/20 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                          {suggestions.map((place, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSelectSuggestion(place)}
                              className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              <div className="font-semibold text-gray-900">{place.name}</div>
                              <div className="text-sm text-gray-600 mt-1">{place.fullAddress}</div>
                              {place.phone && (
                                <div className="text-sm text-gray-500 mt-1">{place.phone}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
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
                        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-gray-900 placeholder-gray-400 hover:border-gray-300"
                        placeholder="yourpractice.com"
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
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg relative overflow-hidden group bg-primary text-white"
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
                Our HR Compliance Assessment analyzes your organization's readiness across federal and state employment laws
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 transition-colors duration-300 group-hover:text-primary">We Analyze Compliance</h3>
                <p className="text-gray-600">
                  Our system reviews your organization against current federal and state employment laws and regulations.
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
                  Receive your HR Compliance Score and detailed breakdown via email with actionable recommendations.
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

            {/* HR4Sight Features */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 md:p-12 border-2 border-gray-100">
              <div className="text-center mb-10">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
                  HR4Sight™ Features
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  The all-in-one source for current HR and employment laws, as well as upcoming and proposed changes
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {/* proTRACK */}
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
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">proTRACK™</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Track 100,000+ federal and state bills and regulations with our HR-specific legislative tracker built on NexisLexis StateNet.
                  </p>
                </div>

                {/* proCOMPLY */}
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
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">proCOMPLY™</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get members-only email alerts for new employment law bills and laws with essential dates and deadlines.
                  </p>
                </div>

                {/* proSHARE */}
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
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">proSHARE™</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Edit, print, save to PDF, and email directly from webpages and posts to get information in the right hands fast.
                  </p>
                </div>

                {/* proSEARCH */}
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
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">proSEARCH™</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Find the right information fast with our exclusive search functionality and links to source government websites.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-gray-600 mb-6">
                  Get started today and reduce your compliance risk
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="inline-block font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg text-lg bg-secondary text-gray-900 hover:bg-primary hover:text-white hover:shadow-xl transform hover:scale-105"
                >
                  Get Your Free Assessment Now
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
