// ============================================================
// MOCK DATA — Replace with real API calls in production
// ============================================================

export const TRADING_COUNTRIES = [
  {
    id: "usa",
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    lat: 37.09,
    lng: -95.71,
    tradeRank: 1,
    imports: "$680B",
    exports: "$220B",
    topCommodity: "Electronics & Machinery",
    fact: "The US is India's largest export destination, accounting for over 18% of total exports.",
    aiInsight: "Strengthening USD creates favorable conditions for Indian IT and pharma exporters targeting the US market.",
    color: "#3b82f6",
  },
  {
    id: "germany",
    name: "Germany",
    code: "DE",
    flag: "🇩🇪",
    lat: 51.16,
    lng: 10.45,
    tradeRank: 3,
    imports: "$142B",
    exports: "$98B",
    topCommodity: "Automotive & Chemicals",
    fact: "Germany is India's largest European trading partner with bilateral trade exceeding $30B annually.",
    aiInsight: "The EU-India Free Trade Agreement negotiations could unlock significant growth in German-Indian trade corridors.",
    color: "#8b5cf6",
  },
  {
    id: "japan",
    name: "Japan",
    code: "JP",
    flag: "🇯🇵",
    lat: 36.2,
    lng: 138.25,
    tradeRank: 4,
    imports: "$95B",
    exports: "$62B",
    topCommodity: "Electronics & Steel",
    fact: "The India-Japan CEPA has boosted bilateral trade by 45% since its implementation.",
    aiInsight: "Japan's semiconductor supply chain realignment presents new partnership opportunities for Indian tech manufacturers.",
    color: "#06b6d4",
  },
  {
    id: "china",
    name: "China",
    code: "CN",
    flag: "🇨🇳",
    lat: 35.86,
    lng: 104.19,
    tradeRank: 2,
    imports: "$418B",
    exports: "$118B",
    topCommodity: "Electronics & Pharma APIs",
    fact: "China remains India's largest import source despite geopolitical tensions, primarily for electronics and APIs.",
    aiInsight: "Diversification away from Chinese imports in electronics is driving growth for Indian component manufacturers.",
    color: "#ef4444",
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    lat: 23.42,
    lng: 53.84,
    tradeRank: 5,
    imports: "$88B",
    exports: "$52B",
    topCommodity: "Petroleum & Gold",
    fact: "The India-UAE CEPA, effective Feb 2022, is India's fastest-ever negotiated trade agreement.",
    aiInsight: "UAE's position as a re-export hub makes it a strategic gateway for Indian goods entering African and GCC markets.",
    color: "#f59e0b",
  },
  {
    id: "australia",
    name: "Australia",
    code: "AU",
    flag: "🇦🇺",
    lat: -25.27,
    lng: 133.77,
    tradeRank: 7,
    imports: "$42B",
    exports: "$28B",
    topCommodity: "Coal & LNG",
    fact: "The India-Australia ECTA opened 98.3% of Australian goods for Indian exporters duty-free.",
    aiInsight: "Critical minerals partnerships with Australia could position India as a global battery supply chain hub.",
    color: "#10b981",
  },
];

export const INDIA = {
  name: "India",
  code: "IN",
  flag: "🇮🇳",
  lat: 20.59,
  lng: 78.96,
};

export const ANALYTICS_DATA = {
  totalExports: { value: "$776B", change: "+8.2%", trend: "up" },
  totalImports: { value: "$898B", change: "+6.1%", trend: "up" },
  tradeVolume: { value: "$1.67T", change: "+7.3%", trend: "up" },
  topPartners: { value: "186", change: "+3", trend: "up" },
  countriesCovered: { value: "195", change: "0", trend: "neutral" },
};

export const TRADE_GROWTH_DATA = [
  { month: "Jan", exports: 58, imports: 68 },
  { month: "Feb", exports: 62, imports: 72 },
  { month: "Mar", exports: 65, imports: 75 },
  { month: "Apr", exports: 60, imports: 70 },
  { month: "May", exports: 70, imports: 80 },
  { month: "Jun", exports: 75, imports: 85 },
  { month: "Jul", exports: 72, imports: 82 },
  { month: "Aug", exports: 78, imports: 88 },
  { month: "Sep", exports: 80, imports: 90 },
  { month: "Oct", exports: 82, imports: 92 },
  { month: "Nov", exports: 85, imports: 95 },
  { month: "Dec", exports: 88, imports: 98 },
];

export const COMMODITY_DATA = [
  { name: "Electronics", value: 28 },
  { name: "Petroleum", value: 22 },
  { name: "Textiles", value: 15 },
  { name: "Pharma", value: 12 },
  { name: "Automotive", value: 10 },
  { name: "Agriculture", value: 8 },
  { name: "Others", value: 5 },
];

export const COUNTRY_COMPARISON_DATA = [
  { country: "USA", exports: 88, imports: 42 },
  { country: "China", exports: 16, imports: 118 },
  { country: "UAE", exports: 32, imports: 28 },
  { country: "Germany", exports: 18, imports: 22 },
  { country: "Japan", exports: 12, imports: 18 },
  { country: "UK", exports: 14, imports: 10 },
];

export const CURRENCIES = [
  { pair: "USD/INR", rate: "83.42", change: "+0.18", flag: "🇺🇸", trend: "up" },
  { pair: "EUR/INR", rate: "90.15", change: "-0.32", flag: "🇪🇺", trend: "down" },
  { pair: "GBP/INR", rate: "105.78", change: "+0.52", flag: "🇬🇧", trend: "up" },
  { pair: "JPY/INR", rate: "0.5512", change: "-0.012", flag: "🇯🇵", trend: "down" },
  { pair: "AED/INR", rate: "22.71", change: "+0.05", flag: "🇦🇪", trend: "up" },
  { pair: "CNY/INR", rate: "11.52", change: "-0.08", flag: "🇨🇳", trend: "down" },
];

export const NEWS_DATA = [
  {
    id: 1,
    headline: "India-UAE CEPA Drives Record $85B Bilateral Trade in FY2024",
    country: "UAE",
    flag: "🇦🇪",
    category: "Trade Agreement",
    time: "2 hours ago",
    summary: "Bilateral trade between India and UAE reached an all-time high following CEPA implementation.",
  },
  {
    id: 2,
    headline: "India Surpasses China as Fastest Growing Major Export Economy",
    country: "India",
    flag: "🇮🇳",
    category: "Export Growth",
    time: "4 hours ago",
    summary: "India's export growth rate of 12.4% outpaces China for the second consecutive quarter.",
  },
  {
    id: 3,
    headline: "US Fed Rate Decision Impacts Emerging Market Currencies",
    country: "USA",
    flag: "🇺🇸",
    category: "Currency",
    time: "6 hours ago",
    summary: "Federal Reserve's stance on interest rates creates volatility in USD/INR pair.",
  },
  {
    id: 4,
    headline: "India-Australia Critical Minerals Deal Signed Worth $6B",
    country: "Australia",
    flag: "🇦🇺",
    category: "Trade Deal",
    time: "8 hours ago",
    summary: "The strategic minerals partnership will supply lithium and cobalt for India's EV industry.",
  },
  {
    id: 5,
    headline: "Indian Textile Exports to Germany Surge 34% Post-EU Tariff Cuts",
    country: "Germany",
    flag: "🇩🇪",
    category: "Textile",
    time: "12 hours ago",
    summary: "GSP+ status restoration has significantly boosted Indian textile competitiveness in EU markets.",
  },
  {
    id: 6,
    headline: "Japan-India Tech Partnership Targets $50B in Semiconductor Trade",
    country: "Japan",
    flag: "🇯🇵",
    category: "Technology",
    time: "1 day ago",
    summary: "Both nations commit to chip manufacturing collaboration under the bilateral CEPA framework.",
  },
];

export const TRADE_AGREEMENTS = [
  { name: "India-UAE CEPA", countries: "UAE", type: "CEPA", status: "Active", year: 2022, coverage: "99% goods" },
  { name: "India-Australia ECTA", countries: "Australia", type: "ECTA", status: "Active", year: 2022, coverage: "98.3% goods" },
  { name: "India-Japan CEPA", countries: "Japan", type: "CEPA", status: "Active", year: 2011, coverage: "90% goods" },
  { name: "India-ASEAN FTA", countries: "10 ASEAN Nations", type: "FTA", status: "Active", year: 2010, coverage: "80% goods" },
  { name: "India-South Korea CEPA", countries: "South Korea", type: "CEPA", status: "Active", year: 2010, coverage: "85% goods" },
  { name: "India-EU FTA", countries: "EU (27 nations)", type: "FTA", status: "Negotiating", year: null, coverage: "TBD" },
  { name: "India-UK FTA", countries: "United Kingdom", type: "FTA", status: "Negotiating", year: null, coverage: "TBD" },
  { name: "India-Canada FTA", countries: "Canada", type: "FTA", status: "Paused", year: null, coverage: "TBD" },
];

export const AI_QUICK_QUESTIONS = [
  "Which country imports the most rice from India?",
  "Explain the India-UAE trade agreement.",
  "What are India's top exports to Germany?",
  "Which countries have Free Trade Agreements with India?",
  "How will a stronger US Dollar affect Indian exports?",
  "What is today's USD to INR exchange rate?",
  "Compare India and Vietnam exports.",
  "Explain HS Code 1006.",
];

export const AI_MOCK_RESPONSES = {
  default: `**Great question!** Based on current trade intelligence data:

- India's trade relationships span **195+ countries** worldwide
- Total bilateral trade volume exceeded **$1.67 trillion** in FY2024
- Key sectors driving growth include **IT services**, **pharmaceuticals**, and **textiles**

> *This is a demo response. Connect the AI backend to get real-time intelligence.*

**Suggested next steps:**
1. Explore the Trade Dashboard for detailed analytics
2. Check the Trade Agreements section for treaty details
3. Use the Countries page for bilateral trade data`,

  rice: `**India's Rice Export Intelligence** 🌾

Top importers of Indian rice (FY2024):

| Country | Volume | Value |
|---------|--------|-------|
| Bangladesh | 4.2M MT | $2.1B |
| China | 1.8M MT | $0.9B |
| UAE | 1.2M MT | $0.6B |
| Saudi Arabia | 0.9M MT | $0.45B |

**AI Insight:** The recent export restriction on non-basmati white rice has shifted demand patterns significantly. Bangladesh has emerged as the single largest buyer of Indian basmati varieties.`,
};
