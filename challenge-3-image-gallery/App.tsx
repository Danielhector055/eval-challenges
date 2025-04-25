// THIS COMPONENT IS CREATED AS A PARENT COMPONENT WHICH WILL PASS
// THE PROPS TO THE CHILD COMPONENTS I.E. IMAGE GALLERY
import React, { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import { Image } from "./types/image";

const NUM_IMAGES = 20;

const mockImages: Image[] = new Array(NUM_IMAGES).fill(0).map((_, i) => ({
  id: i,
  url: `/img${i + 1}.png`, // mock images
  title: `Image ${i + 1}`,
  width: 400,
  height: 300,
}));

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>(mockImages.slice(0, 6));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      const next = mockImages.slice(images.length, images.length + 6);
      setImages((prev) => [...prev, ...next]);
      setIsLoading(false);
      if (images.length + next.length >= mockImages.length) {
        setHasMore(false);
      }
    }, 1000);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Responsive Image Gallery (Local)</h1>
      <ImageGallery
        images={images}
        isLoading={isLoading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default App;
