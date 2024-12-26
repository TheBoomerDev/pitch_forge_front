import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BLOCKED_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com'
];

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const isEarlyAccess = () => {
    const deadline = new Date('2025-01-10');
    return new Date() <= deadline;
  };

  const isValidBusinessEmail = (email) => {
    const domain = email.split('@')[1]?.toLowerCase();
    return !BLOCKED_DOMAINS.includes(domain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    if (!isValidBusinessEmail(email)) {
      setStatus('error');
      setError('Please use your business email address.');
      return;
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email,
          isEarlyAccess: isEarlyAccess()
        })
      });

      if (!response.ok) throw new Error('Subscription failed');
      
      setStatus('success');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Join our Waitlist</h2>
        {isEarlyAccess() && (
          <p className="text-green-600 font-medium">
            🎉 Early access: 50% lifetime discount if you join before January 10th!
          </p>
        )}
        <p className="text-sm text-gray-600">Please use your business email address</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your business email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
          disabled={status === 'loading'}
        />

        <Button 
          type="submit"
          className="w-full"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </form>

      {status === 'success' && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            You're on the list! Check your email for confirmation.
          </AlertDescription>
        </Alert>
      )}

      {status === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WaitlistForm;