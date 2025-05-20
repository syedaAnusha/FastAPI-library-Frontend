import { useDeferredValue, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({
  placeholder,
  value,
  onChange,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const deferredValue = useDeferredValue(inputValue);

  useEffect(() => {
    onChange(deferredValue);
  }, [deferredValue, onChange]);

  return (
    <Input
      type="text"
      placeholder={placeholder}
      className="pl-10"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
