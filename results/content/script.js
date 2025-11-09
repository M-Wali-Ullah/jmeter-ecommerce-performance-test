// Load relative file results.jtl automatically
fetch('results.jtl')
    .then(response => response.text())
    .then(text => parseJTL(text))
    .catch(err => {
        console.error("Could not load results.jtl.", err);
        document.getElementById('summaryBox').innerHTML = "<p style='color:red;'>❌ Could not load results.jtl. Please place it in the same folder as this report.</p>";
    });

function parseJTL(csvText){
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((h,i)=> obj[h]=values[i]);
        return obj;
    });

    const summaryData = {};
    rows.forEach(r=>{
        const label = r.label;
        const elapsed = parseInt(r.elapsed);
        const success = r.success === 'true';
        if(!summaryData[label]) summaryData[label] = {count:0,totalTime:0,successCount:0, maxTime:0};
        summaryData[label].count +=1;
        summaryData[label].totalTime += elapsed;
        summaryData[label].maxTime = Math.max(summaryData[label].maxTime, elapsed);
        if(success) summaryData[label].successCount +=1;
    });

    const labels = Object.keys(summaryData);
    const requests = labels.map(l=>{
        const item = summaryData[l];
        return {
            label: l,
            samples: item.count,
            responseTime: Math.round(item.totalTime/item.count),
            maxTime: item.maxTime,
            successRate: Math.round(item.successCount/item.count*100),
            success: item.successCount === item.count
        };
    });

    const totalSamples = rows.length;
    const totalSuccess = rows.filter(r=>r.success==='true').length;
    const totalErrors = totalSamples - totalSuccess;
    const avgResponseTime = Math.round(rows.reduce((sum,r)=>sum+parseInt(r.elapsed),0)/totalSamples);

    const slowest = requests.reduce((a,b)=>b.responseTime>a.responseTime?b:a);
    const fastest = requests.reduce((a,b)=>b.responseTime<a.responseTime?b:a);
    const highestFail = requests.reduce((a,b)=> (100-b.successRate)>(100-a.successRate)?b:a);

    const summary = {
        timestamp: new Date().toLocaleString(),
        totalSamples,
        successfulSamples: totalSuccess,
        failedSamples: totalErrors,
        errorRate: +(totalErrors/totalSamples*100).toFixed(2),
        avgResponseTime,
        slowest,
        fastest,
        highestFail
    };

    renderMetrics(summary);
    renderTable(requests);
    renderChart(requests);
    renderSummary(summary);
}

function renderMetrics(summary){
    document.getElementById('metricsGrid').innerHTML = `
        <div class="metric-card">
            <div class="metric-label">Total Samples</div>
            <div class="metric-value">${summary.totalSamples}</div>
            <div class="metric-subtitle">Requests executed</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Avg Response Time</div>
            <div class="metric-value">${summary.avgResponseTime}ms</div>
            <div class="metric-subtitle">Average across all requests</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Success Rate</div>
            <div class="metric-value success">${(100-summary.errorRate).toFixed(2)}%</div>
            <div class="metric-subtitle">Successful: ${summary.successfulSamples}</div>
        </div>
        <div class="metric-card">
            <div class="metric-label">Error Rate</div>
            <div class="metric-value error">${summary.errorRate}%</div>
            <div class="metric-subtitle">Failed: ${summary.failedSamples}</div>
        </div>
    `;
}

function renderTable(requests){
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    requests.forEach(r=>{
        const row = `
            <tr>
                <td>${r.label}</td>
                <td>${r.samples}</td>
                <td>${r.responseTime}</td>
                <td class="${r.success?'success':'error'}">${r.success?'✓ PASS':'✗ FAIL'}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

function renderChart(requests){
    const ctx = document.getElementById('responseTimeChart').getContext('2d');
    new Chart(ctx, {
        type:'bar',
        data:{
            labels: requests.map(r=>r.label),
            datasets:[{
                label:'Avg Response Time (ms)',
                data: requests.map(r=>r.responseTime),
                backgroundColor:'#3b82f6',
                borderColor:'#1e40af',
                borderWidth:1
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{legend:{labels:{color:'#e2e8f0'}}},
            scales:{
                y:{ticks:{color:'#e2e8f0'},grid:{color:'#475569'}},
                x:{ticks:{color:'#e2e8f0'},grid:{color:'#475569'}}
            }
        }
    });
}

function renderSummary(summary){
    document.getElementById('summaryBox').innerHTML = `
        <h3 style="margin-bottom:15px;">Summary & Performance Insights</h3>
        <p><strong>Timestamp:</strong> ${summary.timestamp}</p>
        <p><strong>Test Status:</strong> ${summary.errorRate===0?'✓ HEALTHY':'⚠ NEEDS ATTENTION'}</p>
        <p><strong>Average Response Time:</strong> ${summary.avgResponseTime}ms</p>
        <p><strong>Success Rate:</strong> ${(100-summary.errorRate).toFixed(2)}%</p>
        <p><strong>Slowest Endpoint:</strong> ${summary.slowest.label} (${summary.slowest.responseTime}ms)</p>
        <p><strong>Fastest Endpoint:</strong> ${summary.fastest.label} (${summary.fastest.responseTime}ms)</p>
        <p><strong>Endpoint with Highest Failure Rate:</strong> ${summary.highestFail.label} (${100-summary.highestFail.successRate}%)</p>
        <p><strong>Performance Recommendation:</strong> ${
            summary.avgResponseTime>500 ? 'Consider optimizing slow endpoints and database calls.' : 'API performance is healthy.'}
        </p>
    `;
}
