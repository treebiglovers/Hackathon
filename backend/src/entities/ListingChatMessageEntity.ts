import { Entity, ManyToOne, Property } from "@mikro-orm/mysql";
import { EntityBase, MemberEntity } from "./";
import
{
    ListingChatMessageCreateDTO
} from "@common/dtos/members/listings/chats/ListingChatMessageCreateDTO";
import { LimitConstants } from "@common/constants/LimitConstants";
import { ListingChatEntity } from "@backend/entities/ListingChatEntity";

@Entity()
export class ListingChatMessageEntity extends EntityBase
{
    @Property({ length: LimitConstants.MAX_LISTING_CHAT_MESSAGE_LENGTH })
    content: string;
    
    @ManyToOne(() => MemberEntity)
    authorMember: MemberEntity
    
    @ManyToOne(() => ListingChatEntity)
    owningListingChat: ListingChatEntity;

    constructor(
        listingChatMessageCreateDTO: ListingChatMessageCreateDTO,
        authorMember: MemberEntity,
        owningListingChat: ListingChatEntity)
    {
        super();
        
        this.content = listingChatMessageCreateDTO.content;
        
        this.authorMember = authorMember;

        this.owningListingChat = owningListingChat;
    }
}