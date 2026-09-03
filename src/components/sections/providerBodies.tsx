import { DocList, InfoCard } from "@/components/sections/ProviderShell";

export function SectionStruktura() {
  return (
    <>
      <InfoCard title="Управление Учреждением">
        <p>
          Управление Учреждением осуществляется в соответствии с законодательством Российской
          Федерации, Уставом и строится на основе сочетания принципов единоначалия и
          коллегиальности.
        </p>
      </InfoCard>
      <InfoCard title="Органы управления обществом">
        <ul className="list-disc space-y-2 pl-5">
          <li>Высший орган управления обществом — Общее собрание участников Общества.</li>
          <li>
            Единоличный исполнительный орган Общества — Генеральный директор (осуществляет
            руководство текущей деятельностью Общества).
          </li>
          <li>По решению общего собрания участников Общества в Обществе может избираться ревизор.</li>
        </ul>
        <p>В настоящий момент в составе Общества отсутствуют структурные подразделения и филиалы.</p>
      </InfoCard>
      <InfoCard title="Структура организации социального обслуживания">
        <p>
          Единоличный исполнительный орган — Генеральный директор — специалист по социальной работе.
        </p>
        <p className="font-semibold text-brand-black">В непосредственном подчинении:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>заместитель генерального директора — психолог — 1</li>
          <li>педагог-психолог — 1</li>
          <li>учитель-дефектолог — 1</li>
          <li>логопед — 1</li>
          <li>учитель — 1</li>
          <li>специалист по социальной работе — 4</li>
          <li>социальный работник — 4</li>
          <li>врач — 2</li>
          <li>администратор — 2</li>
        </ul>
      </InfoCard>
    </>
  );
}

export function SectionFormy() {
  return (
    <>
      <InfoCard title="Документы">
        <DocList
          items={[
            {
              label:
                "Приказ ООО «НМЦ» №1 от 17.01.2024 «Об утверждении тарифов на предоставляемые социальные услуги»",
              href: "https://drive.google.com/file/d/1DhoU9Y3Hhu41Qdr8Amv2DYQkrc9eQ1yE/view?usp=sharing",
            },
            {
              label:
                "Приказ Министерства социальной политики Свердловской области №419 от 07.11.2022 о внесении ООО «НМЦ» в реестр поставщиков социальных услуг",
              href: "https://www.lisaba.ru/wp-content/uploads/2023/01/Prikaz-MinSoc.pdf",
            },
            {
              label: "Договор о предоставлении социальных услуг — полустационар",
              href: "https://www.lisaba.ru/wp-content/uploads/2025/06/Dogovor-o-predostavlenii-socialnyh-uslug-polustacionar-1.doc",
            },
            {
              label: "Договор о предоставлении социальных услуг — на дому",
              href: "https://www.lisaba.ru/wp-content/uploads/2025/06/Dogovor-o-predostavlenii-socialnyh-uslug-dom-1.doc",
            },
          ]}
        />
      </InfoCard>
      <InfoCard title="Социальное обслуживание на дому">
        <p className="font-semibold text-brand-black">Социально-бытовые услуги</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Содействие в организации услуг торговли, связи и информационных услуг</li>
          <li>Помощь в написании, оформлении и прочтении писем и документов</li>
          <li>Отправка почтовой корреспонденции за счёт получателя услуг</li>
          <li>Обеспечение кратковременного присмотра за детьми</li>
        </ul>
        <p className="font-semibold text-brand-black">Социально-медицинские услуги</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Индивидуальные занятия, обучающие здоровому образу жизни</li>
        </ul>
        <p className="font-semibold text-brand-black">Социально-психологические услуги</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Индивидуальная психологическая коррекция для несовершеннолетних</li>
          <li>Индивидуальное социально-психологическое консультирование</li>
          <li>Индивидуальная психологическая помощь и поддержка</li>
        </ul>
        <p className="font-semibold text-brand-black">Социально-педагогические услуги</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Помощь родителям детей-инвалидов в обучении навыкам самообслуживания и общения</li>
          <li>Социально-педагогическая диагностика, консультирование и коррекция</li>
        </ul>
        <p className="font-semibold text-brand-black">Социально-трудовые услуги</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Помощь в получении образования и квалификации инвалидами (детьми-инвалидами)</li>
        </ul>
        <p className="font-semibold text-brand-black">Коммуникативный потенциал</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Обучение пользованию средствами ухода и ТСР</li>
          <li>Обучение навыкам самообслуживания и поведения в быту и общественных местах</li>
        </ul>
      </InfoCard>
      <InfoCard title="Полустационарное социальное обслуживание">
        <p>
          В полустационарной форме оказываются социально-бытовые, социально-медицинские,
          социально-педагогические, социально-психологические, социально-правовые,
          социально-трудовые услуги и услуги по повышению коммуникативного потенциала.
        </p>
        <p>
          В соответствии с пп. 1 ч. 1 ст. 31 Федерального закона от 28.12.2013 № 442-ФЗ социальные
          услуги несовершеннолетним предоставляются бесплатно.
        </p>
        <p>Социальное обслуживание на дому — 50 мест. Полустационарное обслуживание — 4 места.</p>
        <p>
          Объём предоставляемых социальных услуг за счёт бюджетных ассигнований бюджетов субъектов
          Российской Федерации — 100%.
        </p>
      </InfoCard>
    </>
  );
}

export function SectionChislennost() {
  return (
    <InfoCard>
      <DocList
        items={[
          {
            label:
              "Объём предоставляемых услуг за счёт бюджета Свердловской области и за плату / частичную плату",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/07/Ob-obeme-predostavlyaemyh-uslug.pdf",
          },
        ]}
      />
    </InfoCard>
  );
}

export function SectionRukovodstvo() {
  return (
    <InfoCard>
      <ul className="space-y-3">
        {[
          "Генеральный директор, олигофренопедагог, специалист по сенсорной интеграции — Пономарёва Екатерина Геннадьевна",
          "Заместитель генерального директора, дефектолог, специальный психолог, специалист по сенсорной интеграции — Дмитриева Вера Алексеевна",
          "Главный врач — Никитин Семён Викторович",
          "Нейропсихолог, специалист по сенсорной интеграции — Пьянкова Валерия Вадимовна",
          "Клинический психолог, нейропсихолог, специалист по сенсорной интеграции — Хрицку Анна Евгеньевна",
          "Логопед, специалист по сенсорной интеграции — Шнар Вероника Михайловна",
          "Нейропсихолог, специалист по сенсорной интеграции — Забабурина Светлана Алексеевна",
          "Клинический психолог, нейропсихолог, специалист по сенсорной интеграции — Пак Александра Станиславовна",
        ].map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </InfoCard>
  );
}

export function SectionMto() {
  return (
    <>
      <InfoCard title="620050, г. Екатеринбург, ул. Маневровая, д. 9, оф. 326">
        <p>Лекционная аудитория:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>посадочные места, рабочее место преподавателя, магнитная маркерная доска, пособия</li>
          <li>проектор мультимедиа, экран</li>
          <li>компьютеры в локальной сети с выходом в интернет</li>
          <li>сенсорно-динамический зал</li>
          <li>манекен-тренажёр для отработки навыков экстренной доврачебной помощи</li>
        </ul>
        <p>
          Санитарно-эпидемиологическое заключение № 66.01.37.000.М.001314.08.17 от 15.08.2017.
        </p>
      </InfoCard>
      <InfoCard title="620028, г. Екатеринбург, ул. Шевелёва, 7а">
        <p>
          Места оказания услуг находятся в черте Екатеринбурга, рядом с остановками общественного
          транспорта; на прилегающих территориях организованы парковки.
        </p>
        <p>
          ул. Шевелёва, 7а (1 этаж) — входная группа оборудована пандусом, при необходимости
          осуществляется сопровождение лиц с ОВЗ.
        </p>
        <p>
          ул. Маневровая, 9, оф. 326 (3 этаж) — в здании есть лифт; при необходимости осуществляется
          сопровождение.
        </p>
      </InfoCard>
    </>
  );
}

export function SectionMesta() {
  return (
    <InfoCard>
      <p>
        Форма социального обслуживания — полустационарное социальное обслуживание.
      </p>
      <p>Общее количество мест, предназначенных для предоставления социальных услуг — 45 человек.</p>
      <p>Наличие свободных мест — 25 человек.</p>
    </InfoCard>
  );
}

export function SectionFinansy() {
  return (
    <InfoCard>
      <p>За счёт бюджетных ассигнований бюджета Свердловской области.</p>
    </InfoCard>
  );
}

export function SectionLicenzii() {
  return (
    <InfoCard>
      <DocList
        items={[
          {
            label: "Лицензия с приложением",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/06/Licenziya-OOO-NMc-s-prilozh.-1.pdf",
          },
        ]}
      />
    </InfoCard>
  );
}

export function SectionFhd() {
  return (
    <InfoCard>
      <DocList
        items={[
          {
            label: "План финансово-хозяйственной деятельности на 2025 год",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/06/Finansovo-hozyajstvennaya-deyatelnost.pdf",
          },
        ]}
      />
    </InfoCard>
  );
}

export function SectionLna() {
  return (
    <InfoCard>
      <DocList
        items={[
          {
            label: "Правила внутреннего трудового распорядка",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/10/Pravila-vnutrennego-trudovogo-rasporyadka2.pdf",
          },
          {
            label: "Правила внутреннего распорядка для получателей социальных услуг",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/10/Pravila-vnutrennego-rasporyadka-dlya-poluchatelej-socuslug.pdf",
          },
        ]}
      />
    </InfoCard>
  );
}

export function SectionPredpisaniya() {
  return (
    <InfoCard>
      <p>Контрольно-надзорные мероприятия в отношении поставщика социальных услуг не проводились.</p>
    </InfoCard>
  );
}

export function SectionPoleznaya() {
  return (
    <>
      <InfoCard title="Дистанционные способы взаимодействия">
        <ul className="list-disc space-y-1.5 pl-5">
          <li>телефон — (343) 271-40-44, 345-76-28</li>
          <li>электронная почта — 3457628@mail.ru</li>
          <li>почта России — 620028, г. Екатеринбург, а/я 61</li>
          <li>раздел сайта — «Записаться онлайн»</li>
          <li>
            социальные сети —{" "}
            <a href="https://vk.com/lisaba_sensory" className="text-brand-blue hover:underline">
              vk.com/lisaba_sensory
            </a>
          </li>
          <li>мессенджеры — WhatsApp, Telegram</li>
        </ul>
      </InfoCard>
      <InfoCard title="Официальные ресурсы">
        <DocList
          items={[
            { label: "Минтруд России", href: "https://mintrud.gov.ru/" },
            {
              label: "Министерство социальной политики Свердловской области",
              href: "https://msp.midural.ru/",
            },
            { label: "Портал Госуслуг", href: "https://www.gosuslugi.ru/" },
            {
              label: "Часто задаваемые вопросы",
              href: "https://www.lisaba.ru/wp-content/uploads/2025/07/CHasto-zadavaemye-voprosy.docx",
            },
          ]}
        />
      </InfoCard>
    </>
  );
}

export function SectionRezultaty() {
  return (
    <InfoCard>
      <p>Независимая оценка качества оказания услуг не проводилась, срок проведения — 2025 год.</p>
    </InfoCard>
  );
}

export function SectionNok() {
  return (
    <InfoCard>
      <p>
        Чтобы оценить условия предоставления услуг, перейдите по ссылке или используйте QR-код на{" "}
        <a
          href="https://bus.gov.ru/qrcode/rate/822111"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue hover:underline"
        >
          bus.gov.ru
        </a>
        .
      </p>
      <DocList
        items={[
          {
            label: "Независимая оценка качества 2025 г.",
            href: "https://www.lisaba.ru/wp-content/uploads/2025/10/NOK-2025-Obschestvo-s-ogranichennoj-otvetstvennostyu-Nauchnyj-mezhotraslevoj-centr.pdf",
          },
        ]}
      />
    </InfoCard>
  );
}
