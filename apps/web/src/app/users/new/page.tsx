import Link from 'next/link';
import { CreateUserForm } from '@/components/create-user-form';

export default function NewUserPage() {
  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="mb-4">
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          ← Back to Users
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Create New User</h1>
      
      <CreateUserForm />
    </div>
  );
}