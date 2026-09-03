export type DocLink = {
  label: string;
  href: string;
};

export type ProviderBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "docs"; items: DocLink[] };

export type ProviderSection = {
  id: string;
  title: string;
  blocks: ProviderBlock[];
};

export const providerNav: { id: string; title: string }[] = [
  { id: "osnovnye", title: "Основные сведения" },
  { id: "struktura", title: "Структура и органы управления Учреждением" },
  { id: "formy", title: "Формы социального обслуживания и виды социальных услуг" },
  { id: "chislennost", title: "Численность получателей социальных услуг" },
  { id: "rukovodstvo", title: "Руководство и персонал поставщика социальных услуг" },
  { id: "mto", title: "Материально-техническое обеспечение предоставления социальных услуг" },
  { id: "mesta", title: "Количество свободных мест для приема получателей социальных услуг" },
  { id: "finansy", title: "Источники финансирования и объем предоставленных социальных услуг" },
  { id: "licenzii", title: "Лицензии" },
  { id: "fhd", title: "Финансово-хозяйственная деятельность" },
  { id: "lna", title: "Локальные нормативные акты" },
  { id: "predpisaniya", title: "Предписания контрольно-надзорных органов" },
  { id: "poleznaya", title: "Полезная информация" },
  { id: "rezultaty", title: "Результаты независимой оценки качества оказания услуг" },
  { id: "nok", title: "Независимая оценка качества (НОК)" },
];

export const educationNavIds = [
  "osnovnye",
  "struktura",
  "rukovodstvo",
  "mto",
  "licenzii",
  "fhd",
  "lna",
] as const;
