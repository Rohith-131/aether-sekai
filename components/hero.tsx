import React from 'react'

interface Wallpaper {
  id: string
  title: string
  description: string
  image_url: string
  steam_url: string
  primary_tag: string
  secondary_tag: string
  theme_color: string
}

interface WallpaperGridProps {
  wallpapers: Wallpaper[]
}

// Keep a simple Hero export so page.tsx doesn't crash on import
export function Hero() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center text-center py-6">
      <h1
        className="font-bold tracking-wide max-w-3xl mx-auto leading-relaxed drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]"
        style={{ fontFamily: "cursive" }}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400">
          Welcome to Aether Sekai:
        </span>
        <br />
        <span className="text-xl sm:text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400">
          The Ultimate Anime Desktop Hub
        </span>
      </h1>
    </div>
  )
}

export function WallpaperGrid({ wallpapers }: WallpaperGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4 py-8">
      {wallpapers?.map((wallpaper) => (
        <a
          key={wallpaper.id}
          href={wallpaper.steam_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <div className="border border-cyan-500/40 rounded-xl p-4 bg-black/40 backdrop-blur-md shadow-lg hover:border-cyan-400 transition-colors">
            {wallpaper.image_url && (
              <img
                src={wallpaper.image_url}
                alt={wallpaper.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-2xl font-bold text-cyan-300 mb-2">{wallpaper.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{wallpaper.description}</p>
            <div className="flex gap-2">
              {wallpaper.primary_tag && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {wallpaper.primary_tag}
                </span>
              )}
              {wallpaper.secondary_tag && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  {wallpaper.secondary_tag}
                </span>
              )}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}