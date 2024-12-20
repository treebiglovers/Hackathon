export class PlaceHolderHelpers
{
    public static generatePlaceholderURL(width: number, height: number): string
    {
        return `https://placehold.co/${width}x${height}`;
    }
}