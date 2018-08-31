#!/usr/bin/env node

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
      return;
    }

    const testData = JSON.parse(data.toString()) as Array<{
      id: string;
      data: string;
    }>;

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
          return;
      }

      try {
        test.validate(t.data);
        console.log(`[${t.id}] SUCCESS`);
      } catch (err) {
        console.log(`[${t.id}] FAILED: ${err}`);
      }
    });
  });
}

// Run the test command.
run(process.argv[2], process.argv[3]);
