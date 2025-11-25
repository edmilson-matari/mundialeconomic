import supabase from "../supabase-client";
export const uploadFile = async (
  file: File | null,
  folder: "logos" | "banners"
): Promise<string | null> => {
  if (!file) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}.${ext}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("stores")
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    console.error("Erro ao subir imagem:", uploadError);
    return null;
  }

  // your project previously used this shape; keep same call
  const { data } = supabase.storage.from("stores").getPublicUrl(filePath);
  // depending on client version the public url may be data.publicUrl or data.publicURL
  // try both safely
  const publicUrl =
    (data && ((data as any).publicUrl || (data as any).publicURL)) || null;

  if (!publicUrl) {
    // Fallback (construct URL — only works if your Supabase public bucket url is standard)
    try {
      const base =
        (supabase as any).storageUrl ||
        (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
      if (base) {
        return `${base.replace(
          /\/$/,
          ""
        )}/storage/v1/object/public/stores/${filePath}`;
      }
    } catch {
      // ignore
    }
    return null;
  }

  return publicUrl;
};
