import { useState } from 'react';

export default function Home() {
  const [goal, setGoal] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setResponse('');
    const res = await fetch('/api/advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal }),
    });
    const data = await res.json();
    if (data.answer) setResponse(data.answer);
    else setResponse('Error getting advice');
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vitamin Advisor</h1>
      <input
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your vitamin goal"
        style={{ width: '300px' }}
      />
      <button onClick={submit} disabled={loading} style={{ marginLeft: '1rem' }}>
        {loading ? 'Loading...' : 'Get Advice'}
      </button>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: '2rem' }}>{response}</pre>
    </div>
  );
}
