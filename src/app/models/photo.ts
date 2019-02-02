import { Content } from './content';

export class Photo {
    id: number;
    path: string;
    isMain: boolean;
    contentId: number;
    content: Content;
}
