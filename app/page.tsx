import Link from 'next/link';
import NotificationForm from '@/components/NotificationForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Notification Sender</h1>
      <NotificationForm />
      <div className="mt-8 text-center">
        <Link href="/history" className="text-blue-500 hover:underline">
          View Notification History
        </Link>
      </div>
    </div>
  );
}