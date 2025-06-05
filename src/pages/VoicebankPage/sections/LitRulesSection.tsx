import styled from "styled-components";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";

const RULES = [
  {
    title: "定義",
    items: [
      "「キャラクター」とは、「離途」のキャラクターデザインやキャラクター設定等により表現される抽象的概念のことをいいます。",
      "「音声波形」とは、UTAU用ライブラリおよびエクストラボイスとして提供するLitMus本人の音声および、UTAU・VOICEVOX・COEIROINKから出力した「離途」の音声をいいます。",
    ],
  },
  {
    title: "特記事項",
    items: [
      "キャラクター「離途」を使用した場合は、「離途」のクレジット表記を必ず行ってください。",
      "音声波形「UTAU 離途」及び「エクストラボイス」を使用した場合は、「離途」のクレジット表記を必ず行ってください。",
      "音声波形「VOICEVOX 離途」を使用した場合は、「VOICEVOX 離途」のクレジット表記を必ず行ってください。",
      "音声波形「MYCOEIROINK 離途」を使用した場合は、「MYCOEIROINK 離途」のクレジット表記を必ず行ってください。",
    ],
  },
  {
    title: "禁止事項",
    items: [
      "当サイトのコンテンツを二次配布すること。",
      "当サイトのコンテンツ及び「離途」の音声波形を機械学習に利用すること。",
      "「離途」のキャラクター及び音声波形を用いて、政治的表現、宗教的表現に利用すること。",
      "「離途」のキャラクター及び音声波形を用いて、性行為・性器を露出する場面など過激なアダルト的表現を行うコンテンツを作成し、それをSNS等の不特定多数が閲覧できる場所で公開すること。",
      "「離途」のキャラクターを用いたイラストを、生成AIを利用して作成し、それを不特定多数が閲覧できる場所で公開すること。",
      "法人が許諾なく「離途」のキャラクターを使用すること。（法人が音声波形のみを利用する場合は、無料で商用利用可能）",
      "公式からの発信と誤認識されかねない言動を行うこと。（なりきりアカウント等も含む）",
    ],
  },
  {
    title: "許諾事項",
    items: [
      "二次創作（コスプレ、グッズ作成・頒布などを含む）",
      "個人によるキャラクターの商用利用（法人がキャラクターを利用する場合、別途使用許諾を必要とする。）",
      "音声波形の商用利用（個人利用・法人利用問わず、無料で商用利用可能）",
      "著作者が関わっていない場面での、個人間による金銭の発生する依頼を行うこと。（例：イラストレーターに離途のイラスト制作を依頼することや、調声依頼をすること）",
      "音声波形を離途以外のキャラクターにイメージCVのような形で使用すること。",
      "キャラクター、音声波形を利用し、性行為・性器を露出する表現のない軽度なアダルト的表現、軽度な暴力・グロテスク表現のコンテンツを作成し、それを不特定多数が閲覧できる場所で公開すること。",
    ],
  },
  {
    title: "免責事項",
    items: [
      "このサイトにて公開された音源やイラストを使用したことによるトラブル・損害等について著作者は一切の責任を負いません",
      "このサイトにて公開された音源やイラストを使用する際は、このページに記載されている利用規約に同意したものとみなします。",
      "この利用規約は予告なく変更されることがあります。",
      "利用規約の変更による効力は、最終改定日以降に発表される作品のみに適用されることとします。",
    ],
  },
  {
    title: "お問い合わせ",
    items: [
      "著作者 : LitMus",
      "ご連絡はContactフォームもしくはTwitterDMにて受け付けております",
    ],
  },
];

const RulesTitle = styled(TitleWithLine)`
  margin-top: 3rem;
`;

export default function LitRulesSection() {
  return (
    <Section id="rules">
      <SideDecoration svgPath="/010_PageSideTitleSvg/RULES.svg" />

      <Container>
        <SectionTitle isPurple>RULES</SectionTitle>
        {RULES.map((rule) => (
          <div key={rule.title}>
            <RulesTitle title={rule.title} />
            <ul>
              {rule.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </Section>
  );
}
