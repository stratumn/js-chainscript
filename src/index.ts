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
import { Evidence } from "./evidence";
import {
  deserialize as deserializeLink,
  fromObject as fromLinkObject,
  Link
} from "./link";
import { LinkBuilder } from "./link_builder";
import { Process } from "./process";
import { LinkReference } from "./ref";
import {
  deserialize as deserializeSegment,
  fromObject as fromSegmentObject,
  Segment
} from "./segment";
import { sign, Signature, signLink } from "./signature";

export {
  constants,
  deserializeLink,
  deserializeSegment,
  fromLinkObject,
  fromSegmentObject,
  errors,
  Evidence,
  Link,
  LinkBuilder,
  LinkReference,
  Process,
  Segment,
  sign,
  Signature,
  signLink
};
