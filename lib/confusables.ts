/**
 * Names that read the same: "Aleyna", "aleyna", "Aléyna" and "Аleyna" (with
 * a Cyrillic А) all have one skeleton. The room uses it to say when two
 * people look alike, never to refuse a name: it's a hint, not security (the
 * full Unicode confusables list is far longer than this one).
 */

// Characters drawn like plain Latin letters, FROM[i] read as TO[i]. Taken
// before case is folded: Greek Ν is an N, its small ν a v; Cyrillic Н an H.
const FROM = [
  // Cyrillic capitals: А В Е К М Н О Р С Т Х У Ѕ І Ј Ӏ
  'АВЕКМНОРСТХУЅІЈӀ',
  // Cyrillic small letters: а е о р с у х ѕ і ј ԁ ӏ һ ԛ ԝ
  'аеорсухѕіјԁӏһԛԝ',
  // Greek capitals: Α Β Ε Ζ Η Ι Κ Μ Ν Ο Ρ Τ Υ Χ
  'ΑΒΕΖΗΙΚΜΝΟΡΤΥΧ',
  // Greek small letters: α ι κ ν ο ρ τ υ χ
  'αικνορτυχ',
  // Latin letters NFD leaves whole (a stroke, no dot): ı ł ø đ ħ
  'ıłøđħ',
  // Digits and a bar that pass for letters: 0 1 |
  '01|',
].join('');
const TO = [
  'ABEKMHOPCTXYSIJI',
  'aeopcyxsijdlhqw',
  'ABEZHIKMNOPTYX',
  'aikvoptux',
  'ilodh',
  'oll',
].join('');

const LOOKALIKE = new Map(Array.from(FROM, (from, i) => [from, TO[i]]));

// Accents (after NFD) on the scripts that write them optionally or as
// decoration: é is an e, and Arabic and Hebrew vowel points are mostly left
// out anyway. Not the vowel signs of Indic scripts: those are the word.
const ACCENTS = /(?<=[\p{sc=Latin}\p{sc=Greek}\p{sc=Cyrillic}\p{sc=Arabic}\p{sc=Hebrew}]\p{M}*)\p{M}/gu;
// Characters that show nothing (joiners, direction marks, the BOM …).
const INVISIBLE = /\p{Default_Ignorable_Code_Point}/gu;

/**
 * A name's skeleton: compatibility forms unified (NFKC: ｆｕｌｌ-width letters,
 * ligatures), accents dropped, look-alike letters of other scripts and the
 * digits 0 and 1 read as the Latin letters they resemble, case folded the
 * same way in every language (Turkish İ is an i here too), spaces collapsed.
 * Capital I stays an i: reading it as l too would make "Ali" and "All" one.
 */
export function nameSkeleton(name: string): string {
  const bare = name.normalize('NFKC').normalize('NFD').replace(INVISIBLE, '').replace(ACCENTS, '');
  let out = '';
  for (const ch of bare) out += LOOKALIKE.get(ch) ?? ch;
  return out.toLowerCase().replace(/\s+/g, ' ').trim();
}
