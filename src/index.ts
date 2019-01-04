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

import * as constants from "./const";
import * as errors from "./errors";
export {
  deserialize as deserializeEvidence,
  Evidence,
  fromObject as fromEvidenceObject
} from "./evidence";
export {
  deserialize as deserializeLink,
  fromObject as fromLinkObject,
  Link
} from "./link";
export { LinkBuilder } from "./link_builder";
export { Process } from "./process";
export { LinkReference } from "./ref";
export {
  deserialize as deserializeSegment,
  fromObject as fromSegmentObject,
  Segment
} from "./segment";
export {
  fromObject as fromSignatureObject,
  sign,
  Signature,
  signLink
} from "./signature";

export { constants, errors };
