import styled from "styled-components";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";

const RulesContent = styled.div`
  margin-top: 3rem;
`;

const RulesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RuleItem = styled.li`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  padding-left: 30px;
  position: relative;

  &::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding-left: 25px;
  }
`;

const TitleWithLineContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

const RulesTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  padding-right: 1rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TitleLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
`;

export default function LitRulesSection() {
  return (
    <Section id="rules">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/RULES.svg" alt="RULES" />
      </SideDecoration>

      <Container>
        <SectionTitle>RULES</SectionTitle>
        <RulesContent>
          <TitleWithLineContainer>
            <RulesTitle>禁止事項</RulesTitle>
            <TitleLine />
          </TitleWithLineContainer>
          <RulesList>
            <RuleItem>音源の二次配布</RuleItem>
            <RuleItem>許諾事項に記載のない形での利用</RuleItem>
            <RuleItem>
              AI学習に類すること（離途のAIファンアートや音声等を作成することを含む）
            </RuleItem>
            <RuleItem>
              公式からの発信と誤認識されかねない言動（なりきりアカウント等含む）
            </RuleItem>
            <RuleItem>政治的表現、宗教的表現</RuleItem>
            <RuleItem>
              SNS等の公共の場での投稿で、性行為・性器を露出するなど過激なアダルト的表現
            </RuleItem>
          </RulesList>
          <TitleWithLineContainer>
            <RulesTitle>許諾事項</RulesTitle>
            <TitleLine />
          </TitleWithLineContainer>
          <RulesList>
            <RuleItem>二次創作</RuleItem>
            <RuleItem>コスプレ</RuleItem>
            <RuleItem>グッズ作成・頒布</RuleItem>
            <RuleItem>
              商用利用（CD頒布やYoutube、ニコニコ動画など収益を得ることができるサブスクリプション等含む）
            </RuleItem>
            <RuleItem>
              著作者が関わっていない場面での個人間による金銭の発生する依頼（イラストレーターに離途のイラスト制作を依頼することや、調声依頼をすること）
            </RuleItem>
            <RuleItem>他キャラクターへのイメージCVのような形での使用</RuleItem>
            <RuleItem>
              性行為・性器を露出する表現のない軽度なアダルト的表現、軽度な暴力・グロテスク表現（ゾーニングを必ず行うこと。ｺｯｿﾘやってね）
            </RuleItem>
          </RulesList>
        </RulesContent>
      </Container>
    </Section>
  );
}
