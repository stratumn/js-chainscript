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

import * as errors from "./errors";
import { deserialize, Evidence, fromObject, fromProto } from "./evidence";
import { stratumn } from "./proto/chainscript_pb";

describe("evidence", () => {
  const proofData = Uint8Array.from([42]);

  it("rejects missing version", () => {
    expect(
      () => new Evidence("", "bitcoin", "mainnet", proofData)
    ).toThrowError(errors.ErrEvidenceVersionMissing);
  });

  it("rejects missing backend", () => {
    expect(() => new Evidence("0.1.0", "", "mainnet", proofData)).toThrowError(
      errors.ErrEvidenceBackendMissing
    );
  });

  it("rejects missing provider", () => {
    expect(() => new Evidence("0.1.0", "bitcoin", "", proofData)).toThrowError(
      errors.ErrEvidenceProviderMissing
    );
  });

  it("rejects missing proof", () => {
    expect(
      () => new Evidence("0.1.0", "bitcoin", "mainnet", new Uint8Array(0))
    ).toThrowError(errors.ErrEvidenceProofMissing);
  });

  it("converts from valid proto", () => {
    const e = new stratumn.chainscript.Evidence();
    e.version = "1.0.0";
    e.backend = "bitcoin";
    e.provider = "testnet";
    e.proof = Uint8Array.from([42]);

    const evidence = fromProto(e);
    expect(evidence.version).toEqual(e.version);
    expect(evidence.backend).toEqual(e.backend);
    expect(evidence.provider).toEqual(e.provider);
    expect(evidence.proof).toEqual(e.proof);
  });

  it("rejects invalid proto", () => {
    expect(() => fromProto(new stratumn.chainscript.Evidence())).toThrowError(
      errors.ErrEvidenceVersionMissing
    );
  });

  it("converts bytes to base64", () => {
    const e = new Evidence(
      "1.0.0",
      "btc",
      "mainnet",
      Uint8Array.from([42, 24])
    );

    const plainObj = e.toObject({ bytes: String });
    expect(plainObj).toEqual({
      backend: "btc",
      proof: "Khg=",
      provider: "mainnet",
      version: "1.0.0"
    });

    expect(fromObject(plainObj)).toEqual(e);
  });

  it("converts to object and keeps bytes", () => {
    const e = new Evidence(
      "1.0.0",
      "btc",
      "mainnet",
      Uint8Array.from([42, 24])
    );

    const plainObj = e.toObject();
    expect(plainObj).toEqual({
      backend: "btc",
      proof: Uint8Array.from([42, 24]),
      provider: "mainnet",
      version: "1.0.0"
    });

    expect(fromObject(plainObj)).toEqual(e);
  });

  it("serializes and deserializes", () => {
    const e = new Evidence(
      "1.0.0",
      "btc",
      "mainnet",
      Uint8Array.from([42, 24])
    );
    const bytes = e.serialize();
    const d = deserialize(bytes);
    expect(Uint8Array.from(d.proof)).toEqual(e.proof);
    expect(d.backend).toEqual(e.backend);
    expect(d.provider).toEqual(e.provider);
    expect(d.version).toEqual(e.version);
  });
});
