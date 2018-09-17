// Copyright 2017-2018 Stratumn SAS. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { sig } from "@stratumn/js-crypto";
import * as b64 from "base64-js";
import { Base64 } from "js-base64";
import * as errors from "./errors";
import { LinkBuilder } from "./link_builder";
import { stratumn } from "./proto/chainscript_pb";
import { fromObject, sign, Signature, signLink } from "./signature";

describe("signature", () => {
  it("uses empty default values", () => {
    const s = new Signature(new stratumn.chainscript.Signature());
    expect(s.version()).toEqual("");
    expect(s.payloadPath()).toEqual("");
    expect(s.publicKey()).toHaveLength(0);
    expect(s.signature()).toHaveLength(0);
  });

  it("wraps a proto signature", () => {
    const pb = new stratumn.chainscript.Signature();
    pb.version = "0.1.0";
    pb.payloadPath = "[data]";
    pb.publicKey = Uint8Array.from([42]);
    pb.signature = Uint8Array.from([24]);

    const s = new Signature(pb);
    expect(s.version()).toEqual("0.1.0");
    expect(s.payloadPath()).toEqual("[data]");
    expect(s.publicKey()).toEqual(pb.publicKey);
    expect(s.signature()).toEqual(pb.signature);
  });

  describe("validate", () => {
    it("unknown version", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "0.42.0";
      pb.publicKey = Uint8Array.from([42]);
      pb.signature = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignatureVersionUnknown
      );
    });

    it("missing public key", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "1.0.0";
      pb.signature = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignaturePublicKeyMissing
      );
    });

    it("missing signature", () => {
      const pb = new stratumn.chainscript.Signature();
      pb.version = "1.0.0";
      pb.publicKey = Uint8Array.from([42]);

      const s = new Signature(pb);
      expect(() => s.validate(new LinkBuilder("p", "m").build())).toThrowError(
        errors.ErrSignatureMissing
      );
    });
  });
});

describe("sign", () => {
  const key = new sig.SigningPrivateKey({
    algo: sig.SIGNING_ALGO_ED25519.name
  });
  const keyBytes = key.export();

  it("fails for invalid key", () => {
    expect(() => sign(Uint8Array.from([42]), Uint8Array.from([42]))).toThrow();
  });

  it("signs random bytes", () => {
    const toSign = Uint8Array.from([42, 24, 24, 42]);
    const s = sign(keyBytes, toSign);

    expect(s.payloadPath()).toBe("");

    const publicKey = new sig.SigningPublicKey({
      pemPublicKey: Base64.atob(b64.fromByteArray(s.publicKey()))
    });

    const valid = publicKey.verify({
      message: toSign,
      signature: s.signature()
    });

    expect(valid).toBe(true);
  });
});

describe("signLink", () => {
  const key = new sig.SigningPrivateKey({
    algo: sig.SIGNING_ALGO_ED25519.name
  });
  const keyBytes = key.export();

  it("can sign the whole link", () => {
    const link = new LinkBuilder("p", "m").build();
    const s = signLink(keyBytes, link, "");

    expect(link.signatures()).toHaveLength(0);
    expect(s.payloadPath()).toEqual("[version,data,meta]");
    s.validate(link);
  });

  it("can sign parts of the link", () => {
    const link = new LinkBuilder("p", "m").withAction("init").build();
    const s = signLink(keyBytes, link, "[version,meta.action]");

    expect(link.signatures()).toHaveLength(0);
    expect(s.payloadPath()).toEqual("[version,meta.action]");
    s.validate(link);
  });
});

describe("fromObject", () => {
  const key = new sig.SigningPrivateKey({
    algo: sig.SIGNING_ALGO_ED25519.name
  });
  const keyBytes = key.export();

  it("converts from object", () => {
    const l = new LinkBuilder("p1", "m1").build();
    const s1 = signLink(keyBytes, l, "[version,meta.action]");
    const s2 = fromObject(s1.toObject());

    expect(s2).toEqual(s1);
  });

  it("converts base64 to bytes", () => {
    const l = new LinkBuilder("p1", "m1").build();
    const s1 = signLink(keyBytes, l, "");
    const s2 = fromObject(s1.toObject({ bytes: String }));

    expect(s2.signature()).toEqual(s1.signature());
    expect(s2.publicKey()).toEqual(s1.publicKey());
  });
});
