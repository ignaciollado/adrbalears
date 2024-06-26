// To parse this data:
//
//   import { Convert, CooperativaDTO } from "./file";
//
//   const CooperativaDTO = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface CooperativaDTO {
    data: Datum[];
}

export interface Datum {
    id:                  number;
    name:                string;
    centre_id:           number;
    program_id:          number;
    schoolastic_year_id: number;
    students:            number;
    logo:                string;
    url:                 string;
    video:               string;
    description:         string;
    user_id:             number;
    created_at:          Date;
    updated_at:          Date;
    email:               string;
    finalist:            number;
    socialnetworks:      string;
    program:             Program;
    user:                User;
    centre:              Centre;
}

export interface Centre {
    id:              number;
    code:            string;
    name:            string;
    email:           string;
    island_id:       number;
    location_id:     number;
    address:         string;
    postal_code:     string;
    telephone:       string;
    fax:             string;
    created_at:      Date;
    updated_at:      Date;
    location:        Program;
    island:          Island;
    teachercontacts: Teachercontact[];
}

export interface Island {
    id:   number;
    name: Name;
}

export enum Name {
    Eivissa = "Eivissa",
    Mallorca = "Mallorca",
    Menorca = "Menorca",
}

export interface Program {
    id:           number;
    name:         string;
    island_id?:   number;
    created_at:   null;
    updated_at:   null;
    description?: string;
}

export interface Teachercontact {
    id:                  number;
    schoolastic_year_id: number;
    centre_id:           number;
    program_id:          number;
    teacher_id:          number;
    email:               string;
    address:             null | string;
    postal_code:         null | string;
    telephone:           string;
    fax:                 null | string;
    memoryurl:           null | string;
    created_at:          Date;
    updated_at:          Date;
    teacher:             Teacher;
}

export interface Teacher {
    id:         number;
    name:       string;
    last_name:  string;
    nid:        string;
    user_id:    number;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
    disabled_at:       null;
    capabilities:      Capabilities;
    role_id:           number;
}

export enum Capabilities {
    Empty = "{}",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): CooperativaDTO {
        return cast(JSON.parse(json), r("CooperativaDTO"));
    }

    public static welcomeToJson(value: CooperativaDTO): string {
        return JSON.stringify(uncast(value, r("CooperativaDTO")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "data", js: "data", typ: a(r("Datum")) },
    ], false),
    "Datum": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "centre_id", js: "centre_id", typ: 0 },
        { json: "program_id", js: "program_id", typ: 0 },
        { json: "schoolastic_year_id", js: "schoolastic_year_id", typ: 0 },
        { json: "students", js: "students", typ: 0 },
        { json: "logo", js: "logo", typ: "" },
        { json: "url", js: "url", typ: "" },
        { json: "video", js: "video", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "user_id", js: "user_id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "email", js: "email", typ: "" },
        { json: "finalist", js: "finalist", typ: 0 },
        { json: "socialnetworks", js: "socialnetworks", typ: "" },
        { json: "program", js: "program", typ: r("Program") },
        { json: "user", js: "user", typ: r("User") },
        { json: "centre", js: "centre", typ: r("Centre") },
    ], false),
    "Centre": o([
        { json: "id", js: "id", typ: 0 },
        { json: "code", js: "code", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "island_id", js: "island_id", typ: 0 },
        { json: "location_id", js: "location_id", typ: 0 },
        { json: "address", js: "address", typ: "" },
        { json: "postal_code", js: "postal_code", typ: "" },
        { json: "telephone", js: "telephone", typ: "" },
        { json: "fax", js: "fax", typ: "" },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "location", js: "location", typ: r("Program") },
        { json: "island", js: "island", typ: r("Island") },
        { json: "teachercontacts", js: "teachercontacts", typ: a(r("Teachercontact")) },
    ], false),
    "Island": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: r("Name") },
    ], false),
    "Program": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "island_id", js: "island_id", typ: u(undefined, 0) },
        { json: "created_at", js: "created_at", typ: null },
        { json: "updated_at", js: "updated_at", typ: null },
        { json: "description", js: "description", typ: u(undefined, "") },
    ], false),
    "Teachercontact": o([
        { json: "id", js: "id", typ: 0 },
        { json: "schoolastic_year_id", js: "schoolastic_year_id", typ: 0 },
        { json: "centre_id", js: "centre_id", typ: 0 },
        { json: "program_id", js: "program_id", typ: 0 },
        { json: "teacher_id", js: "teacher_id", typ: 0 },
        { json: "email", js: "email", typ: "" },
        { json: "address", js: "address", typ: u(null, "") },
        { json: "postal_code", js: "postal_code", typ: u(null, "") },
        { json: "telephone", js: "telephone", typ: "" },
        { json: "fax", js: "fax", typ: u(null, "") },
        { json: "memoryurl", js: "memoryurl", typ: u(null, "") },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "teacher", js: "teacher", typ: r("Teacher") },
    ], false),
    "Teacher": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "last_name", js: "last_name", typ: "" },
        { json: "nid", js: "nid", typ: "" },
        { json: "user_id", js: "user_id", typ: 0 },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
    ], false),
    "User": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "email", js: "email", typ: "" },
        { json: "email_verified_at", js: "email_verified_at", typ: null },
        { json: "created_at", js: "created_at", typ: Date },
        { json: "updated_at", js: "updated_at", typ: Date },
        { json: "disabled_at", js: "disabled_at", typ: null },
        { json: "capabilities", js: "capabilities", typ: r("Capabilities") },
        { json: "role_id", js: "role_id", typ: 0 },
    ], false),
    "Name": [
        "Eivissa",
        "Mallorca",
        "Menorca",
    ],
    "Capabilities": [
        "{}",
    ],
};