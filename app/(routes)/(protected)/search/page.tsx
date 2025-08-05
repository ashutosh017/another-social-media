import { fetchSearchFeed } from "@/app/actions/search.actions";
import SearchPage from "./search-page";

export default async function page() {
  const searchFeed = await fetchSearchFeed();
  return <SearchPage initialSearchFeed={searchFeed} />;
}
