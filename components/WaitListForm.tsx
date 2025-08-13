import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

interface SubscribeRequest {
    name: string;
    email: string;
}

interface SubscribeResponse {
    error?: string;
    [key: string]: any;
}

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email } as SubscribeRequest),
    });

    const data: SubscribeResponse = await res.json();
    if (res.ok) {
        setStatus('Subscribed successfully!');
        setName('');
        setEmail('');
    } else {
        setStatus(data.error || 'Something went wrong');
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Join Waitlist</Button>
      <p>{status}</p>
    </form>
  );
}
