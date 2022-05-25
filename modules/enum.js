/**
 * Create an enumeration, given an array of values.
 * @param {Array<string>} enumList An array of the enum values to create
 *
 * @privateRemarks Author: T. Forrest - Permission is granted to use this in
any other works
 */
function createEnum(enumList) {
    const enumeration = {};

    for (const [i, enumValue] of enumList.entries()) {
            Object.defineProperty(enumeration, enumValue, {
                    configurable: false,
                    enumerable: true,
                    value: i,
                    writable: false,
            });
    }

    // Seal the enumeration object to prevent modification
    Object.freeze(enumeration);

    return enumeration;
}