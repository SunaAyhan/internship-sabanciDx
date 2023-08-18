
console.log("loading..");



async function measurePerformance() {
  // LCP ölçümü
  const lcpPromise = new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
      resolve(lastEntry.startTime);
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  });

  // FCP (First Contentful Paint) ölçümü
  const fcpPromise = new Promise((resolve) => {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0];
      console.log("FCP:", firstEntry.startTime);
      resolve(firstEntry.startTime);
    });
    fcpObserver.observe({ entryTypes: ["paint"] });
  });

  // CLS (Cumulative Layout Shift) ölçümü
  let clsScore = 0;
  const clsPromise = new Promise((resolve) => {
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
        }
      });
      console.log("CLS:", clsScore);
      resolve(clsScore);
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
  });
  
  const url = window.location.href;

  // Ölçümlerin başlaması
  performance.mark("mark_start");

  // Bekleme işlemi
  const [lcpStartTime, fcpStartTime, clsScoreValue] = await Promise.all([lcpPromise, fcpPromise, clsPromise]);

  const performanceData = {
    lcp: lcpStartTime,
    fcp: fcpStartTime,
    cls: clsScoreValue,
    url: url,
    timestamp: new Date()
  };
  console.log("veriler: "+ performanceData)
  console.log("veriler2:", JSON.stringify(performanceData, null, 2));


  // Veriyi gönderme
  await sendPerformanceData(performanceData);

  console.log("Tüm ölçümler tamamlandı.");
}

async function sendPerformanceData(data) {
  const response = await fetch('http://localhost:3000/save-performance-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    console.log('Veri başarıyla gönderildi.');
  } else {
    console.error('Veri gönderimi başarısız oldu.');
  }
}

measurePerformance();