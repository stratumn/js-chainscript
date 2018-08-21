// package: stratumn.chainscript
// file: proto/chainscript.proto

import * as jspb from "google-protobuf";

export class Segment extends jspb.Message {
  hasLink(): boolean;
  clearLink(): void;
  getLink(): Link | undefined;
  setLink(value?: Link): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): SegmentMeta | undefined;
  setMeta(value?: SegmentMeta): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Segment.AsObject;
  static toObject(includeInstance: boolean, msg: Segment): Segment.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Segment, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Segment;
  static deserializeBinaryFromReader(message: Segment, reader: jspb.BinaryReader): Segment;
}

export namespace Segment {
  export type AsObject = {
    link?: Link.AsObject,
    meta?: SegmentMeta.AsObject,
  }
}

export class SegmentMeta extends jspb.Message {
  getLinkHash(): Uint8Array | string;
  getLinkHash_asU8(): Uint8Array;
  getLinkHash_asB64(): string;
  setLinkHash(value: Uint8Array | string): void;

  clearEvidencesList(): void;
  getEvidencesList(): Array<Evidence>;
  setEvidencesList(value: Array<Evidence>): void;
  addEvidences(value?: Evidence, index?: number): Evidence;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SegmentMeta.AsObject;
  static toObject(includeInstance: boolean, msg: SegmentMeta): SegmentMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SegmentMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SegmentMeta;
  static deserializeBinaryFromReader(message: SegmentMeta, reader: jspb.BinaryReader): SegmentMeta;
}

export namespace SegmentMeta {
  export type AsObject = {
    linkHash: Uint8Array | string,
    evidencesList: Array<Evidence.AsObject>,
  }
}

export class Evidence extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getBackend(): string;
  setBackend(value: string): void;

  getProvider(): string;
  setProvider(value: string): void;

  getProof(): Uint8Array | string;
  getProof_asU8(): Uint8Array;
  getProof_asB64(): string;
  setProof(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Evidence.AsObject;
  static toObject(includeInstance: boolean, msg: Evidence): Evidence.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Evidence, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Evidence;
  static deserializeBinaryFromReader(message: Evidence, reader: jspb.BinaryReader): Evidence;
}

export namespace Evidence {
  export type AsObject = {
    version: string,
    backend: string,
    provider: string,
    proof: Uint8Array | string,
  }
}

export class Link extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  hasMeta(): boolean;
  clearMeta(): void;
  getMeta(): LinkMeta | undefined;
  setMeta(value?: LinkMeta): void;

  clearSignaturesList(): void;
  getSignaturesList(): Array<Signature>;
  setSignaturesList(value: Array<Signature>): void;
  addSignatures(value?: Signature, index?: number): Signature;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Link.AsObject;
  static toObject(includeInstance: boolean, msg: Link): Link.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Link, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Link;
  static deserializeBinaryFromReader(message: Link, reader: jspb.BinaryReader): Link;
}

export namespace Link {
  export type AsObject = {
    version: string,
    data: Uint8Array | string,
    meta?: LinkMeta.AsObject,
    signaturesList: Array<Signature.AsObject>,
  }
}

export class Process extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getState(): string;
  setState(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Process.AsObject;
  static toObject(includeInstance: boolean, msg: Process): Process.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Process, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Process;
  static deserializeBinaryFromReader(message: Process, reader: jspb.BinaryReader): Process;
}

export namespace Process {
  export type AsObject = {
    name: string,
    state: string,
  }
}

export class LinkMeta extends jspb.Message {
  getClientId(): string;
  setClientId(value: string): void;

  getPrevLinkHash(): Uint8Array | string;
  getPrevLinkHash_asU8(): Uint8Array;
  getPrevLinkHash_asB64(): string;
  setPrevLinkHash(value: Uint8Array | string): void;

  getPriority(): number;
  setPriority(value: number): void;

  clearRefsList(): void;
  getRefsList(): Array<LinkReference>;
  setRefsList(value: Array<LinkReference>): void;
  addRefs(value?: LinkReference, index?: number): LinkReference;

  hasProcess(): boolean;
  clearProcess(): void;
  getProcess(): Process | undefined;
  setProcess(value?: Process): void;

  getMapId(): string;
  setMapId(value: string): void;

  getAction(): string;
  setAction(value: string): void;

  getStep(): string;
  setStep(value: string): void;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LinkMeta.AsObject;
  static toObject(includeInstance: boolean, msg: LinkMeta): LinkMeta.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LinkMeta, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LinkMeta;
  static deserializeBinaryFromReader(message: LinkMeta, reader: jspb.BinaryReader): LinkMeta;
}

export namespace LinkMeta {
  export type AsObject = {
    clientId: string,
    prevLinkHash: Uint8Array | string,
    priority: number,
    refsList: Array<LinkReference.AsObject>,
    process?: Process.AsObject,
    mapId: string,
    action: string,
    step: string,
    tagsList: Array<string>,
    data: Uint8Array | string,
  }
}

export class LinkReference extends jspb.Message {
  getLinkHash(): Uint8Array | string;
  getLinkHash_asU8(): Uint8Array;
  getLinkHash_asB64(): string;
  setLinkHash(value: Uint8Array | string): void;

  getProcess(): string;
  setProcess(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LinkReference.AsObject;
  static toObject(includeInstance: boolean, msg: LinkReference): LinkReference.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LinkReference, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LinkReference;
  static deserializeBinaryFromReader(message: LinkReference, reader: jspb.BinaryReader): LinkReference;
}

export namespace LinkReference {
  export type AsObject = {
    linkHash: Uint8Array | string,
    process: string,
  }
}

export class Signature extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getType(): string;
  setType(value: string): void;

  getPayloadPath(): string;
  setPayloadPath(value: string): void;

  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Signature.AsObject;
  static toObject(includeInstance: boolean, msg: Signature): Signature.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Signature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Signature;
  static deserializeBinaryFromReader(message: Signature, reader: jspb.BinaryReader): Signature;
}

export namespace Signature {
  export type AsObject = {
    version: string,
    type: string,
    payloadPath: string,
    publicKey: Uint8Array | string,
    signature: Uint8Array | string,
  }
}

