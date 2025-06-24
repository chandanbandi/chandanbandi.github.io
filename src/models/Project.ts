export default interface Project {
    id: number;
    company: string;
    details: string;
    thumbnail: string;
    year: string;
    hasVideo: boolean;
    screens: {
      id: number;
      src: string;
      alt: string;
    }[];
  }