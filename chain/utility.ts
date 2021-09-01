import { createTypeUnsafe } from "@polkadot/types/create";
import { SubstrateEvent, SubstrateExtrinsic } from "@subsquid/hydra-common";
import { Codec } from "@polkadot/types/types";
import { typeRegistry } from ".";

import { Vec } from "@polkadot/types";
import { Call } from "@polkadot/types/interfaces";

export namespace Utility {
  export class BatchCall {
    public readonly extrinsic: SubstrateExtrinsic;
    public readonly expectedArgTypes = ["Vec<Call>"];

    constructor(public readonly ctx: SubstrateEvent) {
      if (ctx.extrinsic === undefined) {
        throw new Error(`No call data has been provided`);
      }
      this.extrinsic = ctx.extrinsic;
    }

    get args(): Batch_Args {
      return new Batch_Args(this.extrinsic);
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

  class Batch_Args {
    constructor(public readonly extrinsic: SubstrateExtrinsic) {}

    get calls(): Vec<Call> {
      return createTypeUnsafe<Vec<Call> & Codec>(typeRegistry, "Vec<Call>", [
        this.extrinsic.args[0].value,
      ]);
    }
  }
  export class BatchAllCall {
    public readonly extrinsic: SubstrateExtrinsic;
    public readonly expectedArgTypes = ["Vec<Call>"];

    constructor(public readonly ctx: SubstrateEvent) {
      if (ctx.extrinsic === undefined) {
        throw new Error(`No call data has been provided`);
      }
      this.extrinsic = ctx.extrinsic;
    }

    get args(): BatchAll_Args {
      return new BatchAll_Args(this.extrinsic);
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

  class BatchAll_Args {
    constructor(public readonly extrinsic: SubstrateExtrinsic) {}

    get calls(): Vec<Call> {
      return createTypeUnsafe<Vec<Call> & Codec>(typeRegistry, "Vec<Call>", [
        this.extrinsic.args[0].value,
      ]);
    }
  }
}
