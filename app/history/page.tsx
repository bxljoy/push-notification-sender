import Link from 'next/link';
import NotificationHistory from '@/components/NotificationHistory';

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Notification History</h1>
      <NotificationHistory />
    </div>
  );
}