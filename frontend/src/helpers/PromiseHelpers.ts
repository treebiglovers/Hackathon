import {notifications} from "@mantine/notifications";

export class PromiseHelpers
{
    static async delayMS(ms: number): Promise<void>
    {
        return new Promise<void>(
            resolve => setTimeout(resolve, ms)
        );
    }

    // Wrap a promise, showing the error in notification
    
    static async propagateErrorsToNotificationSystem<T>(promise: Promise<T>): Promise<T>
    {
        try
        {
            return await promise;
        }
        
        catch (error)
        {
            notifications.clean();
            
            notifications.show(
            {
                title: "An error has occurred",
                message: error!.toString(),
                color: "red",
            });
            
            throw error;
        }
    }
}