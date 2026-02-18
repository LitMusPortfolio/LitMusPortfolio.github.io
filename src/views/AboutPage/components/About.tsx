import Image from "next/image";
import { BackgroundSection } from "@/components/BackgroundSection";
import { Container, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import TitleWithLine from "@/components/TitleWithLine";

export default function About() {
  return (
    <BackgroundSection backgroundImage="/LitMusBG.webp" className="min-h-0">
      <SideDecoration svgPath="/010_PageSideTitleSvg/ABOUT.svg" />
      <Container>
        <SectionTitle>ABOUT</SectionTitle>

        <div className="grid grid-cols-[6fr_7fr] items-center gap-16 max-sm:grid-cols-1 max-sm:gap-12">
          <div>
            <Image
              src="/002_about/LitMusIcon.webp"
              alt="LitMus"
              width={400}
              height={400}
              priority
              className="block h-auto w-4/5"
            />
          </div>

          <div>
            <TitleWithLine title="LitMus" />
            <h3 className="mb-4">
              音楽 / イラスト / デザイン
              <br />
              動画 / ディレクション / 合成音声用ライブラリ提供
            </h3>

            <div className="flex flex-col gap-2">
              <p>2000年9月9日生まれ。</p>
              <p>
                2022年よりボーカロイドのMVイラストを担当。
                <br />
                イラストを描く傍ら、動画制作にも興味を持ち制作を始める。
                <br />
                また、2024年4月より音楽制作を開始する。
              </p>
              <p>
                ジャンルに囚われず様々な分野の制作に挑戦するのが好き。
                <br />
                メインの活動を定義せず、音楽もイラストも動画も同じ熱量で活動している。
              </p>
              <p>
                合成音声に深く興味を持ち、オープンソースであるOpenUtauの開発に携わったり、合成音声ライブラリ「離途」では自分が音声提供からイラスト、楽曲制作までマルチに制作を行う。
              </p>
              <p>好きな食べ物は回鍋肉。</p>
            </div>
          </div>
        </div>
      </Container>
    </BackgroundSection>
  );
}
