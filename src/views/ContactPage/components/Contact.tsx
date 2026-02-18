"use client";

import { BackgroundSection } from "@/components/BackgroundSection";
import EmailProtected from "@/components/EmailProtected";
import { Container, GridContainer, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";

const NOTICES = [
  {
    title: "楽曲の二次利用について",
    items: [
      "LitMus楽曲の二次利用について、各種SNS上での非営利の個人的な活動については、連絡なしで使用いただいて結構です。良識の範囲内でご使用ください。",
      "商用利用したい方や企業の方のご利用は、以下メールアドレスより、お問い合わせください。",
    ],
  },
  {
    title: "お仕事について",
    items: [
      "絵柄合わせ・実績非公開の依頼につきましては原則お受けしておりません。また、全年齢向け作品のみお受けしております。",
      "以下のメールアドレスよりご連絡ください。",
      "【 6litmus9@gmail.com 】",
    ],
  },
];

export default function Contact() {
  return (
    <BackgroundSection id="contact" backgroundImage="/LitMusBG.webp">
      <SideDecoration svgPath="/010_PageSideTitleSvg/CONTACT.svg" />
      <Container>
        <SectionTitle>CONTACT</SectionTitle>

        <GridContainer columns="0.6fr 0.4fr">
          <div className="flex flex-col">
            {NOTICES.map((notice) => (
              <div key={notice.title}>
                <TitleWithLine title={notice.title} />
                <ul className="flex list-none flex-col gap-4">
                  {notice.items.map((item) => (
                    <li
                      key={item}
                      className="flex before:relative before:top-[0.7em] before:mr-2 before:text-[0.7rem] before:content-['▶']"
                    >
                      {item === "【 6litmus9@gmail.com 】" ? (
                        <EmailProtected email="6litmus9@gmail.com" />
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex" />
        </GridContainer>
      </Container>
    </BackgroundSection>
  );
}
