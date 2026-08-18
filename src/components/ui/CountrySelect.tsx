import { useEffect, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

interface Country {
  code: string;
  name: string;
}

const countries: Country[] = [
  { code: "PK", name: "Pakistan" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "QA", name: "Qatar" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "TR", name: "Turkey" },
  { code: "MY", name: "Malaysia" },
  { code: "SG", name: "Singapore" },
];

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
}

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find((country) => country.name === value);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (country: Country) => {
    onChange(country.name);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Selected Country */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between border border-neutral-300 bg-white px-4 py-3 text-left outline-none focus:border-neutral-950"
      >
        {selectedCountry ? (
          <span className="flex items-center gap-3">
            <ReactCountryFlag
              countryCode={selectedCountry.code}
              svg
              style={{
                width: "1.4em",
                height: "1.4em",
              }}
            />

            <span>{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="text-neutral-500">{placeholder}</span>
        )}

        <span className="text-sm">▼</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-1 border border-neutral-300 bg-white shadow-lg">
          {/* Search */}
          <div className="border-b border-neutral-200 p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              autoFocus
              className="w-full border border-neutral-300 px-3 py-2 outline-none focus:border-neutral-950"
            />
          </div>

          {/* Countries */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-100"
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{
                      width: "1.4em",
                      height: "1.4em",
                    }}
                  />

                  <span>{country.name}</span>
                </button>
              ))
            ) : (
              <p className="px-4 py-3 text-sm text-neutral-500">
                No countries found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
