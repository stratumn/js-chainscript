#!/usr/bin/env node

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

// This file defines the end-to-end compatibility tests.
// Every implementation of ChainScript needs to generate the same test suite
// to test that encoding/decoding works across all implementations.
// When a new version of ChainScript is released:
//  * this test suite should be updated to cover the new features
//  * snapshot encoded bytes of the previous version should be added to the
//  tests in https://github.com/stratumn/chainscript/samples.

/* tslint:disable:no-console */

import { readFile, writeFile } from "fs";
import { EvidencesTest } from "./evidences";
import { ReferencesTest } from "./references";
import { SignaturesTest } from "./signatures";
import { SimpleSegmentTest } from "./simple_segment";
import { ITestCase } from "./test_case";

/** TestCases to run. */
const TestCases = new Array<ITestCase>(
  new SimpleSegmentTest(),
  new ReferencesTest(),
  new EvidencesTest(),
  new SignaturesTest()
);

/**
 * Execute commands to produce or validate chainscript data.
 * @param action to execute.
 * @param path to read/write segments.
 */
function run(action: string, path: string): void {
  switch (action) {
    case "generate":
      return generate(path);
    case "validate":
      return validate(path);
    default:
      console.log(`Unknown action ${action}`);
      process.exit(1);
  }
}

/**
 * Generate encoded test segments.
 * @param path to the file where test segments will be written.
 */
function generate(path: string): void {
  const results = TestCases.map(t => {
    return { id: t.id(), data: t.generate() };
  });

  console.log(`Saving encoded segments to ${path}...`);
  writeFile(path, JSON.stringify(results), err => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.log("Saved.");
    }
  });
}

/**
 * Validate encoded test segments.
 * @param path to the file containing the test segments.
 */
function validate(path: string): void {
  console.log(`Loading encoded segments from ${path}...`);
  readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    const testData = JSON.parse(data.toString()) as Array<{
      id: string;
      data: string;
    }>;

    let failed = false;

    testData.map(t => {
      let test: ITestCase;

      switch (t.id) {
        case SimpleSegmentTest.id:
          test = new SimpleSegmentTest();
          break;
        case ReferencesTest.id:
          test = new ReferencesTest();
          break;
        case EvidencesTest.id:
          test = new EvidencesTest();
          break;
        case SignaturesTest.id:
          test = new SignaturesTest();
          break;
        default:
          console.log(`Unknown test case: ${t.id}`);
          failed = true;
          return;
      }

      try {
        test.validate(t.data);
        console.log(`[${t.id}] SUCCESS`);
      } catch (err) {
        console.log(`[${t.id}] FAILED: ${err}`);
        failed = true;
      }
    });

    if (failed) {
      process.exit(1);
    }
  });
}

// Run the test command.
run(process.argv[2], process.argv[3]);
