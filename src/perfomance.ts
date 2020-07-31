function getMs(fn: () => unknown): number {
  const start = new Date().getTime();
  fn();
  const end = new Date().getTime();
  return end - start;
}

function getDuration(durations: number[]): { [propName: string]: number } {
  durations = durations.sort();
  const total = durations.reduce((a, b) => a + b);
  const min = durations[0];
  const max = durations[durations.length - 1];
  const medianPos = Math.floor(durations.length / 2);
  const median = durations[medianPos];
  return { total, min, max, median };
}

function memoryUsage(): string {
  function format(val: number): string {
    val = ((val / 1024 / 1024) * 100) / 100;
    return val.toFixed(2) + ' Mb';
  }

  const keys: { [key: string]: string } = {
    rss:
      'Resident Set Size (amount of space occupied in the main memory device)',
    heapTotal: 'Heap total',
    heapUsed: 'Heap used',
    external: 'C++ objects bound to JavaScript objects',
    arrayBuffers: 'Allocated for ArrayBuffers and SharedArrayBuffers'
  };

  const formatted: string[] = [];

  Object.entries(process.memoryUsage()).forEach(([k, v]) => {
    formatted.push(keys[k] + ': ' + format(v));
  });

  return formatted.join('\n');
}

function durationToStr(duration: ReturnType<typeof getDuration>): string {
  return Object.keys(duration)
    .map(
      (key) =>
        `${key.charAt(0).toUpperCase()}${key.slice(1).toLowerCase()}: ${
          duration[key]
        }ms`
    )
    .join(' ');
}

export { getMs, getDuration, memoryUsage, durationToStr };
