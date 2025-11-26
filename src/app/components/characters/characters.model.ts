import { IPagination } from "../utils/pagination.model";

export interface ICharatcerResponse {
    links: IPagination,
    data: {id: string, type: 'character', attributes: ICharacter}[];
}

export interface ICharacterSingleResponse {
    data: {id: String; type: 'character'; attributes: ICharacter};
}

export interface ICharacter {
    alias_names: string [],
    animagus: string,
    blood_status: string,
    boggart: string,
    born: string,
    died: string;
    eye_color: string,
    family_member: string [],
    gender: string,
    hair_color: string,
    height: string,
    house: string,
    image: string,
    jobs: string [],
    name: string,
    nationality: string,
    patronus: string,
    romances: string [],
    skin_color: string,
    slug: string,
    species: string,
    titles: string [],
    wand: string [],
    weight: string,
    wiki: string
}

export interface ICharacterFilter {
    page: number | null,
    rows: number | null,
    name: string | null,
    gender: string | null,
    house: string | null
}