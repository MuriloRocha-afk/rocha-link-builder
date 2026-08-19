import logoRocha from "@/assets/produtos/Logo_Rocha_Telhas.jfif.asset.json";

export function RochaLogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoRocha.url}
      alt="Rocha Telhas"
      className={className ?? "h-12 w-auto object-contain"}
      loading="eager"
    />
  );
}

export default RochaLogoMark;
