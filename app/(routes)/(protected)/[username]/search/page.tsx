import { fetchSearchFeed } from "@/app/actions/search.actions";
import SearchPage from "./search-page";

export default async function page() {
  const searchFeed = await fetchSearchFeed();
   await new Promise((res) => {
    setTimeout(() => {
      res(1);
    }, 2000);
  });
  return <SearchPage initialSearchFeed={searchFeed} />;
}
