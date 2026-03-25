/**
 * Default Users for Demo Mode
 * These users are automatically created when the app starts
 */

export const DEFAULT_USERS = [
  {
    id: 'user-buyer1',
    email: 'buyer1@test.com',
    password: 'buy01',
    name: 'John Buyer',
    role: 'buyer',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-seller1',
    email: 'Seller1@test.com',
    password: 'user1',
    name: 'Demo Seller',
    role: 'seller',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-buyer2',
    email: 'buyer2@test.com',
    password: 'buyer123',
    name: 'Jane Buyer',
    role: 'buyer',
    created_at: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'user-seller2',
    email: 'seller2@test.com',
    password: 'seller123',
    name: 'Tech Store',
    role: 'seller',
    created_at: '2024-01-01T00:00:00.000Z'
  }
];

/**
 * Initialize default users in localStorage
 */
export function initializeDefaultUsers() {
  const existingUsers = JSON.parse(localStorage.getItem('w3mart_users') || '[]');
  
  // Only add default users if they don't exist
  DEFAULT_USERS.forEach(defaultUser => {
    const exists = existingUsers.find(u => u.email.toLowerCase() === defaultUser.email.toLowerCase());
    if (!exists) {
      existingUsers.push(defaultUser);
      console.log('✅ Added default user:', defaultUser.email);
    }
  });
  
  localStorage.setItem('w3mart_users', JSON.stringify(existingUsers));
  console.log(`📋 Total users in system: ${existingUsers.length}`);
}
