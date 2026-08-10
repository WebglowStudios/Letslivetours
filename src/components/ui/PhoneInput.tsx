"use client";

import React, { useState, useRef, useEffect } from "react";

export const COUNTRIES = [
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "MY", dialCode: "+60", flag: "🇲🇾" },
  { name: "New Zealand", code: "NZ", dialCode: "+64", flag: "🇳🇿" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Switzerland", code: "CH", dialCode: "+41", flag: "🇨🇭" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Qatar", code: "QA", dialCode: "+974", flag: "🇶🇦" },
  { name: "Oman", code: "OM", dialCode: "+968", flag: "🇴🇲" },
  { name: "Kuwait", code: "KW", dialCode: "+965", flag: "🇰🇼" },
  { name: "Bahrain", code: "BH", dialCode: "+973", flag: "🇧🇭" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  required?: boolean;
}

export default function PhoneInput({ value, onChange, className = "", style, placeholder = "Phone Number", required = false }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse initial value (e.g. "+91 9876543210")
  const [dialCode, setDialCode] = useState("+91");
  const [localNumber, setLocalNumber] = useState("");

  useEffect(() => {
    // Only parse if value looks like it has a dial code and we haven't synced it yet
    if (value && value !== `${dialCode} ${localNumber}` && value !== `${dialCode}${localNumber}`) {
      let matchedCode = "+91";
      let localPart = value;
      
      if (value.startsWith("+")) {
        const sortedCountries = [...COUNTRIES].sort((a, b) => b.dialCode.length - a.dialCode.length);
        for (const country of sortedCountries) {
          if (value.startsWith(country.dialCode + " ") || value.startsWith(country.dialCode)) {
            matchedCode = country.dialCode;
            localPart = value.substring(country.dialCode.length).trim();
            break;
          }
        }
      }
      
      setDialCode(matchedCode);
      setLocalNumber(localPart);
    }
  }, [value, dialCode, localNumber]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocal = e.target.value.replace(/[^\d\s-]/g, "");
    setLocalNumber(newLocal);
    onChange(`${dialCode} ${newLocal}`);
  };

  const selectCountry = (code: string) => {
    setDialCode(code);
    setIsOpen(false);
    setSearch("");
    onChange(`${code} ${localNumber}`);
  };

  const selectedCountry = COUNTRIES.find((c) => c.dialCode === dialCode) || COUNTRIES[0];
  const filteredCountries = COUNTRIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.dialCode.includes(search)
  );

  return (
    <div 
      className={`phone-input-wrapper ${className}`} 
      style={{ 
        position: "relative", 
        display: "flex", 
        alignItems: "stretch", 
        backgroundColor: "var(--iv)", 
        border: "1px solid var(--line2)", 
        borderRadius: "8px", 
        transition: "border-color .2s",
        ...style 
      }} 
      ref={dropdownRef}
    >
      {/* Country Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "0 12px",
          background: "transparent",
          border: "none",
          borderRight: "1px solid var(--line2)",
          cursor: "pointer",
          fontSize: "13px",
          color: "var(--ink2)",
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: "16px", lineHeight: 1 }}>{selectedCountry.flag}</span>
        <span>{selectedCountry.dialCode}</span>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          marginTop: "4px",
          width: "280px",
          background: "#ffffff",
          border: "1px solid var(--line2)",
          borderRadius: "12px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          zIndex: 999,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ padding: "8px", borderBottom: "1px solid var(--line2)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ink3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              autoFocus
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "100%", border: "none", outline: "none", fontSize: "13px", color: "var(--ink)" }}
            />
          </div>
          <div style={{ maxHeight: "240px", overflowY: "auto", padding: "4px" }}>
            {filteredCountries.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => selectCountry(c.dialCode)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  background: dialCode === c.dialCode ? "var(--iv2)" : "transparent",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "13px",
                  color: dialCode === c.dialCode ? "var(--ink)" : "var(--ink2)",
                  fontWeight: dialCode === c.dialCode ? 600 : 400
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--iv2)")}
                onMouseLeave={(e) => {
                  if (dialCode !== c.dialCode) e.currentTarget.style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px" }}>{c.flag}</span>
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                <span style={{ color: "var(--ink4)", fontSize: "12px" }}>{c.dialCode}</span>
              </button>
            ))}
            {filteredCountries.length === 0 && (
              <p style={{ textAlign: "center", padding: "16px 0", fontSize: "12px", color: "var(--ink3)", margin: 0 }}>No countries found</p>
            )}
          </div>
        </div>
      )}

      {/* Phone Number Input */}
      <input
        type="tel"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder={placeholder}
        required={required}
        className="form-input-no-border"
        style={{
          flex: 1,
          width: "100%",
          padding: "10px 12px",
          background: "transparent",
          border: "none",
          outline: "none",
          fontSize: "14px",
          color: "var(--ink)",
        }}
      />
    </div>
  );
}
