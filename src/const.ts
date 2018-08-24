/**
 * ClientID allows segment receivers to figure out how the segment was
 * encoded and can be decoded.
 */
export const ClientId = "github.com/stratumn/js-chainscript";

/**
 * LinkVersion_1_0_0 is the first version of the link encoding.
 * In that version we encode interfaces (link.data and link.meta.data) with
 * canonical JSON and hash the protobuf-encoded link bytes with SHA-256.
 */
export const LINK_VERSION_1_0_0 = "1.0.0";
/** The current link version. */
export const LINK_VERSION = LINK_VERSION_1_0_0;

/**
 * SignatureVersion_1_0_0 is the first version of the link signature.
 * In that version we use canonical JSON to encode the link parts.
 * We use JMESPATH to select what parts of the link need to be signed.
 * We use SHA-256 on the JSON-encoded bytes and sign the resulting hash.
 * We use github.com/stratumn/js-crypto's 1.0.0 release to produce the
 * signature (which uses PEM-encoded private keys).
 */
export const SIGNATURE_VERSION_1_0_0 = "1.0.0";
/** The current signature version. */
export const SIGNATURE_VERSION = SIGNATURE_VERSION_1_0_0;
