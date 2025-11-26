import { IPagination } from "../utils/pagination.model";

export interface ISpellsResponse {
    links: IPagination,
    data: {id: string, type: 'spell', attributes: ISpells}[]
}

export interface ISpellsSingleResponse {
    data: {id: string; type: 'spell'; attributes: ISpells}
}

export interface ISpells {
    category: string,
    creator: string,
    effect: string,
    hand: string,
    image: string,
    incantation: string,
    light: string,
    name: string,
    slug: string,
    wiki: string
}