import { useEffect, useMemo, useState } from 'react';
import { SunburstChart, type SunburstData, Tooltip } from 'recharts';

type BundleVisualizationStage = {
  readonly stage: 'es6-folder' | 'tree-shaken' | 'minified' | 'minified+gzip';
  readonly bytes: number;
  readonly humanReadableSize: string;
  readonly reductionFromBaselinePercent: number;
};

type BundleVisualizationNode = {
  readonly name: string;
  readonly fullPath: string;
  readonly value: number;
  readonly children?: ReadonlyArray<BundleVisualizationNode>;
};

type BundleVisualizationEntry = {
  readonly examplePath: string;
  readonly totalSize: number;
  readonly totalSizeLabel: string;
  readonly moduleCount: number;
  readonly generatedAt: string;
  readonly stages: ReadonlyArray<BundleVisualizationStage>;
  readonly tree: BundleVisualizationNode;
};

type BundleVisualizationData = {
  readonly sunburst: BundleVisualizationEntry;
};

type SunburstDisplayNode = {
  readonly name: string;
  readonly fullPath: string;
  readonly value: number;
  readonly fill: string;
  readonly children?: ReadonlyArray<SunburstDisplayNode>;
};


type BuildNode = {
  name: string;
  fullPath: string;
  value: number;
  children: Map<string, BuildNode>;
};

const generatedBundleVisualizationAssetPath = 'generated/bundleSizeData.generated.json';

const containerStyle = {
  width: '100%',
  maxWidth: '720px',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '1rem',
};



// #region Generated bundle data fallback
const fallbackTree = {
  name: 'bundle',
  fullPath: 'bundle',
  value: 9728,
  children: [
    {
      name: 'node_modules',
      fullPath: 'node_modules',
      value: 4096,
      children: [
        {
          name: 'react-redux',
          fullPath: 'node_modules/react-redux',
          value: 2304,
          children: [{ name: 'es', fullPath: 'node_modules/react-redux/es', value: 2304 }],
        },
        {
          name: 'victory-vendor',
          fullPath: 'node_modules/victory-vendor',
          value: 1792,
          children: [{ name: 'es', fullPath: 'node_modules/victory-vendor/es', value: 1792 }],
        },
      ],
    },
    {
      name: 'src',
      fullPath: 'src',
      value: 4608,
      children: [
        {
          name: 'chart',
          fullPath: 'src/chart',
          value: 2816,
          children: [
            { name: 'Treemap.tsx', fullPath: 'src/chart/Treemap.tsx', value: 1536 },
            { name: 'SunburstChart.tsx', fullPath: 'src/chart/SunburstChart.tsx', value: 1280 },
          ],
        },
        {
          name: 'component',
          fullPath: 'src/component',
          value: 1152,
          children: [{ name: 'Tooltip.tsx', fullPath: 'src/component/Tooltip.tsx', value: 1152 }],
        },
        {
          name: 'util',
          fullPath: 'src/util',
          value: 640,
          children: [{ name: 'ChartUtils.ts', fullPath: 'src/util/ChartUtils.ts', value: 640 }],
        },
      ],
    },
    {
      name: 'entry',
      fullPath: 'entry',
      value: 1024,
      children: [
        {
          name: 'www',
          fullPath: 'entry/www',
          value: 1024,
          children: [
            {
              name: 'src',
              fullPath: 'entry/www/src',
              value: 1024,
              children: [{ name: 'docs', fullPath: 'entry/www/src/docs', value: 1024 }],
            },
          ],
        },
      ],
    },
  ],
} as const;

const fallbackStages = [
  {
    stage: 'es6-folder',
    bytes: 65536,
    humanReadableSize: '64.00 KB',
    reductionFromBaselinePercent: 0,
  },
  {
    stage: 'tree-shaken',
    bytes: 9728,
    humanReadableSize: '9.50 KB',
    reductionFromBaselinePercent: 0,
  },
  {
    stage: 'minified',
    bytes: 6144,
    humanReadableSize: '6.00 KB',
    reductionFromBaselinePercent: 36.84,
  },
  {
    stage: 'minified+gzip',
    bytes: 3072,
    humanReadableSize: '3.00 KB',
    reductionFromBaselinePercent: 68.42,
  },
] as const satisfies ReadonlyArray<BundleVisualizationStage>;

const fallbackEntry: BundleVisualizationEntry = {
  examplePath: 'www/src/views/IndexView/IndexLineChart.tsx',
  totalSize: fallbackTree.value,
  totalSizeLabel: '9.50 KB',
  moduleCount: 7,
  generatedAt: 'placeholder',
  stages: fallbackStages,
  tree: fallbackTree,
};
// #endregion

type BundleVisualizationLoadState = {
  readonly entry: BundleVisualizationEntry;
};

type BundleSizeSunburstProps = {
  readonly forceFallbackData?: boolean;
};

let bundleVisualizationEntryPromise: Promise<BundleVisualizationEntry | null> | undefined;

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.max(minimum, Math.min(maximum, value));
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return Math.abs(hash);
}

function createBuildNode(name: string, fullPath: string): BuildNode {
  return {
    name,
    fullPath,
    value: 0,
    children: new Map<string, BuildNode>(),
  };
}

function getWebsiteBaseUrl(): string {
  if (typeof document === 'undefined') {
    return '/';
  }

  const moduleScript = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
  if (moduleScript?.src != null) {
    const scriptUrl = new URL(moduleScript.src, window.location.href);

    for (const marker of ['/src/', '/assets/']) {
      const markerIndex = scriptUrl.pathname.indexOf(marker);
      if (markerIndex >= 0) {
        scriptUrl.pathname = scriptUrl.pathname.slice(0, markerIndex + 1);
        scriptUrl.search = '';
        scriptUrl.hash = '';
        return scriptUrl.toString();
      }
    }
  }

  return new URL('/', window.location.href).toString();
}

function loadGeneratedBundleVisualizationEntry(): Promise<BundleVisualizationEntry | null> {
  if (bundleVisualizationEntryPromise != null) {
    return bundleVisualizationEntryPromise;
  }

  bundleVisualizationEntryPromise = fetch(new URL(generatedBundleVisualizationAssetPath, getWebsiteBaseUrl()))
    .then(response => (response.ok ? response.json() : null))
    .then((bundleVisualizationData: BundleVisualizationData | null) => bundleVisualizationData?.sunburst ?? null)
    .catch(() => null);

  return bundleVisualizationEntryPromise;
}

function useBundleVisualizationEntry(forceFallbackData: boolean = false): BundleVisualizationLoadState {
  const [loadState, setLoadState] = useState<BundleVisualizationLoadState>({
    entry: fallbackEntry,
  });

  useEffect(() => {
    if (forceFallbackData) {
      setLoadState({
        entry: fallbackEntry,
      });
      return undefined;
    }

    let isMounted = true;

    loadGeneratedBundleVisualizationEntry().then(entry => {
      if (entry == null || !isMounted) {
        return;
      }

      setLoadState({
        entry,
      });
    });

    return () => {
      isMounted = false;
    };
  }, [forceFallbackData]);

  return loadState;
}

function collectLeafNodes(node: BundleVisualizationNode): Array<BundleVisualizationNode> {
  if (node.children == null || node.children.length === 0) {
    return [node];
  }

  return node.children.flatMap(collectLeafNodes);
}

function getPackageName(pathSegments: ReadonlyArray<string>): { packageName: string; packageSegmentCount: number } {
  if (pathSegments[1]?.startsWith('@') && pathSegments[2] != null) {
    return {
      packageName: `${pathSegments[1]}/${pathSegments[2]}`,
      packageSegmentCount: 2,
    };
  }

  return {
    packageName: pathSegments[1] ?? 'unknown-package',
    packageSegmentCount: 1,
  };
}

function inferLibraryFamily(packageName: string): string {
  if (packageName.startsWith('d3-')) {
    return 'd3';
  }

  if (packageName === '@reduxjs/toolkit' || packageName === 'react-redux' || packageName === 'redux') {
    return 'redux';
  }

  if (packageName === 'react' || packageName === 'react-dom' || packageName === 'scheduler') {
    return 'react';
  }

  if (packageName === 'use-sync-external-store') {
    return 'react';
  }

  return packageName;
}

function getDisplayPathSegments(fullPath: string): Array<string> {
  const pathSegments = fullPath.split('/');

  if (pathSegments[0] === 'src') {
    return ['recharts', ...pathSegments.slice(1)];
  }

  if (pathSegments[0] === 'entry') {
    return ['example', ...pathSegments.slice(1)];
  }

  if (pathSegments[0] === 'node_modules') {
    const { packageName, packageSegmentCount } = getPackageName(pathSegments);
    const libraryFamily = inferLibraryFamily(packageName);
    const pathInsidePackage = pathSegments.slice(1 + packageSegmentCount);

    if (libraryFamily === packageName) {
      return [libraryFamily, ...pathInsidePackage];
    }

    return [libraryFamily, packageName, ...pathInsidePackage];
  }

  return pathSegments;
}

function insertLeaf(root: BuildNode, pathSegments: ReadonlyArray<string>, value: number): void {
  // eslint-disable-next-line no-param-reassign
  root.value += value;

  let currentNode = root;
  const accumulatedPath: Array<string> = [];

  pathSegments.forEach(segment => {
    accumulatedPath.push(segment);

    const existingChild = currentNode.children.get(segment);
    const nextNode = existingChild ?? createBuildNode(segment, accumulatedPath.join('/'));
    nextNode.value += value;

    currentNode.children.set(segment, nextNode);
    currentNode = nextNode;
  });
}

function getLibraryChartIndex(libraryFamily: string): number {
  if (libraryFamily === 'recharts') return 1;
  if (libraryFamily === 'd3') return 2;
  if (libraryFamily === 'redux') return 3;
  if (libraryFamily === 'react') return 4;
  if (libraryFamily === 'example') return 5;
  return (hashString(libraryFamily) % 5) + 1;
}

function getNodeFill(
  libraryFamily: string,
  fullPath: string,
  depth: number,
  _siblingIndex: number,
  _siblingCount: number,
): string {
  const chartIndex = getLibraryChartIndex(libraryFamily);

  if (depth === 0) {
    return `var(--chart-${chartIndex})`;
  }

  const mixPercentage = clamp(depth * 15 + (hashString(fullPath) % 10), 0, 80);
  return `color-mix(in oklch, var(--chart-${chartIndex}), white ${mixPercentage}%)`;
}

function finalizeDisplayNode(
  node: BuildNode,
  libraryFamily: string,
  depth: number,
  siblingIndex: number,
  siblingCount: number,
): SunburstDisplayNode {
  const sortedChildren = Array.from(node.children.values()).sort((left, right) => right.value - left.value);

  return {
    name: node.name,
    fullPath: node.fullPath,
    value: node.value,
    fill: getNodeFill(libraryFamily, node.fullPath, depth, siblingIndex, siblingCount),
    children:
      sortedChildren.length > 0
        ? sortedChildren.map((child, index) =>
          finalizeDisplayNode(child, libraryFamily, depth + 1, index, sortedChildren.length),
        )
        : undefined,
  };
}

function buildSunburstDisplayData(tree: BundleVisualizationNode): SunburstDisplayNode {
  const displayRoot = createBuildNode('bundle', 'bundle');

  collectLeafNodes(tree).forEach(leafNode => {
    insertLeaf(displayRoot, getDisplayPathSegments(leafNode.fullPath), leafNode.value);
  });

  const topLevelLibraries = Array.from(displayRoot.children.values()).sort((left, right) => right.value - left.value);

  return {
    name: 'bundle',
    fullPath: 'bundle',
    value: tree.value,
    fill: 'color-mix(in oklch, var(--chart-1), white 90%)',
    children: topLevelLibraries.map((libraryNode, index) =>
      finalizeDisplayNode(libraryNode, libraryNode.name, 0, index, topLevelLibraries.length),
    ),
  };
}

function toSunburstData(node: SunburstDisplayNode): SunburstData {
  return {
    name: node.name,
    value: node.value,
    fill: node.fill,
    children: node.children?.map(child => toSunburstData(child)),
  };
}

function getHumanReadableSize(sizeInBytesVal: unknown): string {
  if (sizeInBytesVal == null) {
    return '';
  }
  const sizeInBytes = Number(sizeInBytesVal);
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  const units = ['KB', 'MB', 'GB', 'TB'];
  let value = sizeInBytes;
  let unitIndex = -1;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
}

function BundleSizeSunburst({ forceFallbackData = false }: BundleSizeSunburstProps) {
  const { entry: bundleVisualizationEntry } = useBundleVisualizationEntry(forceFallbackData);

  const sunburstData = useMemo(
    () => toSunburstData(buildSunburstDisplayData(bundleVisualizationEntry.tree)),
    [bundleVisualizationEntry.tree],
  );

  return (
    <div style={containerStyle}>

      <SunburstChart
        style={{ width: '100%', maxWidth: '720px', height: 420 }}
        responsive
        data={sunburstData}
        innerRadius={65}
        outerRadius={190}
        textOptions={{ fill: 'none' }}
        stroke="var(--color-surface-base)"
      >
        <Tooltip formatter={getHumanReadableSize} />
      </SunburstChart>
    </div>
  );
}

export default BundleSizeSunburst;
