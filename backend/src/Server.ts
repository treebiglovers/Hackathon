import http from "http";
import "reflect-metadata";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { EntityManager, EntityRepository, MikroORM, RequestContext } from "@mikro-orm/mysql";
import { MemberEntity, MemberCredentialsEntity, MemberListingEntity } from "./entities";
import { API_ROUTER } from "./routes/APIRouter";
import { ResponseHelpers } from "@backend/helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import cors from "cors";
import defineConfig from "../src/mikro-orm.config";
import { ListingChatEntity } from "@backend/entities/ListingChatEntity";
import { ListingChatMessageEntity } from "@backend/entities/ListingChatMessageEntity";
import { MemberRatingEntity } from "@backend/entities/MemberRatingEntity";

export const DI = {} as
{
    server: http.Server;
    orm: MikroORM,
    entityManager: EntityManager,
    memberRepo: EntityRepository<MemberEntity>,
    memberCredentialsRepo: EntityRepository<MemberCredentialsEntity>,
    memberListingsRepo: EntityRepository<MemberListingEntity>,
    memberListingChatsRepo: EntityRepository<ListingChatEntity>,
    memberListingChatMessagesRepo: EntityRepository<ListingChatMessageEntity>,
    memberRatingRepo: EntityRepository<MemberRatingEntity>,
};

dotenv.config();

export const app = express();

// More on why I am deviating from the default port of 5000 in labsheets:
// https://stackoverflow.com/questions/70913242/access-to-localhost-was-denied-you-dont-have-authorization-to-view-this-page-h
const PORT = process.env.PORT || 6969;

export const startAsync = (async () =>
{
    DI.orm = await MikroORM.init(defineConfig);

    const entityManager = DI.entityManager = DI.orm.em;

    DI.memberRepo = entityManager.getRepository(MemberEntity);
    DI.memberCredentialsRepo = entityManager.getRepository(MemberCredentialsEntity);
    DI.memberListingsRepo = entityManager.getRepository(MemberListingEntity);
    DI.memberListingChatsRepo = entityManager.getRepository(ListingChatEntity);
    DI.memberListingChatMessagesRepo = entityManager.getRepository(ListingChatMessageEntity);
    DI.memberRatingRepo = entityManager.getRepository(MemberRatingEntity);

    const CORS_OPTIONS =
    {
        origin: true,
        optionsSuccessStatus: 200
    };

    app.use(cors(CORS_OPTIONS));

    app.use(express.json());

    app.use((req: Request, res: Response, next: NextFunction) => RequestContext.create(DI.orm.em, next));

    app.use("/api", API_ROUTER);

    app.get("/", (req: Request, res: Response) =>
    {
        res.json({ message: "I love LendMe!!!" });
    });

    app.use((req: Request, res: Response, next: NextFunction) =>
    {
        ResponseHelpers.respondWithNotFoundError(
            res,
            ErrorDTO.fromCustom("No such endpoint!")
        );
    });

    DI.server = app.listen(PORT, () =>
    {
        console.log(`FWEB server is listening at http://localhost:${PORT} !`);
    });
});

startAsync().catch((error) =>
{
    console.error(error);
});