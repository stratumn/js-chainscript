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

/***** Evidence errors *****/

export const ErrEvidenceVersionMissing = new TypeError(
  "evidence version is missing"
);
export const ErrEvidenceBackendMissing = new TypeError(
  "evidence backend is missing"
);
export const ErrEvidenceProviderMissing = new TypeError(
  "evidence provider is missing"
);
export const ErrEvidenceProofMissing = new TypeError(
  "evidence proof is missing"
);
export const ErrDuplicateEvidence = new TypeError(
  "evidence already exists for the given backend and provider"
);

/***** Link errors *****/

export const ErrLinkClientIdUnkown = new TypeError(
  "link was created with an unknown client: can't deserialize it"
);
export const ErrLinkHashMissing = new TypeError("link hash is missing");
export const ErrLinkMapIdMissing = new TypeError("link map id is missing");
export const ErrLinkMetaMissing = new TypeError("link meta is missing");
export const ErrLinkProcessMissing = new TypeError("link process is missing");
export const ErrLinkVersionMissing = new TypeError("link version is missing");
export const ErrLinkVersionUnknown = new TypeError("unknown link version");

/***** Segment errors *****/

export const ErrLinkHashMismatch = new TypeError("link hash mismatch");
export const ErrLinkMissing = new TypeError("link is missing");
export const ErrSegmentMetaMissing = new TypeError("segment meta is missing");

/***** Signature errors *****/

export const ErrSignatureInvalid = new TypeError("signature is invalid");
export const ErrSignatureMissing = new TypeError("signature bytes are missing");
export const ErrSignaturePublicKeyMissing = new TypeError(
  "signature public key is missing"
);
export const ErrSignatureVersionUnknown = new TypeError(
  "unknown signature version"
);
