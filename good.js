

const databaseNames = ["RAMLI", "ADRIANSYAH", "HAMLIA DG TARRING", "FITRIA RAMADHANI", "ADRIANSYAH", "ANDI SUCIANA SULAEMAN", "LUSIANA DG LEBONG", "TASRI DG.DAU", "ATILA", "FEMBRY AZIADI KURNIAWAN", "FARIDA", "TALLASA DG NAI", "SRI LUCIANA BUNGGASI", "TAMRIN MAULANA.P", "SARIALAM DG SAGA", "ADRIAN", "ERNAWATI", "VIRA ANGGRIANI PUTRI", "MUHAMMAD RONAL", "JUHERIA", "RESTA", "SINDI RELLA", "JIHADDIN NAFSI", "SYAHRIL", "JUMRAN", "LA SARIA", "ALMENDO PAPILAYA", "RONAL", "WA UNIA", "MUNIR", "SUYANA", "YOLAN MUSRIFA", "ASWAD.S", "SUGIONO", "JUHAERYL EKO PRATAMAXXAL", "NURHAYATI BOTTO", "AGUS SUPRATMAN", "POPPI", "NINGSIH SANDRIANA", "HASTI", "MUH.ZULFIQRY SEPTANTO", "MUH.ALQAUTSAR", "TAJUDDIN", "JARUNA", "WA ODE HUSNA", "YUSI NURWIYANA", "RISKI DWI RAMADANI", "MUH.ALI", "RAHMAWATI", "RIDA", "FITRI", "RADITYA", "ALFATHIR FAIRUZ RISAL", "ATI", "IKBAL SAPUTRA", "ARLAN", "DESY SHARASWATY", "MATHEOS HANE", "RUDI BOTORI", "GADIS EKA LESTARI", "HARSIDA", "ARIS", "FREDY", "MELIANA", "SITTI RAHMA SALILI", "MAMAN FRIADIN", "NURANI", "KAMSIR", "HASDAR", "MIRNA", "SYAHRIANTI", "SABRI", "ARMIN", "WARMIA", "IKSAL SAPUTRA", "GASSING", "BAU NURCAYA", "FEBRIYAN", "MUHAMMAD AFRISAL", "IWAN", "YUSRAN TARAPE", "ST.SYAMSINAR", "WIDYA ANUGRAH", "HARIANA", "RISKA YULIANA DEWI", "HERNITA TEKAKA", "ANJAS ISAMU", "VICKY MARHADI HASAN", "WANARIA", "DEWI", "HASRAN BUNGASARI", "MECCA FANESA ARIANTI", "ASRI", "HASRAWAN", "AYU SETIA NINGSIH", "KASMIR", "ESTI VAUSIA WULELE", "HARJONI", "NURSIDA", "MANSYUR SAHMAP", "SUHARDIN TAHERONG", "DARNAWATI", "WIDYA SALSA DILLA TAHERONG", "RINA HASAN", "DAFID MUHAMMAD NUR", "GUN GUN MUHAMMAD NUR", "NURDIN.K", "SITTI NURHANA", "HAERUDDIN", "SESILIA MOITA", "RONI", "ANIP MIPTAHUL PALAH", "SANDI ASGAR", "M.AIDIL", "PUTRI RAMADHANI", "WA LINA", "HALFAM", "HERNI YANTI", "LA ALI", "ALI", "JURHANA", "MILA", "HARLINA", "WERUNI", "MULIAWAN", "JURIAH BR.SURBAKTI", "ALWI DG RANGKA", "EKE SUMARLIA", "MIRDA YANTI", "ALI RUSDIN", "LA ODE MUHAMMAD NURJAINUDIN", "WA AYU", "LA ODE ISRUN", "LA SITE", "HARDIN", "MAWAR DASLAN BUBURANDA", "WD.LIHAMU", "SUYANTO", "KEYLA MUSA BELLA", "ARPA", "NURLIAN", "LASARI", "AYU NUR ANNISA", "ASMIATI", "FITRIYANTI TAHERONG", "SRI WAHYUNI", "GOMBILO", "RISWANDI", "DIAN REFINA", "ATIRAH", "ABDULLAH", "ELISA KEWA.LB", "PURNAMAWANTI", "KLISDAYANTI", "SYAIFUL", "ANGGRINI", "MAHIDE", "RIAMIN MANURUNG", "HENDRA", "SUTRIA", "SUMIATUN", "TJOKORDE TEKAKA", "WELNI", "IRFANDI", "KAMARUDDIN", "SUARNA", "KARDINAWATI", "SUARDI", "HAPID", "NURLIA", "ADI SAPUTRA", "MUH.ANGGA NURSANTO", "HASAN DG.TAYANG", "IRAWATI", "NENENG TRIANA YUNITA", "UMUNIA", "ARJUN", "DIMAS ANANDA TAMA", "MUH.JERY SETIAWAN", "DEVI DWI UTAMI", "RAMANDA RAMADHAN", "JEREMY REVALDO", "HENDRA", "BASRI", "DESKA SEPTIANA YUSUF", "SARNIATI", "JATIM", "ANSARINA LOTUNANI", "DIAH PERTIWI", "MUH.IKRA RENDELANGI", "ROSMA", "SYAIFULLAH", "NONA RAEHANA", "HENNY MALASARI", "ROSANI", "WAWAN", "JOLLO DG.MATERUH", "HENDRAWAN", "IRAWATI", "SUNARTIN", "SITI HASNA", "SAFRUDDIN", "MUH.ARISTO SAPUTRA", "CLAUDIA PATRICIA TANDUNGAN", "FREDERIK TANDUNGAN", "HERLIANA", "ELY SAMPEALI", "SALFIA", "JEANNE LAUREN TANDUNGAN", "SUMINI", "AKBAR", "NASRUN.T", "DITA ILMIAWAN EKA PUTRA", "CANTIKA WULELE MOSIU SIU", "STEVI FERARI", "CINTA APRIANI RUSLAN", "MARWIA JENY", "RUSLAN", "RAHMADANI", "WA MALI", "MARIANA", "M.FADLY", "BOTORI", "INDRA RAMLI", "HARDIANSYAH", "ASHAR", "LEWI TARAMPAK", "RICHO ROZHALVINO TARAMPAK", "ELSA JULI ASTUTI", "IKSAN REZA PAHLAWAN", "IRMAWATI", "AGISTA ARIANI ASHAR", "SUNIATIN", "SUTRIYANI", "MUH.FAJRI AL FAJAR", "DINA NOVITA JAYA", "SIA SONA", "KARNO", "RENDI", "BENYAMIN", "MELY YANTI PANUSU", "ARDIANSYAH PANUSU", "LUIS", "MUHAMMAD AKMAL", "NORMA.P", "DINAR", "HASNAWATI", "ASIS IRAWAN.B", "MUH.ARDIANSYAH", "MUH ARIEF SAPUTRA", "IRA REZKY PUTRI", "MUSTAPIA", "ABD.RAHMAN", "SUDIRMAN.S", "AGUS SURACHMAN", "ABRIANSA", "NURMAISA", "SRI VIVIAN RENDELANGI", "INAL", "ERAWATI", "NASIR", "SITI NUR ASSE", "APDI", "SAHIDIN", "SRI WAHYUNI", "MUH ALWI", "TASRUN", "AMIRUDDIN", "ENDANG", "PARTIAWAN"];
const excelNames = ["ATILA", "LUSIANA DG LEBONG", "FEMBRY AZIADI KURNIAWAN", "SRI LUCIANA BUNGGASI", "JURHANA", "HERNI YANTI", "ANDI SUCIANA SULAEMAN", "ADRIANSYAH", "WERUNI", "LA ALI", "JUHERIA", "ALI", "MILA", "HARLINA", "FITRIYANTI TAHERONG", "VIRA ANGGRIANI PUTRI", "JURIAH BR. SURBAKTI", "RAMLI", "ALWI DG RANGKA", "HAMLIA DG TARRING", "FARIDA", "FITRIA RAMADHANI", "ADRIANSYAH", "TAMRIN MAULANA. P", "TASRI DG. DAU", "TALLASA DG NAI", "SARIALAM DG SAGA", "ERNAWATI", "ADRIAN", "MUHAMMAD RONAL", "MULIAWAN", "LA ODE MUHAMMAD NURJAINUDIN", "MIRDA YANTI", "ALI RUSDIN", "EKE SUMARLIA", "WA AYU", "LA ODE ISRUN", "MAWAR DASLAN BUBURANDA", "SUYANTO", "RESTA", "SUYANA", "SINDI RELLA", "LA SITE", "HARDIN", "WD.LIHAMU", "KEYLA MUSA BELLA", "ARPA", "GOMBILO", "NURLIAN", "LASARI", "ASMIATI", "JUMRAN", "SUGIONO", "NINGSIH SANDRIANA", "ASWAD. S", "HASTI", "YOLAN MUSRIFA", "WA UNIA", "RONAL", "LA SARIA", "SRI WAHYUNI", "SYAHRIL", "ATIRAH", "RISWANDI", "JIHADDIN NAFSI", "MUNIR", "ALMENDO PAPILAYA", "POPPI", "NURHAYATI BOTTO", "AGUS SUPRATMAN", "JUHAERYL EKO PRATAMAXXAL", "MUH. ALQAUTSAR", "MUH. ZULFIQRY SEPTANTO", "TAJUDDIN", "JARUNA", "RIDA", "RADITYA", "WA ODE HUSNA", "RISKI DWI RAMADANI", "GADIS EKA LESTARI", "MUH. ALI", "RAHMAWATI", "FITRI", "ALFATHIR FAIRUZ RISAL", "IKBAL SAPUTRA", "AYU NUR ANNISA", "YUSI NURWIYANA", "RUDI BOTORI", "DESY SHARASWATY", "FREDY", "ATI", "ARLAN", "ARIS", "HARSIDA", "MATHEOS HANE", "MELIANA", "HASDAR", "NURANI", "KAMSIR", "SITTI RAHMA SALILI", "MIRNA", "IKSAL SAPUTRA", "ARMIN", "SYAHRIANTI", "SABRI", "WARMIA", "FEBRIYAN", "GASSING", "BAU NURCAYA", "WIDYA ANUGRAH", "MUHAMMAD AFRISAL", "MAMAN FRIADIN", "HARIANA", "ST. SYAMSINAR", "YUSRAN TARAPE", "IWAN", "RISKA YULIANA DEWI", "HERNITA TEKAKA", "ANJAS ISAMU", "VICKY MARHADI HASAN", "MECCA FANESA ARIANTI", "HASRAN BUNGASARI", "WANARIA", "DEWI", "ASRI", "HASRAWAN", "ESTI VAUSIA WULELE", "KASMIR", "NURSIDA", "HARJONI", "AYU SETIA NINGSIH", "MANSYUR SAHMAP", "DARNAWATI", "WIDYA SALSA DILLA TAHERONG", "SUHARDIN TAHERONG", "RINA HASAN", "NURDIN. K", "DAFID MUHAMMAD NUR", "GUN GUN MUHAMMAD NUR", "SITTI NURHANA", "HAERUDDIN", "SESILIA MOITA", "RONI", "HALFAM", "WA LINA", "PUTRI RAMADHANI", "M. AIDIL", "SANDI ASGAR", "DIAN REFINA", "ANIP MIPTAHUL PALAH", "PURNAMAWANTI", "SYAIFUL", "ELISA KEWA .LB", "HENDRA", "KLISDAYANTI", "ABDULLAH", "ANGGRINI", "MAHIDE", "RIAMIN MANURUNG", "TJOKORDE TEKAKA", "SUTRIA", "WELNI", "KARDINAWATI", "KAMARUDDIN", "IRFANDI", "SUARDI", "SUARNA", "HAPID", "SUMIATUN", "ADI SAPUTRA", "NURLIA", "MUH. ANGGA NURSANTO", "HASAN DG. TAYANG", "HENDRA", "ARJUN", "IRAWATI", "DEVI DWI UTAMI", "DESKA SEPTIANA YUSUF", "UMUNIA", "DIMAS ANANDA TAMA", "JEREMY REVALDO", "NENENG TRIANA YUNITA", "DIAH PERTIWI", "RAMANDA RAMADHAN", "BASRI", "MUH. JERY SETIAWAN", "ROSMA", "SARNIATI", "JATIM", "ANSARINA LOTUNANI", "MUH. IKRA RENDELANGI", "SYAIFULLAH", "ATI", "HENDRAWAN", "HENNY MALASARI", "MUH. ARISTO SAPUTRA", "ROSANI", "SUNARTIN", "JOLLO DG. MATERUH", "RAMLI", "WAWAN", "IRAWATI", "NONA RAEHANA", "SALFIA", "SAFRUDDIN", "SITI HASNA", "CLAUDIA PATRICIA TANDUNGAN", "ELY SAMPEALI", "FREDERIK TANDUNGAN", "JEANNE LAUREN TANDUNGAN", "NASRUN. T", "AKBAR", "SUMINI", "HERLIANA", "CANTIKA WULELE MOSIU SIU", "DITA ILMIAWAN EKA PUTRA", "STEVI FERARI", "MARWIA JENY", "CINTA APRIANI RUSLAN", "RUSLAN", "WA MALI", "MARIANA", "BOTORI", "RAHMADANI", "M. FADLY", "IRMAWATI", "INDRA RAMLI", "HARDIANSYAH", "RICHO ROZHALVINO TARAMPAK", "LEWI TARAMPAK", "ASHAR", "IKSAN REZA PAHLAWAN", "ELSA JULI ASTUTI", "AGISTA ARIANI ASHAR", "SUNIATIN", "MUH. FAJRI AL FAJAR", "KARNO", "SUTRIYANI", "SIA SONA", "DINA NOVITA JAYA", "RENDI", "LUIS", "MELY YANTI PANUSU", "ARDIANSYAH PANUSU", "NORMA .P", "MUH. ARDIANSYAH", "ASIS IRAWAN. B", "ATI", "ABD. RAHMAN", "DINAR", "BENYAMIN", "MUHAMMAD AKMAL", "HASNAWATI", "MUH ARIEF SAPUTRA", "IRA REZKY PUTRI", "SUDIRMAN .S", "MUSTAPIA", "AGUS SURACHMAN", "SRI VIVIAN RENDELANGI", "NURMAISA", "ABRIANSA", "PARTIAWAN", "NASIR", "ERAWATI", "SAHIDIN", "APDI", "INAL", "TASRUN", "SRI WAHYUNI", "SITI NUR ASSE", "AMIRUDDIN", "MUH ALWI", "ENDANG"];


function checkDifference(arrayA, arrayB) {
  // Convert arrays to sets for efficient comparison
  const setA = new Set(arrayA);
  const setB = new Set(arrayB);

  // Create an array of elements in setA that are not in setB
  const difference = [...setA].filter(element => !setB.has(element));

  return difference;
}
console.log(checkDifference(excelNames, databaseNames));
