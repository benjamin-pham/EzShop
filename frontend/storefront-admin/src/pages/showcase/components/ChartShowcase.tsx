import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  FunnelChart,
  Funnel,
  Treemap,
  LabelList
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import BundleSizeSunburst from "./charts/BundleSizeSunburst";

// Data
const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 45 },
  { month: "February", desktop: 305, mobile: 200, tablet: 55 },
  { month: "March", desktop: 237, mobile: 120, tablet: 75 },
  { month: "April", desktop: 73, mobile: 190, tablet: 35 },
  { month: "May", desktop: 209, mobile: 130, tablet: 65 },
  { month: "June", desktop: 214, mobile: 140, tablet: 85 },
];

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const pieDataLevel1 = [
  { name: "Group A", value: 400, fill: "var(--chart-1)" },
  { name: "Group B", value: 300, fill: "var(--chart-2)" },
  { name: "Group C", value: 300, fill: "var(--chart-3)" },
  { name: "Group D", value: 200, fill: "var(--chart-4)" }
];

const pieDataLevel2 = [
  { name: "A1", value: 100, fill: "var(--chart-1)" },
  { name: "A2", value: 300, fill: "var(--chart-1)" },
  { name: "B1", value: 100, fill: "var(--chart-2)" },
  { name: "B2", value: 80, fill: "var(--chart-2)" },
  { name: "B3", value: 40, fill: "var(--chart-2)" },
  { name: "B4", value: 30, fill: "var(--chart-2)" },
  { name: "B5", value: 50, fill: "var(--chart-2)" },
  { name: "C1", value: 100, fill: "var(--chart-3)" },
  { name: "C2", value: 200, fill: "var(--chart-3)" },
  { name: "D1", value: 150, fill: "var(--chart-4)" },
  { name: "D2", value: 50, fill: "var(--chart-4)" }
];

const radarData = [
  { subject: "Math", A: 120, B: 110, fullMark: 150 },
  { subject: "Chinese", A: 98, B: 130, fullMark: 150 },
  { subject: "English", A: 86, B: 130, fullMark: 150 },
  { subject: "Geography", A: 99, B: 100, fullMark: 150 },
  { subject: "Physics", A: 85, B: 90, fullMark: 150 },
  { subject: "History", A: 65, B: 85, fullMark: 150 },
];

const radialData = [
  { name: "18-24", uv: 31.47, fill: "var(--color-chrome)" },
  { name: "25-29", uv: 26.69, fill: "var(--color-safari)" },
  { name: "30-34", uv: 15.69, fill: "var(--color-firefox)" },
  { name: "35-39", uv: 8.22, fill: "var(--color-edge)" },
  { name: "40-49", uv: 8.63, fill: "var(--color-other)" },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

const funnelData = [
  { value: 100, name: 'Sent', fill: 'var(--chart-1)' },
  { value: 80, name: 'Viewed', fill: 'var(--chart-2)' },
  { value: 50, name: 'Clicked', fill: 'var(--chart-3)' },
  { value: 40, name: 'Add to Cart', fill: 'var(--chart-4)' },
  { value: 26, name: 'Purchased', fill: 'var(--chart-5)' }
];

const treemapData = [
  { name: 'axis', size: 24593 },
  { name: 'controls', size: 4125 },
  { name: 'data', size: 20544 },
  { name: 'events', size: 6134 }
];

// Configs
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
    icon: Monitor,
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
    icon: Smartphone,
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
    icon: Tablet,
  },
} satisfies ChartConfig;

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const radarConfig = {
  A: {
    label: "Student A",
    color: "var(--chart-1)",
  },
  B: {
    label: "Student B",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const radialConfig = {
  chrome: { label: "18-24", color: "var(--chart-1)" },
  safari: { label: "25-29", color: "var(--chart-2)" },
  firefox: { label: "30-34", color: "var(--chart-3)" },
  edge: { label: "35-39", color: "var(--chart-4)" },
  other: { label: "40-49", color: "var(--chart-5)" },
} satisfies ChartConfig;

export default function ChartShowcase() {
  return (
    <div className="space-y-10">

      {/* Composed Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Composed Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <ComposedChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area type="monotone" dataKey="tablet" fill="var(--color-tablet)" stroke="var(--color-tablet)" fillOpacity={0.2} />
              <Bar dataKey="desktop" barSize={20} fill="var(--color-desktop)" radius={4} />
              <Line type="monotone" dataKey="mobile" stroke="var(--color-mobile)" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ChartContainer>
        </div>
      </section>

      {/* Bar Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Bar Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </section>

      {/* Area Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Area Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
              />
              <Area
                type="monotone"
                dataKey="mobile"
                stroke="var(--color-mobile)"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </section>

      {/* Line Chart (Curved) */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Line Chart (Curved)</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="mobile"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      {/* Multiple X Axes */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Multiple X Axes</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                xAxisId="bottom"
                orientation="bottom"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <XAxis
                dataKey="month"
                xAxisId="top"
                orientation="top"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                xAxisId="bottom"
                type="monotone"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                xAxisId="top"
                type="monotone"
                dataKey="mobile"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      {/* Line Chart (Linear/Straight) */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Line Chart (Straight/Linear)</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="linear"
                dataKey="desktop"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="linear"
                dataKey="mobile"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </section>

      {/* Pie Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Pie Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={pieChartConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={pieChartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                outerRadius={80}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </section>

      {/* Two Level Pie Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Two Level Pie Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={pieChartConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={pieDataLevel1}
                dataKey="value"
                nameKey="name"
                outerRadius={50}
              />
              <Pie
                data={pieDataLevel2}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={80}
                label
              />
            </PieChart>
          </ChartContainer>
        </div>
      </section>

      {/* Radar Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Radar Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={radarConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Radar
                name="Student A"
                dataKey="A"
                stroke="var(--color-A)"
                fill="var(--color-A)"
                fillOpacity={0.6}
              />
              <Radar
                name="Student B"
                dataKey="B"
                stroke="var(--color-B)"
                fill="var(--color-B)"
                fillOpacity={0.6}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </RadarChart>
          </ChartContainer>
        </div>
      </section>

      {/* Radial Bar Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Radial Bar Chart (Half)</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={radialConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <RadialBarChart
              innerRadius="20%"
              outerRadius="90%"
              data={radialData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="uv"
              />
              <ChartLegend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} content={<ChartLegendContent />} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </section>

      {/* Radial Bar Chart (Full Circle) */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Radial Bar Chart (Full Circle)</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={radialConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <RadialBarChart
              innerRadius="10%"
              outerRadius="90%"
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                label={{ position: 'insideStart', fill: '#fff' }}
                background
                dataKey="uv"
              />
              <ChartLegend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ right: 0 }} content={<ChartLegendContent />} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </RadialBarChart>
          </ChartContainer>
        </div>
      </section>

      {/* Scatter Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Scatter Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={{ scatter: { label: "Data", color: "var(--chart-1)" } }} className="min-h-[300px] w-full">
            <ScatterChart>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="km" />
              <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent hideLabel />} />
              <Scatter name="A school" data={scatterData} fill="var(--chart-1)" />
            </ScatterChart>
          </ChartContainer>
        </div>
      </section>

      {/* Funnel Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Funnel Chart</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={pieChartConfig} className="min-h-[300px] w-full max-w-sm mx-auto">
            <FunnelChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Funnel
                dataKey="value"
                data={funnelData}
                isAnimationActive
              >
                <LabelList position="right" fill="#fff" stroke="none" dataKey="name" />
              </Funnel>
            </FunnelChart>
          </ChartContainer>
        </div>
      </section>

      {/* TreeMap */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Tree Map</h2>
        <div className="border rounded-lg p-6 bg-card">
          <ChartContainer config={{}} className="min-h-[300px] w-full">
            <Treemap
              data={treemapData}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="var(--chart-1)"
            >
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </Treemap>
          </ChartContainer>
        </div>
      </section>


      {/* Sunburst Chart */}
      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-4">Bundle Size Sunburst</h2>
        <div className="border rounded-lg p-6 bg-card flex justify-center">
          <BundleSizeSunburst forceFallbackData={true} />
        </div>
      </section>

    </div>
  );
}
