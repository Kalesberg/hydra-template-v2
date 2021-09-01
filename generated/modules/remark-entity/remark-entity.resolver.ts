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
  RemarkEntityCreateInput,
  RemarkEntityCreateManyArgs,
  RemarkEntityUpdateArgs,
  RemarkEntityWhereArgs,
  RemarkEntityWhereInput,
  RemarkEntityWhereUniqueInput,
  RemarkEntityOrderByEnum,
} from '../../warthog';

import { RemarkEntity } from './remark-entity.model';
import { RemarkEntityService } from './remark-entity.service';

@ObjectType()
export class RemarkEntityEdge {
  @Field(() => RemarkEntity, { nullable: false })
  node!: RemarkEntity;

  @Field(() => String, { nullable: false })
  cursor!: string;
}

@ObjectType()
export class RemarkEntityConnection {
  @Field(() => Int, { nullable: false })
  totalCount!: number;

  @Field(() => [RemarkEntityEdge], { nullable: false })
  edges!: RemarkEntityEdge[];

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
export class RemarkEntityConnectionWhereArgs extends ConnectionPageInputOptions {
  @Field(() => RemarkEntityWhereInput, { nullable: true })
  where?: RemarkEntityWhereInput;

  @Field(() => RemarkEntityOrderByEnum, { nullable: true })
  orderBy?: [RemarkEntityOrderByEnum];
}

@Resolver(RemarkEntity)
export class RemarkEntityResolver {
  constructor(@Inject('RemarkEntityService') public readonly service: RemarkEntityService) {}

  @Query(() => [RemarkEntity])
  async remarkEntities(
    @Args() { where, orderBy, limit, offset }: RemarkEntityWhereArgs,
    @Fields() fields: string[]
  ): Promise<RemarkEntity[]> {
    return this.service.find<RemarkEntityWhereInput>(where, orderBy, limit, offset, fields);
  }

  @Query(() => RemarkEntity, { nullable: true })
  async remarkEntityByUniqueInput(
    @Arg('where') where: RemarkEntityWhereUniqueInput,
    @Fields() fields: string[]
  ): Promise<RemarkEntity | null> {
    const result = await this.service.find(where, undefined, 1, 0, fields);
    return result && result.length >= 1 ? result[0] : null;
  }

  @Query(() => RemarkEntityConnection)
  async remarkEntitiesConnection(
    @Args() { where, orderBy, ...pageOptions }: RemarkEntityConnectionWhereArgs,
    @Info() info: any
  ): Promise<RemarkEntityConnection> {
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
      result = await this.service.findConnection<RemarkEntityWhereInput>(where, orderBy, pageOptions, rawFields);
    } catch (err: any) {
      console.log(err);
      // TODO: should continue to return this on `Error: Items is empty` or throw the error
      if (!(err.message as string).includes('Items is empty')) throw err;
    }

    return result as Promise<RemarkEntityConnection>;
  }
}
