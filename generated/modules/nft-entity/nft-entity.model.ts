import { BaseModel, BooleanField, IntField, NumericField, Model, StringField, JSONField } from '@subsquid/warthog';

import BN from 'bn.js';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class NftEntity extends BaseModel {
  @StringField({
    nullable: true,
  })
  name?: string;

  @StringField({
    nullable: true,
  })
  instance?: string;

  @IntField({
    nullable: true,
  })
  transferable?: number;

  @StringField({
    nullable: true,
  })
  issuer?: string;

  @StringField({
    nullable: true,
  })
  sn?: string;

  @StringField({
    nullable: true,
  })
  metadata?: string;

  @StringField({
    nullable: true,
  })
  currentOwner?: string;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  price?: BN;

  @BooleanField({
    nullable: true,
  })
  burned?: boolean;

  @NumericField({
    nullable: true,

    transformer: {
      to: (entityValue: BN) => (entityValue !== undefined ? entityValue.toString(10) : null),
      from: (dbValue: string) =>
        dbValue !== undefined && dbValue !== null && dbValue.length > 0 ? new BN(dbValue, 10) : undefined,
    },
  })
  blockNumber?: BN;

  constructor(init?: Partial<NftEntity>) {
    super();
    Object.assign(this, init);
  }
}
