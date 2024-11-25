import {TagTypes} from "../tag";
import * as NumberUtils from "../utils/number";

/**
 * This class contains settings related to MPEG container file operations. Open files will need to
 * be re-read in order for changes to take effect.
 */
export default class MpegContainerFileSettings {
    public static readonly SUPPORTED_TAG_TYPES = TagTypes.Id3v1 | TagTypes.Id3v2 | TagTypes.Ape;

    private static _defaultTagTypes = TagTypes.Id3v1 | TagTypes.Id3v2;

    /**
     * Gets the default types of tags for an MPEG container file. When opening a file, if these tag
     * types do not exist on the file, they will be created.
     */
    public static get defaultTagTypes(): TagTypes { return this._defaultTagTypes; }
    /**
     * Sets the default types of tags for an MPEG container file. When opening a file, if these tag
     * types do not exist on the file, they will be created. See {@link SUPPORTED_TAG_TYPES} for a
     * list of tag types that are supported by node-taglib-sharp for MPEG container files.
     */
    public static set defaultTagTypes(value: TagTypes) {
        const unsupportedTagTypes = NumberUtils.uintAnd(value, ~this.SUPPORTED_TAG_TYPES);
        if (unsupportedTagTypes !== 0) {
            throw new Error(
                `Argument error: node-taglib-sharp does not support tag types ${unsupportedTagTypes} for AAC files`
            );
        }

        this._defaultTagTypes = value;
    }
}
