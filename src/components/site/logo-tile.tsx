/* eslint-disable @next/next/no-img-element */

type LogoTileProps = {
  logo?: string;
  name: string;
  /** For dark-native marks that fill the tile edge-to-edge (no white plate) */
  dark?: boolean;
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Small square logo — falls back to a monogram tile when no file is set. */
export function LogoTile({ logo, name, dark = false }: LogoTileProps) {
  if (!logo) {
    return (
      <div className="logo-tile logo-tile-mono" aria-hidden="true">
        {initials(name)}
      </div>
    );
  }
  return (
    <div className={dark ? "logo-tile logo-tile-dark" : "logo-tile"}>
      <img src={logo} alt={`${name} logo`} loading="lazy" />
    </div>
  );
}
