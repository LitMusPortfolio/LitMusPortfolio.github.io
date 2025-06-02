# StyledButton コンポーネント

アプリケーション全体で使える汎用的なボタンコンポーネントです。タブ、フィルター、アクションボタンなど、様々な用途に対応できます。

## 基本的な使い方

```tsx
import { StyledButton } from '@/components/common/StyledButton';

// 基本的な使用
<StyledButton $active={true}>アクティブなボタン</StyledButton>
<StyledButton $active={false}>非アクティブなボタン</StyledButton>

// 下線なし
<StyledButton $active={true} $underlineOnActive={false}>
  下線なしボタン
</StyledButton>
```

## バリエーション

### 下線なしバージョン
```tsx
import { ButtonNoUnderline } from '@/components/common/StyledButton';

<ButtonNoUnderline $active={true}>
  下線なし
</ButtonNoUnderline>
```

### プライマリボタン（塗りつぶし）
```tsx
import { ButtonVariants } from '@/components/common/StyledButton';

<ButtonVariants.Primary $active={true}>
  プライマリボタン
</ButtonVariants.Primary>
```

### ラウンドボタン
```tsx
<ButtonVariants.Rounded $active={false}>
  角丸ボタン
</ButtonVariants.Rounded>
```

### アイコン付きボタン
```tsx
<ButtonVariants.WithIcon $active={false}>
  <Icon />
  アイコン付き
</ButtonVariants.WithIcon>
```

### ゴーストボタン（枠線のみ）
```tsx
<ButtonVariants.Ghost $active={false}>
  ゴーストボタン
</ButtonVariants.Ghost>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `$active` | `boolean` | `false` | アクティブ状態かどうか |
| `$underlineOnActive` | `boolean` | `true` | アクティブ時に下線を表示するか |
| `disabled` | `boolean` | `false` | 無効状態かどうか |
| `children` | `ReactNode` | - | ボタンの内容 |

## 使用例

### タブグループ
```tsx
const [activeTab, setActiveTab] = useState('tab1');

<div style={{ display: 'flex', gap: '1rem' }}>
  <StyledButton 
    $active={activeTab === 'tab1'}
    onClick={() => setActiveTab('tab1')}
  >
    タブ1
  </StyledButton>
  <StyledButton 
    $active={activeTab === 'tab2'}
    onClick={() => setActiveTab('tab2')}
  >
    タブ2
  </StyledButton>
  <StyledButton 
    $active={activeTab === 'tab3'}
    onClick={() => setActiveTab('tab3')}
  >
    タブ3
  </StyledButton>
</div>
```

### フィルターボタン
```tsx
const [filters, setFilters] = useState<string[]>([]);

<ButtonVariants.Primary
  $active={filters.includes('category1')}
  onClick={() => toggleFilter('category1')}
>
  カテゴリー1
</ButtonVariants.Primary>
```

### ナビゲーションボタン
```tsx
<ButtonVariants.Ghost onClick={() => navigate('/next')}>
  次へ進む →
</ButtonVariants.Ghost>
```

### アクションボタン
```tsx
<ButtonVariants.Rounded onClick={handleSave}>
  保存する
</ButtonVariants.Rounded>
```