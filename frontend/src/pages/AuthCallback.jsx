import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import supabaseService from '../services/supabaseService';

export default function AuthCallback({ onLogin }) {
  const navigate = useNavigate();

  useEffect(() => {
    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCallback = async () => {
    try {
      console.log('🔄 Processing OAuth callback...');
      
      // Get the session from URL hash
      const { data: { session }, error } = await supabaseService.client.auth.getSession();
      
      if (error) {
        console.error('Session error:', error);
        throw error;
      }
      
      if (session && session.user) {
        console.log('✅ User authenticated:', session.user.email);
        
        const user = session.user;
        const email = user.email;
        const name = user.user_metadata?.full_name || user.user_metadata?.name || email.split('@')[0];
        
        // Check if user exists in our users table
        const { data: existingUser, error: fetchError } = await supabaseService.client
          .from('users')
          .select('*')
          .eq('email', email)
          .single();
        
        let role = 'buyer'; // default role
        
        if (existingUser) {
          console.log('✅ Existing user found');
          role = existingUser.role;
        } else {
          console.log('📝 Creating new user in users table...');
          // Create new user in users table
          const { error: insertError } = await supabaseService.client
            .from('users')
            .insert([{
              id: user.id,
              email: email,
              name: name,
              role: 'buyer', // default for Google OAuth
              created_at: new Date().toISOString()
            }]);
          
          if (insertError) {
            console.error('Error creating user:', insertError);
            // Continue anyway - user is authenticated
          } else {
            console.log('✅ User created in users table');
          }
        }
        
        // Also save to localStorage for demo mode compatibility
        const storedUsers = JSON.parse(localStorage.getItem('w3mart_users') || '[]');
        const localUser = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (!localUser) {
          storedUsers.push({
            id: user.id,
            email: email,
            name: name,
            role: role,
            password: 'google-oauth', // placeholder
            created_at: new Date().toISOString()
          });
          localStorage.setItem('w3mart_users', JSON.stringify(storedUsers));
          console.log('✅ User saved to localStorage');
        }
        
        const userData = {
          id: user.id,
          email: email,
          name: name,
          role: role,
          walletAddress: null
        };
        
        onLogin(userData);
        toast.success(`Welcome ${name}!`);
        navigate('/');
      } else {
        console.error('No session found');
        toast.error('Authentication failed');
        navigate('/login');
      }
    } catch (error) {
      console.error('Auth callback error:', error);
      toast.error('Authentication error occurred');
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Completing authentication...</p>
      </div>
    </div>
  );
}
