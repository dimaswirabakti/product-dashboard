"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Setiap kali `value` berubah, set timer baru
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: kalau `value` berubah lagi sebelum timer selesai,
    // batalkan timer yang lama, buat timer baru.
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
