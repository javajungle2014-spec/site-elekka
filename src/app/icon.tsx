import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const logoData = await readFile(join(process.cwd(), "public/brand/ek-monogram.png"));
  const base64 = logoData.toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${base64}`}
          width={56}
          height={56}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { width: 64, height: 64 }
  );
}
