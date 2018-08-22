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
