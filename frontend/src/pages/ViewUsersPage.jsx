import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import supabaseService from '../services/supabaseService';

export default function ViewUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supabaseUsers, setSupabaseUsers] = useState([]);
  const [loadingSupabase, setLoadingSupabase] = useState(false);

  useEffect(() => {
    loadLocalUsers();
  }, []);

  const loadLocalUsers = () => {
    // Load from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('w3mart_users') || '[]');
    setUsers(storedUsers);
    setLoading(false);
  };

  const loadSupabaseUsers = async () => {
    setLoadingSupabase(true);
    try {
      // Try to fetch from Supabase users table
      const { data, error } = await supabaseService.client
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading Supabase users:', error);
        alert('Could not load users from Supabase: ' + error.message);
      } else {
        setSupabaseUsers(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error connecting to Supabase');
    } finally {
      setLoadingSupabase(false);
    }
  };

  const clearLocalStorage = () => {
    if (window.confirm('Are you sure you want to clear all local users? This cannot be undone!')) {
      localStorage.removeItem('w3mart_users');
      setUsers([]);
      alert('Local users cleared!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">👥 User Management</h1>
          <p className="text-gray-600">View all registered users from localStorage and Supabase</p>
        </div>

        {/* LocalStorage Users */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              💾 LocalStorage Users ({users.length})
            </h2>
            <div className="space-x-2">
              <Button onClick={loadLocalUsers} variant="outline">
                🔄 Refresh
              </Button>
              <Button onClick={clearLocalStorage} variant="destructive">
                🗑️ Clear All
              </Button>
            </div>
          </div>

          {users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No users found in localStorage</p>
              <p className="text-sm mt-2">Users will appear here after signup</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{user.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'seller' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Supabase Users */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              ☁️ Supabase Users ({supabaseUsers.length})
            </h2>
            <Button 
              onClick={loadSupabaseUsers} 
              disabled={loadingSupabase}
              className="bg-green-600 hover:bg-green-700"
            >
              {loadingSupabase ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </>
              ) : (
                '📥 Load from Supabase'
              )}
            </Button>
          </div>

          {supabaseUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No users loaded from Supabase yet</p>
              <p className="text-sm mt-2">Click "Load from Supabase" to fetch users</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {supabaseUsers.map((user, index) => (
                    <tr key={user.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600 font-mono">{user.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'seller' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">📝 How to Use</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>LocalStorage Users:</strong> Shows users stored in your browser (demo mode)</li>
            <li>• <strong>Supabase Users:</strong> Shows users stored in your Supabase database</li>
            <li>• When you signup, users are saved to BOTH localStorage and Supabase</li>
            <li>• Demo accounts (buyer1@test.com, Seller1@test.com) are in localStorage only</li>
            <li>• Click "Load from Supabase" to see users in your database</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
