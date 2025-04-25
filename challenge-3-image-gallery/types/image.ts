export interface Image {
  
  id: number;
  url: string;
  title: string;
  width: number;
  height: number;
}

export interface ImageGalleryProps {
  images: Image[];
  isLoading: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}
