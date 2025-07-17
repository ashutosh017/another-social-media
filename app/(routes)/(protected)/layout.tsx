import { getMe } from "@/app/actions/auth.actions";
import BottomBar from "@/components/bottom-bar";
import { MeContext, MeContextProvider } from "@/components/me-context";


export default async function ProtectedRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const me = await getMe();
  console.log("me in layout.tsx: ", me)

  return (
    <div className="max-w-md mx-auto ">
      <MeContextProvider value={me}>
        {children}
        <BottomBar />
      </MeContextProvider>
    </div>
  );
}

export const dynamic = "force-dynamic"