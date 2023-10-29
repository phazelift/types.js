type TAnyObject = { [key:string]: any; };
type TEnum = { [key:string]: number; };
type TTypes = 'undefined' | 'null' | 'boolean' | 'string' | 'number' | 'nan' | 'object' | 'array' | 'function' | 'regexp' | 'date' | 'symbol';

export = Types

declare namespace Types {

	let autoConvert: boolean;
	let logging: boolean;
	let parseIntBase: number;

	function createEnum(): TEnum;
	function disableLogging(): void;
	function enableLogging(): void;
	function enumerate(items: string[], offset: number): TEnum;
	function intoArray(...args: any[] ): any[];
	function log(...args: any[]): void;
	function logForce(externalLog: Function ): void;
	function typeOf(value: any): TTypes;


	// is, not, has, all, getFirst
	function isBoolean(value: any): boolean;
	function notBoolean(value: any): boolean;
	function hasBoolean(value: any): boolean;
	function allBoolean(value: any): boolean;
	function getFirstBoolean(...values: any[]): boolean;

	function isString(value: any): boolean;
	function notString(value: any): boolean;
	function hasString(value: any): boolean;
	function allString(value: any): boolean;
	function getFirstString(...values: any[]): string;

	function isNumber(value: any): boolean;
	function notNumber(value: any): boolean;
	function hasNumber(value: any): boolean;
	function allNumber(value: any): boolean;
	function getFirstNumber(...values: any[]): number;

	function isStringOrNumber(value: any): boolean;
	function notStringOrNumber(value: any): boolean;
	function hasStringOrNumber(value: any): boolean;
	function allStringOrNumber(value: any): boolean;

	function isArray(value: any): boolean;
	function notArray(value: any): boolean;
	function hasArray(value: any): boolean;
	function allArray(value: any): boolean;
	function getFirstArray(...values: any[]): any[];

	function isObject(value: any): boolean;
	function notObject(value: any): boolean;
	function hasObject(value: any): boolean;
	function allObject(value: any): boolean;
	function getFirstObject(...values: any[]): TAnyObject;

	function isFunction(value: any): boolean;
	function notFunction(value: any): boolean;
	function hasFunction(value: any): boolean;
	function allFunction(value: any): boolean;
	function getFirstFunction(...values: any[]): Function;

	function isNull(value: any): boolean;
	function notNull(value: any): boolean;
	function hasNull(value: any): boolean;
	function allNull(value: any): boolean;
	function getFirstNull(...values: any[]): null;

	function isDefined(value: any): boolean;
	function notDefined(value: any): boolean;
	function hasDefined(value: any): boolean;
	function allDefined(value: any): boolean;
	function getFirstDefined(...values: any[]): any;

	function isUndefined(value: any): boolean;
	function notUndefined(value: any): boolean;
	function hasUndefined(value: any): boolean;
	function allUndefined(value: any): boolean;
	function getFirstUndefined(...values: any[]): undefined;

	function isEnum(value: any): boolean;
	function notEnum(value: any): boolean;
	function hasEnum(value: any): boolean;
	function allEnum(value: any): boolean;
	function getFirstEnum(...values: any[]): TEnum | undefined;

	function isRegExp(value: any): boolean;
	function notRegExp(value: any): boolean;
	function hasRegExp(value: any): boolean;
	function allRegExp(value: any): boolean;
	function getFirstRegExp(...values: any[]): RegExp | undefined;

	function isSymbol(value: any): boolean;
	function notSymbol(value: any): boolean;
	function hasSymbol(value: any): boolean;
	function allSymbol(value: any): boolean;
	function getFirstSymbol(...values: any[]): Symbol | undefined;

	function isDate(value: any): boolean;
	function notDate(value: any): boolean;
	function hasDate(value: any): boolean;
	function allDate(value: any): boolean;
	function getFirstDate(...values: any[]): Date | undefined;

	function isNaN(value: any): boolean;
	function notNaN(value: any): boolean;
	function hasNaN(value: any): boolean;
	function allNaN(value: any): boolean;
	function getFirstNaN(...values: any[]): (typeof NaN) | undefined;


	// force
	function forceBoolean(value: any): boolean;
	function forceString(value: any): string;
	function forceNumber(value: any): number;
	function forceArray(value: any): any[];
	function forceObject(value: any): TAnyObject;
	function forceFunction(value: any): Function;
	function forceRegExp(value: any): RegExp;
	function forceDate(value: any): Date;
}
