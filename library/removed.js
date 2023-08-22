const serverTimingEntries = performance.getEntriesByType("server");
      const serverTiming = serverTimingEntries.map((entry) => {
        return {
          name: entry.name,
          duration: entry.duration,
        };
      });


      // Uzun görev (long task) izlemek için PerformanceObserver kullanımı
const longTaskObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`Long Task: Start Time: ${entry.startTime}, Duration: ${entry.duration} ms`);
    });
  });
  
  longTaskObserver.observe({ type: "longtask", buffered: true });

  
// Olay (event) izlemek için PerformanceObserver kullanımı
const eventObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`Event: Name: ${entry.name}, Start Time: ${entry.startTime}, Duration: ${entry.duration} ms`);
    });
  });
  
  eventObserver.observe({ type: "event", buffered: true });
  
  // FID measurement
  const fidObserver = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const fidDelay = entry.processingStart - entry.startTime;
      performanceData.fid = fidDelay;
      console.log('FID:', fidDelay);
      performanceData.fid = fidDelay;
    }
  });
  fidObserver.observe({ type: "first-input", buffered: true });
  

// Eleman zamanlaması (element timing) izlemek için PerformanceObserver kullanımı
const elementTimingObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`Element Timing: Identifier: ${entry.identifier}, Start Time: ${entry.startTime}, Duration: ${entry.duration} ms, Load Time: ${entry.loadTime} ms, Render Time: ${entry.renderTime} ms`);
    });
  });
  
  elementTimingObserver.observe({ type: "element", buffered: true });

  const domCompleteTime = navigationEntry.domComplete - navigationEntry.domLoading;
  const domInteractiveTime = navigationEntry.domInteractive - navigationEntry.domLoading;
  const secureConnectionTime =
        navigationEntry.secureConnectionStart > 0 ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart : "N/A";

        // Kaynak (resource) kullanımını izlemek için PerformanceObserver kullanımı
const resourceObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`Resource: ${entry.name}, Type: ${entry.initiatorType}, Duration: ${entry.duration} ms, Size: ${entry.transferSize} bytes`);
    });
  });
  
  resourceObserver.observe({ type: "resource", buffered: true });
  