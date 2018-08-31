/**
 * Every test case should implement the ITestCase interface.
 */
export interface ITestCase {
  /** Id of the test case. */
  id: () => string;
  /** Generate encoded segment bytes. */
  generate: () => string;
  /** Validate encoded segment bytes. */
  validate: (encodedSegment: string) => void;
}
