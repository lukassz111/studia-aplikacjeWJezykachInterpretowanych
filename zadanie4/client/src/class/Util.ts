class _Util {
    public getValue<T>(object: any, propertyName: string, defaultValue: T): T {
        if(Object.prototype.hasOwnProperty.call(object,propertyName)) {
            return object[propertyName]
        } else {
            return defaultValue
        }
    }
}
export const Util = new _Util()