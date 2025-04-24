import { useSearchParams } from "react-router-dom";
import Gallery from "../../components/gallery/Gallery";
import "./Search.css";
const Search = () => {
  let [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const boardId = searchParams.get("boardId");

  return <Gallery search={search} boardId={boardId} />;
};

export default Search;
