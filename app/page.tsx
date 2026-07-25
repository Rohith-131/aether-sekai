import { Suspense } from "react";
import Link from "next/link";
import { AuthButton } from "@/components/auth-button";
import { Hero } from "@/components/hero";
import { DeployButton } from "@/components/deploy-button";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { createClient } from "@/lib/supabase/server";

const themeStyles: Record<string, any> = {
  green: {
    wrapper: "drop-shadow-[0_0_12px_theme('colors.green.900')] hover:drop-shadow-[0_0_70px_theme('colors.green.400')]",
    borderBg: "from-green-400 via-[#180029] to-green-900 group-hover/card:from-green-300 group-hover/card:via-green-400/60 group-hover/card:to-green-300",
    innerBg: "bg-[#042b2b]/90 group-hover/card:bg-[#0a4545]/95",
    videoBg: "bg-[#0a0012]/80 group-hover/card:bg-[#062929] border-green-500/30 group-hover/card:border-green-400/80",
    title: "text-green-300 [text-shadow:0_0_20px_theme('colors.green.500')]",
    text: "text-green-100",
    divider: "from-green-500/60 to-transparent group-hover/card:from-green-400 group-hover/card:via-green-300 group-hover/card:to-transparent",
    tag1: "bg-green-900/40 text-green-200 border-green-700/50",
    tag2: "bg-emerald-900/40 text-emerald-200 border-emerald-700/50"
  },
  orange: {
    wrapper: "drop-shadow-[0_0_12px_theme('colors.orange.900')] hover:drop-shadow-[0_0_70px_theme('colors.orange.400')]",
    borderBg: "from-orange-400 via-[#180029] to-orange-900 group-hover/card:from-orange-300 group-hover/card:via-orange-400/60 group-hover/card:to-orange-300",
    innerBg: "bg-[#360a00]/90 group-hover/card:bg-[#5c1300]/95",
    videoBg: "bg-[#0a0012]/80 group-hover/card:bg-[#330c00] border-orange-500/30 group-hover/card:border-orange-400/80",
    title: "text-orange-300 [text-shadow:0_0_20px_theme('colors.orange.500')]",
    text: "text-orange-100",
    divider: "from-orange-500/60 to-transparent group-hover/card:from-orange-400 group-hover/card:via-orange-300 group-hover/card:to-transparent",
    tag1: "bg-orange-900/40 text-orange-200 border-orange-700/50",
    tag2: "bg-red-900/40 text-red-200 border-red-700/50"
  },
  fuchsia: {
    wrapper: "drop-shadow-[0_0_12px_theme('colors.fuchsia.900')] hover:drop-shadow-[0_0_70px_theme('colors.fuchsia.400')]",
    borderBg: "from-fuchsia-400 via-[#180029] to-fuchsia-900 group-hover/card:from-fuchsia-300 group-hover/card:via-fuchsia-400/60 group-hover/card:to-fuchsia-300",
    innerBg: "bg-[#2d032b]/90 group-hover/card:bg-[#4d0449]/95",
    videoBg: "bg-[#0a0012]/80 group-hover/card:bg-[#330330] border-fuchsia-500/30 group-hover/card:border-fuchsia-400/80",
    title: "text-fuchsia-300 [text-shadow:0_0_20px_theme('colors.fuchsia.500')]",
    text: "text-fuchsia-100",
    divider: "from-fuchsia-500/60 to-transparent group-hover/card:from-fuchsia-400 group-hover/card:via-fuchsia-300 group-hover/card:to-transparent",
    tag1: "bg-fuchsia-900/40 text-fuchsia-200 border-fuchsia-700/50",
    tag2: "bg-pink-900/40 text-pink-200 border-pink-700/50"
  }
};

async function WallpaperGridContainer() {
  const supabase = await createClient();
  const { data: wallpapers } = await supabase
    .from('wallpapers')
    .select('*')
    .order('created_at', { ascending: true });

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 pb-20">
      {wallpapers?.map((wallpaper) => {
        const style = themeStyles[wallpaper.theme_color] || themeStyles.green;

        return (
          <a
            key={wallpaper.id}
            href={wallpaper.steam_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`pointer-events-auto group/card relative transition-all duration-500 hover:scale-[1.05] hover:-translate-y-3 w-full cursor-pointer block ${style.wrapper}`}
          >
            <div className={`w-full h-full p-[2px] transition-all duration-500 bg-gradient-to-br ${style.borderBg} [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)]`}>
              <div className={`relative flex flex-col h-full p-6 transition-colors duration-500 backdrop-blur-md overflow-hidden ${style.innerBg} [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)]`}>
                
                <div className="absolute top-0 bottom-0 -left-[150%] w-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] group-hover/card:left-[150%] transition-all duration-700 ease-in-out pointer-events-none z-50 mix-blend-overlay"></div>

                <div className="relative z-10 flex flex-col h-full gap-4">
                  <div className={`aspect-video transition-colors duration-500 border relative overflow-hidden ${style.videoBg} [clip-path:polygon(20px_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%,0_20px)]`}>
                    {wallpaper.image_url && (
                      <img 
                        src={wallpaper.image_url} 
                        alt={wallpaper.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-110 transition-all duration-700 ease-out"
                      />
                    )}
                  </div>
                  <h3 className={`text-4xl tracking-wide mt-2 ${style.title}`} style={{ fontFamily: "cursive" }}>
                    {wallpaper.title}
                  </h3>
                  <p className={`text-xl leading-relaxed opacity-90 ${style.text}`} style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
                    {wallpaper.description}
                  </p>
                  <div className="flex gap-2 mt-auto pt-4 relative">
                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r transition-colors duration-500 ${style.divider}`}></div>
                    <span className={`text-xs font-semibold tracking-wide px-3 py-1 border ${style.tag1} [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]`}>
                      {wallpaper.primary_tag}
                    </span>
                    <span className={`text-xs font-semibold tracking-wide px-3 py-1 border ${style.tag2} [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]`}>
                      {wallpaper.secondary_tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-black relative overflow-hidden group">
      
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-auto flex items-center justify-center">
        <BackgroundRippleEffect rows={30} cols={60} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_100%)] pointer-events-none"></div>
      </div>

      <div className="flex-1 w-full flex flex-col gap-20 items-center relative z-10 pointer-events-none">
        
        <nav className="w-full flex justify-center border-b border-red-950/40 bg-black/80 backdrop-blur-md h-16 z-50 fixed top-0 pointer-events-auto">
          <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold tracking-wide">
              <Link href={"/"} className="text-gray-100 hover:text-orange-500 transition-colors">Aether Sekai</Link>
            </div>
            
            <div className="flex items-center gap-2">
                <DeployButton/>
                <Suspense>
                  <AuthButton />
                </Suspense>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex flex-col gap-20 max-w-7xl p-5 pt-28 w-full pointer-events-none">
          
          <section className="text-center pointer-events-none">
            <div className="pointer-events-auto inline-block">
              <Hero />
            </div>
          </section>
          
          <Suspense fallback={<div className="text-white text-center col-span-3 py-20">Loading Wallpapers...</div>}>
            <WallpaperGridContainer />
          </Suspense>

        </div>

        <footer className="w-full flex items-center justify-center border-t border-red-950/40 mx-auto text-center text-xs gap-8 py-16 bg-transparent z-10 relative pointer-events-auto">
          <p className="text-gray-400">
            Powered by{" "}
            <a href="https://supabase.com" target="_blank" className="font-semibold text-orange-500 hover:underline" rel="noreferrer">
              Supabase
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}