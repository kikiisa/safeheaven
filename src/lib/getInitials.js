export const getInitials = (name) => {
    if (!name) return "";

    // Pecah nama berdasarkan spasi
    const parts = name.trim().split(" ");

    let acronym = "";

    if (parts.length === 1) {
        // Kalau hanya satu kata, ambil 3 huruf pertama
        acronym = parts[0].substring(0, 3);
    } else {
        // Kalau lebih dari 1 kata, ambil huruf pertama dari tiap kata
        acronym = parts.map(p => p[0]).join("");
    }

    // Batasi hanya 3 huruf, dan kapital semua
    return acronym.substring(0, 3).toUpperCase();
}