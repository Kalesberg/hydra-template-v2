import { BaseModel, Model, StringField, JSONField } from '@subsquid/warthog';

import * as jsonTypes from '../jsonfields/jsonfields.model';

@Model({ api: {} })
export class RemarkEntity extends BaseModel {
  @StringField({})
  value!: string;

  @StringField({})
  caller!: string;

  @StringField({})
  blockNumber!: string;

  @StringField({
    nullable: true,
  })
  interaction?: string;

  constructor(init?: Partial<RemarkEntity>) {
    super();
    Object.assign(this, init);
  }
}
