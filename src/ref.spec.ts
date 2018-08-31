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
import { LinkReference } from "./ref";

describe("link reference", () => {
  it("rejects missing process", () => {
    expect(() => new LinkReference(Uint8Array.from([42]), "")).toThrowError(
      errors.ErrLinkProcessMissing
    );
  });

  it("rejects missing link hash", () => {
    expect(() => new LinkReference(new Uint8Array(0), "p")).toThrowError(
      errors.ErrLinkHashMissing
    );
  });

  it("creates a valid reference", () => {
    const ref = new LinkReference(Uint8Array.from([42]), "p");
    expect(ref.process).toEqual("p");
    expect(ref.linkHash).toEqual(Uint8Array.from([42]));
  });
});
