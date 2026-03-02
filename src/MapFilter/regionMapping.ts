/**
 * Mapping of human-readable option strings to ISO alpha-3 country codes.
 * Regions expand to arrays of codes for all countries in that region.
 */
export const OPTION_TO_ISO3: Record<string, string[]> = {
  // --- Individual countries (name must match world-atlas feature name or be a common alias) ---
  Afghanistan: ['AFG'], Albania: ['ALB'], Algeria: ['DZA'], Angola: ['AGO'],
  Argentina: ['ARG'], Armenia: ['ARM'], Australia: ['AUS'], Austria: ['AUT'],
  Azerbaijan: ['AZE'], Bangladesh: ['BGD'], Belarus: ['BLR'], Belgium: ['BEL'],
  Benin: ['BEN'], Bolivia: ['BOL'], Bosnia: ['BIH'], Botswana: ['BWA'],
  Brazil: ['BRA'], Bulgaria: ['BGR'], 'Burkina Faso': ['BFA'], Burundi: ['BDI'],
  Cambodia: ['KHM'], Cameroon: ['CMR'], Canada: ['CAN'], Chad: ['TCD'],
  Chile: ['CHL'], China: ['CHN'], Colombia: ['COL'], 'Costa Rica': ['CRI'],
  Croatia: ['HRV'], Cuba: ['CUB'], 'Czech Republic': ['CZE'], Denmark: ['DNK'],
  Ecuador: ['ECU'], Egypt: ['EGY'], 'El Salvador': ['SLV'], Ethiopia: ['ETH'],
  Finland: ['FIN'], France: ['FRA'], Gabon: ['GAB'], Georgia: ['GEO'],
  Germany: ['DEU'], Ghana: ['GHA'], Greece: ['GRC'], Guatemala: ['GTM'],
  Guinea: ['GIN'], Haiti: ['HTI'], Honduras: ['HND'], Hungary: ['HUN'],
  India: ['IND'], Indonesia: ['IDN'], Iran: ['IRN'], Iraq: ['IRQ'],
  Ireland: ['IRL'], Israel: ['ISR'], Italy: ['ITA'], 'Ivory Coast': ['CIV'],
  Jamaica: ['JAM'], Japan: ['JPN'], Jordan: ['JOR'], Kazakhstan: ['KAZ'],
  Kenya: ['KEN'], Laos: ['LAO'], Lebanon: ['LBN'], Liberia: ['LBR'],
  Libya: ['LBY'], Madagascar: ['MDG'], Malawi: ['MWI'], Malaysia: ['MYS'],
  Mali: ['MLI'], Mauritania: ['MRT'], Mexico: ['MEX'], Moldova: ['MDA'],
  Mongolia: ['MNG'], Morocco: ['MAR'], Mozambique: ['MOZ'], Myanmar: ['MMR'],
  Namibia: ['NAM'], Nepal: ['NPL'], Netherlands: ['NLD'], 'New Zealand': ['NZL'],
  Nicaragua: ['NIC'], Niger: ['NER'], Nigeria: ['NGA'], 'North Korea': ['PRK'],
  Norway: ['NOR'], Pakistan: ['PAK'], Panama: ['PAN'], Paraguay: ['PRY'],
  Peru: ['PER'], Philippines: ['PHL'], Poland: ['POL'], Portugal: ['PRT'],
  Romania: ['ROU'], Russia: ['RUS'], Rwanda: ['RWA'], 'Saudi Arabia': ['SAU'],
  Senegal: ['SEN'], Serbia: ['SRB'], 'Sierra Leone': ['SLE'], Somalia: ['SOM'],
  'South Africa': ['ZAF'], 'South Korea': ['KOR'], 'South Sudan': ['SSD'],
  Spain: ['ESP'], 'Sri Lanka': ['LKA'], Sudan: ['SDN'], Sweden: ['SWE'],
  Switzerland: ['CHE'], Syria: ['SYR'], Taiwan: ['TWN'], Tanzania: ['TZA'],
  Thailand: ['THA'], Togo: ['TGO'], Tunisia: ['TUN'], Turkey: ['TUR'],
  Uganda: ['UGA'], Ukraine: ['UKR'], 'United Kingdom': ['GBR'],
  'United States': ['USA'], 'United States of America': ['USA'],
  Uruguay: ['URY'], Uzbekistan: ['UZB'], Venezuela: ['VEN'], Vietnam: ['VNM'],
  Yemen: ['YEM'], Zambia: ['ZMB'], Zimbabwe: ['ZWE'],

  // --- Broad regions ---
  Africa: [
    'DZA','AGO','BEN','BWA','BFA','BDI','CMR','CPV','CAF','TCD','COM','COD',
    'COG','CIV','DJI','EGY','GNQ','ERI','ETH','GAB','GMB','GHA','GIN','GNB',
    'KEN','LSO','LBR','LBY','MDG','MWI','MLI','MRT','MUS','MAR','MOZ','NAM',
    'NER','NGA','RWA','STP','SEN','SLE','SOM','ZAF','SSD','SDN','SWZ','TZA',
    'TGO','TUN','UGA','ZMB','ZWE',
  ],
  'Sub-Saharan Africa': [
    'AGO','BEN','BWA','BFA','BDI','CMR','CAF','TCD','COM','COD','COG','CIV',
    'DJI','GNQ','ERI','ETH','GAB','GMB','GHA','GIN','GNB','KEN','LSO','LBR',
    'MDG','MWI','MLI','MRT','MUS','MOZ','NAM','NER','NGA','RWA','STP','SEN',
    'SLE','SOM','ZAF','SSD','SDN','SWZ','TZA','TGO','UGA','ZMB','ZWE',
  ],
  'North Africa': ['DZA','EGY','LBY','MAR','TUN','SDN'],
  'East Africa': ['BDI','COM','DJI','ERI','ETH','KEN','MDG','MWI','MUS','MOZ','RWA','SOM','SSD','TZA','UGA','ZMB','ZWE'],
  'West Africa': ['BEN','BFA','CPV','CIV','GMB','GHA','GIN','GNB','LBR','MLI','MRT','NER','NGA','SEN','SLE','TGO'],
  'Southern Africa': ['AGO','BWA','LSO','MOZ','NAM','ZAF','SWZ','ZMB','ZWE'],
  'Central Africa': ['BDI','CAF','CMR','COD','COG','GAB','GNQ','RWA','STP'],

  Europe: [
    'ALB','AND','AUT','BLR','BEL','BIH','BGR','HRV','CYP','CZE','DNK','EST',
    'FIN','FRA','DEU','GRC','HUN','ISL','IRL','ITA','XKX','LVA','LIE','LTU',
    'LUX','MLT','MDA','MCO','MNE','NLD','MKD','NOR','POL','PRT','ROU','RUS',
    'SMR','SRB','SVK','SVN','ESP','SWE','CHE','UKR','GBR','VAT',
  ],
  'Western Europe': ['AUT','BEL','FRA','DEU','IRL','LIE','LUX','MCO','NLD','CHE','GBR'],
  'Eastern Europe': ['BLR','BGR','CZE','HUN','MDA','POL','ROU','RUS','SVK','UKR'],
  'Northern Europe': ['DNK','EST','FIN','ISL','LVA','LTU','NOR','SWE'],
  'Southern Europe': ['ALB','AND','BIH','HRV','CYP','GRC','ITA','XKX','MLT','MNE','MKD','PRT','SMR','SRB','SVN','ESP'],

  Asia: [
    'AFG','ARM','AZE','BHR','BGD','BTN','BRN','KHM','CHN','CYP','GEO','IND',
    'IDN','IRN','IRQ','ISR','JPN','JOR','KAZ','PRK','KOR','KWT','KGZ','LAO',
    'LBN','MYS','MDV','MNG','MMR','NPL','OMN','PAK','PHL','QAT','SAU','SGP',
    'LKA','SYR','TWN','TJK','THA','TLS','TUR','TKM','ARE','UZB','VNM','YEM',
  ],
  'South Asia': ['AFG','BGD','BTN','IND','MDV','NPL','PAK','LKA'],
  'Southeast Asia': ['BRN','KHM','IDN','LAO','MYS','MMR','PHL','SGP','THA','TLS','VNM'],
  'East Asia': ['CHN','JPN','PRK','KOR','MNG','TWN'],
  'Central Asia': ['KAZ','KGZ','TJK','TKM','UZB'],
  'Middle East': ['BHR','CYP','IRN','IRQ','ISR','JOR','KWT','LBN','OMN','QAT','SAU','SYR','TUR','ARE','YEM'],

  Americas: [
    'ATG','ARG','BHS','BRB','BLZ','BOL','BRA','CAN','CHL','COL','CRI','CUB',
    'DMA','DOM','ECU','SLV','GRD','GTM','GUY','HTI','HND','JAM','MEX','NIC',
    'PAN','PRY','PER','KNA','LCA','VCT','SUR','TTO','USA','URY','VEN',
  ],
  'Latin America': [
    'ATG','ARG','BHS','BRB','BLZ','BOL','BRA','CHL','COL','CRI','CUB','DMA',
    'DOM','ECU','SLV','GRD','GTM','GUY','HTI','HND','JAM','MEX','NIC','PAN',
    'PRY','PER','KNA','LCA','VCT','SUR','TTO','URY','VEN',
  ],
  'North America': ['CAN','MEX','USA'],
  'Central America': ['BLZ','CRI','SLV','GTM','HND','MEX','NIC','PAN'],
  'South America': ['ARG','BOL','BRA','CHL','COL','ECU','GUY','PRY','PER','SUR','URY','VEN'],
  Caribbean: ['ATG','BHS','BRB','CUB','DMA','DOM','GRD','HTI','JAM','KNA','LCA','VCT','TTO'],

  Oceania: ['AUS','FJI','KIR','MHL','FSM','NRU','NZL','PLW','PNG','WSM','SLB','TON','TUV','VUT'],
};

/**
 * Given a list of option strings, return a flat de-duplicated set of ISO3 codes.
 */
export function resolveIsoCodes(options: string[]): Set<string> {
  const codes = new Set<string>();
  for (const option of options) {
    const mapped = OPTION_TO_ISO3[option];
    if (mapped) {
      for (const c of mapped) codes.add(c);
    }
  }
  return codes;
}

/**
 * Given an ISO3 code, find which option strings from the provided list it belongs to.
 */
export function isoToOptions(iso3: string, options: string[]): string[] {
  return options.filter((option) => {
    const mapped = OPTION_TO_ISO3[option];
    return mapped?.includes(iso3);
  });
}
