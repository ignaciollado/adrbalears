/* import { ServicioIDI } from "./oneCategory.model"; */

export interface Category {
    links: Links;
    data:  reqCategory[];
    meta:  Meta;
}

export interface reqCategory {
    type:       Type;
    id:         string;
    attributes: attrCategory;
}

export interface attrCategory {
    id:                number;
    title:             string;
    alias:             string;
    note:              string;
    published:         number;
    access:            number;
    checked_out:       null;
    checked_out_time:  null;
    created_user_id:   number;
    parent_id:         number;
    level:             number;
    lft:               number;
    rgt:               number;
    language:          Language;
    language_title:    null;
    language_image:    null;
    editor:            null;
    access_level:      AccessLevel;
    author_name:       AuthorName | null;
    count_trashed:     number;
    count_unpublished: number;
    count_published:   number;
    count_archived:    number;
    servicio_idi:      ServicioIDI;
    params:            Params;
}

export enum AccessLevel {
    Public = "Public",
    Registered = "Registered",
}

export enum AuthorName {
    MargaritaPomarForteza = "Margarita Pomar Forteza",
    SistemesDInformacióIdi = "SISTEMES D'INFORMACIÓ IDI",
}

export enum Language {
    Empty = "*",
    esES = "es-ES",
    caES = "ca-ES",
}

export enum Type {
    Categories = "categories",
}

export interface Links {
    self: string;
}

export interface Meta {
    "total-pages": number;
}

export interface ServicioIDI {
    SI: "SI",
    NO: "NO",
}

export interface Params {
    category_layout: string;
    image:           string;
    image_alt:       string;
}