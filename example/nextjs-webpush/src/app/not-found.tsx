import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-500">Not Found</h2>
      <p>Could not find requested resource.</p>
      <Link className="block mt-6 hover:underline hover:underline-offset-4" href="/">
        Return Home
      </Link>
    </div>
  );
}
