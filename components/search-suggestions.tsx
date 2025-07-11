"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Hash, TrendingUp } from "lucide-react"

const trendingSearches = [
  { type: "hashtag", query: "photography", posts: "125M" },
  { type: "hashtag", query: "travel", posts: "89M" },
  { type: "user", query: "john_doe", name: "John Doe", followers: "1.2M" },
  { type: "hashtag", query: "food", posts: "156M" },
  { type: "user", query: "photographer_mike", name: "Mike Johnson", followers: "2.1M" },
]

interface SearchSuggestionsProps {
  onSearchSelect: (query: string) => void
}

export function SearchSuggestions({ onSearchSelect }: SearchSuggestionsProps) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5" />
        <h3 className="font-semibold">Trending</h3>
      </div>
      <div className="space-y-3">
        {trendingSearches.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start p-2 h-auto"
            onClick={() => onSearchSelect(item.query)}
          >
            <div className="flex items-center gap-3">
              {item.type === "hashtag" ? (
                <div className="h-10 w-10 bg-muted rounded-lg flex items-center justify-center">
                  <Hash className="h-5 w-5" />
                </div>
              ) : (
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://media.newyorker.com/photos/665f65409ad64d9e7a494208/4:3/w_1003,h_752,c_limit/Chayka-screenshot-06-05-24`} alt={item.query} />
                  <AvatarFallback>{item.query.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
              <div className="text-left">
                <p className="font-medium">{item.type === "hashtag" ? `#${item.query}` : item.query}</p>
                <p className="text-sm text-muted-foreground">
                  {item.type === "hashtag"
                    ? `${(item as any).posts} posts`
                    : `${(item as any).name} • ${(item as any).followers} followers`}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}
