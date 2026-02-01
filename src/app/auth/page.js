'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const { login, signup, resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        console.log('🔐 Attempting login...');
        // DON'T redirect here - let AuthContext handle it based on role
        await login(formData.email, formData.password);
        // AuthContext will redirect to /admin or /dashboard based on role
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        console.log('📝 Attempting signup...');
        // DON'T redirect here - let AuthContext handle it
        await signup(formData.email, formData.password, formData.displayName);
        // AuthContext will redirect to appropriate dashboard
      }
    } catch (err) {
      console.error('❌ Auth error:', err);
      setError(err.message);
      setLoading(false);
    }
    // Don't set loading to false on success - the redirect will happen
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setError('');
    
    try {
      await resetPassword(resetEmail);
      setResetMessage('Password reset email sent! Check your inbox.');
      setResetEmail('');
      setTimeout(() => {
        setShowReset(false);
        setResetMessage('');
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-3xl">GC</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Grace Church</h1>
          <p className="text-blue-200">Welcome back to our community</p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {!showReset ? (
            <>
              {/* Toggle Tabs */}
              <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    isLogin
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  <FaSignInAlt className="inline mr-2" />
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    !isLogin
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  <FaUserPlus className="inline mr-2" />
                  Register
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <FaUser className="inline mr-2 text-amber-600" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                      placeholder="John Doe"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaEnvelope className="inline mr-2 text-amber-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaLock className="inline mr-2 text-amber-600" />
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                    placeholder="••••••••"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <FaLock className="inline mr-2 text-amber-600" />
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => setShowReset(true)}
                      className="text-amber-600 hover:underline text-sm font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Password Reset Form */}
              <div className="mb-6">
                <button
                  onClick={() => setShowReset(false)}
                  className="text-amber-600 hover:underline text-sm font-medium mb-4"
                >
                  ← Back to Login
                </button>
                <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
                <p className="text-gray-600">Enter your email to receive a password reset link</p>
              </div>

              {resetMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                  {resetMessage}
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleReset} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaEnvelope className="inline mr-2 text-amber-600" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
                    placeholder="john@example.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-600 font-semibold hover:underline"
              >
                {isLogin ? 'Create one' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-blue-200 text-sm mt-6">
          Need help? Contact us at{' '}
          <a href="mailto:info@gracechurch.org" className="text-amber-400 hover:underline font-semibold">
            info@gracechurch.org
          </a>
        </p>
      </div>
    </div>
  );
}