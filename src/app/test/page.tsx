import Image from "next/image";

export default function TestImage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Test Image</h1>
      <Image
        src="https://via.placeholder.com/300x200"
        alt="Placeholder"
        width={300}
        height={200}
      />
    </div>
  );
}
