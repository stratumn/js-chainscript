# Changelog

Each version of the ChainScript implementation makes specific serialization
choices. Those choices are detailed in this document.

## 1.0.0

- Dependencies:
  - [Canonical JSON](https://www.npmjs.com/package/canonicaljson) v1.0.1
  - [ProtobufJS](https://www.npmjs.com/package/protobufjs) v6.8.8
  - [Crypto](https://github.com/stratumn/js-crypto) v0.1.0
- Data bytes (e.g. _link.data_, _link.meta.data_) are encoded from Javascript
  objects using canonical JSON
- Link hash is calculated by hashing the protobuf-encoded link bytes with
  SHA-256
- All links are created with the following ClientID:
  github.com/stratumn/js-chainscript
- Signatures provide flexibility over what parts of the link are signed using
  the link's canonical JSON representation and JMESPATH. A SHA-256 hash of the
  JSON bytes is signed with github.com/stratumn/go-crypto.
