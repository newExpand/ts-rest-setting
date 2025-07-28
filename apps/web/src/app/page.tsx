import Link from 'next/link';
import { apiClient } from '@/lib/api-client';

async function getApiStatus() {
  try {
    const result = await apiClient.health.check();
    return result.status === 200 ? 'healthy' : 'unhealthy';
  } catch {
    return 'offline';
  }
}

export default async function Home() {
  const apiStatus = await getApiStatus();

  return (
    <div className="font-sans min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">ts-rest Monorepo Example</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">API Status</h2>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                apiStatus === 'healthy' ? 'bg-green-500' : 
                apiStatus === 'unhealthy' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="capitalize">{apiStatus}</span>
            </div>
            <p className="text-gray-600 mt-2">
              API running on port 4300
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/users" className="text-blue-600 hover:text-blue-800">
                  → View Users
                </Link>
              </li>
              <li>
                <Link href="/users/new" className="text-blue-600 hover:text-blue-800">
                  → Create New User
                </Link>
              </li>
              <li>
                <a href="http://localhost:4300/api/health" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  → API Health Check
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">About this Example</h2>
          <p className="text-gray-700">
            This is a monorepo example using ts-rest for type-safe API communication between:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>Next.js 15 frontend (port 4200)</li>
            <li>NestJS backend (port 4300)</li>
            <li>Shared API contract package</li>
          </ul>
        </div>
      </main>
    </div>
  );
}