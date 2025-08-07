"use client";
import { useState } from "react";

export type ShippingInfo = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export default function ShippingForm({
  onSubmit,
}: {
  onSubmit: (info: ShippingInfo) => void;
}) {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(shippingInfo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-4 rounded-md mb-6"
    >
      <h2 className="text-lg font-semibold">Shipping Information</h2>
      {(Object.keys(shippingInfo) as (keyof ShippingInfo)[]).map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field[0].toUpperCase() + field.slice(1)}
          value={shippingInfo[field]}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-sm"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </form>
  );
}
