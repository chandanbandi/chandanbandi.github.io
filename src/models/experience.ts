export default interface IExperience {
    id: number;
    company: string;
    name: string;
    details: string;
    hasVideo: boolean;
    screens: {
        id: number;
        src: string;
        alt: string;
    }[]
}