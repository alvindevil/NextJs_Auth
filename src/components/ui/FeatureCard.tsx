interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-md transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
