type InvitePhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function InvitePhoto({ src, alt, className = "" }: InvitePhotoProps) {
  return (
    // Native img avoids Next/Image SSR attribute mismatches
    <img src={src} alt={alt} className={className} decoding="async" />
  );
}