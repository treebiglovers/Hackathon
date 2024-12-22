import { createFileRoute } from '@tanstack/react-router'
import { GiantBox } from '@app/components/giantbox_feature/GiantBox.tsx'
import { CardsCarousel } from '@app/components/cardcarousel/CardsCarousel.tsx'
import { FeaturesCard } from '@app/components/featurecard/FeaturesCard.tsx'
import { useGetMemberListingAsync } from "@app/apis/ListingAPIs.ts";
import { CenteredImage } from "@app/components/images/CenteredImage.tsx";
import { AssetPathConstants } from "@app/constants/AssetPathConstants.ts";
import { ErrorComponent } from "@app/components/errors/ErrorComponent.tsx";

export const Route = createFileRoute('/listings/$id')(
{
    component: () => 
    {
        const { id } = Route.useParams();
        
        const
        {
            isLoading,
            isError,
            data,
            error,
        } = useGetMemberListingAsync(id);

        if (isLoading)
        {
            return <CenteredImage src={AssetPathConstants.JanaWaddleSm0l} />;
        }

        if (isError)
        {
            return (
                <ErrorComponent
                    errorCode={0}
                    errorMessage={error.message}
                />
            );
        }
        
        return (
            <div
                style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <CardsCarousel />
                </div>

                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                    }}
                >
                    <div style={{ flex: 1, maxWidth: '400px' }}>
                        <FeaturesCard memberDTO={data!.owningMember} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <GiantBox memberListingDTO={data!} />
                    </div>
                </div>
            </div>
        )
    },
})
