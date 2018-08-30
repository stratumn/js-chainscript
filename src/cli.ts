#!/usr/bin/env node

// This file defines the end-to-end compatibility tests.
// Every implementation of ChainScript needs to generate the same test suite
// to test that encoding/decoding works across all implementations.
// When a new version of ChainScript is released:
//  * this test suite should be updated to cover the new features
//  * snapshot encoded bytes of the previous version should be added to the
//  tests in https://github.com/stratumn/chainscript/samples.

/* tslint:disable:no-console */

import * as b64 from "base64-js";
import { readFile, writeFile } from "fs";
import { LinkBuilder } from "./link_builder";
import { deserialize } from "./segment";

/**
 * Every test case should implement the ITestCase interface.
 */
interface ITestCase {
  /** Id of the test case. */
  id: () => string;
  /** Generate encoded segment bytes. */
  generate: () => string;
  /** Validate encoded segment bytes. */
  validate: (encodedSegment: string) => void;
}

/**
 * Test a segment with custom data and metadata but no references, evidences
 * or signatures.
 */
class SimpleSegmentTest implements ITestCase {
  public static id = "simple-segment";

  public id(): string {
    return SimpleSegmentTest.id;
  }

  public generate(): string {
    const segment = new LinkBuilder("test_process", "test_map")
      .withAction("init")
      .withData({ name: "batman", age: 42 })
      .withMetadata("bruce wayne")
      .withParent(Uint8Array.from([42, 42]))
      .withPriority(42)
      .withProcessState("started")
      .withStep("setup")
      .withTags(["tag1", "tag2"])
      .build()
      .segmentify();

    return b64.fromByteArray(segment.serialize());
  }

  public validate(encodedSegment: string): void {
    const segment = deserialize(b64.toByteArray(encodedSegment));
    segment.validate(null);

    const link = segment.link();

    if (link.action() !== "init") {
      throw new Error(`Invalid action: ${link.action()}`);
    }
    if (link.data().age !== 42) {
      throw new Error(`Invalid data: ${JSON.stringify(link.data())}`);
    }
    if (link.data().name !== "batman") {
      throw new Error(`Invalid data: ${JSON.stringify(link.data())}`);
    }
    if (link.mapId() !== "test_map") {
      throw new Error(`Invalid map id: ${link.mapId()}`);
    }
    if (link.metadata() !== "bruce wayne") {
      throw new Error(`Invalid metadata: ${JSON.stringify(link.metadata())}`);
    }
    if (link.prevLinkHash()[0] !== 42 || link.prevLinkHash()[1] !== 42) {
      throw new Error(`Invalid parent: ${link.prevLinkHash()}`);
    }
    if (link.priority() !== 42) {
      throw new Error(`Invalid priority: ${link.priority()}`);
    }
    if (link.process().name !== "test_process") {
      throw new Error(`Invalid process name: ${link.process().name}`);
    }
    if (link.process().state !== "started") {
      throw new Error(`Invalid process state: ${link.process().state}`);
    }
    if (link.step() !== "setup") {
      throw new Error(`Invalid step: ${link.step()}`);
    }
    if (link.tags()[0] !== "tag1" || link.tags()[1] !== "tag2") {
      throw new Error(`Invalid tags: ${link.tags()}`);
    }
  }
}

// class ReferencesTest implements ITestCase {}
// class EvidencesTest implements ITestCase {}
// class SignaturesTest implements ITestCase {}

/** TestCases to run. */
const TestCases = new Array<ITestCase>(new SimpleSegmentTest());

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
      console.log(err);
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
