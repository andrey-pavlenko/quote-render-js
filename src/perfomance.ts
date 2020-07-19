function getMs(fn: () => unknown): number {
  const start = new Date().getTime();
  fn();
  const end = new Date().getTime();
  return end - start;
}

function getDuration(
  durations: number[]
): { total: number; min: number; max: number } {
  const total = durations.reduce((a, b) => a + b);
  const min = durations.reduce((a, b) => Math.min(a, b));
  const max = durations.reduce((a, b) => Math.max(a, b));
  return { total, min, max };
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

export { getMs, getDuration, memoryUsage };
