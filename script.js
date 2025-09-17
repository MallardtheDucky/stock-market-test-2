// Mock data for demonstration - in a real implementation, this would connect to your Discord bot's database
const mockData = {
    economicIndicators: {
        gdpGrowth: 1.3,
        inflationRate: 2.5,
        consumerConfidence: 78,
        interestRate: 4.5,
        taxRate: 25.0
    },
    stocks: [
        {
            company: "TechCorp Industries",
            sector: "Technology",
            price: 125,
            change: 5.2,
            marketCap: 2500000,
            availableShares: 15000,
            owner: "Alice Johnson",
            profit: 45000,
            employees: 120
        },
        {
            company: "Green Energy Solutions",
            sector: "Energy",
            price: 89,
            change: -2.1,
            marketCap: 1780000,
            availableShares: 8500,
            owner: "Bob Smith",
            profit: 32000,
            employees: 85
        },
        {
            company: "Retail Empire",
            sector: "Retail",
            price: 67,
            change: 1.8,
            marketCap: 1340000,
            availableShares: 12000,
            owner: "Carol Davis",
            profit: 28000,
            employees: 200
        },
        {
            company: "HealthTech Innovations",
            sector: "Healthcare",
            price: 156,
            change: 8.7,
            marketCap: 3120000,
            availableShares: 6000,
            owner: "David Wilson",
            profit: 52000,
            employees: 95
        },
        {
            company: "Financial Services Ltd",
            sector: "Finance",
            price: 92,
            change: -1.5,
            marketCap: 1840000,
            availableShares: 9200,
            owner: "Eve Thompson",
            profit: 38000,
            employees: 150
        }
    ],
    transactions: [
        {
            type: "buy",
            company: "TechCorp Industries",
            shares: 100,
            price: 125,
            user: "Alice Johnson",
            timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
        },
        {
            type: "sell",
            company: "Green Energy Solutions",
            shares: 50,
            price: 89,
            user: "Bob Smith",
            timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
        },
        {
            type: "buy",
            company: "HealthTech Innovations",
            shares: 25,
            price: 156,
            user: "Carol Davis",
            timestamp: new Date(Date.now() - 1000 * 60 * 45) // 45 minutes ago
        },
        {
            type: "buy",
            company: "Retail Empire",
            shares: 200,
            price: 67,
            user: "David Wilson",
            timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
        },
        {
            type: "sell",
            company: "Financial Services Ltd",
            shares: 75,
            price: 92,
            user: "Eve Thompson",
            timestamp: new Date(Date.now() - 1000 * 60 * 75) // 1.25 hours ago
        }
    ]
};

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(number) {
    return new Intl.NumberFormat('en-US').format(number);
}

function formatPercentage(value, showSign = true) {
    const sign = showSign && value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

// Data loading and display functions
function updateMarketOverview() {
    const totalMarketCap = mockData.stocks.reduce((sum, stock) => sum + stock.marketCap, 0);
    const activeStocks = mockData.stocks.length;
    const totalVolume = mockData.transactions.reduce((sum, transaction) => 
        sum + (transaction.shares * transaction.price), 0);

    document.getElementById('total-market-cap').textContent = formatCurrency(totalMarketCap);
    document.getElementById('active-stocks').textContent = activeStocks;
    document.getElementById('total-volume').textContent = formatCurrency(totalVolume);
    document.getElementById('last-update').textContent = formatTimeAgo(new Date(Date.now() - 1000 * 60 * 5));
}

function updateEconomicIndicators() {
    const indicators = mockData.economicIndicators;
    
    document.getElementById('gdp-growth').textContent = formatPercentage(indicators.gdpGrowth);
    document.getElementById('inflation-rate').textContent = formatPercentage(indicators.inflationRate);
    document.getElementById('consumer-confidence').textContent = `${indicators.consumerConfidence}/100`;
    document.getElementById('interest-rate').textContent = formatPercentage(indicators.interestRate);
    document.getElementById('tax-rate').textContent = formatPercentage(indicators.taxRate);
}

function updateStockTable() {
    const tbody = document.getElementById('stock-table-body');
    tbody.innerHTML = '';

    mockData.stocks.forEach(stock => {
        const row = document.createElement('tr');
        
        const changeClass = stock.change > 0 ? 'positive' : stock.change < 0 ? 'negative' : 'neutral';
        const changeText = stock.change > 0 ? `+$${stock.change}` : `$${stock.change}`;
        
        row.innerHTML = `
            <td>
                <div style="font-weight: 600; color: #2d3748;">${stock.company}</div>
            </td>
            <td>
                <span style="background: #e2e8f0; color: #4a5568; padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; font-weight: 500;">
                    ${stock.sector}
                </span>
            </td>
            <td style="font-weight: 600; font-size: 1.1rem;">${formatCurrency(stock.price)}</td>
            <td>
                <span class="price-change ${changeClass}">
                    ${changeText}
                </span>
            </td>
            <td>${formatCurrency(stock.marketCap)}</td>
            <td>${formatNumber(stock.availableShares)}</td>
            <td>${stock.owner}</td>
        `;
        
        tbody.appendChild(row);
    });
}

function updateTopBusinesses() {
    const businessGrid = document.getElementById('business-grid');
    businessGrid.innerHTML = '';

    // Sort by profit and take top 6
    const topBusinesses = [...mockData.stocks]
        .sort((a, b) => b.profit - a.profit)
        .slice(0, 6);

    topBusinesses.forEach((business, index) => {
        const card = document.createElement('div');
        card.className = 'business-card';
        
        const medalEmojis = ['🥇', '🥈', '🥉'];
        const medal = index < 3 ? medalEmojis[index] : `${index + 1}.`;
        
        card.innerHTML = `
            <div class="business-name">${medal} ${business.company}</div>
            <div class="business-sector">${business.sector}</div>
            <div class="business-stats">
                <div class="business-stat">
                    <span class="business-stat-label">Monthly Profit:</span>
                    <span class="business-stat-value">${formatCurrency(business.profit)}</span>
                </div>
                <div class="business-stat">
                    <span class="business-stat-label">Employees:</span>
                    <span class="business-stat-value">${business.employees}</span>
                </div>
                <div class="business-stat">
                    <span class="business-stat-label">Stock Price:</span>
                    <span class="business-stat-value">${formatCurrency(business.price)}</span>
                </div>
                <div class="business-stat">
                    <span class="business-stat-label">Owner:</span>
                    <span class="business-stat-value">${business.owner}</span>
                </div>
            </div>
        `;
        
        businessGrid.appendChild(card);
    });
}

function updateRecentTransactions() {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    mockData.transactions.slice(0, 10).forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.className = 'transaction';
        
        const totalValue = transaction.shares * transaction.price;
        const actionText = transaction.type === 'buy' ? 'Bought' : 'Sold';
        
        transactionDiv.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-type ${transaction.type}">
                    ${actionText} ${formatNumber(transaction.shares)} shares
                </div>
                <div class="transaction-details">
                    ${transaction.company} @ ${formatCurrency(transaction.price)}/share by ${transaction.user}
                </div>
            </div>
            <div style="text-align: right;">
                <div class="transaction-value">${formatCurrency(totalValue)}</div>
                <div class="transaction-time">${formatTimeAgo(transaction.timestamp)}</div>
            </div>
        `;
        
        transactionList.appendChild(transactionDiv);
    });
}

function refreshData() {
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.textContent = '🔄 Refreshing...';
    refreshBtn.disabled = true;

    // Simulate data refresh with slight variations
    mockData.stocks.forEach(stock => {
        // Simulate small price changes
        const change = (Math.random() - 0.5) * 10; // Random change between -5 and +5
        stock.change = change;
        stock.price = Math.max(1, stock.price + change);
        stock.marketCap = stock.price * (20000 - stock.availableShares); // Assuming 20k total shares
    });

    // Add a new transaction occasionally
    if (Math.random() > 0.7) {
        const randomStock = mockData.stocks[Math.floor(Math.random() * mockData.stocks.length)];
        const newTransaction = {
            type: Math.random() > 0.5 ? 'buy' : 'sell',
            company: randomStock.company,
            shares: Math.floor(Math.random() * 100) + 1,
            price: randomStock.price,
            user: randomStock.owner,
            timestamp: new Date()
        };
        mockData.transactions.unshift(newTransaction);
        mockData.transactions = mockData.transactions.slice(0, 20); // Keep only latest 20
    }

    // Simulate loading delay
    setTimeout(() => {
        updateAll();
        refreshBtn.textContent = '🔄 Refresh';
        refreshBtn.disabled = false;
    }, 1000);
}

function updateAll() {
    updateMarketOverview();
    updateEconomicIndicators();
    updateStockTable();
    updateTopBusinesses();
    updateRecentTransactions();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateAll();
    
    // Set up refresh button
    document.getElementById('refresh-btn').addEventListener('click', refreshData);
    
    // Auto-refresh every 5 minutes
    setInterval(updateAll, 5 * 60 * 1000);
    
    // Simulate live price updates every 30 seconds
    setInterval(() => {
        mockData.stocks.forEach(stock => {
            const smallChange = (Math.random() - 0.5) * 2; // Small random fluctuation
            stock.price = Math.max(1, stock.price + smallChange);
            stock.marketCap = stock.price * (20000 - stock.availableShares);
        });
        updateStockTable();
        updateMarketOverview();
    }, 30000);
    
    console.log('APRP Stock Market website initialized successfully!');
    console.log('Data will auto-refresh every 5 minutes');
    console.log('Stock prices update every 30 seconds for live simulation');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Website error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
        }, 0);
    });
}