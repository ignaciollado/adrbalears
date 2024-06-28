export interface ArticleDTO {
  links: Links;
  data:  reqArticle[];
  meta:  Meta;
}

export interface reqArticle {
  type:          DatumType;
  id:            string;
  attributes:    attrArticle;
  relationships: Relationships;
}

export interface attrArticle {
  id:               number;
  asset_id:         number;
  title:            string;
  alias:            string;
  state:            number;
  access:           number;
  created:          Date;
  created_by:       number;
  created_by_alias: string;
  modified:         Date;
  featured:         number;
  logoproyecto:     string;
  slogan:           string;
  tieneportal:      boolean;
  urlportalexterno: string;
  tienebackoffice:  boolean;
  urlbackoffice:    string;
  etiquetaenlaceinteresuno:       string;
  idcontenidoenlaceinteresuno:    string;
  etiquetaenlaceinteresdos:       string;
  idcontenidoenlaceinteresdos:    string;
  etiquetaenlaceinterestres:      string;
  idcontenidoenlaceinterestres:   string;
  etiquetaenlaceinterescuatro:    string;
  idcontenidoenlaceinterescuatro: string;
  etiquetaenlaceinterescinco:     string;
  idcontenidoenlaceinterescinco:  string;
  etiquetaenlaceinteresseis:      string;
  idcontenidoenlaceinteresseis:   string;
  etiquetaenlaceinteressiete:     string;
  idcontenidoenlaceinteressiete:  string;
  language:         Language;
  hits:             number;
  publish_up:       Date;
  publish_down:     null;
  note:             string;
  images:           Images;
  urls:             Urls;
  metakey:          string;
  metadesc:         string;
  metadata:         Metadata;
  version:          number;
  featured_up:      null;
  featured_down:    null;
  typeAlias:        TypeAlias;
  text:             string;
  cabecera:         Cabecera;
  area:             Area;
  tags:             any[];
}

export interface Area {
  comercio?: Comercio;
  ""?:       null;
}

export enum Comercio {
  Comerç = "Comerç",
}

export enum Cabecera {
  Empty = "",
  ImagefileAltText = "{\"imagefile\":\"\",\"alt_text\":\"\"}",
}

export interface Images {
  image_intro:            string;
  float_intro:            string;
  image_intro_alt:        string;
  image_intro_caption:    string;
  image_fulltext:         string;
  float_fulltext:         string;
  image_fulltext_alt:     string;
  image_fulltext_caption: string;
}

export interface Urls {
  urla:     string;
  urlatext: string;
  targeta:  string;
  urlb:     string;
  urlbtext: string;
  targetb:  string;
  urlc:     string;
  urlctext: string;
  targetc:  string;
}

export enum Language {
  CAES = "ca-ES",
  ESES = "es-ES",
  ENEN = "en-GB"
}

export interface Metadata {
  robots:      string;
  author:      string;
  rights:      string;
  xreference?: string;
}

export enum TypeAlias {
  COMContentArticle = "com_content.article",
}

export interface Relationships {
  category:   Category;
  created_by: Category;
}

export interface Category {
  data: Data;
}

export interface Data {
  type: DataType;
  id:   string;
}

export enum DataType {
  Categories = "categories",
  Users = "users",
}

export enum DatumType {
  Articles = "articles",
}

export interface Links {
  self: string;
  next: string;
  last: string;
}

export interface Meta {
  "total-pages": number;
}
