import { SuggestionClient } from './SuggestionClient';

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/suggestion`, {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch suggestions');
  }

  const { data } = await response.json();
  return data;
}

export default async function SuggestionPage() {
  const suggestions = await getData();

  return (
    <SuggestionClient
      initialSuggestions={suggestions}
    />
  );
}