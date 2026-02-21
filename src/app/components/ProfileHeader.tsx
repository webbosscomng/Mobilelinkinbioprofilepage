import { MapPin } from 'lucide-react';

interface ProfileHeaderProps {
  avatar: string;
  name: string;
  bio: string;
  location?: string;
}

export function ProfileHeader({ avatar, name, bio, location }: ProfileHeaderProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-lg mb-6">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-[#22C55E]/20">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h1 className="text-xl mb-2">
          {name}
        </h1>

        {/* Bio */}
        <p className="text-slate-600 text-sm leading-relaxed mb-3">
          {bio}
        </p>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
