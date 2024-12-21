import { createFileRoute } from '@tanstack/react-router'
import { CardsCarousel } from '@app/components/cardcarousel/CardsCarousel'

export const Route = createFileRoute('/item')({
  component: () => {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Blah blah UwU</h1>
        <CardsCarousel />
      </div>
    );
  },
});
