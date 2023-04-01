import Profile from "./UserProfile";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main lang="en">
      <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
        <Profile />
        {children}
      </div>
    </main>
  );
}
