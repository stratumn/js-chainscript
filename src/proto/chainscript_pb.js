/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.stratumn = (function() {

    /**
     * Namespace stratumn.
     * @exports stratumn
     * @namespace
     */
    var stratumn = {};

    stratumn.chainscript = (function() {

        /**
         * Namespace chainscript.
         * @memberof stratumn
         * @namespace
         */
        var chainscript = {};

        chainscript.Segment = (function() {

            /**
             * Properties of a Segment.
             * @memberof stratumn.chainscript
             * @interface ISegment
             * @property {stratumn.chainscript.ILink|null} [link] Segment link
             * @property {stratumn.chainscript.ISegmentMeta|null} [meta] Segment meta
             */

            /**
             * Constructs a new Segment.
             * @memberof stratumn.chainscript
             * @classdesc Represents a Segment.
             * @implements ISegment
             * @constructor
             * @param {stratumn.chainscript.ISegment=} [properties] Properties to set
             */
            function Segment(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Segment link.
             * @member {stratumn.chainscript.ILink|null|undefined} link
             * @memberof stratumn.chainscript.Segment
             * @instance
             */
            Segment.prototype.link = null;

            /**
             * Segment meta.
             * @member {stratumn.chainscript.ISegmentMeta|null|undefined} meta
             * @memberof stratumn.chainscript.Segment
             * @instance
             */
            Segment.prototype.meta = null;

            /**
             * Creates a new Segment instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {stratumn.chainscript.ISegment=} [properties] Properties to set
             * @returns {stratumn.chainscript.Segment} Segment instance
             */
            Segment.create = function create(properties) {
                return new Segment(properties);
            };

            /**
             * Encodes the specified Segment message. Does not implicitly {@link stratumn.chainscript.Segment.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {stratumn.chainscript.ISegment} message Segment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Segment.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.link != null && message.hasOwnProperty("link"))
                    $root.stratumn.chainscript.Link.encode(message.link, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.meta != null && message.hasOwnProperty("meta"))
                    $root.stratumn.chainscript.SegmentMeta.encode(message.meta, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Segment message, length delimited. Does not implicitly {@link stratumn.chainscript.Segment.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {stratumn.chainscript.ISegment} message Segment message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Segment.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Segment message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.Segment} Segment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Segment.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.Segment();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.link = $root.stratumn.chainscript.Link.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.meta = $root.stratumn.chainscript.SegmentMeta.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Segment message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.Segment} Segment
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Segment.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Segment message.
             * @function verify
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Segment.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.link != null && message.hasOwnProperty("link")) {
                    var error = $root.stratumn.chainscript.Link.verify(message.link);
                    if (error)
                        return "link." + error;
                }
                if (message.meta != null && message.hasOwnProperty("meta")) {
                    var error = $root.stratumn.chainscript.SegmentMeta.verify(message.meta);
                    if (error)
                        return "meta." + error;
                }
                return null;
            };

            /**
             * Creates a Segment message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.Segment} Segment
             */
            Segment.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.Segment)
                    return object;
                var message = new $root.stratumn.chainscript.Segment();
                if (object.link != null) {
                    if (typeof object.link !== "object")
                        throw TypeError(".stratumn.chainscript.Segment.link: object expected");
                    message.link = $root.stratumn.chainscript.Link.fromObject(object.link);
                }
                if (object.meta != null) {
                    if (typeof object.meta !== "object")
                        throw TypeError(".stratumn.chainscript.Segment.meta: object expected");
                    message.meta = $root.stratumn.chainscript.SegmentMeta.fromObject(object.meta);
                }
                return message;
            };

            /**
             * Creates a plain object from a Segment message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.Segment
             * @static
             * @param {stratumn.chainscript.Segment} message Segment
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Segment.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.link = null;
                    object.meta = null;
                }
                if (message.link != null && message.hasOwnProperty("link"))
                    object.link = $root.stratumn.chainscript.Link.toObject(message.link, options);
                if (message.meta != null && message.hasOwnProperty("meta"))
                    object.meta = $root.stratumn.chainscript.SegmentMeta.toObject(message.meta, options);
                return object;
            };

            /**
             * Converts this Segment to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.Segment
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Segment.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Segment;
        })();

        chainscript.SegmentMeta = (function() {

            /**
             * Properties of a SegmentMeta.
             * @memberof stratumn.chainscript
             * @interface ISegmentMeta
             * @property {Uint8Array|null} [linkHash] SegmentMeta linkHash
             * @property {Array.<stratumn.chainscript.IEvidence>|null} [evidences] SegmentMeta evidences
             */

            /**
             * Constructs a new SegmentMeta.
             * @memberof stratumn.chainscript
             * @classdesc Represents a SegmentMeta.
             * @implements ISegmentMeta
             * @constructor
             * @param {stratumn.chainscript.ISegmentMeta=} [properties] Properties to set
             */
            function SegmentMeta(properties) {
                this.evidences = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SegmentMeta linkHash.
             * @member {Uint8Array} linkHash
             * @memberof stratumn.chainscript.SegmentMeta
             * @instance
             */
            SegmentMeta.prototype.linkHash = $util.newBuffer([]);

            /**
             * SegmentMeta evidences.
             * @member {Array.<stratumn.chainscript.IEvidence>} evidences
             * @memberof stratumn.chainscript.SegmentMeta
             * @instance
             */
            SegmentMeta.prototype.evidences = $util.emptyArray;

            /**
             * Creates a new SegmentMeta instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {stratumn.chainscript.ISegmentMeta=} [properties] Properties to set
             * @returns {stratumn.chainscript.SegmentMeta} SegmentMeta instance
             */
            SegmentMeta.create = function create(properties) {
                return new SegmentMeta(properties);
            };

            /**
             * Encodes the specified SegmentMeta message. Does not implicitly {@link stratumn.chainscript.SegmentMeta.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {stratumn.chainscript.ISegmentMeta} message SegmentMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SegmentMeta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.linkHash);
                if (message.evidences != null && message.evidences.length)
                    for (var i = 0; i < message.evidences.length; ++i)
                        $root.stratumn.chainscript.Evidence.encode(message.evidences[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified SegmentMeta message, length delimited. Does not implicitly {@link stratumn.chainscript.SegmentMeta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {stratumn.chainscript.ISegmentMeta} message SegmentMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SegmentMeta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SegmentMeta message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.SegmentMeta} SegmentMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SegmentMeta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.SegmentMeta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.linkHash = reader.bytes();
                        break;
                    case 10:
                        if (!(message.evidences && message.evidences.length))
                            message.evidences = [];
                        message.evidences.push($root.stratumn.chainscript.Evidence.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a SegmentMeta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.SegmentMeta} SegmentMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SegmentMeta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SegmentMeta message.
             * @function verify
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SegmentMeta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    if (!(message.linkHash && typeof message.linkHash.length === "number" || $util.isString(message.linkHash)))
                        return "linkHash: buffer expected";
                if (message.evidences != null && message.hasOwnProperty("evidences")) {
                    if (!Array.isArray(message.evidences))
                        return "evidences: array expected";
                    for (var i = 0; i < message.evidences.length; ++i) {
                        var error = $root.stratumn.chainscript.Evidence.verify(message.evidences[i]);
                        if (error)
                            return "evidences." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a SegmentMeta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.SegmentMeta} SegmentMeta
             */
            SegmentMeta.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.SegmentMeta)
                    return object;
                var message = new $root.stratumn.chainscript.SegmentMeta();
                if (object.linkHash != null)
                    if (typeof object.linkHash === "string")
                        $util.base64.decode(object.linkHash, message.linkHash = $util.newBuffer($util.base64.length(object.linkHash)), 0);
                    else if (object.linkHash.length)
                        message.linkHash = object.linkHash;
                if (object.evidences) {
                    if (!Array.isArray(object.evidences))
                        throw TypeError(".stratumn.chainscript.SegmentMeta.evidences: array expected");
                    message.evidences = [];
                    for (var i = 0; i < object.evidences.length; ++i) {
                        if (typeof object.evidences[i] !== "object")
                            throw TypeError(".stratumn.chainscript.SegmentMeta.evidences: object expected");
                        message.evidences[i] = $root.stratumn.chainscript.Evidence.fromObject(object.evidences[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a SegmentMeta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.SegmentMeta
             * @static
             * @param {stratumn.chainscript.SegmentMeta} message SegmentMeta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SegmentMeta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.evidences = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.linkHash = "";
                    else {
                        object.linkHash = [];
                        if (options.bytes !== Array)
                            object.linkHash = $util.newBuffer(object.linkHash);
                    }
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    object.linkHash = options.bytes === String ? $util.base64.encode(message.linkHash, 0, message.linkHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.linkHash) : message.linkHash;
                if (message.evidences && message.evidences.length) {
                    object.evidences = [];
                    for (var j = 0; j < message.evidences.length; ++j)
                        object.evidences[j] = $root.stratumn.chainscript.Evidence.toObject(message.evidences[j], options);
                }
                return object;
            };

            /**
             * Converts this SegmentMeta to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.SegmentMeta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SegmentMeta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return SegmentMeta;
        })();

        chainscript.Evidence = (function() {

            /**
             * Properties of an Evidence.
             * @memberof stratumn.chainscript
             * @interface IEvidence
             * @property {string|null} [version] Evidence version
             * @property {string|null} [backend] Evidence backend
             * @property {string|null} [provider] Evidence provider
             * @property {Uint8Array|null} [proof] Evidence proof
             */

            /**
             * Constructs a new Evidence.
             * @memberof stratumn.chainscript
             * @classdesc Represents an Evidence.
             * @implements IEvidence
             * @constructor
             * @param {stratumn.chainscript.IEvidence=} [properties] Properties to set
             */
            function Evidence(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Evidence version.
             * @member {string} version
             * @memberof stratumn.chainscript.Evidence
             * @instance
             */
            Evidence.prototype.version = "";

            /**
             * Evidence backend.
             * @member {string} backend
             * @memberof stratumn.chainscript.Evidence
             * @instance
             */
            Evidence.prototype.backend = "";

            /**
             * Evidence provider.
             * @member {string} provider
             * @memberof stratumn.chainscript.Evidence
             * @instance
             */
            Evidence.prototype.provider = "";

            /**
             * Evidence proof.
             * @member {Uint8Array} proof
             * @memberof stratumn.chainscript.Evidence
             * @instance
             */
            Evidence.prototype.proof = $util.newBuffer([]);

            /**
             * Creates a new Evidence instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {stratumn.chainscript.IEvidence=} [properties] Properties to set
             * @returns {stratumn.chainscript.Evidence} Evidence instance
             */
            Evidence.create = function create(properties) {
                return new Evidence(properties);
            };

            /**
             * Encodes the specified Evidence message. Does not implicitly {@link stratumn.chainscript.Evidence.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {stratumn.chainscript.IEvidence} message Evidence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Evidence.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.backend != null && message.hasOwnProperty("backend"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.backend);
                if (message.provider != null && message.hasOwnProperty("provider"))
                    writer.uint32(/* id 11, wireType 2 =*/90).string(message.provider);
                if (message.proof != null && message.hasOwnProperty("proof"))
                    writer.uint32(/* id 20, wireType 2 =*/162).bytes(message.proof);
                return writer;
            };

            /**
             * Encodes the specified Evidence message, length delimited. Does not implicitly {@link stratumn.chainscript.Evidence.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {stratumn.chainscript.IEvidence} message Evidence message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Evidence.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Evidence message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.Evidence} Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Evidence.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.Evidence();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 10:
                        message.backend = reader.string();
                        break;
                    case 11:
                        message.provider = reader.string();
                        break;
                    case 20:
                        message.proof = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Evidence message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.Evidence} Evidence
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Evidence.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Evidence message.
             * @function verify
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Evidence.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.backend != null && message.hasOwnProperty("backend"))
                    if (!$util.isString(message.backend))
                        return "backend: string expected";
                if (message.provider != null && message.hasOwnProperty("provider"))
                    if (!$util.isString(message.provider))
                        return "provider: string expected";
                if (message.proof != null && message.hasOwnProperty("proof"))
                    if (!(message.proof && typeof message.proof.length === "number" || $util.isString(message.proof)))
                        return "proof: buffer expected";
                return null;
            };

            /**
             * Creates an Evidence message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.Evidence} Evidence
             */
            Evidence.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.Evidence)
                    return object;
                var message = new $root.stratumn.chainscript.Evidence();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.backend != null)
                    message.backend = String(object.backend);
                if (object.provider != null)
                    message.provider = String(object.provider);
                if (object.proof != null)
                    if (typeof object.proof === "string")
                        $util.base64.decode(object.proof, message.proof = $util.newBuffer($util.base64.length(object.proof)), 0);
                    else if (object.proof.length)
                        message.proof = object.proof;
                return message;
            };

            /**
             * Creates a plain object from an Evidence message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.Evidence
             * @static
             * @param {stratumn.chainscript.Evidence} message Evidence
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Evidence.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.version = "";
                    object.backend = "";
                    object.provider = "";
                    if (options.bytes === String)
                        object.proof = "";
                    else {
                        object.proof = [];
                        if (options.bytes !== Array)
                            object.proof = $util.newBuffer(object.proof);
                    }
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.backend != null && message.hasOwnProperty("backend"))
                    object.backend = message.backend;
                if (message.provider != null && message.hasOwnProperty("provider"))
                    object.provider = message.provider;
                if (message.proof != null && message.hasOwnProperty("proof"))
                    object.proof = options.bytes === String ? $util.base64.encode(message.proof, 0, message.proof.length) : options.bytes === Array ? Array.prototype.slice.call(message.proof) : message.proof;
                return object;
            };

            /**
             * Converts this Evidence to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.Evidence
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Evidence.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Evidence;
        })();

        chainscript.Link = (function() {

            /**
             * Properties of a Link.
             * @memberof stratumn.chainscript
             * @interface ILink
             * @property {string|null} [version] Link version
             * @property {Uint8Array|null} [data] Link data
             * @property {stratumn.chainscript.ILinkMeta|null} [meta] Link meta
             * @property {Array.<stratumn.chainscript.ISignature>|null} [signatures] Link signatures
             */

            /**
             * Constructs a new Link.
             * @memberof stratumn.chainscript
             * @classdesc Represents a Link.
             * @implements ILink
             * @constructor
             * @param {stratumn.chainscript.ILink=} [properties] Properties to set
             */
            function Link(properties) {
                this.signatures = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Link version.
             * @member {string} version
             * @memberof stratumn.chainscript.Link
             * @instance
             */
            Link.prototype.version = "";

            /**
             * Link data.
             * @member {Uint8Array} data
             * @memberof stratumn.chainscript.Link
             * @instance
             */
            Link.prototype.data = $util.newBuffer([]);

            /**
             * Link meta.
             * @member {stratumn.chainscript.ILinkMeta|null|undefined} meta
             * @memberof stratumn.chainscript.Link
             * @instance
             */
            Link.prototype.meta = null;

            /**
             * Link signatures.
             * @member {Array.<stratumn.chainscript.ISignature>} signatures
             * @memberof stratumn.chainscript.Link
             * @instance
             */
            Link.prototype.signatures = $util.emptyArray;

            /**
             * Creates a new Link instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {stratumn.chainscript.ILink=} [properties] Properties to set
             * @returns {stratumn.chainscript.Link} Link instance
             */
            Link.create = function create(properties) {
                return new Link(properties);
            };

            /**
             * Encodes the specified Link message. Does not implicitly {@link stratumn.chainscript.Link.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {stratumn.chainscript.ILink} message Link message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Link.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.data);
                if (message.meta != null && message.hasOwnProperty("meta"))
                    $root.stratumn.chainscript.LinkMeta.encode(message.meta, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                if (message.signatures != null && message.signatures.length)
                    for (var i = 0; i < message.signatures.length; ++i)
                        $root.stratumn.chainscript.Signature.encode(message.signatures[i], writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Link message, length delimited. Does not implicitly {@link stratumn.chainscript.Link.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {stratumn.chainscript.ILink} message Link message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Link.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Link message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.Link} Link
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Link.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.Link();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 10:
                        message.data = reader.bytes();
                        break;
                    case 11:
                        message.meta = $root.stratumn.chainscript.LinkMeta.decode(reader, reader.uint32());
                        break;
                    case 20:
                        if (!(message.signatures && message.signatures.length))
                            message.signatures = [];
                        message.signatures.push($root.stratumn.chainscript.Signature.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Link message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.Link} Link
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Link.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Link message.
             * @function verify
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Link.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                if (message.meta != null && message.hasOwnProperty("meta")) {
                    var error = $root.stratumn.chainscript.LinkMeta.verify(message.meta);
                    if (error)
                        return "meta." + error;
                }
                if (message.signatures != null && message.hasOwnProperty("signatures")) {
                    if (!Array.isArray(message.signatures))
                        return "signatures: array expected";
                    for (var i = 0; i < message.signatures.length; ++i) {
                        var error = $root.stratumn.chainscript.Signature.verify(message.signatures[i]);
                        if (error)
                            return "signatures." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Link message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.Link} Link
             */
            Link.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.Link)
                    return object;
                var message = new $root.stratumn.chainscript.Link();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                if (object.meta != null) {
                    if (typeof object.meta !== "object")
                        throw TypeError(".stratumn.chainscript.Link.meta: object expected");
                    message.meta = $root.stratumn.chainscript.LinkMeta.fromObject(object.meta);
                }
                if (object.signatures) {
                    if (!Array.isArray(object.signatures))
                        throw TypeError(".stratumn.chainscript.Link.signatures: array expected");
                    message.signatures = [];
                    for (var i = 0; i < object.signatures.length; ++i) {
                        if (typeof object.signatures[i] !== "object")
                            throw TypeError(".stratumn.chainscript.Link.signatures: object expected");
                        message.signatures[i] = $root.stratumn.chainscript.Signature.fromObject(object.signatures[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Link message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.Link
             * @static
             * @param {stratumn.chainscript.Link} message Link
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Link.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.signatures = [];
                if (options.defaults) {
                    object.version = "";
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                    object.meta = null;
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                if (message.meta != null && message.hasOwnProperty("meta"))
                    object.meta = $root.stratumn.chainscript.LinkMeta.toObject(message.meta, options);
                if (message.signatures && message.signatures.length) {
                    object.signatures = [];
                    for (var j = 0; j < message.signatures.length; ++j)
                        object.signatures[j] = $root.stratumn.chainscript.Signature.toObject(message.signatures[j], options);
                }
                return object;
            };

            /**
             * Converts this Link to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.Link
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Link.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Link;
        })();

        chainscript.Process = (function() {

            /**
             * Properties of a Process.
             * @memberof stratumn.chainscript
             * @interface IProcess
             * @property {string|null} [name] Process name
             * @property {string|null} [state] Process state
             */

            /**
             * Constructs a new Process.
             * @memberof stratumn.chainscript
             * @classdesc Represents a Process.
             * @implements IProcess
             * @constructor
             * @param {stratumn.chainscript.IProcess=} [properties] Properties to set
             */
            function Process(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Process name.
             * @member {string} name
             * @memberof stratumn.chainscript.Process
             * @instance
             */
            Process.prototype.name = "";

            /**
             * Process state.
             * @member {string} state
             * @memberof stratumn.chainscript.Process
             * @instance
             */
            Process.prototype.state = "";

            /**
             * Creates a new Process instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {stratumn.chainscript.IProcess=} [properties] Properties to set
             * @returns {stratumn.chainscript.Process} Process instance
             */
            Process.create = function create(properties) {
                return new Process(properties);
            };

            /**
             * Encodes the specified Process message. Does not implicitly {@link stratumn.chainscript.Process.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {stratumn.chainscript.IProcess} message Process message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Process.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && message.hasOwnProperty("name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.state != null && message.hasOwnProperty("state"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.state);
                return writer;
            };

            /**
             * Encodes the specified Process message, length delimited. Does not implicitly {@link stratumn.chainscript.Process.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {stratumn.chainscript.IProcess} message Process message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Process.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Process message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.Process} Process
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Process.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.Process();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 10:
                        message.state = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Process message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.Process} Process
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Process.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Process message.
             * @function verify
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Process.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.state != null && message.hasOwnProperty("state"))
                    if (!$util.isString(message.state))
                        return "state: string expected";
                return null;
            };

            /**
             * Creates a Process message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.Process} Process
             */
            Process.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.Process)
                    return object;
                var message = new $root.stratumn.chainscript.Process();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.state != null)
                    message.state = String(object.state);
                return message;
            };

            /**
             * Creates a plain object from a Process message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.Process
             * @static
             * @param {stratumn.chainscript.Process} message Process
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Process.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.state = "";
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.state != null && message.hasOwnProperty("state"))
                    object.state = message.state;
                return object;
            };

            /**
             * Converts this Process to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.Process
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Process.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Process;
        })();

        chainscript.LinkMeta = (function() {

            /**
             * Properties of a LinkMeta.
             * @memberof stratumn.chainscript
             * @interface ILinkMeta
             * @property {string|null} [clientId] LinkMeta clientId
             * @property {Uint8Array|null} [prevLinkHash] LinkMeta prevLinkHash
             * @property {number|null} [priority] LinkMeta priority
             * @property {Array.<stratumn.chainscript.ILinkReference>|null} [refs] LinkMeta refs
             * @property {stratumn.chainscript.IProcess|null} [process] LinkMeta process
             * @property {string|null} [mapId] LinkMeta mapId
             * @property {string|null} [action] LinkMeta action
             * @property {string|null} [step] LinkMeta step
             * @property {Array.<string>|null} [tags] LinkMeta tags
             * @property {Uint8Array|null} [data] LinkMeta data
             */

            /**
             * Constructs a new LinkMeta.
             * @memberof stratumn.chainscript
             * @classdesc Represents a LinkMeta.
             * @implements ILinkMeta
             * @constructor
             * @param {stratumn.chainscript.ILinkMeta=} [properties] Properties to set
             */
            function LinkMeta(properties) {
                this.refs = [];
                this.tags = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LinkMeta clientId.
             * @member {string} clientId
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.clientId = "";

            /**
             * LinkMeta prevLinkHash.
             * @member {Uint8Array} prevLinkHash
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.prevLinkHash = $util.newBuffer([]);

            /**
             * LinkMeta priority.
             * @member {number} priority
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.priority = 0;

            /**
             * LinkMeta refs.
             * @member {Array.<stratumn.chainscript.ILinkReference>} refs
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.refs = $util.emptyArray;

            /**
             * LinkMeta process.
             * @member {stratumn.chainscript.IProcess|null|undefined} process
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.process = null;

            /**
             * LinkMeta mapId.
             * @member {string} mapId
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.mapId = "";

            /**
             * LinkMeta action.
             * @member {string} action
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.action = "";

            /**
             * LinkMeta step.
             * @member {string} step
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.step = "";

            /**
             * LinkMeta tags.
             * @member {Array.<string>} tags
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.tags = $util.emptyArray;

            /**
             * LinkMeta data.
             * @member {Uint8Array} data
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             */
            LinkMeta.prototype.data = $util.newBuffer([]);

            /**
             * Creates a new LinkMeta instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {stratumn.chainscript.ILinkMeta=} [properties] Properties to set
             * @returns {stratumn.chainscript.LinkMeta} LinkMeta instance
             */
            LinkMeta.create = function create(properties) {
                return new LinkMeta(properties);
            };

            /**
             * Encodes the specified LinkMeta message. Does not implicitly {@link stratumn.chainscript.LinkMeta.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {stratumn.chainscript.ILinkMeta} message LinkMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinkMeta.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.clientId);
                if (message.prevLinkHash != null && message.hasOwnProperty("prevLinkHash"))
                    writer.uint32(/* id 10, wireType 2 =*/82).bytes(message.prevLinkHash);
                if (message.priority != null && message.hasOwnProperty("priority"))
                    writer.uint32(/* id 11, wireType 1 =*/89).double(message.priority);
                if (message.refs != null && message.refs.length)
                    for (var i = 0; i < message.refs.length; ++i)
                        $root.stratumn.chainscript.LinkReference.encode(message.refs[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
                if (message.process != null && message.hasOwnProperty("process"))
                    $root.stratumn.chainscript.Process.encode(message.process, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
                if (message.mapId != null && message.hasOwnProperty("mapId"))
                    writer.uint32(/* id 21, wireType 2 =*/170).string(message.mapId);
                if (message.action != null && message.hasOwnProperty("action"))
                    writer.uint32(/* id 30, wireType 2 =*/242).string(message.action);
                if (message.step != null && message.hasOwnProperty("step"))
                    writer.uint32(/* id 31, wireType 2 =*/250).string(message.step);
                if (message.tags != null && message.tags.length)
                    for (var i = 0; i < message.tags.length; ++i)
                        writer.uint32(/* id 32, wireType 2 =*/258).string(message.tags[i]);
                if (message.data != null && message.hasOwnProperty("data"))
                    writer.uint32(/* id 100, wireType 2 =*/802).bytes(message.data);
                return writer;
            };

            /**
             * Encodes the specified LinkMeta message, length delimited. Does not implicitly {@link stratumn.chainscript.LinkMeta.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {stratumn.chainscript.ILinkMeta} message LinkMeta message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinkMeta.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LinkMeta message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.LinkMeta} LinkMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinkMeta.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.LinkMeta();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.clientId = reader.string();
                        break;
                    case 10:
                        message.prevLinkHash = reader.bytes();
                        break;
                    case 11:
                        message.priority = reader.double();
                        break;
                    case 12:
                        if (!(message.refs && message.refs.length))
                            message.refs = [];
                        message.refs.push($root.stratumn.chainscript.LinkReference.decode(reader, reader.uint32()));
                        break;
                    case 20:
                        message.process = $root.stratumn.chainscript.Process.decode(reader, reader.uint32());
                        break;
                    case 21:
                        message.mapId = reader.string();
                        break;
                    case 30:
                        message.action = reader.string();
                        break;
                    case 31:
                        message.step = reader.string();
                        break;
                    case 32:
                        if (!(message.tags && message.tags.length))
                            message.tags = [];
                        message.tags.push(reader.string());
                        break;
                    case 100:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LinkMeta message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.LinkMeta} LinkMeta
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinkMeta.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LinkMeta message.
             * @function verify
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LinkMeta.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    if (!$util.isString(message.clientId))
                        return "clientId: string expected";
                if (message.prevLinkHash != null && message.hasOwnProperty("prevLinkHash"))
                    if (!(message.prevLinkHash && typeof message.prevLinkHash.length === "number" || $util.isString(message.prevLinkHash)))
                        return "prevLinkHash: buffer expected";
                if (message.priority != null && message.hasOwnProperty("priority"))
                    if (typeof message.priority !== "number")
                        return "priority: number expected";
                if (message.refs != null && message.hasOwnProperty("refs")) {
                    if (!Array.isArray(message.refs))
                        return "refs: array expected";
                    for (var i = 0; i < message.refs.length; ++i) {
                        var error = $root.stratumn.chainscript.LinkReference.verify(message.refs[i]);
                        if (error)
                            return "refs." + error;
                    }
                }
                if (message.process != null && message.hasOwnProperty("process")) {
                    var error = $root.stratumn.chainscript.Process.verify(message.process);
                    if (error)
                        return "process." + error;
                }
                if (message.mapId != null && message.hasOwnProperty("mapId"))
                    if (!$util.isString(message.mapId))
                        return "mapId: string expected";
                if (message.action != null && message.hasOwnProperty("action"))
                    if (!$util.isString(message.action))
                        return "action: string expected";
                if (message.step != null && message.hasOwnProperty("step"))
                    if (!$util.isString(message.step))
                        return "step: string expected";
                if (message.tags != null && message.hasOwnProperty("tags")) {
                    if (!Array.isArray(message.tags))
                        return "tags: array expected";
                    for (var i = 0; i < message.tags.length; ++i)
                        if (!$util.isString(message.tags[i]))
                            return "tags: string[] expected";
                }
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };

            /**
             * Creates a LinkMeta message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.LinkMeta} LinkMeta
             */
            LinkMeta.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.LinkMeta)
                    return object;
                var message = new $root.stratumn.chainscript.LinkMeta();
                if (object.clientId != null)
                    message.clientId = String(object.clientId);
                if (object.prevLinkHash != null)
                    if (typeof object.prevLinkHash === "string")
                        $util.base64.decode(object.prevLinkHash, message.prevLinkHash = $util.newBuffer($util.base64.length(object.prevLinkHash)), 0);
                    else if (object.prevLinkHash.length)
                        message.prevLinkHash = object.prevLinkHash;
                if (object.priority != null)
                    message.priority = Number(object.priority);
                if (object.refs) {
                    if (!Array.isArray(object.refs))
                        throw TypeError(".stratumn.chainscript.LinkMeta.refs: array expected");
                    message.refs = [];
                    for (var i = 0; i < object.refs.length; ++i) {
                        if (typeof object.refs[i] !== "object")
                            throw TypeError(".stratumn.chainscript.LinkMeta.refs: object expected");
                        message.refs[i] = $root.stratumn.chainscript.LinkReference.fromObject(object.refs[i]);
                    }
                }
                if (object.process != null) {
                    if (typeof object.process !== "object")
                        throw TypeError(".stratumn.chainscript.LinkMeta.process: object expected");
                    message.process = $root.stratumn.chainscript.Process.fromObject(object.process);
                }
                if (object.mapId != null)
                    message.mapId = String(object.mapId);
                if (object.action != null)
                    message.action = String(object.action);
                if (object.step != null)
                    message.step = String(object.step);
                if (object.tags) {
                    if (!Array.isArray(object.tags))
                        throw TypeError(".stratumn.chainscript.LinkMeta.tags: array expected");
                    message.tags = [];
                    for (var i = 0; i < object.tags.length; ++i)
                        message.tags[i] = String(object.tags[i]);
                }
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };

            /**
             * Creates a plain object from a LinkMeta message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.LinkMeta
             * @static
             * @param {stratumn.chainscript.LinkMeta} message LinkMeta
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LinkMeta.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.refs = [];
                    object.tags = [];
                }
                if (options.defaults) {
                    object.clientId = "";
                    if (options.bytes === String)
                        object.prevLinkHash = "";
                    else {
                        object.prevLinkHash = [];
                        if (options.bytes !== Array)
                            object.prevLinkHash = $util.newBuffer(object.prevLinkHash);
                    }
                    object.priority = 0;
                    object.process = null;
                    object.mapId = "";
                    object.action = "";
                    object.step = "";
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                }
                if (message.clientId != null && message.hasOwnProperty("clientId"))
                    object.clientId = message.clientId;
                if (message.prevLinkHash != null && message.hasOwnProperty("prevLinkHash"))
                    object.prevLinkHash = options.bytes === String ? $util.base64.encode(message.prevLinkHash, 0, message.prevLinkHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.prevLinkHash) : message.prevLinkHash;
                if (message.priority != null && message.hasOwnProperty("priority"))
                    object.priority = options.json && !isFinite(message.priority) ? String(message.priority) : message.priority;
                if (message.refs && message.refs.length) {
                    object.refs = [];
                    for (var j = 0; j < message.refs.length; ++j)
                        object.refs[j] = $root.stratumn.chainscript.LinkReference.toObject(message.refs[j], options);
                }
                if (message.process != null && message.hasOwnProperty("process"))
                    object.process = $root.stratumn.chainscript.Process.toObject(message.process, options);
                if (message.mapId != null && message.hasOwnProperty("mapId"))
                    object.mapId = message.mapId;
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = message.action;
                if (message.step != null && message.hasOwnProperty("step"))
                    object.step = message.step;
                if (message.tags && message.tags.length) {
                    object.tags = [];
                    for (var j = 0; j < message.tags.length; ++j)
                        object.tags[j] = message.tags[j];
                }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };

            /**
             * Converts this LinkMeta to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.LinkMeta
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LinkMeta.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LinkMeta;
        })();

        chainscript.LinkReference = (function() {

            /**
             * Properties of a LinkReference.
             * @memberof stratumn.chainscript
             * @interface ILinkReference
             * @property {Uint8Array|null} [linkHash] LinkReference linkHash
             * @property {string|null} [process] LinkReference process
             */

            /**
             * Constructs a new LinkReference.
             * @memberof stratumn.chainscript
             * @classdesc Represents a LinkReference.
             * @implements ILinkReference
             * @constructor
             * @param {stratumn.chainscript.ILinkReference=} [properties] Properties to set
             */
            function LinkReference(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LinkReference linkHash.
             * @member {Uint8Array} linkHash
             * @memberof stratumn.chainscript.LinkReference
             * @instance
             */
            LinkReference.prototype.linkHash = $util.newBuffer([]);

            /**
             * LinkReference process.
             * @member {string} process
             * @memberof stratumn.chainscript.LinkReference
             * @instance
             */
            LinkReference.prototype.process = "";

            /**
             * Creates a new LinkReference instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {stratumn.chainscript.ILinkReference=} [properties] Properties to set
             * @returns {stratumn.chainscript.LinkReference} LinkReference instance
             */
            LinkReference.create = function create(properties) {
                return new LinkReference(properties);
            };

            /**
             * Encodes the specified LinkReference message. Does not implicitly {@link stratumn.chainscript.LinkReference.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {stratumn.chainscript.ILinkReference} message LinkReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinkReference.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.linkHash);
                if (message.process != null && message.hasOwnProperty("process"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.process);
                return writer;
            };

            /**
             * Encodes the specified LinkReference message, length delimited. Does not implicitly {@link stratumn.chainscript.LinkReference.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {stratumn.chainscript.ILinkReference} message LinkReference message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinkReference.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LinkReference message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.LinkReference} LinkReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinkReference.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.LinkReference();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.linkHash = reader.bytes();
                        break;
                    case 10:
                        message.process = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LinkReference message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.LinkReference} LinkReference
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinkReference.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LinkReference message.
             * @function verify
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LinkReference.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    if (!(message.linkHash && typeof message.linkHash.length === "number" || $util.isString(message.linkHash)))
                        return "linkHash: buffer expected";
                if (message.process != null && message.hasOwnProperty("process"))
                    if (!$util.isString(message.process))
                        return "process: string expected";
                return null;
            };

            /**
             * Creates a LinkReference message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.LinkReference} LinkReference
             */
            LinkReference.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.LinkReference)
                    return object;
                var message = new $root.stratumn.chainscript.LinkReference();
                if (object.linkHash != null)
                    if (typeof object.linkHash === "string")
                        $util.base64.decode(object.linkHash, message.linkHash = $util.newBuffer($util.base64.length(object.linkHash)), 0);
                    else if (object.linkHash.length)
                        message.linkHash = object.linkHash;
                if (object.process != null)
                    message.process = String(object.process);
                return message;
            };

            /**
             * Creates a plain object from a LinkReference message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.LinkReference
             * @static
             * @param {stratumn.chainscript.LinkReference} message LinkReference
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LinkReference.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if (options.bytes === String)
                        object.linkHash = "";
                    else {
                        object.linkHash = [];
                        if (options.bytes !== Array)
                            object.linkHash = $util.newBuffer(object.linkHash);
                    }
                    object.process = "";
                }
                if (message.linkHash != null && message.hasOwnProperty("linkHash"))
                    object.linkHash = options.bytes === String ? $util.base64.encode(message.linkHash, 0, message.linkHash.length) : options.bytes === Array ? Array.prototype.slice.call(message.linkHash) : message.linkHash;
                if (message.process != null && message.hasOwnProperty("process"))
                    object.process = message.process;
                return object;
            };

            /**
             * Converts this LinkReference to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.LinkReference
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LinkReference.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LinkReference;
        })();

        chainscript.Signature = (function() {

            /**
             * Properties of a Signature.
             * @memberof stratumn.chainscript
             * @interface ISignature
             * @property {string|null} [version] Signature version
             * @property {string|null} [type] Signature type
             * @property {string|null} [payloadPath] Signature payloadPath
             * @property {Uint8Array|null} [publicKey] Signature publicKey
             * @property {Uint8Array|null} [signature] Signature signature
             */

            /**
             * Constructs a new Signature.
             * @memberof stratumn.chainscript
             * @classdesc Represents a Signature.
             * @implements ISignature
             * @constructor
             * @param {stratumn.chainscript.ISignature=} [properties] Properties to set
             */
            function Signature(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Signature version.
             * @member {string} version
             * @memberof stratumn.chainscript.Signature
             * @instance
             */
            Signature.prototype.version = "";

            /**
             * Signature type.
             * @member {string} type
             * @memberof stratumn.chainscript.Signature
             * @instance
             */
            Signature.prototype.type = "";

            /**
             * Signature payloadPath.
             * @member {string} payloadPath
             * @memberof stratumn.chainscript.Signature
             * @instance
             */
            Signature.prototype.payloadPath = "";

            /**
             * Signature publicKey.
             * @member {Uint8Array} publicKey
             * @memberof stratumn.chainscript.Signature
             * @instance
             */
            Signature.prototype.publicKey = $util.newBuffer([]);

            /**
             * Signature signature.
             * @member {Uint8Array} signature
             * @memberof stratumn.chainscript.Signature
             * @instance
             */
            Signature.prototype.signature = $util.newBuffer([]);

            /**
             * Creates a new Signature instance using the specified properties.
             * @function create
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {stratumn.chainscript.ISignature=} [properties] Properties to set
             * @returns {stratumn.chainscript.Signature} Signature instance
             */
            Signature.create = function create(properties) {
                return new Signature(properties);
            };

            /**
             * Encodes the specified Signature message. Does not implicitly {@link stratumn.chainscript.Signature.verify|verify} messages.
             * @function encode
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {stratumn.chainscript.ISignature} message Signature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signature.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.version != null && message.hasOwnProperty("version"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.version);
                if (message.type != null && message.hasOwnProperty("type"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.type);
                if (message.payloadPath != null && message.hasOwnProperty("payloadPath"))
                    writer.uint32(/* id 10, wireType 2 =*/82).string(message.payloadPath);
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    writer.uint32(/* id 20, wireType 2 =*/162).bytes(message.publicKey);
                if (message.signature != null && message.hasOwnProperty("signature"))
                    writer.uint32(/* id 21, wireType 2 =*/170).bytes(message.signature);
                return writer;
            };

            /**
             * Encodes the specified Signature message, length delimited. Does not implicitly {@link stratumn.chainscript.Signature.verify|verify} messages.
             * @function encodeDelimited
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {stratumn.chainscript.ISignature} message Signature message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Signature.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Signature message from the specified reader or buffer.
             * @function decode
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {stratumn.chainscript.Signature} Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signature.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.stratumn.chainscript.Signature();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.version = reader.string();
                        break;
                    case 2:
                        message.type = reader.string();
                        break;
                    case 10:
                        message.payloadPath = reader.string();
                        break;
                    case 20:
                        message.publicKey = reader.bytes();
                        break;
                    case 21:
                        message.signature = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Signature message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {stratumn.chainscript.Signature} Signature
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Signature.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Signature message.
             * @function verify
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Signature.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.version != null && message.hasOwnProperty("version"))
                    if (!$util.isString(message.version))
                        return "version: string expected";
                if (message.type != null && message.hasOwnProperty("type"))
                    if (!$util.isString(message.type))
                        return "type: string expected";
                if (message.payloadPath != null && message.hasOwnProperty("payloadPath"))
                    if (!$util.isString(message.payloadPath))
                        return "payloadPath: string expected";
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    if (!(message.publicKey && typeof message.publicKey.length === "number" || $util.isString(message.publicKey)))
                        return "publicKey: buffer expected";
                if (message.signature != null && message.hasOwnProperty("signature"))
                    if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                        return "signature: buffer expected";
                return null;
            };

            /**
             * Creates a Signature message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {stratumn.chainscript.Signature} Signature
             */
            Signature.fromObject = function fromObject(object) {
                if (object instanceof $root.stratumn.chainscript.Signature)
                    return object;
                var message = new $root.stratumn.chainscript.Signature();
                if (object.version != null)
                    message.version = String(object.version);
                if (object.type != null)
                    message.type = String(object.type);
                if (object.payloadPath != null)
                    message.payloadPath = String(object.payloadPath);
                if (object.publicKey != null)
                    if (typeof object.publicKey === "string")
                        $util.base64.decode(object.publicKey, message.publicKey = $util.newBuffer($util.base64.length(object.publicKey)), 0);
                    else if (object.publicKey.length)
                        message.publicKey = object.publicKey;
                if (object.signature != null)
                    if (typeof object.signature === "string")
                        $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                    else if (object.signature.length)
                        message.signature = object.signature;
                return message;
            };

            /**
             * Creates a plain object from a Signature message. Also converts values to other types if specified.
             * @function toObject
             * @memberof stratumn.chainscript.Signature
             * @static
             * @param {stratumn.chainscript.Signature} message Signature
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Signature.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.version = "";
                    object.type = "";
                    object.payloadPath = "";
                    if (options.bytes === String)
                        object.publicKey = "";
                    else {
                        object.publicKey = [];
                        if (options.bytes !== Array)
                            object.publicKey = $util.newBuffer(object.publicKey);
                    }
                    if (options.bytes === String)
                        object.signature = "";
                    else {
                        object.signature = [];
                        if (options.bytes !== Array)
                            object.signature = $util.newBuffer(object.signature);
                    }
                }
                if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.payloadPath != null && message.hasOwnProperty("payloadPath"))
                    object.payloadPath = message.payloadPath;
                if (message.publicKey != null && message.hasOwnProperty("publicKey"))
                    object.publicKey = options.bytes === String ? $util.base64.encode(message.publicKey, 0, message.publicKey.length) : options.bytes === Array ? Array.prototype.slice.call(message.publicKey) : message.publicKey;
                if (message.signature != null && message.hasOwnProperty("signature"))
                    object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
                return object;
            };

            /**
             * Converts this Signature to JSON.
             * @function toJSON
             * @memberof stratumn.chainscript.Signature
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Signature.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Signature;
        })();

        return chainscript;
    })();

    return stratumn;
})();

module.exports = $root;
