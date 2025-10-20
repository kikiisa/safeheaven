export function formatPhoneNumber(number) {
   if (!number) return "";

  // hapus semua karakter non-digit
  let formatted = number.replace(/\D/g, "");

  if (formatted.startsWith("0")) {
    // hapus 0 di depan lalu ganti dengan 62
    formatted = "62" + formatted.slice(1);
  } else if (formatted.startsWith("+62")) {
    // hapus tanda +
    formatted = formatted.replace("+", "");
  }
  // kalau sudah 62, biarkan saja
  return formatted;
}