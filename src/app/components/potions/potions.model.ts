import { IPagination } from "../utils/pagination.model"

export interface IPotionsResponse {
    links: IPagination,
    data: {id: string, type: 'potion', attributes: IPotions}[]
}

export interface IPotions {
    characteristics: string,
    difficulty: string,
    effect: string,
    image: string,
    inventors: string,
    ingredients: string[],
    manufacturers: string[],
    name: string,
    side_effects: string[],
    slug: string,
    time: string,
    wiki: string
}
