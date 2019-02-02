import { Photo } from './photo';
import { Category } from './category';

export class Content {
    id: number;
    title: string;
    description: string;
    categoryId: number;
    category: Category;
    photos: Photo[];
}
