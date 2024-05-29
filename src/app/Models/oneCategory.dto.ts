export interface OneCategory {
    links: Links;
    data:  Data;
}

export interface Data {
    type:       string;
    id:         string;
    attributes: Attributes;
}

export interface Attributes {
    parent_id:        number;
    level:            number;
    lft:              number;
    rgt:              number;
    alias:            string;
    id:               number;
    extension:        string;
    title:            string;
    note:             string;
    published:        number;
    checked_out:      null;
    checked_out_time: null;
    access:           number;
    params:           Params;
    created_user_id:  number;
    language:         string;
    servicio_idi:     ServicioIDI;
}

export interface Params {
    category_layout: string;
    image:           string;
    image_alt:       string;
}

export interface ServicioIDI {
    SI:             string;
    NO:             string;
}

export interface Links {
    self: string;
}