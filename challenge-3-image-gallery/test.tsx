import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageGallery from "./components/ImageGallery";

describe("ImageGallery", () => {
  const mockImages = [
    {
      id: 1,
      url: "https://example.com/image1.jpg",
      title: "Image 1",
      width: 800,
      height: 600,
    },
    {
      id: 2,
      url: "https://example.com/image2.jpg",
      title: "Image 2",
      width: 1200,
      height: 800,
    },
  ];

  test("renders loading state when images are being fetched", () => {
    render(<ImageGallery images={[]} isLoading={true} />);
    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  test("displays images in a grid layout", () => {
    render(<ImageGallery images={mockImages} isLoading={false} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  test("shows error message when image loading fails", async () => {
    render(<ImageGallery images={mockImages} isLoading={false} />);
    const images = screen.getAllByRole("img");
    fireEvent.error(images[0]);
    await waitFor(() => {
      expect(screen.getByText("Error while displaying image")).toBeInTheDocument();
    });
  });

  test("handles empty gallery state", () => {
    render(<ImageGallery images={[]} isLoading={false} />);
    expect(screen.getByText("No images to display")).toBeInTheDocument();
  });

  test("supports infinite scrolling", async () => {
    const loadMore = jest.fn();
    render(
      <ImageGallery
        images={mockImages}
        isLoading={false}
        onLoadMore={loadMore}
        hasMore={true}
      />
    );

    // Simulate scroll to bottom
    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    await waitFor(() => {
      expect(loadMore).toHaveBeenCalled();
    });
  });

  test("maintains aspect ratio of images", () => {
    render(<ImageGallery images={mockImages} isLoading={false} />);
    const images = screen.getAllByRole("img");
    images.forEach((img) => {
      expect(img).toHaveStyle("object-fit: cover");
    });
  });
});
