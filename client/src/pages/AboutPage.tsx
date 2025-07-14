import React from 'react';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div style={{ padding: '2rem', lineHeight: 1.8 }}>
        <h1>正規表現とは</h1>

        <p>
          正規表現は、文字列のパターンを指定して検索・置換を行うための表現方法です。
        </p>

        <h2>よく使う正規表現パターン</h2>
        <ul>
          <li><code>.</code>：任意の1文字</li>
          <li><code>*</code>：直前の文字の0回以上の繰り返し</li>
          <li><code>+</code>：直前の文字の1回以上の繰り返し</li>
          <li><code>?</code>：直前の文字の0回または1回の繰り返し</li>
          <li><code>\d</code>：数字（0〜9）</li>
          <li><code>\w</code>：英数字またはアンダースコア</li>
          <li><code>[abc]</code>：aまたはbまたはc</li>
          <li><code>[^abc]</code>：a/b/c以外の任意の1文字</li>
          <li><code>&#123;n,m&#125;</code>：n回以上m回以下の繰り返し</li>
          <li><code>^</code>：行頭</li>
          <li><code>$</code>：行末</li>
          <li><code>()</code>：グループ化</li>
        </ul>
      </div>
    </>
  );
};

export default AboutPage;
