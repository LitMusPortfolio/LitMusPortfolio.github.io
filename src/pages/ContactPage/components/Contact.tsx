import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import EmailProtected from "@/components/EmailProtected";
import { Container, GridContainer, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightSection = styled.div`
  display: flex;
`;

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

        <GridContainer $columns="0.6fr 0.4fr">
          <LeftSection>
            {NOTICES.map((notice) => (
              <div key={notice.title}>
                <TitleWithLine title={notice.title} />
                <ul>
                  {notice.items.map((item) => (
                    <li key={item}>
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
          </LeftSection>
          <RightSection></RightSection>
        </GridContainer>
      </Container>
    </BackgroundSection>
  );
}
