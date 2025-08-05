"use client";

import {
  fetchConversations,
  sendMessage,
} from "@/app/actions/messages.actions";
import {
  ConversationsType,
  SearchedUsersToMessageType,
} from "@/app/actions/types";
import { MeContext } from "@/components/me-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import {
  ArrowLeft,
  Check,
  Edit,
  MessageCircle,
  Search,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useDebounce from "@/hooks/useDebounce";
import { searchUsersToSendMessage } from "@/app/actions/search.actions";
export default function MessagesPage({
  initialConversations,
}: {
  initialConversations: ConversationsType;
}) {

  const params = useParams();
  const username = params.username;
  const me = useContext(MeContext);

  const [showSendMessage, setShowSendMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState<
    SearchedUsersToMessageType[number] | null
  >(null);
  const [searchResults, setSearchResults] =
    useState<SearchedUsersToMessageType>([]);
  const debouncedQuery = useDebounce(searchQuery, 300);
  const [users, setUsers] = useState<SearchedUsersToMessageType>();



  useEffect(() => {
    if (debouncedQuery) {
      // console.log("debounced query changed : ", debouncedQuery);
      async function callSearchUsers() {
        const usrs = await searchUsersToSendMessage(debouncedQuery);
        if (usrs) {
          setUsers(usrs);
        }
      }
      callSearchUsers();
    }
  }, [debouncedQuery]);

  const filteredConversations = useMemo(() => {
    if (!initialConversations || !searchQuery.trim()) return initialConversations;
    return initialConversations.filter((conv) =>
      conv.participants.some((p) =>
        p.user.username.includes(searchQuery.toLowerCase())
      )
    );
  }, [initialConversations, debouncedQuery]);

  // Search function
  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = users?.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      if (filtered) setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const selectRecipient = (user: SearchedUsersToMessageType[number]) => {
    setSelectedRecipient(user);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedRecipient) {
      // Handle sending message logic here
      // console.log(
        "Sending message to:",
        selectedRecipient.username,
        "Message:",
        message
      );
      sendMessage(message, selectedRecipient.username);

      setMessage("");
      setSelectedRecipient(null);
      setShowSendMessage(false);
    }
  };

  const closeModal = () => {
    setShowSendMessage(false);
    setSelectedRecipient(null);
    setSearchQuery("");
    setSearchResults([]);
    setMessage("");
  };

  return (
    <div className="pb-16">
      <header className="border-b p-4 sticky top-0 bg-background z-10 flex items-center">
        <button onClick={() => window.history.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold flex-1">{me?.username}</h1>
        <Link
          href="#"
          className="ml-auto"
          onClick={() => setShowSendMessage(true)}
        >
          <Edit className="h-5 w-5" />
        </Link>
      </header>

      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="pl-9 bg-muted"
          />
        </div>
      </div>

      {/* Messages list */}
      <div className="divide-y">
        {initialConversations ? (
          filteredConversations && filteredConversations.length > 0 ? (
            <>
              {searchQuery && (
                <div className="px-4 py-2 text-sm text-muted-foreground bg-muted/50">
                  {filteredConversations.length} result
                  {filteredConversations.length !== 1 ? "s" : ""} for "
                  {searchQuery}"
                </div>
              )}
              {filteredConversations.map((_, i) => (
                <Link
                  href={`/messages/${_.participants[0].user.username}`}
                  key={i}
                  className="flex items-center p-4 hover:bg-muted/50"
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage
                      src={_.participants[0].user.profilePicUrl ?? "/user.png"}
                      alt={_.participants[0].user.username}
                    />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="font-medium truncate">
                        {_.participants[0].user.username}
                      </p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatDistanceToNowStrict(_.messages[0].dateCreated, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {_.messages[0].content}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          ) : searchQuery ? (
            <div className="text-center py-6">
              <p className="text-lg font-semibold">No results found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching for a different name or username.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold">Your messages</h2>
              <p className="text-sm text-muted-foreground">
                Send private messages to your friends and followers.
              </p>
              <Button onClick={() => setShowSendMessage(true)} className="mt-4">
                Send Message
              </Button>
            </div>
          )
        ) : (
          <div className="space-y-4 px-4 py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/3" />
                  <div className="h-3 bg-muted-foreground rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSendMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Send Message</CardTitle>
              <button
                onClick={closeModal}
                className="hover:bg-muted rounded-md p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">To:</label>
                {selectedRecipient ? (
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="text-sm">
                      {selectedRecipient.username}
                    </span>
                    <button
                      onClick={() => setSelectedRecipient(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => handleUserSearch(e.target.value)}
                      className="pl-9"
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                        {searchResults.map((user) => (
                          <button
                            key={user.username}
                            onClick={() => selectRecipient(user)}
                            className="w-full text-left px-3 py-2 hover:bg-muted flex items-center justify-between"
                          >
                            <span>{user.username}</span>
                            <Check className="h-4 w-4 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[100px] resize-none bg-muted"
              />
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || !selectedRecipient}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
