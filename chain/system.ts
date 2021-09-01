import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Bytes } from "@polkadot/types";

export namespace System {
  export class RemarkCall {
    public readonly extrinsic: SubstrateExtrinsic;
    public readonly expectedArgTypes = ["Bytes"];

    constructor(public readonly ctx: SubstrateEvent) {
      if (ctx.extrinsic === undefined) {
        throw new Error(`No call data has been provided`);
      }
      this.extrinsic = ctx.extrinsic;
    }

    get args(): Remark_Args {
      return new Remark_Args(this.extrinsic);
    }

    validateArgs(): boolean {
      if (this.expectedArgTypes.length !== this.extrinsic.args.length) {
        return false;
      }
      let valid = true;
      this.expectedArgTypes.forEach((type, i) => {
        if (type !== this.extrinsic.args[i].type) {
          valid = false;
        }
      });
      return valid;
    }
  }

  class Remark_Args {
    constructor(public readonly extrinsic: SubstrateExtrinsic) {}

    get remark(): Bytes {
      return createTypeUnsafe<Bytes & Codec>(typeRegistry, "Bytes", [
        this.extrinsic.args[0].value,
      ]);
    }
  }
}
