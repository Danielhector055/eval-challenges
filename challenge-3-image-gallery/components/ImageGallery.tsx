import React, { useEffect, useRef, useState } from 'react';
import { ImageGalleryProps } from '../types/image';

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  isLoading,
  hasMore = false,
  onLoadMore,
}) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [imageInView, setImageInView] = useState<Set<number>>(new Set());
  const [hasGlobalError, setHasGlobalError] = useState(false);

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        hasMore &&
        !isLoading
      ) {
        onLoadMore?.();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, onLoadMore]);

  // lazy loading with IntersectionObserver
  useEffect(() => {
    if (!window.IntersectionObserver) {
      setImageInView(new Set(images.map((img) => img.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageInView((prev) => {
              const next = new Set(prev);
              next.add(Number(entry.target.id));
              return next;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const imgs = galleryRef.current?.querySelectorAll(
      "img[data-observe='true']"
    );
    imgs?.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [images]);

  const handleImageError = () => {
    // Trigger global error on any image load failure
    setHasGlobalError(true);
  };

  if (hasGlobalError) {
    return <div>Error while displaying image</div>;
  }

  if (images.length === 0 && !isLoading) {
    return <div>No images to display</div>;
  }

  return (
    <div ref={galleryRef} className='image-gallery'>
      {isLoading && (
        <div
          data-testid='loading-indicator'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem 0',
            fontSize: '1.2rem',
            color: '#666',
          }}>
          <div className='spinner' />
          <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
        </div>
      )}
      <div
        className='grid'
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem',
        }}>
        {images.map((image) => (
          <div key={image.id} className='image-container'>
            <img
              id={String(image.id)}
              data-observe='true'
              src={imageInView.has(image.id) ? image.url : ''}
              alt={image.title}
              loading='lazy'
              style={{
                objectFit: 'cover',
                width: '100%',
                height: 'auto',
              }}
              onError={handleImageError}
            />
            {!imageInView.has(image.id) && (
              <div className='loading-placeholder'>Loading...</div>
            )}
          </div>
        ))}
      </div>

      {hasMore && !isLoading && (
        <div
          className='load-more'
          onClick={onLoadMore}
          style={{ marginTop: '1rem', cursor: 'pointer', textAlign: 'center' }}>
          Load more images
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
