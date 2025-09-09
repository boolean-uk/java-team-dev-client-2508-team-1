import React, { useState, useRef, useEffect } from "react";

function DropdownMenu({
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedOptions = Array.isArray(options)
    ? options.map((opt) =>
        typeof opt === "object"
          ? { label: opt.label, value: opt.value }
          : { label: opt, value: opt }
      )
    : [];

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  return (
    <div className="inputwrapper" ref={dropdownRef} style={{ position: "relative" }}>
      {label && <label>{label}</label>}
      <button
        type="button"
        onClick={toggleDropdown}
        className="dropbtn"
      >
        {selectedOption?.label || placeholder}
      </button>

      {isOpen && (
        <ul
          className="dropdown-menu"
        >
          {normalizedOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              style={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                backgroundColor: value === option.value ? "#f0f0f0" : "#fff",
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
