import 'graphql-import-node'; // Needed so you can import *.graphql files 

import { makeBindingClass, Options } from 'graphql-binding'
import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import * as schema from  './schema.graphql'

export interface Query {
    nftEntities: <T = Array<NftEntity>>(args: { offset?: Int | null, limit?: Int | null, where?: NftEntityWhereInput | null, orderBy?: Array<NftEntityOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    nftEntityByUniqueInput: <T = NftEntity | null>(args: { where: NftEntityWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    nftEntitiesConnection: <T = NftEntityConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: NftEntityWhereInput | null, orderBy?: Array<NftEntityOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    remarkEntities: <T = Array<RemarkEntity>>(args: { offset?: Int | null, limit?: Int | null, where?: RemarkEntityWhereInput | null, orderBy?: Array<RemarkEntityOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    remarkEntityByUniqueInput: <T = RemarkEntity | null>(args: { where: RemarkEntityWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T | null> ,
    remarkEntitiesConnection: <T = RemarkEntityConnection>(args: { first?: Int | null, after?: String | null, last?: Int | null, before?: String | null, where?: RemarkEntityWhereInput | null, orderBy?: Array<RemarkEntityOrderByInput> | null }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {}

export interface Subscription {
    stateSubscription: <T = ProcessorState>(args?: {}, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Binding {
  query: Query
  mutation: Mutation
  subscription: Subscription
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
  delegateSubscription(fieldName: string, args?: {
      [key: string]: any;
  }, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
  getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(...args: any[]): T
}

export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema: schema as any })

/**
 * Types
*/

export type NftEntityOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'instance_ASC' |
  'instance_DESC' |
  'transferable_ASC' |
  'transferable_DESC' |
  'issuer_ASC' |
  'issuer_DESC' |
  'sn_ASC' |
  'sn_DESC' |
  'metadata_ASC' |
  'metadata_DESC' |
  'currentOwner_ASC' |
  'currentOwner_DESC' |
  'price_ASC' |
  'price_DESC' |
  'burned_ASC' |
  'burned_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC'

export type RemarkEntityOrderByInput =   'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'deletedAt_ASC' |
  'deletedAt_DESC' |
  'value_ASC' |
  'value_DESC' |
  'caller_ASC' |
  'caller_DESC' |
  'blockNumber_ASC' |
  'blockNumber_DESC' |
  'interaction_ASC' |
  'interaction_DESC'

export interface BaseWhereInput {
  id_eq?: String | null
  id_in?: String[] | String | null
  createdAt_eq?: String | null
  createdAt_lt?: String | null
  createdAt_lte?: String | null
  createdAt_gt?: String | null
  createdAt_gte?: String | null
  createdById_eq?: String | null
  updatedAt_eq?: String | null
  updatedAt_lt?: String | null
  updatedAt_lte?: String | null
  updatedAt_gt?: String | null
  updatedAt_gte?: String | null
  updatedById_eq?: String | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: String | null
  deletedAt_lt?: String | null
  deletedAt_lte?: String | null
  deletedAt_gt?: String | null
  deletedAt_gte?: String | null
  deletedById_eq?: String | null
}

export interface NftEntityCreateInput {
  name?: String | null
  instance?: String | null
  transferable?: Float | null
  issuer?: String | null
  sn?: String | null
  metadata?: String | null
  currentOwner?: String | null
  price?: String | null
  burned?: Boolean | null
  blockNumber?: String | null
}

export interface NftEntityUpdateInput {
  name?: String | null
  instance?: String | null
  transferable?: Float | null
  issuer?: String | null
  sn?: String | null
  metadata?: String | null
  currentOwner?: String | null
  price?: String | null
  burned?: Boolean | null
  blockNumber?: String | null
}

export interface NftEntityWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  name_eq?: String | null
  name_contains?: String | null
  name_startsWith?: String | null
  name_endsWith?: String | null
  name_in?: String[] | String | null
  instance_eq?: String | null
  instance_contains?: String | null
  instance_startsWith?: String | null
  instance_endsWith?: String | null
  instance_in?: String[] | String | null
  transferable_eq?: Int | null
  transferable_gt?: Int | null
  transferable_gte?: Int | null
  transferable_lt?: Int | null
  transferable_lte?: Int | null
  transferable_in?: Int[] | Int | null
  issuer_eq?: String | null
  issuer_contains?: String | null
  issuer_startsWith?: String | null
  issuer_endsWith?: String | null
  issuer_in?: String[] | String | null
  sn_eq?: String | null
  sn_contains?: String | null
  sn_startsWith?: String | null
  sn_endsWith?: String | null
  sn_in?: String[] | String | null
  metadata_eq?: String | null
  metadata_contains?: String | null
  metadata_startsWith?: String | null
  metadata_endsWith?: String | null
  metadata_in?: String[] | String | null
  currentOwner_eq?: String | null
  currentOwner_contains?: String | null
  currentOwner_startsWith?: String | null
  currentOwner_endsWith?: String | null
  currentOwner_in?: String[] | String | null
  price_eq?: BigInt | null
  price_gt?: BigInt | null
  price_gte?: BigInt | null
  price_lt?: BigInt | null
  price_lte?: BigInt | null
  price_in?: BigInt[] | BigInt | null
  burned_eq?: Boolean | null
  burned_in?: Boolean[] | Boolean | null
  blockNumber_eq?: BigInt | null
  blockNumber_gt?: BigInt | null
  blockNumber_gte?: BigInt | null
  blockNumber_lt?: BigInt | null
  blockNumber_lte?: BigInt | null
  blockNumber_in?: BigInt[] | BigInt | null
  AND?: NftEntityWhereInput[] | NftEntityWhereInput | null
  OR?: NftEntityWhereInput[] | NftEntityWhereInput | null
}

export interface NftEntityWhereUniqueInput {
  id: ID_Output
}

export interface RemarkEntityCreateInput {
  value: String
  caller: String
  blockNumber: String
  interaction?: String | null
}

export interface RemarkEntityUpdateInput {
  value?: String | null
  caller?: String | null
  blockNumber?: String | null
  interaction?: String | null
}

export interface RemarkEntityWhereInput {
  id_eq?: ID_Input | null
  id_in?: ID_Output[] | ID_Output | null
  createdAt_eq?: DateTime | null
  createdAt_lt?: DateTime | null
  createdAt_lte?: DateTime | null
  createdAt_gt?: DateTime | null
  createdAt_gte?: DateTime | null
  createdById_eq?: ID_Input | null
  createdById_in?: ID_Output[] | ID_Output | null
  updatedAt_eq?: DateTime | null
  updatedAt_lt?: DateTime | null
  updatedAt_lte?: DateTime | null
  updatedAt_gt?: DateTime | null
  updatedAt_gte?: DateTime | null
  updatedById_eq?: ID_Input | null
  updatedById_in?: ID_Output[] | ID_Output | null
  deletedAt_all?: Boolean | null
  deletedAt_eq?: DateTime | null
  deletedAt_lt?: DateTime | null
  deletedAt_lte?: DateTime | null
  deletedAt_gt?: DateTime | null
  deletedAt_gte?: DateTime | null
  deletedById_eq?: ID_Input | null
  deletedById_in?: ID_Output[] | ID_Output | null
  value_eq?: String | null
  value_contains?: String | null
  value_startsWith?: String | null
  value_endsWith?: String | null
  value_in?: String[] | String | null
  caller_eq?: String | null
  caller_contains?: String | null
  caller_startsWith?: String | null
  caller_endsWith?: String | null
  caller_in?: String[] | String | null
  blockNumber_eq?: String | null
  blockNumber_contains?: String | null
  blockNumber_startsWith?: String | null
  blockNumber_endsWith?: String | null
  blockNumber_in?: String[] | String | null
  interaction_eq?: String | null
  interaction_contains?: String | null
  interaction_startsWith?: String | null
  interaction_endsWith?: String | null
  interaction_in?: String[] | String | null
  AND?: RemarkEntityWhereInput[] | RemarkEntityWhereInput | null
  OR?: RemarkEntityWhereInput[] | RemarkEntityWhereInput | null
}

export interface RemarkEntityWhereUniqueInput {
  id: ID_Output
}

export interface BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface DeleteResponse {
  id: ID_Output
}

export interface BaseModel extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface BaseModelUUID extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
}

export interface NftEntity extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  name?: String | null
  instance?: String | null
  transferable?: Int | null
  issuer?: String | null
  sn?: String | null
  metadata?: String | null
  currentOwner?: String | null
  price?: BigInt | null
  burned?: Boolean | null
  blockNumber?: BigInt | null
}

export interface NftEntityConnection {
  totalCount: Int
  edges: Array<NftEntityEdge>
  pageInfo: PageInfo
}

export interface NftEntityEdge {
  node: NftEntity
  cursor: String
}

export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String | null
  endCursor?: String | null
}

export interface ProcessorState {
  lastCompleteBlock: Float
  lastProcessedEvent: String
  indexerHead: Float
  chainHead: Float
}

export interface RemarkEntity extends BaseGraphQLObject {
  id: ID_Output
  createdAt: DateTime
  createdById: String
  updatedAt?: DateTime | null
  updatedById?: String | null
  deletedAt?: DateTime | null
  deletedById?: String | null
  version: Int
  value: String
  caller: String
  blockNumber: String
  interaction?: String | null
}

export interface RemarkEntityConnection {
  totalCount: Int
  edges: Array<RemarkEntityEdge>
  pageInfo: PageInfo
}

export interface RemarkEntityEdge {
  node: RemarkEntity
  cursor: String
}

export interface StandardDeleteResponse {
  id: ID_Output
}

/*
GraphQL representation of BigInt
*/
export type BigInt = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The javascript `Date` as string. Type represents date and time as the ISO Date string.
*/
export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).
*/
export type Float = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string