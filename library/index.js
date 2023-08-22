console.log("loading..");

async function measurePerformance() {
  const navigationEntries = performance.getEntriesByType("navigation");

  if (navigationEntries.length > 0) {
    const navigationEntry = navigationEntries[0];

    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcpEntry = entries[entries.length - 1];
      const lcp = lcpEntry.startTime;
      const fcpEntry = navigationEntry.loadEventStart - navigationEntry.navigationStart;
      const dnsTime = navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart;
      const connectionTime = navigationEntry.connectEnd - navigationEntry.connectStart;
      const responseTime = navigationEntry.responseEnd - navigationEntry.requestStart;
      const domContentLoadedEventTime = navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart
      const loadEventTime = navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
      const paintEntries = performance.getEntriesByType("paint");
      const resourceEntries = performance.getEntriesByType("resource");
      const resourceTimingEntries = performance.getEntriesByType("resource");
    const resources = resourceTimingEntries.map((entry) => {
      return {
        name: entry.name,
        type: entry.initiatorType,
        duration: entry.duration,
        size: entry.transferSize,
        startTime: entry.startTime,
        redirectTime: entry.redirectEnd - entry.redirectStart,
        dnsTime: entry.domainLookupEnd - entry.domainLookupStart,
        connectTime: entry.connectEnd - entry.connectStart,
        sslTime: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
        responseTime: entry.responseEnd - entry.requestStart,
      };
    });
      const longTaskEntries = performance.getEntriesByType("longtask");
      const longTasks = longTaskEntries.map((entry) => {
        return {
          startTime: entry.startTime,
          duration: entry.duration,
        };
      });

      const eventEntries = performance.getEntriesByType("event");
      const events = eventEntries.map((entry) => {
        return {
          name: entry.name,
          startTime: entry.startTime,
          duration: entry.duration,
        };
      });

      const elementTimingEntries = performance.getEntriesByType("element");
      const elementTimings = elementTimingEntries.map((entry) => {
        return {
          identifier: entry.identifier,
          startTime: entry.startTime,
          duration: entry.duration,
          loadTime: entry.loadTime,
          renderTime: entry.renderTime,
        };
      });
      const navigationType = navigationEntry.type;
      const redirectCount = navigationEntry.redirectCount;
      const navigationStartTime = navigationEntry.startTime;
      const navigationEndTime = navigationEntry.responseEnd;
      const url = window.location.href;
      const timestamp = new Date();
      const performanceData = {
        lcp: lcp,
        dnsTime: dnsTime,
        connectionTime: connectionTime,
       
        responseTime: responseTime,
        
        domContentLoadedEventTime: domContentLoadedEventTime,
        paintEntries:paintEntries,
        loadEventTime: loadEventTime,
        resources: resources,
        navigationType: navigationType,
        redirectCount: redirectCount,
        navigationStartTime: navigationStartTime,
        navigationEndTime: navigationEndTime,
        url: url,
        timestamp: timestamp,
      };

      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      performanceData.ttfb = ttfb;
      performance.mark("startCodeExecution");



// Mark an ending point
performance.mark("endCodeExecution");

// Measure the time between marks
performance.measure("codeExecutionTime", "startCodeExecution", "endCodeExecution");

// Get the measured time
const codeExecutionTime = performance.getEntriesByName("codeExecutionTime")[0].duration;
performanceData.codeExecutionTime = codeExecutionTime;

      console.log("veriler:", performanceData);
      // console.log("veriler2:", JSON.stringify(performanceData, null, 2));

      sendPerformanceData(performanceData);

      console.log("Tüm ölçümler tamamlandı.");
    });

    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } else {
    console.log("Navigation timing information not available.");
  }
}


async function sendPerformanceData(data) {
  const response = await fetch("http://localhost:3000/save-performance-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("Veri başarıyla gönderildi.");
  } else {
    console.error("Veri gönderimi başarısız oldu.");
  }
}




measurePerformance();
