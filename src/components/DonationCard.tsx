interface DonationTier {
  name: string;
  description: string;
  price: number; // USD u otra moneda
}
export default function DonationCard({ tier, onDonate }: { tier: DonationTier; onDonate: (t: DonationTier) => void }) {
  return (
    <div className="bg-lineageGray border border-gray-700 rounded-lg p-6 flex flex-col">
      <h4 className="text-lineageGold font-serif text-lg">{tier.name}</h4>
      <p className="mt-2 text-gray-200">{tier.description}</p>
      <div className="mt-4 text-xl font-serif">${tier.price}</div>
      <button
        onClick={() => onDonate(tier)}
        className="mt-6 px-4 py-2 bg-lineageGold text-black rounded-md hover:opacity-90"
      >
        Donar
      </button>
    </div>
  );
}
