import {
  Arg,
  Args,
  Mutation,
  Query,
  Root,
  Resolver,
  FieldResolver,
  ObjectType,
  Field,
  Int,
  ArgsType,
  Info,
  Ctx,
} from 'type-graphql';
import graphqlFields from 'graphql-fields';
import { Inject } from 'typedi';
import { Min } from 'class-validator';
import {
  Fields,
  StandardDeleteResponse,
  UserId,
  PageInfo,
  RawFields,
  NestedFields,
  BaseContext,
} from '@subsquid/warthog';

import {
  NftEntityCreateInput,
  NftEntityCreateManyArgs,
  NftEntityUpdateArgs,
  NftEntityWhereArgs,
  NftEntityWhereInput,
  NftEntityWhereUniqueInput,
  NftEntityOrderByEnum,
} from '../../warthog';

import { NftEntity } from './nft-entity.model';
import { NftEntityService } from './nft-entity.service';

@ObjectType()
export class NftEntityEdge {
  @Field(() => NftEntity, { nullable: false })
  node!: NftEntity;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class NftEntityConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [NftEntityEdge], { nullable: false })
  edges!: NftEntityEdge[];

  @Field(() => PageInfo, { nullable: false })
  pageInfo!: PageInfo;
}

@ArgsType()
export class ConnectionPageInputOptions {
  @Field(() => Int, { nullable: true })
  @Min(0)
  first?: number;

  @Field(() => String, { nullable: true })
  after?: string; // V3: TODO: should we make a RelayCursor scalar?

  @Field(() => Int, { nullable: true })
  @Min(0)
  last?: number;

  @Field(() => String, { nullable: true })
  before?: string;
}

@ArgsType()
export class NftEntityConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => NftEntityWhereInput, { nullable: true })
  where?: NftEntityWhereInput;

  @Field(() => NftEntityOrderByEnum, { nullable: true })
  orderBy?: [NftEntityOrderByEnum];
}

@Resolver(NftEntity)
export class NftEntityResolver {
  constructor(@Inject('NftEntityService') public readonly service: NftEntityService) {}

  @Query(() => [NftEntity])
  async nftEntities(
    @Args() { where, orderBy, limit, offset }: NftEntityWhereArgs,
    @Fields() fields: string[]
  ): Promise<NftEntity[]> {
    return this.service.find<NftEntityWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => NftEntity, { nullable: true })
  async nftEntityByUniqueInput(
    @Arg('where') where: NftEntityWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<NftEntity | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => NftEntityConnection)
  async nftEntitiesConnection(
    @Args() { where, orderBy, ...pageOptions }: NftEntityConnectionWhereArgs,
    @Info() info: any
  ): Promise<NftEntityConnection> {
    const rawFields = graphqlFields(info, {}, { excludedFields: ['__typename'] });

    let result: any = {
      totalCount: 0,
      edges: [],
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
    // If the related database table does not have any records then an error is thrown to the client
    // by warthog
    try {
      result = await this.service.findConnection<NftEntityWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<NftEntityConnection>;
  }
}
