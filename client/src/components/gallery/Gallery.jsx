import GalleryItems from "../galleryItems/GalleryItems";
import "./Gallery.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// Fetch function
const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/pins?cursor=${pageParam}&search=${
      search || ""
    }&userId=${userId || ""}&boardId=${boardId || ""}`
  );
  return res.data;
};
const Gallery = ({ search, userId, boardId }) => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["pins", userId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });
  if (status === "pending")
    return (
      <div className="global-loader">
        <div className="spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  if (status === "error") return "Something went wrong...";
  console.log(data);
  const allPins = data?.pages.flatMap((page) => page.pins) || [];
  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more pins...</h4>}
      endMessage={<h3>All posts loaded</h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <GalleryItems key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Gallery;
