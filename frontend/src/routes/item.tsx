import { createFileRoute } from '@tanstack/react-router';
import { GiantBox } from '@app/components/giantbox_feature/GiantBox';
import { CardsCarousel } from '@app/components/cardcarousel/CardsCarousel';
import { FeaturesCard } from '@app/components/featurecard/FeaturesCard';

export const Route = createFileRoute('/item')({
  component: () => {
    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '20px' }}>
          <CardsCarousel />
        </div>
        <div style={{
          display: 'flex', 
          gap: '20px', 
          justifyContent: 'space-between',
            alignItems: 'flex-start' 
          }}>
    <div style={{ flex: 1, maxWidth: '400px' }}> 
        <FeaturesCard />
    </div>
    <div style={{ flex: 1 }}> 
        <GiantBox />
    </div>
</div>

      </div>
    );
  },
});


