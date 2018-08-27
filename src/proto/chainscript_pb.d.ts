import * as $protobuf from "protobufjs";
/** Namespace stratumn. */
export namespace stratumn {

    /** Namespace chainscript. */
    namespace chainscript {

        /** Properties of a Segment. */
        interface ISegment {

            /** Segment link */
            link?: (stratumn.chainscript.ILink|null);

            /** Segment meta */
            meta?: (stratumn.chainscript.ISegmentMeta|null);
        }

        /** Represents a Segment. */
        class Segment implements ISegment {

            /**
             * Constructs a new Segment.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ISegment);

            /** Segment link. */
            public link?: (stratumn.chainscript.ILink|null);

            /** Segment meta. */
            public meta?: (stratumn.chainscript.ISegmentMeta|null);

            /**
             * Creates a new Segment instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Segment instance
             */
            public static create(properties?: stratumn.chainscript.ISegment): stratumn.chainscript.Segment;

            /**
             * Encodes the specified Segment message. Does not implicitly {@link stratumn.chainscript.Segment.verify|verify} messages.
             * @param message Segment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ISegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Segment message, length delimited. Does not implicitly {@link stratumn.chainscript.Segment.verify|verify} messages.
             * @param message Segment message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ISegment, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Segment message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Segment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.Segment;

            /**
             * Decodes a Segment message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Segment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.Segment;

            /**
             * Verifies a Segment message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Segment message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Segment
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.Segment;

            /**
             * Creates a plain object from a Segment message. Also converts values to other types if specified.
             * @param message Segment
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.Segment, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Segment to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a SegmentMeta. */
        interface ISegmentMeta {

            /** SegmentMeta linkHash */
            linkHash?: (Uint8Array|null);

            /** SegmentMeta evidences */
            evidences?: (stratumn.chainscript.IEvidence[]|null);
        }

        /** Represents a SegmentMeta. */
        class SegmentMeta implements ISegmentMeta {

            /**
             * Constructs a new SegmentMeta.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ISegmentMeta);

            /** SegmentMeta linkHash. */
            public linkHash: Uint8Array;

            /** SegmentMeta evidences. */
            public evidences: stratumn.chainscript.IEvidence[];

            /**
             * Creates a new SegmentMeta instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SegmentMeta instance
             */
            public static create(properties?: stratumn.chainscript.ISegmentMeta): stratumn.chainscript.SegmentMeta;

            /**
             * Encodes the specified SegmentMeta message. Does not implicitly {@link stratumn.chainscript.SegmentMeta.verify|verify} messages.
             * @param message SegmentMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ISegmentMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SegmentMeta message, length delimited. Does not implicitly {@link stratumn.chainscript.SegmentMeta.verify|verify} messages.
             * @param message SegmentMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ISegmentMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SegmentMeta message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns SegmentMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.SegmentMeta;

            /**
             * Decodes a SegmentMeta message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns SegmentMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.SegmentMeta;

            /**
             * Verifies a SegmentMeta message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SegmentMeta message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SegmentMeta
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.SegmentMeta;

            /**
             * Creates a plain object from a SegmentMeta message. Also converts values to other types if specified.
             * @param message SegmentMeta
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.SegmentMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SegmentMeta to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Evidence. */
        interface IEvidence {

            /** Evidence version */
            version?: (string|null);

            /** Evidence backend */
            backend?: (string|null);

            /** Evidence provider */
            provider?: (string|null);

            /** Evidence proof */
            proof?: (Uint8Array|null);
        }

        /** Represents an Evidence. */
        class Evidence implements IEvidence {

            /**
             * Constructs a new Evidence.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.IEvidence);

            /** Evidence version. */
            public version: string;

            /** Evidence backend. */
            public backend: string;

            /** Evidence provider. */
            public provider: string;

            /** Evidence proof. */
            public proof: Uint8Array;

            /**
             * Creates a new Evidence instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Evidence instance
             */
            public static create(properties?: stratumn.chainscript.IEvidence): stratumn.chainscript.Evidence;

            /**
             * Encodes the specified Evidence message. Does not implicitly {@link stratumn.chainscript.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Evidence message, length delimited. Does not implicitly {@link stratumn.chainscript.Evidence.verify|verify} messages.
             * @param message Evidence message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.IEvidence, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Evidence message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.Evidence;

            /**
             * Decodes an Evidence message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.Evidence;

            /**
             * Verifies an Evidence message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Evidence message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Evidence
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.Evidence;

            /**
             * Creates a plain object from an Evidence message. Also converts values to other types if specified.
             * @param message Evidence
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.Evidence, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Evidence to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Link. */
        interface ILink {

            /** Link version */
            version?: (string|null);

            /** Link data */
            data?: (Uint8Array|null);

            /** Link meta */
            meta?: (stratumn.chainscript.ILinkMeta|null);

            /** Link signatures */
            signatures?: (stratumn.chainscript.ISignature[]|null);
        }

        /** Represents a Link. */
        class Link implements ILink {

            /**
             * Constructs a new Link.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ILink);

            /** Link version. */
            public version: string;

            /** Link data. */
            public data: Uint8Array;

            /** Link meta. */
            public meta?: (stratumn.chainscript.ILinkMeta|null);

            /** Link signatures. */
            public signatures: stratumn.chainscript.ISignature[];

            /**
             * Creates a new Link instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Link instance
             */
            public static create(properties?: stratumn.chainscript.ILink): stratumn.chainscript.Link;

            /**
             * Encodes the specified Link message. Does not implicitly {@link stratumn.chainscript.Link.verify|verify} messages.
             * @param message Link message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Link message, length delimited. Does not implicitly {@link stratumn.chainscript.Link.verify|verify} messages.
             * @param message Link message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Link message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Link
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.Link;

            /**
             * Decodes a Link message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Link
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.Link;

            /**
             * Verifies a Link message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Link message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Link
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.Link;

            /**
             * Creates a plain object from a Link message. Also converts values to other types if specified.
             * @param message Link
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.Link, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Link to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Process. */
        interface IProcess {

            /** Process name */
            name?: (string|null);

            /** Process state */
            state?: (string|null);
        }

        /** Represents a Process. */
        class Process implements IProcess {

            /**
             * Constructs a new Process.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.IProcess);

            /** Process name. */
            public name: string;

            /** Process state. */
            public state: string;

            /**
             * Creates a new Process instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Process instance
             */
            public static create(properties?: stratumn.chainscript.IProcess): stratumn.chainscript.Process;

            /**
             * Encodes the specified Process message. Does not implicitly {@link stratumn.chainscript.Process.verify|verify} messages.
             * @param message Process message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.IProcess, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Process message, length delimited. Does not implicitly {@link stratumn.chainscript.Process.verify|verify} messages.
             * @param message Process message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.IProcess, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Process message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Process
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.Process;

            /**
             * Decodes a Process message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Process
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.Process;

            /**
             * Verifies a Process message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Process message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Process
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.Process;

            /**
             * Creates a plain object from a Process message. Also converts values to other types if specified.
             * @param message Process
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.Process, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Process to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LinkMeta. */
        interface ILinkMeta {

            /** LinkMeta clientId */
            clientId?: (string|null);

            /** LinkMeta prevLinkHash */
            prevLinkHash?: (Uint8Array|null);

            /** LinkMeta priority */
            priority?: (number|null);

            /** LinkMeta refs */
            refs?: (stratumn.chainscript.ILinkReference[]|null);

            /** LinkMeta process */
            process?: (stratumn.chainscript.IProcess|null);

            /** LinkMeta mapId */
            mapId?: (string|null);

            /** LinkMeta action */
            action?: (string|null);

            /** LinkMeta step */
            step?: (string|null);

            /** LinkMeta tags */
            tags?: (string[]|null);

            /** LinkMeta data */
            data?: (Uint8Array|null);
        }

        /** Represents a LinkMeta. */
        class LinkMeta implements ILinkMeta {

            /**
             * Constructs a new LinkMeta.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ILinkMeta);

            /** LinkMeta clientId. */
            public clientId: string;

            /** LinkMeta prevLinkHash. */
            public prevLinkHash: Uint8Array;

            /** LinkMeta priority. */
            public priority: number;

            /** LinkMeta refs. */
            public refs: stratumn.chainscript.ILinkReference[];

            /** LinkMeta process. */
            public process?: (stratumn.chainscript.IProcess|null);

            /** LinkMeta mapId. */
            public mapId: string;

            /** LinkMeta action. */
            public action: string;

            /** LinkMeta step. */
            public step: string;

            /** LinkMeta tags. */
            public tags: string[];

            /** LinkMeta data. */
            public data: Uint8Array;

            /**
             * Creates a new LinkMeta instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LinkMeta instance
             */
            public static create(properties?: stratumn.chainscript.ILinkMeta): stratumn.chainscript.LinkMeta;

            /**
             * Encodes the specified LinkMeta message. Does not implicitly {@link stratumn.chainscript.LinkMeta.verify|verify} messages.
             * @param message LinkMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ILinkMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LinkMeta message, length delimited. Does not implicitly {@link stratumn.chainscript.LinkMeta.verify|verify} messages.
             * @param message LinkMeta message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ILinkMeta, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LinkMeta message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LinkMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.LinkMeta;

            /**
             * Decodes a LinkMeta message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LinkMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.LinkMeta;

            /**
             * Verifies a LinkMeta message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LinkMeta message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LinkMeta
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.LinkMeta;

            /**
             * Creates a plain object from a LinkMeta message. Also converts values to other types if specified.
             * @param message LinkMeta
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.LinkMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LinkMeta to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LinkReference. */
        interface ILinkReference {

            /** LinkReference linkHash */
            linkHash?: (Uint8Array|null);

            /** LinkReference process */
            process?: (string|null);
        }

        /** Represents a LinkReference. */
        class LinkReference implements ILinkReference {

            /**
             * Constructs a new LinkReference.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ILinkReference);

            /** LinkReference linkHash. */
            public linkHash: Uint8Array;

            /** LinkReference process. */
            public process: string;

            /**
             * Creates a new LinkReference instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LinkReference instance
             */
            public static create(properties?: stratumn.chainscript.ILinkReference): stratumn.chainscript.LinkReference;

            /**
             * Encodes the specified LinkReference message. Does not implicitly {@link stratumn.chainscript.LinkReference.verify|verify} messages.
             * @param message LinkReference message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ILinkReference, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LinkReference message, length delimited. Does not implicitly {@link stratumn.chainscript.LinkReference.verify|verify} messages.
             * @param message LinkReference message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ILinkReference, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LinkReference message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LinkReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.LinkReference;

            /**
             * Decodes a LinkReference message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LinkReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.LinkReference;

            /**
             * Verifies a LinkReference message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LinkReference message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LinkReference
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.LinkReference;

            /**
             * Creates a plain object from a LinkReference message. Also converts values to other types if specified.
             * @param message LinkReference
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.LinkReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LinkReference to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Signature. */
        interface ISignature {

            /** Signature version */
            version?: (string|null);

            /** Signature type */
            type?: (string|null);

            /** Signature payloadPath */
            payloadPath?: (string|null);

            /** Signature publicKey */
            publicKey?: (Uint8Array|null);

            /** Signature signature */
            signature?: (Uint8Array|null);
        }

        /** Represents a Signature. */
        class Signature implements ISignature {

            /**
             * Constructs a new Signature.
             * @param [properties] Properties to set
             */
            constructor(properties?: stratumn.chainscript.ISignature);

            /** Signature version. */
            public version: string;

            /** Signature type. */
            public type: string;

            /** Signature payloadPath. */
            public payloadPath: string;

            /** Signature publicKey. */
            public publicKey: Uint8Array;

            /** Signature signature. */
            public signature: Uint8Array;

            /**
             * Creates a new Signature instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Signature instance
             */
            public static create(properties?: stratumn.chainscript.ISignature): stratumn.chainscript.Signature;

            /**
             * Encodes the specified Signature message. Does not implicitly {@link stratumn.chainscript.Signature.verify|verify} messages.
             * @param message Signature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: stratumn.chainscript.ISignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Signature message, length delimited. Does not implicitly {@link stratumn.chainscript.Signature.verify|verify} messages.
             * @param message Signature message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: stratumn.chainscript.ISignature, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Signature message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): stratumn.chainscript.Signature;

            /**
             * Decodes a Signature message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): stratumn.chainscript.Signature;

            /**
             * Verifies a Signature message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Signature message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Signature
             */
            public static fromObject(object: { [k: string]: any }): stratumn.chainscript.Signature;

            /**
             * Creates a plain object from a Signature message. Also converts values to other types if specified.
             * @param message Signature
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: stratumn.chainscript.Signature, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Signature to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
