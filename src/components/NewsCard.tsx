interface Props {
  title: string;
  date: string;
  excerpt: string;
}
export default function NewsCard({ title, date, excerpt }: Props) {
  return (
    <article className="bg-lineageGray border border-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-serif text-lineageGold">{title}</h3>
      <p className="text-xs text-gray-400">{date}</p>
      <p className="mt-2 text-gray-200">{excerpt}</p>
    </article>
  );
}
